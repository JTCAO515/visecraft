import { expect, test, type Page } from "@playwright/test";

const previewUser = {
  email: "founder@example.com",
  password: "preview-password",
};

async function signInWithPreviewAuth(page: Page) {
  const response = await page.context().request.post("/api/auth/preview-login", {
    data: previewUser,
  });

  expect(response.ok()).toBeTruthy();
}

test("visitor can load the landing page and reach authentication", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Turn every project in motion into a verifiable, living business story.",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Sign in", exact: true }).first().click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: "Welcome back to ViseCraft." })).toBeVisible();

  await page.goto("/");
  await page.getByRole("link", { name: "Get started", exact: true }).first().click();
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.getByRole("heading", { name: "Create your ViseCraft workspace." })).toBeVisible();
});

test("homepage keeps one active scenario, bilingual copy, and a 390px-safe product interface", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Claims under review" })).toBeVisible();
  await page.getByRole("tab", { name: /Report without rewriting/ }).click();
  await expect(
    page.getByRole("heading", { name: "Turn ongoing work into updates without rebuilding the story every week." }),
  ).toBeVisible();

  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBeTruthy();

  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await page.getByRole("button", { name: "中文" }).click();
  await expect(
    page.getByRole("heading", { name: "让每一个真实推进的项目，都成为可验证、持续生长的商业叙事。" }),
  ).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

test("preview authentication protects the workspace and logout clears access", async ({ page }) => {
  await page.goto("/app");
  await expect(page).toHaveURL(/\/login\?next=%2Fapp$/);

  await signInWithPreviewAuth(page);
  await page.goto("/app");

  await expect(page).toHaveURL(/\/app$/);
  await expect(page.getByText(previewUser.email, { exact: true })).toBeVisible();
  await expect(page.getByText("Preview auth session", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/app");
  await expect(page).toHaveURL(/\/login\?next=%2Fapp$/);
});

test("authenticated user can inspect the verification dashboard and a claim report", async ({ page }) => {
  await signInWithPreviewAuth(page);
  await page.goto("/app/projects/visepanda-demo/verification");

  await expect(page.getByRole("heading", { name: "Claim-level proof, not a project score." })).toBeVisible();
  await expect(page.getByText("Claims checked", { exact: true })).toBeVisible();

  for (const profileLabel of [
    "Project identity",
    "Product evidence",
    "Deployment evidence",
    "Usage evidence",
    "Freshness",
    "Contradictions",
  ]) {
    await expect(page.getByText(profileLabel, { exact: true }).first()).toBeVisible();
  }

  await expect(
    page.getByText(
      /^(Unverified|Self-reported|Source-linked|Code-backed|Deployment-backed|Partially supported|Evidence missing|Contradicted|Stale|Unable to verify)$/,
    ).first(),
  ).toBeVisible();

  const firstClaim = page.locator('a[href^="/app/projects/visepanda-demo/verification/claim_"]').first();
  await expect(firstClaim).toBeVisible();
  await firstClaim.click();

  await expect(page).toHaveURL(/\/app\/projects\/visepanda-demo\/verification\/claim_[^/]+$/);
  await expect(page.getByText("Original", { exact: true })).toBeVisible();
  await expect(page.getByText("Supporting evidence", { exact: true })).toBeVisible();
});
