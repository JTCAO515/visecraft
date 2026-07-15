# Design System

ViseCraft v1.0.4 uses the VP Timeline dark evidence-first design system.

Reference concept:

- `docs/design/vp-timeline-dark-concept.png`

Core rules:

- Background stays near-black charcoal: `#06090b`, `#0b1014`, `#0f151b`.
- Jade `#34d399` is reserved for verified evidence, active states and primary CTA.
- Blue, amber and rose remain semantic accents for sources, pending work and risks.
- Evidence levels are UI primitives, not decoration.
- Pages should prefer rails, rows, timelines, dividers and aligned columns over card-heavy dashboards.
- Product copy, metrics, evidence records and business claims belong in content/data modules.
- Language switching is client-side in v1.0.4. Shared locale state lives in `src/lib/i18n/use-locale.ts`, the switcher lives in `src/components/shared/language-switch.tsx`, and bilingual copy lives in `src/content`.
