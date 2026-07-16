export type Locale = "en" | "zh";
export type ViewModeId = "founder" | "investor" | "public";
export type SignalTone = "jade" | "blue" | "amber" | "rose" | "neutral";

export const productVersion = "1.0.11";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export interface LandingCopy {
  navItems: Array<{ label: string; href: string }>;
  actions: {
    signIn: string;
    getStarted: string;
    viewDemo: string;
    comparePlans: string;
    startFree: string;
    joinPro: string;
    alreadyHaveAccount: string;
  };
  a11y: {
    primaryNavigation: string;
    toggleNavigation: string;
    footerNavigation: string;
  };
  hero: {
    title: string;
    subtitle: string;
    proof: string;
    facts: Array<[string, string]>;
  };
  interfaceLabels: {
    workspace: string;
    project: string;
    projectName: string;
    proofEngine: string;
    timeline: string;
    bpStudio: string;
    publish: string;
    claims: string;
    selectedClaim: string;
    verdict: string;
    evidence: string;
    freshness: string;
    supportingEvidence: string;
    limitations: string;
    checkedBy: string;
    openReport: string;
    currentVersion: string;
    proofEngineVersion: string;
    sourceLinked: string;
    founderReviewed: string;
  };
  heroClaims: Array<{
    title: string;
    source: string;
    verdict: string;
    freshness: string;
    evidenceCount: string;
    summary: string;
    limitations: string;
    tone: SignalTone;
  }>;
  proofEngine: {
    title: string;
    body: string;
    steps: Array<{ number: string; title: string; body: string }>;
    report: {
      claimLabel: string;
      claim: string;
      verdict: string;
      confidence: string;
      evidence: Array<[string, string]>;
      limitationLabel: string;
      limitation: string;
      freshnessLabel: string;
      freshness: string;
      checkedBy: string;
      disclaimer: string;
    };
  };
  scenarios: {
    title: string;
    body: string;
    items: Array<{
      id: string;
      label: string;
      title: string;
      body: string;
      capabilities: Array<{ title: string; body: string; signal: string }>;
    }>;
  };
  bpStudio: {
    title: string;
    body: string;
    modules: Array<{ key: string; title: string; body: string; output: string }>;
    views: Array<{ id: ViewModeId; title: string; body: string }>;
    labels: {
      document: string;
      module: string;
      narrative: string;
      evidence: string;
      audienceViews: string;
    };
  };
  integrations: {
    title: string;
    body: string;
    focusLabel: string;
    roadmapLabel: string;
    current: Array<{ name: string; status: string; body: string }>;
    planned: Array<{ name: string; status: string }>;
    flow: Array<string>;
  };
  workflow: {
    title: string;
    steps: Array<{ number: string; title: string; body: string }>;
  };
  releaseHistory: {
    title: string;
    body: string;
    currentLabel: string;
    labels: {
      delivered: string;
      productImpact: string;
      evidence: string;
    };
    items: Array<{
      version: string;
      date: string;
      title: string;
      delivered: string;
      productImpact: string;
      evidence: string;
      evidenceStatus: "Code-backed" | "Source-linked";
      sourceHref?: string;
    }>;
  };
  plans: {
    title: string;
    body: string;
    pending: string;
    included: string;
    items: Array<{
      name: string;
      badge: string;
      price: string;
      description: string;
      features: string[];
      cta: string;
      href: string;
      featured: boolean;
    }>;
  };
  caseStudy: {
    title: string;
    body: string;
    project: string;
    status: string;
    rows: Array<[string, string]>;
    cta: string;
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  finalCta: {
    title: string;
    body: string;
  };
  footer: string[];
  footerCopyright: string;
}

export const landingContent: Record<Locale, LandingCopy> = {
  en: {
    navItems: [
      { label: "Product", href: "#proof-engine" },
      { label: "Use cases", href: "#use-cases" },
      { label: "BP Studio", href: "#bp-studio" },
      { label: "Integrations", href: "#integrations" },
      { label: "Releases", href: "#releases" },
    ],
    actions: {
      signIn: "Sign in",
      getStarted: "Create your project",
      viewDemo: "View live demo",
      comparePlans: "Compare plans",
      startFree: "Start free",
      joinPro: "Join Pro early access",
      alreadyHaveAccount: "Already have an account?",
    },
    a11y: {
      primaryNavigation: "Primary navigation",
      toggleNavigation: "Toggle navigation",
      footerNavigation: "Footer navigation",
    },
    hero: {
      title: "Turn every project in motion into a verifiable, living business story.",
      subtitle:
        "ViseCraft turns real product and engineering progress into interactive living BPs, investor updates and project websites — with claim-level evidence checks built in.",
      proof: "Evidence-backed by ViseCraft Proof Engine",
      facts: [
        ["Verification", "Claim-level"],
        ["Narrative", "Continuously updated"],
        ["Publishing", "Living project site"],
      ],
    },
    interfaceLabels: {
      workspace: "Founder workspace",
      project: "ViseCraft",
      projectName: "ViseCraft",
      proofEngine: "Proof Engine",
      timeline: "Timeline",
      bpStudio: "BP Studio",
      publish: "Publish",
      claims: "Claims under review",
      selectedClaim: "Verification report",
      verdict: "Verdict",
      evidence: "Evidence",
      freshness: "Freshness",
      supportingEvidence: "Supporting evidence",
      limitations: "Limitations",
      checkedBy: "Checked by",
      openReport: "Open full report",
      currentVersion: "Current version",
      proofEngineVersion: "Proof Engine v0.x",
      sourceLinked: "Source-linked",
      founderReviewed: "Founder reviewed",
    },
    heroClaims: [
      {
        title: "The ViseCraft launch surface is implemented.",
        source: "Repository commit",
        verdict: "Code-backed",
        freshness: "Historical",
        evidenceCount: "3 sources",
        summary: "Repository records support that the independent product surface was implemented.",
        limitations: "Code confirms implementation. It does not establish active user adoption.",
        tone: "jade",
      },
      {
        title: "The published product version is v1.0.11.",
        source: "Package metadata",
        verdict: "Source-linked",
        freshness: "Current",
        evidenceCount: "2 sources",
        summary: "The displayed version matches the repository package metadata and product timeline.",
        limitations: "Version alignment does not prove that every planned M1 workflow is complete.",
        tone: "blue",
      },
      {
        title: "Repository activity proves commercial traction.",
        source: "GitHub activity",
        verdict: "Insufficient evidence",
        freshness: "Current",
        evidenceCount: "1 source",
        summary: "Development activity can support execution claims, but not customer or revenue claims.",
        limitations: "Usage, customer and revenue evidence would be required for commercial traction.",
        tone: "amber",
      },
    ],
    proofEngine: {
      title: "Verify the claim, not the company.",
      body:
        "Proof Engine separates each important statement, checks connected evidence and returns a scoped verdict with freshness and limitations.",
      steps: [
        { number: "01", title: "Extract the claim", body: "Break broad BP language into specific, testable statements." },
        { number: "02", title: "Inspect the evidence", body: "Check source identity, status, time alignment, integrity and availability." },
        { number: "03", title: "Issue a scoped verdict", body: "Show what the evidence supports, what it does not and when to recheck." },
      ],
      report: {
        claimLabel: "Claim",
        claim: "The current product version has been deployed.",
        verdict: "Partially supported",
        confidence: "Medium confidence",
        evidence: [
          ["Release record", "Version exists"],
          ["Deployment record", "Production target"],
          ["Commit correlation", "Needs confirmation"],
        ],
        limitationLabel: "What this does not prove",
        limitation: "The available evidence does not confirm active usage, customer adoption or revenue.",
        freshnessLabel: "Freshness",
        freshness: "Recheck required within 24 hours",
        checkedBy: "ViseCraft Proof Engine v0.x",
        disclaimer:
          "Verification evaluates whether connected evidence supports a specific claim. It is not an audit, certification or investment recommendation.",
      },
    },
    scenarios: {
      title: "One project record. Different jobs to be done.",
      body: "Capabilities are grouped around the moment a founder needs them, not around a list of disconnected features.",
      items: [
        {
          id: "fundraise",
          label: "Raise with evidence",
          title: "Make investor conversations easier to trust and faster to understand.",
          body: "Turn current execution into a formal commercial BP, then keep material claims connected to their source context.",
          capabilities: [
            { title: "Formal BP Studio", body: "Structure the company, market, product, traction, risks and ask in one narrative.", signal: "Narrative" },
            { title: "Investor View", body: "Prioritize milestones, business meaning, evidence gaps, risks and next steps.", signal: "Audience" },
            { title: "Claim reports", body: "Let a reader inspect verdict, supporting evidence, freshness and limitations.", signal: "Proof" },
          ],
        },
        {
          id: "report",
          label: "Report without rewriting",
          title: "Turn ongoing work into updates without rebuilding the story every week.",
          body: "Collect meaningful activity, translate technical progress into business language and keep the founder in control.",
          capabilities: [
            { title: "Activity review", body: "Accept, edit, merge or ignore candidate events before they enter the record.", signal: "Review" },
            { title: "Living timeline", body: "Preserve versions, decisions, risks, releases and evidence in chronological context.", signal: "History" },
            { title: "Recurring updates", body: "Compose highlights, challenges, decisions, next steps and asks from accepted progress.", signal: "Update" },
          ],
        },
        {
          id: "publish",
          label: "Publish the living story",
          title: "Give every audience one current link instead of another static file.",
          body: "Choose a project name, preview the right audience view and publish the living BP as a project website.",
          capabilities: [
            { title: "Managed project URL", body: "Publish to a memorable project subdomain during early access.", signal: "Deploy" },
            { title: "Audience modes", body: "Use founder, investor and public views from the same project record.", signal: "Views" },
            { title: "Visibility controls", body: "Keep projects private by default, then choose public, unlisted or protected sharing.", signal: "Access" },
          ],
        },
      ],
    },
    bpStudio: {
      title: "Build a commercial BP that can keep up with the company.",
      body: "A structured editorial system for the full investor narrative — connected to timelines, evidence and audience views.",
      modules: [
        { key: "01", title: "Executive summary", body: "Company thesis, stage, current status and ask.", output: "A concise entry point for the whole story." },
        { key: "02", title: "Problem and solution", body: "Market pain, target user, product answer and why now.", output: "A clear problem-to-product argument." },
        { key: "03", title: "Product and architecture", body: "Workflow, technical approach, moat, integrations and releases.", output: "A product narrative grounded in execution." },
        { key: "04", title: "Market and business model", body: "Market framing, monetization logic, pricing and go-to-market path.", output: "A commercial model readers can inspect." },
        { key: "05", title: "Traction and milestones", body: "Progress, launches, evidence-backed timeline and current gaps.", output: "Milestones with evidence boundaries." },
        { key: "06", title: "Team, risks and ask", body: "Founder context, execution risks, next milestones and use of funds.", output: "A direct close with risks kept visible." },
      ],
      views: [
        { id: "founder", title: "Founder", body: "Full progress, blockers, risks and evidence gaps." },
        { id: "investor", title: "Investor", body: "Milestones, business meaning, traction, risks and ask." },
        { id: "public", title: "Public", body: "Project story, changelog, roadmap and public evidence." },
      ],
      labels: {
        document: "Living BP / Draft",
        module: "Selected module",
        narrative: "Narrative output",
        evidence: "Evidence-aware",
        audienceViews: "Audience views",
      },
    },
    integrations: {
      title: "Connect the sources where progress already happens.",
      body: "ViseCraft starts with repository activity and founder input, then expands into the product, deployment and business stack.",
      focusLabel: "MVP focus",
      roadmapLabel: "Integration roadmap",
      current: [
        { name: "GitHub", status: "MVP focus", body: "Repository metadata, commits, pull requests, issues, releases, tags and contributors." },
        { name: "Founder notes", status: "MVP focus", body: "Add decisions, risks, business events and context that do not exist in code." },
      ],
      planned: [
        { name: "Vercel", status: "Planned" },
        { name: "Linear", status: "Planned" },
        { name: "Notion", status: "Planned" },
        { name: "Figma", status: "Planned" },
        { name: "Supabase", status: "Planned" },
        { name: "Stripe", status: "Planned" },
      ],
      flow: ["Connect", "Collect", "Review", "Verify", "Publish"],
    },
    workflow: {
      title: "From raw activity to a living project website.",
      steps: [
        { number: "01", title: "Create", body: "Add the company, product, market and visibility defaults." },
        { number: "02", title: "Connect", body: "Bring repository activity and founder context into one project stream." },
        { number: "03", title: "Review", body: "Promote only meaningful events into the timeline and BP." },
        { number: "04", title: "Verify", body: "Check important claims against evidence, freshness and contradictions." },
        { number: "05", title: "Publish", body: "Share one living site for investor, founder or public readers." },
      ],
    },
    releaseHistory: {
      title: "Seven releases. One product record anyone can inspect.",
      body: "Each report separates what shipped, why it matters and which repository evidence supports it. The sequence records completed work without turning activity into unsupported business claims.",
      currentLabel: "Current release",
      labels: {
        delivered: "What shipped",
        productImpact: "Product meaning",
        evidence: "Release evidence",
      },
      items: [
        {
          version: "1.0.5",
          date: "2026-07-16",
          title: "Engineering governance",
          delivered: "Added the pull-request quality gate, evidence-bounded changelog and synchronized project handoff records.",
          productImpact: "Every change now has a repeatable path from implementation to documented verification.",
          evidence: "CI workflow and repository documentation",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/76a3e76",
        },
        {
          version: "1.0.6",
          date: "2026-07-16",
          title: "Application boundaries",
          delivered: "Separated marketing, authenticated application and reserved public routes while keeping shared concerns explicit.",
          productImpact: "Public storytelling and private project workflows can evolve without sharing accidental route behavior.",
          evidence: "App Router restructuring",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/bec584f",
        },
        {
          version: "1.0.7",
          date: "2026-07-16",
          title: "Shared product states",
          delivered: "Introduced reusable loading, empty, error, notification, field and submission primitives.",
          productImpact: "Core workflows now communicate progress and failure through one consistent interaction language.",
          evidence: "Shared UI state primitives",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/f12edfc",
        },
        {
          version: "1.0.8",
          date: "2026-07-16",
          title: "Browser acceptance coverage",
          delivered: "Added Playwright coverage for public entry, preview authentication, workspace protection and Proof Engine reports.",
          productImpact: "The main investor-facing and authenticated paths are checked in a real browser before release.",
          evidence: "Chromium smoke suite",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/ccd12a3",
        },
        {
          version: "1.0.9",
          date: "2026-07-16",
          title: "Commercial product narrative",
          delivered: "Rebuilt the homepage around Proof Engine, scenario-led capabilities, BP Studio, integrations, plans and evidence-aware FAQs.",
          productImpact: "Visitors can understand verification, BP production and publishing as one connected SaaS workflow.",
          evidence: "Homepage workflow release",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/636adce",
        },
        {
          version: "1.0.10",
          date: "2026-07-17",
          title: "Apple interaction refinement",
          delivered: "Added immediate press feedback, functional floating materials, optical typography and a product-continuous auth layout.",
          productImpact: "The public site and application now feel like one focused, responsive product across desktop and mobile.",
          evidence: "Frontend design release",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/2787247",
        },
        {
          version: "1.0.11",
          date: "2026-07-17",
          title: "Versioned product reports",
          delivered: "Published a bilingual, evidence-linked report for every release from v1.0.5 through the current version.",
          productImpact: "ViseCraft now demonstrates its own living-project-story model through an inspectable product history.",
          evidence: "Current repository release",
          evidenceStatus: "Source-linked",
        },
      ],
    },
    plans: {
      title: "Start with one project. Upgrade when the reporting load grows.",
      body: "The M1 plan structure is defined; paid pricing will be published when billing opens.",
      pending: "Early access · pricing pending",
      included: "Included",
      items: [
        {
          name: "Free",
          badge: "For one live project",
          price: "$0",
          description: "Build and publish the first evidence-aware project story.",
          features: ["1 project", "Manual verification", "Living BP page", "ViseCraft mark on published pages"],
          cta: "Start free",
          href: "/signup",
          featured: false,
        },
        {
          name: "Pro",
          badge: "For repeat reporting",
          price: "Pricing at launch",
          description: "Operate multiple project stories with more verification capacity.",
          features: ["Up to 10 projects", "Higher verification frequency", "Remove ViseCraft mark", "Custom domain planned"],
          cta: "Join Pro early access",
          href: "/signup",
          featured: true,
        },
      ],
    },
    caseStudy: {
      title: "Inspect the product through a live project story.",
      body: "The VisePanda page shows the interactive timeline, roadmap, version history and evidence-led editorial language in a public website format.",
      project: "VisePanda",
      status: "Live project story",
      rows: [
        ["Timeline", "Versioned project events"],
        ["Evidence", "Source context and evidence levels"],
        ["Roadmap", "Current and next-stage work"],
        ["Audience", "Investor-readable project narrative"],
      ],
      cta: "Open live demo",
    },
    faq: {
      title: "Questions before you publish.",
      items: [
        { question: "What does Proof Engine actually verify?", answer: "It evaluates whether connected evidence supports a specific claim. It does not verify an entire company, guarantee performance or make an investment recommendation." },
        { question: "Does code prove that a product is live or used?", answer: "No. Code can support implementation. Deployment needs deployment evidence; usage needs usage evidence; revenue needs separate financial evidence." },
        { question: "Will private repository evidence become public?", answer: "No. Projects and evidence remain private by default. A public page only exposes the result and evidence summary the project owner explicitly authorizes." },
        { question: "How does publishing work during early access?", answer: "Choose a project name, prepare the audience view and publish to a managed project URL. Domain binding is currently completed as part of the early-access publishing workflow." },
        { question: "Can I use a custom domain?", answer: "Custom domains are planned for Pro. The first release focuses on reliable managed project URLs and controlled sharing." },
      ],
    },
    finalCta: {
      title: "Give real progress a story people can inspect.",
      body: "Create the project record once. Keep the narrative, evidence and published page moving together.",
    },
    footer: ["Product", "Live demo", "Privacy", "Terms", "Contact", "Sign in"],
    footerCopyright: "© 2026 ViseCraft",
  },
  zh: {
    navItems: [
      { label: "产品", href: "#proof-engine" },
      { label: "使用场景", href: "#use-cases" },
      { label: "BP Studio", href: "#bp-studio" },
      { label: "集成生态", href: "#integrations" },
      { label: "版本", href: "#releases" },
    ],
    actions: {
      signIn: "登录",
      getStarted: "创建项目",
      viewDemo: "查看真实案例",
      comparePlans: "对比方案",
      startFree: "免费开始",
      joinPro: "申请 Pro 早期访问",
      alreadyHaveAccount: "已有账号？",
    },
    a11y: {
      primaryNavigation: "主导航",
      toggleNavigation: "打开或关闭导航",
      footerNavigation: "页脚导航",
    },
    hero: {
      title: "让每一个真实推进的项目，都成为可验证、持续生长的商业叙事。",
      subtitle:
        "ViseCraft 将真实产品与研发进展转化为动态 BP、投资人汇报和项目网站，并用 Proof Engine 对关键声明进行逐条证据检查。",
      proof: "由 ViseCraft Proof Engine 提供证据支持",
      facts: [
        ["验证", "Claim 级"],
        ["叙事", "持续更新"],
        ["发布", "动态项目网站"],
      ],
    },
    interfaceLabels: {
      workspace: "创始人工作台",
      project: "ViseCraft",
      projectName: "ViseCraft",
      proofEngine: "Proof Engine",
      timeline: "时间轴",
      bpStudio: "BP Studio",
      publish: "发布",
      claims: "待检查声明",
      selectedClaim: "验证报告",
      verdict: "结论",
      evidence: "证据",
      freshness: "时效",
      supportingEvidence: "支持证据",
      limitations: "限制",
      checkedBy: "检查引擎",
      openReport: "打开完整报告",
      currentVersion: "当前版本",
      proofEngineVersion: "Proof Engine v0.x",
      sourceLinked: "来源链接",
      founderReviewed: "创始人已审核",
    },
    heroClaims: [
      {
        title: "ViseCraft 独立产品启动界面已经实现。",
        source: "仓库提交",
        verdict: "代码支持",
        freshness: "历史事实",
        evidenceCount: "3 条来源",
        summary: "仓库记录支持独立产品界面已经实现这一声明。",
        limitations: "代码可以证明实现，不能证明已有真实用户采用。",
        tone: "jade",
      },
      {
        title: "当前公开产品版本为 v1.0.11。",
        source: "Package metadata",
        verdict: "来源链接",
        freshness: "当前",
        evidenceCount: "2 条来源",
        summary: "页面版本与仓库 package metadata 和产品时间轴一致。",
        limitations: "版本一致不代表所有 M1 规划流程已经完成。",
        tone: "blue",
      },
      {
        title: "仓库活动可以证明商业进展。",
        source: "GitHub 活动",
        verdict: "证据不足",
        freshness: "当前",
        evidenceCount: "1 条来源",
        summary: "开发活动可以支持执行层声明，但不能单独支持客户或收入声明。",
        limitations: "商业进展需要用户、客户或收入等独立证据。",
        tone: "amber",
      },
    ],
    proofEngine: {
      title: "验证具体声明，而不是认证整个公司。",
      body: "Proof Engine 拆分每一条重要表述，检查已连接证据，并给出包含时效和限制的明确结论。",
      steps: [
        { number: "01", title: "提取声明", body: "把宽泛的 BP 表述拆解成具体、可检查的陈述。" },
        { number: "02", title: "检查证据", body: "检查来源身份、状态、时间对应、完整性和当前可用性。" },
        { number: "03", title: "给出有限结论", body: "明确证据支持什么、不支持什么，以及何时需要复查。" },
      ],
      report: {
        claimLabel: "声明",
        claim: "当前产品版本已经部署。",
        verdict: "部分支持",
        confidence: "中等置信度",
        evidence: [
          ["Release 记录", "版本存在"],
          ["Deployment 记录", "生产环境目标"],
          ["Commit 关联", "需要确认"],
        ],
        limitationLabel: "当前证据不能证明",
        limitation: "这些证据不能确认真实用户使用、客户采用或收入。",
        freshnessLabel: "时效",
        freshness: "需要在 24 小时内重新检查",
        checkedBy: "ViseCraft Proof Engine v0.x",
        disclaimer: "验证仅评估已连接证据是否支持具体声明，不构成审计、认证或投资建议。",
      },
    },
    scenarios: {
      title: "同一份项目记录，解决不同的关键任务。",
      body: "能力围绕创始人真正需要完成的场景组织，而不是堆叠互不相关的功能。",
      items: [
        {
          id: "fundraise",
          label: "用证据融资",
          title: "让投资人更快理解，也更容易判断信息边界。",
          body: "把当前执行转化为正式商业 BP，并让重要结论继续连接来源上下文。",
          capabilities: [
            { title: "正式 BP Studio", body: "把公司、市场、产品、进展、风险和融资需求组织为完整叙事。", signal: "叙事" },
            { title: "投资人视图", body: "集中呈现里程碑、商业意义、证据缺口、风险与下一步。", signal: "受众" },
            { title: "Claim 报告", body: "让读者查看结论、支持证据、时效和限制。", signal: "证据" },
          ],
        },
        {
          id: "report",
          label: "持续汇报",
          title: "不再每周从零重写项目故事。",
          body: "收集有意义的活动，把技术进展翻译为商业语言，同时保留创始人的最终控制。",
          capabilities: [
            { title: "活动审核", body: "候选事件进入正式记录前可以接受、编辑、合并或忽略。", signal: "审核" },
            { title: "动态时间轴", body: "按时间保留版本、决策、风险、发布和证据上下文。", signal: "档案" },
            { title: "周期更新", body: "从已接受进展整理亮点、挑战、决策、下一步和需要的支持。", signal: "更新" },
          ],
        },
        {
          id: "publish",
          label: "发布动态故事",
          title: "给每一种受众一个持续更新的链接。",
          body: "选择项目名称，预览对应受众视图，再把动态 BP 发布成项目网站。",
          capabilities: [
            { title: "托管项目地址", body: "早期访问阶段可发布到易于分享的项目子域名。", signal: "部署" },
            { title: "多受众视图", body: "同一份项目记录生成创始人、投资人和公开视图。", signal: "视图" },
            { title: "可见性控制", body: "项目默认私密，再选择公开、非公开或受保护分享。", signal: "权限" },
          ],
        },
      ],
    },
    bpStudio: {
      title: "制作一份能跟随公司持续生长的正式商业 BP。",
      body: "覆盖完整投资人叙事的结构化编辑系统，并与时间轴、证据和受众视图连接。",
      modules: [
        { key: "01", title: "执行摘要", body: "公司判断、阶段、当前状态和融资需求。", output: "为完整故事提供清晰入口。" },
        { key: "02", title: "问题与解决方案", body: "市场痛点、目标用户、产品答案与为什么是现在。", output: "建立明确的问题到产品逻辑。" },
        { key: "03", title: "产品与架构", body: "产品流程、技术方案、壁垒、集成与版本发布。", output: "让产品叙事建立在真实执行上。" },
        { key: "04", title: "市场与商业模式", body: "市场框架、变现逻辑、定价和 go-to-market 路径。", output: "让读者可以检查商业模型。" },
        { key: "05", title: "进展与里程碑", body: "进展、上线、证据时间轴和当前缺口。", output: "保留证据边界的里程碑。" },
        { key: "06", title: "团队、风险与融资需求", body: "创始人背景、执行风险、下一阶段与资金用途。", output: "不隐藏风险的直接收尾。" },
      ],
      views: [
        { id: "founder", title: "创始人", body: "完整进展、阻塞、风险和证据缺口。" },
        { id: "investor", title: "投资人", body: "里程碑、商业意义、进展、风险和融资需求。" },
        { id: "public", title: "公开", body: "项目故事、Changelog、Roadmap 和公开证据。" },
      ],
      labels: {
        document: "动态 BP / 草稿",
        module: "当前模块",
        narrative: "叙事输出",
        evidence: "证据感知",
        audienceViews: "受众视图",
      },
    },
    integrations: {
      title: "连接项目进展真实发生的地方。",
      body: "ViseCraft 从仓库活动和创始人输入开始，再扩展到产品、部署和商业工具链。",
      focusLabel: "MVP 重点",
      roadmapLabel: "集成路线图",
      current: [
        { name: "GitHub", status: "MVP 重点", body: "仓库 metadata、Commit、Pull request、Issue、Release、Tag 和贡献者。" },
        { name: "创始人笔记", status: "MVP 重点", body: "补充代码里不存在的决策、风险、商业事件和项目背景。" },
      ],
      planned: [
        { name: "Vercel", status: "规划中" },
        { name: "Linear", status: "规划中" },
        { name: "Notion", status: "规划中" },
        { name: "Figma", status: "规划中" },
        { name: "Supabase", status: "规划中" },
        { name: "Stripe", status: "规划中" },
      ],
      flow: ["连接", "收集", "审核", "验证", "发布"],
    },
    workflow: {
      title: "从原始活动到持续更新的项目网站。",
      steps: [
        { number: "01", title: "创建", body: "填写公司、产品、市场和默认可见性。" },
        { number: "02", title: "连接", body: "将仓库活动和创始人背景汇入同一项目流。" },
        { number: "03", title: "审核", body: "只把有意义的事件晋升到时间轴和 BP。" },
        { number: "04", title: "验证", body: "逐条检查重要声明的证据、时效和矛盾。" },
        { number: "05", title: "发布", body: "用一个动态网站服务投资人、创始人或公开读者。" },
      ],
    },
    releaseHistory: {
      title: "七次发布，一份任何人都能检查的产品记录。",
      body: "每份汇报都区分已经交付的内容、产品意义和支持它的仓库证据，不把开发活动夸大成未经支持的商业成果。",
      currentLabel: "当前版本",
      labels: {
        delivered: "本版交付",
        productImpact: "产品意义",
        evidence: "版本证据",
      },
      items: [
        {
          version: "1.0.5",
          date: "2026-07-16",
          title: "工程治理",
          delivered: "加入 Pull Request 质量门禁、证据有界的 Changelog 和同步的项目交接记录。",
          productImpact: "每次变更都有从实施到文档化验证的可重复路径。",
          evidence: "CI 工作流与仓库文档",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/76a3e76",
        },
        {
          version: "1.0.6",
          date: "2026-07-16",
          title: "应用边界",
          delivered: "拆分营销页、登录后应用和预留公开发布路由，并明确共享模块的责任。",
          productImpact: "公开项目故事与私有项目工作流可以独立演进，不再意外共享路由行为。",
          evidence: "App Router 结构调整",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/bec584f",
        },
        {
          version: "1.0.7",
          date: "2026-07-16",
          title: "统一产品状态",
          delivered: "建立可复用的加载、空状态、错误、通知、表单字段和提交组件。",
          productImpact: "核心流程用一致的交互语言表达进度、失败和下一步操作。",
          evidence: "共享 UI 状态组件",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/f12edfc",
        },
        {
          version: "1.0.8",
          date: "2026-07-16",
          title: "浏览器验收覆盖",
          delivered: "加入公开入口、预览登录、工作区保护和 Proof Engine 报告的 Playwright 测试。",
          productImpact: "面向投资人的公开路径与核心登录路径会在发布前经过真实浏览器检查。",
          evidence: "Chromium 冒烟测试",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/ccd12a3",
        },
        {
          version: "1.0.9",
          date: "2026-07-16",
          title: "商业化产品叙事",
          delivered: "围绕 Proof Engine、场景化能力、BP Studio、集成生态、方案和证据边界 FAQ 重建首页。",
          productImpact: "访客可以把验证、商业 BP 制作和动态发布理解为同一条 SaaS 工作流。",
          evidence: "首页工作流版本",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/636adce",
        },
        {
          version: "1.0.10",
          date: "2026-07-17",
          title: "Apple 交互优化",
          delivered: "加入即时按压反馈、功能性浮动材质、光学排版和延续产品界面的登录布局。",
          productImpact: "官网和应用在桌面及移动端形成统一、聚焦且响应及时的产品体验。",
          evidence: "前端设计版本",
          evidenceStatus: "Code-backed",
          sourceHref: "https://github.com/JTCAO515/visecraft/commit/2787247",
        },
        {
          version: "1.0.11",
          date: "2026-07-17",
          title: "版本化产品汇报",
          delivered: "发布从 v1.0.5 到当前版本的双语、证据可追溯产品汇报。",
          productImpact: "ViseCraft 开始用自己的可检查产品历史，展示动态项目故事能力。",
          evidence: "当前仓库版本",
          evidenceStatus: "Source-linked",
        },
      ],
    },
    plans: {
      title: "从一个项目开始，随着汇报负担增加再升级。",
      body: "M1 方案结构已经确定；付费价格将在计费开放时公布。",
      pending: "早期访问 · 价格待公布",
      included: "包含",
      items: [
        {
          name: "Free",
          badge: "适合第一个项目",
          price: "¥0",
          description: "建立并发布第一份有证据边界的项目故事。",
          features: ["1 个项目", "手动验证", "动态 BP 页面", "发布页保留 ViseCraft 标识"],
          cta: "免费开始",
          href: "/signup",
          featured: false,
        },
        {
          name: "Pro",
          badge: "适合持续汇报",
          price: "上线时公布",
          description: "管理多份项目故事，并获得更高验证容量。",
          features: ["最多 10 个项目", "更高验证频率", "移除 ViseCraft 标识", "自定义域名规划中"],
          cta: "申请 Pro 早期访问",
          href: "/signup",
          featured: true,
        },
      ],
    },
    caseStudy: {
      title: "通过真实项目故事判断产品能力。",
      body: "VisePanda 页面以公开网站形式展示动态时间轴、Roadmap、版本历史和证据优先的编辑语言。",
      project: "VisePanda",
      status: "动态项目故事",
      rows: [
        ["时间轴", "带版本的项目事件"],
        ["证据", "来源上下文与证据等级"],
        ["Roadmap", "当前工作与下一阶段"],
        ["受众", "投资人可读的项目叙事"],
      ],
      cta: "打开真实案例",
    },
    faq: {
      title: "发布之前，先把边界说清楚。",
      items: [
        { question: "Proof Engine 到底验证什么？", answer: "它评估已连接证据是否支持某一条具体声明，不验证整个公司，不保证经营表现，也不提供投资建议。" },
        { question: "代码能证明产品已经上线或有人使用吗？", answer: "不能。代码可以支持“已经实现”；上线需要部署证据；使用需要 Usage 证据；收入还需要独立财务证据。" },
        { question: "私有仓库证据会自动公开吗？", answer: "不会。项目和证据默认私密。公开页面只展示项目所有者明确授权的验证结果和证据摘要。" },
        { question: "早期访问阶段如何发布？", answer: "选择项目名称、准备受众视图，再发布到托管项目地址。域名绑定目前作为早期访问发布流程的一部分完成。" },
        { question: "可以使用自己的域名吗？", answer: "Pro 方案规划支持自定义域名。第一版优先确保托管项目地址和受控分享可靠运行。" },
      ],
    },
    finalCta: {
      title: "让真实进展，成为一份可以被检查的故事。",
      body: "只建立一次项目记录，让叙事、证据和发布页面始终一起更新。",
    },
    footer: ["产品", "真实案例", "隐私", "条款", "联系", "登录"],
    footerCopyright: "© 2026 ViseCraft",
  },
};
