"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GitBranch, ShieldCheck } from "lucide-react";
import { EvidenceBadge, ViseCraftMark } from "@/components/shared/logo";
import { LanguageSwitch } from "@/components/shared/language-switch";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";
import { trackEvent } from "@/lib/analytics/track";
import { ApiError, apiFetch } from "@/lib/api/client";
import type { FieldErrors } from "@/lib/forms/errors";
import { getSupabaseConfig, isPreviewAuthEnabled } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/use-locale";
import { authContent } from "@/content/auth";
import { landingContent, type LandingCopy } from "@/content/landing";

type Mode = "login" | "signup";
type AuthField = "name" | "email" | "password" | "acceptedTerms";

export function AuthPanel({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/app";
  const callbackError = searchParams.get("error");
  const supabaseConfig = useMemo(() => getSupabaseConfig(), []);
  const previewEnabled = useMemo(() => isPreviewAuthEnabled(), []);
  const { locale } = useLocale();
  const copy = authContent[locale];
  const productCopy = landingContent[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(callbackError);
  const [messageTone, setMessageTone] = useState<"error" | "success">("error");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<AuthField>>({});

  const isSignup = mode === "signup";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setMessageTone("error");
    setFieldErrors({});

    if (!email.includes("@")) {
      setFieldErrors({ email: copy.errors.invalidEmail });
      return;
    }

    if (password.length < 8) {
      setFieldErrors({ password: copy.errors.shortPassword });
      return;
    }

    if (isSignup && (!name.trim() || !acceptedTerms)) {
      setFieldErrors({
        ...(!name.trim() ? { name: copy.errors.incompleteSignup } : {}),
        ...(!acceptedTerms ? { acceptedTerms: copy.errors.incompleteSignup } : {}),
      });
      setMessage(copy.errors.incompleteSignup);
      return;
    }

    setLoading(true);

    try {
      if (supabaseConfig.isConfigured) {
        const supabase = createClient();
        const result = isSignup
          ? await supabase.auth.signUp({
              email,
              password,
              options: { data: { name }, emailRedirectTo: `${window.location.origin}/auth/callback?next=${nextPath}` },
            })
          : await supabase.auth.signInWithPassword({ email, password });

        if (result.error) {
          throw new Error(result.error.message);
        }

        trackEvent(isSignup ? "signup_start" : "login_success");
        router.push(nextPath);
        router.refresh();
        return;
      }

      if (!previewEnabled) {
        throw new Error(copy.errors.authNotConfigured);
      }

      const endpoint = isSignup ? "/api/auth/preview-signup" : "/api/auth/preview-login";
      await apiFetch<{ ok: true }>(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password, acceptedTerms }),
      });

      trackEvent(isSignup ? "signup_start" : "login_success");
      router.push(nextPath);
      router.refresh();
    } catch (error) {
      trackEvent("login_failure");
      if (error instanceof ApiError && error.fieldErrors) {
        setFieldErrors(error.fieldErrors as FieldErrors<AuthField>);
      }
      setMessage(error instanceof Error ? error.message : copy.errors.authFailed);
      setMessageTone("error");
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGitHub() {
    setMessage(null);
    setMessageTone("error");

    if (!supabaseConfig.isConfigured) {
      setMessage(copy.errors.githubNeedsSupabase);
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${nextPath}`,
          scopes: "read:user user:email",
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      trackEvent("login_failure");
      setMessage(error instanceof Error ? error.message : copy.errors.githubFailed);
      setLoading(false);
    }
  }

  async function sendReset() {
    setMessage(null);

    if (!email.includes("@")) {
      setMessage(copy.errors.resetNeedsEmail);
      setMessageTone("error");
      return;
    }

    if (!supabaseConfig.isConfigured) {
      setMessage(copy.errors.resetPreview);
      setMessageTone("success");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        throw new Error(error.message);
      }

      setMessage(copy.errors.resetSent);
      setMessageTone("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : copy.errors.resetFailed);
      setMessageTone("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen bg-[var(--bg0)] text-[var(--text)] lg:grid-cols-[minmax(28rem,0.82fr)_minmax(34rem,1.18fr)]">
      <section className="flex min-h-screen flex-col border-r border-[var(--line)] p-6 md:p-10 lg:p-12">
        <div className="flex items-center justify-between gap-4">
          <ViseCraftMark />
          <LanguageSwitch compact />
        </div>

        <div className="my-auto w-full max-w-md py-14 lg:mx-auto">
          <p className="mono-label text-[var(--jade)]">{copy.label}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-5xl">
            {isSignup ? copy.signupTitle : copy.loginTitle}
          </h1>
          <p className="mt-4 text-sm leading-6 text-[var(--text-dim)]">
            {isSignup ? copy.signupIntro : copy.loginIntro}
          </p>

            <button
              className="pressable mt-7 flex h-12 w-full items-center justify-center gap-2 border border-[var(--line-hi)] text-sm font-medium text-[var(--text)] hover:bg-[var(--surface-hi)] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
              onClick={signInWithGitHub}
              style={{ borderRadius: "8px" }}
            >
              <GitBranch size={17} /> {copy.github}
            </button>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[var(--line)]" />
              <span className="mono-label text-[var(--text-faint)]">{copy.orEmail}</span>
              <span className="h-px flex-1 bg-[var(--line)]" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignup ? (
                <Field
                  autoComplete="name"
                  error={fieldErrors.name}
                  label={copy.name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={copy.namePlaceholder}
                  value={name}
                />
              ) : null}
              <Field
                autoComplete="email"
                error={fieldErrors.email}
                label={copy.email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={copy.emailPlaceholder}
                type="email"
                value={email}
              />
              <Field
                autoComplete={isSignup ? "new-password" : "current-password"}
                error={fieldErrors.password}
                label={copy.password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy.passwordPlaceholder}
                type="password"
                value={password}
              />

              {isSignup ? (
                <label className="flex gap-3 text-sm leading-6 text-[var(--text-dim)]">
                  <input
                    aria-describedby={fieldErrors.acceptedTerms ? "accepted-terms-error" : undefined}
                    aria-invalid={Boolean(fieldErrors.acceptedTerms)}
                    checked={acceptedTerms}
                    className="mt-1 size-4 accent-[var(--jade)]"
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    type="checkbox"
                  />
                  {copy.terms}
                </label>
              ) : null}

              {fieldErrors.acceptedTerms ? (
                <p className="text-xs leading-5 text-[var(--rose)]" id="accepted-terms-error">
                  {fieldErrors.acceptedTerms}
                </p>
              ) : null}

              {message ? (
                <p
                  className="border px-3 py-2 text-sm"
                  role={messageTone === "error" ? "alert" : "status"}
                  style={{
                    borderColor: messageTone === "error" ? "var(--rose)" : "var(--jade)",
                    color: messageTone === "error" ? "var(--rose)" : "var(--jade)",
                    borderRadius: "8px",
                  }}
                >
                  {message}
                </p>
              ) : null}

              <SubmitButton loading={loading} loadingLabel={isSignup ? copy.createAccount : copy.signIn}>
                {isSignup ? copy.createAccount : copy.signIn}
              </SubmitButton>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text-dim)]">
              {isSignup ? (
                <Link className="pressable hover:text-[var(--text)]" href="/login">
                  {copy.alreadyHaveAccount}
                </Link>
              ) : (
                <button className="pressable hover:text-[var(--text)]" onClick={sendReset} type="button">
                  {copy.forgotPassword}
                </button>
              )}
              <Link className="pressable text-[var(--blue)]" href={isSignup ? "/login" : "/signup"}>
                {isSignup ? copy.signIn : copy.createAccount}
              </Link>
            </div>
          {previewEnabled && !supabaseConfig.isConfigured ? (
            <p className="mt-4 border border-[var(--line)] bg-[var(--bg1)] px-4 py-3 text-xs leading-5 text-[var(--text-dim)]" style={{ borderRadius: "10px" }}>
              {copy.previewNotice}
            </p>
          ) : null}
        </div>

        <Link className="pressable w-fit text-sm text-[var(--text-dim)] hover:text-[var(--text)]" href="/">
          {copy.returnHome}
        </Link>
      </section>

      <section className="auth-product-stage hidden min-h-screen overflow-hidden p-8 lg:flex lg:items-center lg:justify-center xl:p-14" aria-label={productCopy.interfaceLabels.workspace}>
        <AuthProductPreview copy={productCopy} />
      </section>
    </div>
  );
}

function AuthProductPreview({ copy }: { copy: LandingCopy }) {
  const selectedClaim = copy.heroClaims[0];

  return (
    <div className="material-thick w-full max-w-4xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
        <div>
          <p className="mono-label text-[var(--text-faint)]">{copy.interfaceLabels.workspace}</p>
          <p className="mt-1 text-sm font-semibold">{copy.interfaceLabels.projectName}</p>
        </div>
        <EvidenceBadge label={copy.hero.proof} />
      </div>

      <div className="grid min-h-[34rem] grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="border-r border-[var(--line)] bg-[var(--bg0)] p-4">
          {[copy.interfaceLabels.proofEngine, copy.interfaceLabels.timeline, copy.interfaceLabels.bpStudio, copy.interfaceLabels.publish].map((item, index) => (
            <div
              className={`flex items-center gap-3 border-b border-[var(--line)] px-2 py-3 text-sm ${index === 0 ? "text-[var(--jade)]" : "text-[var(--text-faint)]"}`}
              key={item}
            >
              <span className={`size-1.5 rounded-full ${index === 0 ? "bg-[var(--jade)]" : "bg-[var(--line-hi)]"}`} />
              {item}
            </div>
          ))}
        </aside>

        <div className="min-w-0 p-6 xl:p-8">
          <div className="flex items-start justify-between gap-5 border-b border-[var(--line)] pb-6">
            <div>
              <p className="mono-label text-[var(--jade)]">{copy.interfaceLabels.selectedClaim}</p>
              <h2 className="mt-3 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.025em]">{selectedClaim.title}</h2>
            </div>
            <ShieldCheck className="shrink-0 text-[var(--jade)]" size={22} aria-hidden="true" />
          </div>

          <div className="grid gap-6 py-6 xl:grid-cols-[0.62fr_0.38fr]">
            <div>
              <p className="mono-label text-[var(--text-faint)]">{copy.interfaceLabels.supportingEvidence}</p>
              {copy.heroClaims.slice(0, 2).map((claim) => (
                <div className="border-b border-[var(--line)] py-4" key={claim.title}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium">{claim.source}</p>
                    <EvidenceBadge label={claim.verdict} tone={claim.tone} />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[var(--text-dim)]">{claim.summary}</p>
                </div>
              ))}
            </div>

            <dl className="border-l border-[var(--line)] pl-6 text-sm">
              <div className="border-b border-[var(--line)] pb-4">
                <dt className="mono-label text-[var(--text-faint)]">{copy.interfaceLabels.verdict}</dt>
                <dd className="mt-2 text-[var(--jade)]">{selectedClaim.verdict}</dd>
              </div>
              <div className="border-b border-[var(--line)] py-4">
                <dt className="mono-label text-[var(--text-faint)]">{copy.interfaceLabels.freshness}</dt>
                <dd className="mt-2">{selectedClaim.freshness}</dd>
              </div>
              <div className="pt-4">
                <dt className="mono-label text-[var(--text-faint)]">{copy.interfaceLabels.limitations}</dt>
                <dd className="mt-2 text-xs leading-5 text-[var(--text-dim)]">{selectedClaim.limitations}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
