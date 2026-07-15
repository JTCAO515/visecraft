import type { DeterministicCheck, EvidenceItem } from "@/lib/proof/types";

type GitHubMetadata = {
  owner?: string;
  repo?: string;
  sha?: string;
  number?: number;
  tag?: string;
  tagName?: string;
};

type GitHubApiResult = {
  ok: boolean;
  status: number;
  data?: Record<string, unknown>;
  url: string;
};

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ViseCraft-Proof-Engine",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function githubGet(path: string): Promise<GitHubApiResult> {
  const url = `https://api.github.com${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);
  const response = await fetch(url, {
    headers: githubHeaders(),
    cache: "no-store",
    signal: controller.signal,
  }).finally(() => clearTimeout(timeout));

  let data: Record<string, unknown> | undefined;
  try {
    data = (await response.json()) as Record<string, unknown>;
  } catch {
    data = undefined;
  }

  return { ok: response.ok, status: response.status, data, url };
}

function metadataFor(evidence: EvidenceItem): GitHubMetadata {
  return evidence.rawMetadata as GitHubMetadata;
}

function missingIdentity(evidence: EvidenceItem): DeterministicCheck {
  return {
    evidenceId: evidence.id,
    adapter: "github",
    status: "unavailable",
    checkedAt: new Date().toISOString(),
    summary: "GitHub evidence is missing repository identity metadata.",
  };
}

export async function verifyGitHubEvidence(evidence: EvidenceItem): Promise<DeterministicCheck> {
  const meta = metadataFor(evidence);
  const checkedAt = new Date().toISOString();

  if (!meta.owner || !meta.repo) {
    return missingIdentity(evidence);
  }

  try {
    if (evidence.sourceType === "github_commit") {
      const sha = meta.sha ?? evidence.sourceId;
      const result = await githubGet(`/repos/${meta.owner}/${meta.repo}/commits/${sha}`);
      const apiSha = typeof result.data?.sha === "string" ? result.data.sha : undefined;
      const commit = result.data?.commit as { committer?: { date?: string } } | undefined;

      return {
        evidenceId: evidence.id,
        adapter: "github",
        status: result.ok && apiSha?.startsWith(sha) ? "passed" : "failed",
        checkedAt,
        observedAt: commit?.committer?.date,
        summary: result.ok
          ? "GitHub API confirmed the commit exists in the stated repository."
          : `GitHub API could not confirm this commit. HTTP ${result.status}.`,
        metadata: { apiUrl: result.url, sha: apiSha, status: result.status },
      };
    }

    if (evidence.sourceType === "github_pull_request") {
      const number = meta.number ?? Number(evidence.sourceId.replace(/\D/g, ""));
      const result = await githubGet(`/repos/${meta.owner}/${meta.repo}/pulls/${number}`);
      const mergedAt = typeof result.data?.merged_at === "string" ? result.data.merged_at : null;

      return {
        evidenceId: evidence.id,
        adapter: "github",
        status: result.ok && mergedAt ? "passed" : result.ok ? "not_checked" : "failed",
        checkedAt,
        observedAt: mergedAt ?? undefined,
        summary: result.ok
          ? mergedAt
            ? "GitHub API confirmed the pull request exists and was merged."
            : "GitHub API confirmed the pull request exists, but it is not merged."
          : `GitHub API could not confirm this pull request. HTTP ${result.status}.`,
        metadata: { apiUrl: result.url, number, mergedAt, state: result.data?.state },
      };
    }

    if (evidence.sourceType === "github_issue") {
      const number = meta.number ?? Number(evidence.sourceId.replace(/\D/g, ""));
      const result = await githubGet(`/repos/${meta.owner}/${meta.repo}/issues/${number}`);
      const state = typeof result.data?.state === "string" ? result.data.state : undefined;

      return {
        evidenceId: evidence.id,
        adapter: "github",
        status: result.ok ? "passed" : "failed",
        checkedAt,
        observedAt: typeof result.data?.closed_at === "string" ? result.data.closed_at : undefined,
        summary: result.ok
          ? `GitHub API confirmed the issue exists and is currently ${state ?? "unknown"}.`
          : `GitHub API could not confirm this issue. HTTP ${result.status}.`,
        metadata: { apiUrl: result.url, number, state, closedAt: result.data?.closed_at },
      };
    }

    if (evidence.sourceType === "github_release") {
      const tag = meta.tagName ?? meta.tag ?? evidence.sourceId;
      const result = await githubGet(`/repos/${meta.owner}/${meta.repo}/releases/tags/${tag}`);
      const publishedAt = typeof result.data?.published_at === "string" ? result.data.published_at : undefined;

      return {
        evidenceId: evidence.id,
        adapter: "github",
        status: result.ok ? "passed" : "failed",
        checkedAt,
        observedAt: publishedAt,
        summary: result.ok
          ? "GitHub API confirmed the release exists for the stated tag."
          : `GitHub API could not confirm this release. HTTP ${result.status}.`,
        metadata: { apiUrl: result.url, tag, publishedAt, status: result.status },
      };
    }

    if (evidence.sourceType === "github_tag") {
      const tag = meta.tag ?? evidence.sourceId;
      const result = await githubGet(`/repos/${meta.owner}/${meta.repo}/git/ref/tags/${tag}`);

      return {
        evidenceId: evidence.id,
        adapter: "github",
        status: result.ok ? "passed" : "failed",
        checkedAt,
        summary: result.ok
          ? "GitHub API confirmed the tag exists in the stated repository."
          : `GitHub API could not confirm this tag. HTTP ${result.status}.`,
        metadata: { apiUrl: result.url, tag, status: result.status, object: result.data?.object },
      };
    }
  } catch (error) {
    return {
      evidenceId: evidence.id,
      adapter: "github",
      status: "unavailable",
      checkedAt,
      summary: error instanceof Error ? error.message : "GitHub verification failed.",
    };
  }

  return {
    evidenceId: evidence.id,
    adapter: "github",
    status: "not_checked",
    checkedAt,
    summary: "This GitHub source type does not have a verifier yet.",
  };
}
