"use client";

import { ExternalLink, LockKeyhole, LogOut, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ViseCraftMark } from "@/components/shared/logo";
import { CreateProjectLink } from "@/components/dashboard/create-project-link";
import { EmptyState } from "@/components/ui/empty-state";
import { workspaceContent } from "@/content/workspace";
import { useLocale } from "@/lib/i18n/use-locale";
import { LanguageSwitch } from "@/components/shared/language-switch";
import type { AuthenticatedUser } from "@/lib/auth/user";

export function WorkspaceShell({ user }: { user: AuthenticatedUser }) {
  const { locale } = useLocale();
  const copy = workspaceContent[locale];

  return (
    <main className="min-h-screen bg-[var(--bg0)] text-[var(--text)]">
      <header className="border-b border-[var(--line)] bg-[var(--bg1)]">
        <div className="content-rail flex h-16 items-center justify-between">
          <ViseCraftMark href="/app" />
          <div className="flex items-center gap-4">
            <LanguageSwitch compact />
            <form action="/api/auth/logout" method="post">
              <button className="inline-flex items-center gap-2 text-sm text-[var(--text-dim)] hover:text-[var(--text)]" type="submit">
                <LogOut size={16} /> {copy.logout}
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="content-rail py-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_0.25fr]">
          <div>
            <p className="mono-label text-[var(--jade)]">{copy.label}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl leading-7 text-[var(--text-dim)]">
              {locale === "zh" ? `欢迎，${user.name}。` : `Welcome, ${user.name}.`} {copy.welcome}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CreateProjectLink surface="workspace_empty_state" />
              <a
                className="inline-flex h-11 items-center gap-2 border border-[var(--line-hi)] px-4 text-sm text-[var(--blue)]"
                href="https://vp.jtcao.space"
                target="_blank"
                rel="noreferrer"
                style={{ borderRadius: "8px" }}
              >
                {copy.viewDemo} <ExternalLink size={16} />
              </a>
              <Link
                className="inline-flex h-11 items-center gap-2 border border-[rgba(52,211,153,0.42)] px-4 text-sm text-[var(--jade)]"
                href="/app/projects/visepanda-demo/verification"
                style={{ borderRadius: "8px" }}
              >
                Proof Engine <ShieldCheck size={16} />
              </Link>
            </div>
          </div>

          <aside className="border border-[var(--line)] bg-[var(--bg1)] p-5" style={{ borderRadius: "12px" }}>
            <p className="mono-label text-[var(--text-faint)]">{copy.signedInAs}</p>
            <p className="mt-3 break-words text-sm">{user.email}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--text-dim)]">
              <LockKeyhole size={14} /> {user.provider === "preview" ? copy.previewSession : copy.supabaseSession}
            </p>
          </aside>
        </div>
      </section>

      <section className="content-rail pb-16">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className="mono-label text-[var(--jade)]">{copy.emptyLabel}</p>
            <EmptyState
              action={<CreateProjectLink surface="workspace_empty_state_detail" />}
              description={copy.emptyBody}
              title={copy.emptyTitle}
            />
          </div>

          <div className="border border-[var(--line)] bg-[var(--bg1)]" style={{ borderRadius: "12px" }}>
            {copy.onboardingSteps.map((step, index) => (
              <div key={step.title} className="grid gap-4 border-b border-[var(--line)] p-5 last:border-b-0 md:grid-cols-[52px_1fr_110px] md:items-start">
                <span className="mono-label text-[var(--text-faint)]">0{index + 1}</span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-dim)]">{step.body}</p>
                </div>
                <span className="mono-label text-[var(--jade)] md:text-right">{step.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
