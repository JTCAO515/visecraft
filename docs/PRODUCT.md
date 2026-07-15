# Product

ViseCraft automatically transforms real project progress into interactive, verifiable and continuously updated living BPs, project stories and investor updates.

It is independent from VisePanda. VisePanda is an AI travel software project and `vp.jtcao.space` is the first live case study that inspired ViseCraft.

## Product Thesis

ViseCraft is a living project-intelligence and narrative platform. ViseCraft Proof Engine is the core verification layer that makes important claims evidence-backed, freshness-aware and explainable.

The capability architecture is:

1. Proof Engine: claim-level evidence, freshness, contradiction and limitation checks.
2. Narrative Engine: convert real product, engineering and business activity into reviewable project meaning.
3. Presentation Layer: generate living BP, project story, timeline and investor-update views.
4. Publishing: deploy an authorized view as a shareable project website.

The presentation layer is the output: a dynamic BP, project timeline, investor update or public project report. The intended publishing workflow is that a user chooses a project name, ViseCraft generates the verified living BP/report, and the output becomes a website such as:

```text
project-name.jtcao.space
```

Current deployment is operator-assisted: the site is deployed through Vercel and the subdomain is added manually in Spaceship DNS for `jtcao.space`. This is a real current workflow, not yet fully automated SaaS provisioning.

## Personas

- Early-stage founders preparing investor and partner updates.
- AI-native teams explaining fast technical iteration.
- Independent builders maintaining a public project story.
- Non-technical founders who need readable engineering progress.
- Future: accelerators, studios and portfolio operators.

## Jobs To Be Done

- Check whether important BP and timeline claims are supported by current, relevant evidence.
- Create a formal commercial BP with executive summary, problem, solution, product, market, business model, traction, roadmap, team, risks and ask.
- Explain what changed in the product without rewriting a deck.
- Translate technical activity into business progress.
- Attach evidence to important milestones.
- Publish the resulting BP/report as a shareable website.
- Share different views with founders, investors and the public.

## MVP Scope

- Public launch page.
- Login, signup/early access and protected workspace.
- VisePanda live case study link.
- Evidence-first design system.
- Supabase-ready auth architecture with local preview auth.
- Proof Engine V0 with claim-level verdicts, freshness and source checks.
- Commercial BP Builder positioning and module structure.
- VisePanda verification dashboard.
- Operator-assisted publishing concept for `*.jtcao.space`.

## Non-Goals

- No fabricated traction, revenue, customer logos or funding claims.
- No Canva-style deck editor in the v1.0.x product series.
- No automatic repository access through account login.
- No SOC 2 or enterprise security claims until actually achieved.
- No claim that subdomain provisioning is fully automated before Vercel + Spaceship DNS automation exists.
