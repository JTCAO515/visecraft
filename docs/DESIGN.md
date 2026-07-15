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

## UI State Primitives

Shared state components live in `src/components/ui`. Product pages must consume these primitives instead of recreating page-local loading, empty, error, notification or form patterns.

- `Skeleton`: use `row` for text/table placeholders and `block` for a bounded content region. Route-level loading screens should compose these through `AppLoadingSkeleton`.
- `Spinner` and `InlineLoading`: use only when an action or compact region is actively waiting. A disabled control without progress feedback is not sufficient.
- `EmptyState`: use when a valid query has no items. Provide one clear title, a factual description and at most one primary CTA slot.
- `ErrorState`: use when a page region cannot load. Give a useful explanation and a retry callback when retrying can succeed.
- `ToastProvider` and `useToast`: use success, error or info toasts for action-level feedback that does not belong to a specific field. Toasts are dismissible, time-bound and announced through `aria-live`. The provider is mounted once at the authenticated application layout boundary.
- `Field`: use for labelled text inputs. Description and error text are automatically connected through `aria-describedby`; do not reproduce this markup per form.
- `SubmitButton`: use for form submissions so loading, disabled and `aria-busy` behavior remain consistent.

API calls from interactive components use `apiFetch` in `src/lib/api/client.ts`. API errors follow `{ error: { code, message, fieldErrors? } }`. Field errors remain inline; action-level or server errors may be sent to a toast. Never display a raw stack trace, status body or provider response to the user.

Motion uses the existing reduced-motion override. Skeleton breathing is the only continuous state animation and must remain restrained.
