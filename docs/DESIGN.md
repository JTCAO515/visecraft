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

## Marketing Homepage System

The homepage uses a single-focus section rhythm rather than a card-dense landing-page grid:

- The hero pairs one large product statement with a functional Proof Engine interface. The interface is evidence-bounded demo content from `src/content/landing.ts`, not a fabricated metric dashboard.
- Proof Engine is the first product section. It always describes claim-level support, freshness and limitations; it never implies company certification.
- Capabilities are grouped by user scenario: fundraising, recurring reporting and living-site publishing. Switching a scenario changes one shared detail panel instead of displaying every capability at once.
- BP Studio, integrations, workflow, plans, case study and FAQ each occupy a separate visual band. This keeps one primary decision per viewport and uses open rails, rows and aligned columns over repeated cards.
- Integration status is explicit. Current MVP focus and planned providers must never share the same status treatment.
- Free and Pro are compared in the same view. Undecided paid pricing is labelled as pending rather than represented by invented numbers.
- Customer quotes are not shown until an attributable, approved source exists. The live case study provides inspectable product evidence without fabricating social proof.

Reusable marketing composition lives in `src/components/marketing/marketing-primitives.tsx`:

- `ActionLink`: primary, secondary and text actions with one geometry and focus behavior.
- `SectionIntro`: section number, functional heading and optional supporting copy.
- `PricingCard`: aligned plan comparison with feature rows and CTA.
- `FaqList`: semantic disclosure rows with keyboard-native interaction.
- `MarketingCta`: shared closing action layout.

All visible homepage product copy, plan boundaries, integration states, FAQ answers and demo claims remain in `src/content/landing.ts`. Components own only layout and interaction.
