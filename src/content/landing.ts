export const navItems = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
];

export const sourceStrip = [
  { label: "GitHub", status: "supported" },
  { label: "Releases", status: "supported" },
  { label: "Issues", status: "supported" },
  { label: "Pull requests", status: "supported" },
  { label: "Deployments", status: "coming soon" },
  { label: "Founder notes", status: "supported" },
];

export const problems = [
  "Static pitch decks become outdated the moment product work continues.",
  "Investors cannot easily verify what actually changed in the product.",
  "GitHub activity is too technical for business readers to understand.",
  "Founders repeatedly rewrite weekly updates from scattered sources.",
  "Decisions, risks and failed experiments disappear across tools.",
];

export const capabilities = [
  {
    title: "Living Pitch Pages",
    body: "Turn a static BP into a structured project page that can evolve with product story, progress, roadmap, team and ask.",
    points: ["Product story", "Market and model", "Roadmap", "Funding ask"],
  },
  {
    title: "Verified Project Timeline",
    body: "Organize meaningful events into a timeline and keep source links close to every claim.",
    points: ["Commits", "Pull requests", "Issues", "Releases"],
  },
  {
    title: "Technical-to-Business Translation",
    body: "Convert raw engineering activity into investor-readable progress without overstating the facts.",
    points: ["Impact summary", "Technical context", "Risk notes", "Founder edits"],
  },
  {
    title: "Investor Updates",
    body: "Generate weekly and monthly updates with highlights, challenges, risks, next steps and asks.",
    points: ["Weekly update", "Monthly update", "Risks", "Next steps"],
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Create a project",
    body: "Add the company, product, market, stage, founder context and visibility defaults.",
  },
  {
    step: "02",
    title: "Connect your sources",
    body: "Start with GitHub activity and founder notes; more project tools can be added over time.",
  },
  {
    step: "03",
    title: "Review meaningful progress",
    body: "Accept, edit, merge or hide generated events before anything becomes part of the story.",
  },
  {
    step: "04",
    title: "Build your living story",
    body: "Generate timelines, milestones, roadmap rows, evidence summaries and BP sections.",
  },
  {
    step: "05",
    title: "Publish and share",
    body: "Share a public, unlisted or protected page with investors, partners or the public.",
  },
];

export const timelineEvents = [
  {
    date: "Jul 15",
    time: "10:42 UTC",
    title: "ViseCraft V1 launch page shipped",
    status: "source-linked",
    evidence: "Source-linked",
    tone: "jade",
    what: "The first public ViseCraft launch surface and authenticated entry were created as an independent product.",
    why: "This gives investor conversations, user interviews and early access collection a single official product entry.",
    technical:
      "Next.js App Router, tokenized dark design system, Supabase Auth adapter, preview auth fallback and protected workspace route.",
    business:
      "ViseCraft can now be shown as its own SaaS product instead of being explained only through the VisePanda case study.",
    sources: ["Repository commit", "Product specification", "Auth callback route"],
  },
  {
    date: "Jul 12",
    time: "14:18 UTC",
    title: "Evidence model separated from product claims",
    status: "code-backed",
    evidence: "Code-backed",
    tone: "blue",
    what: "Product copy, demo events, evidence levels and view modes were separated into data modules.",
    why: "The design system can be reused without forcing a specific founder story or inflated business claim.",
    technical:
      "Marketing content is stored independently from UI components and can later be replaced by database-backed project data.",
    business:
      "This protects trust: ViseCraft presents evidence and founder edits without implying every claim has the same proof level.",
    sources: ["Content module", "Design tokens", "Evidence labels"],
  },
  {
    date: "Jul 09",
    time: "09:31 UTC",
    title: "VisePanda case study defined",
    status: "self-reported",
    evidence: "Self-reported",
    tone: "amber",
    what: "VisePanda was identified as the first real project story that inspired ViseCraft.",
    why: "The demo can explain the product through an actual founder workflow while keeping VisePanda independent.",
    technical:
      "The live case study links to vp.jtcao.space and is treated as demo content, not hard-coded platform logic.",
    business:
      "Prospects can see why ViseCraft exists without mistaking it for a travel product or a VisePanda feature.",
    sources: ["vp.jtcao.space", "Founder workflow", "Demo project notes"],
  },
];

export const viewModes = {
  Founder: [
    "Detailed progress",
    "Blockers",
    "Internal roadmap",
    "Evidence gaps",
    "Risks",
  ],
  Investor: [
    "Executive summary",
    "Key milestones",
    "Commercial meaning",
    "Current traction",
    "Risks",
    "Ask",
  ],
  Public: [
    "Product story",
    "Changelog",
    "Public roadmap",
    "Build in public updates",
  ],
};

export const useCases = [
  {
    title: "Early-stage founders",
    body: "Keep fundraising, advisory and partner updates close to real execution evidence.",
  },
  {
    title: "AI-native teams",
    body: "Explain fast model, agent and product iteration in language non-technical stakeholders can follow.",
  },
  {
    title: "Independent builders",
    body: "Build in public with a project record that is clearer than a scattered changelog.",
  },
  {
    title: "Non-technical founders",
    body: "Understand what the engineering team shipped, tested, blocked or changed.",
  },
  {
    title: "Accelerators and studios",
    body: "Future team plan for multiple portfolio projects and recurring founder updates.",
  },
];

export const pricingPlans = [
  {
    name: "Builder",
    body: "For independent builders and one serious project story.",
    status: "Coming soon",
  },
  {
    name: "Founder",
    body: "For startup teams preparing investor and partner updates.",
    status: "Join early access",
  },
  {
    name: "Studio",
    body: "For accelerators, venture studios and multi-project operators.",
    status: "Future team plan",
  },
];
