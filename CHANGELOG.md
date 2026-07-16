# Changelog

All notable ViseCraft product changes are recorded in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). ViseCraft product releases use the `v1.0.x` patch sequence defined in `AGENTS.md`. Historical entries below are limited to facts recorded in `src/content/landing.ts` and the repository commit history.

## [Unreleased]

### Changed

- Rebuilt the homepage around a large product statement and an interactive Proof Engine workspace instead of a sequence of equally weighted feature sections.
- Grouped product capabilities by fundraising, recurring reporting and living-site publishing scenarios.
- Added separate BP Studio, integration roadmap, Free/Pro comparison, live case-study and FAQ sections with bilingual content.
- Standardized reusable marketing actions, section introductions, plan cards, FAQ rows and final CTA composition.
- Refined the frontend with immediate press feedback, floating functional chrome, optical typography and reduced-transparency/high-contrast fallbacks.
- Rebuilt login and signup around a focused left-side form and a continuous Proof Engine product preview.
- Aligned workspace, verification, legal and project-setup page chrome with the same spatial and interaction rules.

## [1.0.4] - 2026-07-15

### Added

- Added the Proof Engine V0 foundation with claim, evidence, freshness, verification-run and verification-result models.
- Added deterministic GitHub, URL and deployment evidence adapters.
- Added protected VisePanda demo verification dashboard and claim-report routes.
- Added a rule-based provider that returns the structured Proof Engine output schema without treating absent evidence as verified.

### Changed

- Positioned Proof Engine as the core verification layer for living BPs, timelines and project updates.
- Synchronized the product version across package metadata, public content and project documentation.

### Docs

- Added Proof Engine principles, data-model and prompt-versioning documentation.

## [1.0.3] - 2026-07-15

### Added

- Added the first public ViseCraft launch page, login and signup entry points, auth callback and protected workspace route.
- Added Supabase-ready authentication adapters and a local-only preview-auth fallback.
- Added the initial authentication migration with row-level security policies.

### Infra

- Added the Next.js App Router application structure, metadata routes and deployment-ready production build.

## [1.0.2] - 2026-07-12

### Changed

- Separated product copy, demo timeline events, evidence labels and audience modes from reusable UI components through structured content modules.
- Kept the design system independent from any single founder story or evidence claim.

## [1.0.1] - 2026-07-09

### Added

- Recorded VisePanda as the first project story that inspired ViseCraft and linked the live case study at `vp.jtcao.space`.
- Kept VisePanda case-study content separate from ViseCraft platform logic.
