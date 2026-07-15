"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GitBranch, Loader2 } from "lucide-react";
import { ViseCraftMark } from "@/components/shared/logo";
import { LanguageSwitch } from "@/components/shared/language-switch";
import { trackEvent } from "@/lib/analytics/track";
import { getSupabaseConfig, isPreviewAuthEnabled } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/use-locale";
import { authContent } from "@/content/auth";

type Mode = "login" | "signup";

export function AuthPanel({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/app";
  const callbackError = searchParams.get("error");
  const supabaseConfig = useMemo(() => getSupabaseConfig(), []);
  const previewEnabled = useMemo(() => isPreviewAuthEnabled(), []);
  const { locale } = useLocale();
  const copy = authContent[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(callbackError);
  const [messageTone, setMessageTone] = useState<"error" | "success">("error");

  const isSignup = mode === "signup";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setMessageTone("error");

    if (!email.includes("@")) {
      setMessage(copy.errors.invalidEmail);
      return;
    }

    if (password.length < 8) {
      setMessage(copy.errors.shortPassword);
      return;
    }

    if (isSignup && (!name.trim() || !acceptedTerms)) {
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
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password, acceptedTerms }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? copy.errors.authFailed);
      }

      trackEvent(isSignup ? "signup_start" : "login_success");
      router.push(nextPath);
      router.refresh();
    } catch (error) {
      trackEvent("login_failure");
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
    <div className="grid min-h-screen bg-[var(--bg0)] text-[var(--text)] lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex min-h-[42vh] flex-col justify-between border-b border-[var(--line)] bg-[var(--bg1)] p-6 lg:min-h-screen lg:border-b-0 lg:border-r lg:p-10">
        <div className="flex items-center justify-between gap-4">
          <ViseCraftMark />
          <LanguageSwitch compact />
        </div>
        <div className="max-w-xl py-16">
          <p className="mono-label text-[var(--jade)]">{copy.label}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
            {isSignup ? copy.signupTitle : copy.loginTitle}
          </h1>
          <p className="mt-5 text-base leading-7 text-[var(--text-dim)]">
            {copy.explanation}
          </p>
        </div>
        <Link className="text-sm text-[var(--text-dim)] hover:text-[var(--text)]" href="/">
          {copy.returnHome}
        </Link>
      </section>

      <section className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md">
          <div className="border border-[var(--line)] bg-[var(--surface)] p-6" style={{ borderRadius: "14px" }}>
            <h2 className="text-2xl font-semibold">{isSignup ? copy.requestAccess : copy.signIn}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-dim)]">
              {isSignup ? copy.signupIntro : copy.loginIntro}
            </p>

            <button
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 border border-[var(--line-hi)] text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-hi)] disabled:cursor-not-allowed disabled:opacity-60"
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
                <Field label={copy.name} value={name} onChange={setName} autoComplete="name" placeholder={copy.namePlaceholder} />
              ) : null}
              <Field label={copy.email} type="email" value={email} onChange={setEmail} autoComplete="email" placeholder={copy.emailPlaceholder} />
              <Field label={copy.password} type="password" value={password} onChange={setPassword} autoComplete={isSignup ? "new-password" : "current-password"} placeholder={copy.passwordPlaceholder} />

              {isSignup ? (
                <label className="flex gap-3 text-sm leading-6 text-[var(--text-dim)]">
                  <input
                    checked={acceptedTerms}
                    className="mt-1 size-4 accent-[var(--jade)]"
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    type="checkbox"
                  />
                  {copy.terms}
                </label>
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

              <button
                className="flex h-11 w-full items-center justify-center gap-2 bg-[var(--jade)] text-sm font-semibold text-[#04100b] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading}
                style={{ borderRadius: "8px" }}
                type="submit"
              >
                {loading ? <Loader2 className="animate-spin" size={17} /> : null}
                {isSignup ? copy.createAccount : copy.signIn}
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text-dim)]">
              {isSignup ? (
                <Link className="hover:text-[var(--text)]" href="/login">
                  {copy.alreadyHaveAccount}
                </Link>
              ) : (
                <button className="hover:text-[var(--text)]" onClick={sendReset} type="button">
                  {copy.forgotPassword}
                </button>
              )}
              <Link className="text-[var(--blue)]" href={isSignup ? "/login" : "/signup"}>
                {isSignup ? copy.signIn : copy.createAccount}
              </Link>
            </div>
          </div>

          {previewEnabled && !supabaseConfig.isConfigured ? (
            <p className="mt-4 border border-[var(--line)] bg-[var(--bg1)] px-4 py-3 text-xs leading-5 text-[var(--text-dim)]" style={{ borderRadius: "10px" }}>
              {copy.previewNotice}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete: string;
  placeholder: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mono-label text-[var(--text-faint)]">{label}</span>
      <input
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full border border-[var(--line-hi)] bg-[var(--bg0)] px-3 text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[var(--jade)]"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
        style={{ borderRadius: "8px" }}
      />
    </label>
  );
}
