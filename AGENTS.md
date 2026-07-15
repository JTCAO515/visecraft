<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ViseCraft Agent Guide

## Mandatory Reading Order

1. `README.md`
2. `docs/INDEX.md`
3. `docs/PRODUCT.md`
4. `docs/ARCHITECTURE.md`
5. `docs/DATA_MODEL.md`
6. `docs/ROADMAP.md`
7. `docs/OPERATOR_ACTIONS.md`

## Product Boundary

ViseCraft is an independent SaaS product. Do not merge it with VisePanda, describe it as a VisePanda feature, or place ViseCraft work inside a VisePanda repository.

VisePanda is only the first live case study and demo project.

## Code Discipline

- Keep product claims in content/data modules, not in reusable visual primitives.
- Use the design tokens in `src/app/globals.css`.
- Preserve the dark evidence-first visual system.
- Keep GitHub login distinct from GitHub repository connection.
- Do not commit secrets, tokens, private repository content or fabricated traction.
- Update docs when code changes alter auth, data, routes, security or product promises.

## Security Requirements

- Use Supabase publishable keys only in public env vars.
- Never expose service role keys in browser code.
- Keep protected route logic in sync with `src/proxy.ts`.
- Treat preview auth as local verification only.
- All public claims need source/evidence framing.

## Verification

Before handoff, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

For UI work, also run the app and check `/`, `/login`, `/signup`, `/app`, `/privacy` and `/terms` on desktop and mobile widths.
