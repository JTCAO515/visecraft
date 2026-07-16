import Link from "next/link";
import { ViseCraftMark } from "@/components/shared/logo";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-[var(--bg0)] text-[var(--text)]">
      <header className="floating-page-header">
        <div className="content-rail material-chrome flex h-14 items-center justify-between px-4">
          <ViseCraftMark href="/app" />
          <Link className="pressable text-sm text-[var(--text-dim)] hover:text-[var(--text)]" href="/app">
            Back to workspace
          </Link>
        </div>
      </header>
      <section className="content-rail py-12">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <p className="mono-label text-[var(--jade)]">Project setup</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Create a project profile.
            </h1>
            <p className="mt-4 leading-7 text-[var(--text-dim)]">
              This v1.0.11 entry captures the shape of the project creation workflow. Persistence and repository connection are the next app modules.
            </p>
          </div>
          <form className="grid gap-4 border border-[var(--line)] bg-[var(--bg1)] p-6" style={{ borderRadius: "12px" }}>
            {["Project name", "Company name", "Tagline", "Website"].map((label) => (
              <label key={label} className="block">
                <span className="mono-label text-[var(--text-faint)]">{label}</span>
                <input
                  className="mt-2 h-12 w-full border border-[var(--line-hi)] bg-[var(--bg0)] px-3 text-sm outline-none transition focus:border-[var(--jade)] focus:bg-[var(--bg1)]"
                  placeholder={label}
                  style={{ borderRadius: "8px" }}
                />
              </label>
            ))}
            <label className="block">
              <span className="mono-label text-[var(--text-faint)]">Description</span>
              <textarea
                className="mt-2 min-h-28 w-full border border-[var(--line-hi)] bg-[var(--bg0)] px-3 py-3 text-sm outline-none transition focus:border-[var(--jade)] focus:bg-[var(--bg1)]"
                placeholder="What does this project build, and who is it for?"
                style={{ borderRadius: "8px" }}
              />
            </label>
            <button
              className="h-11 border border-[var(--amber)] text-sm font-semibold text-[var(--amber)]"
              disabled
              style={{ borderRadius: "8px" }}
              type="button"
            >
              Persistence coming soon
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
