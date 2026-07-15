export type Locale = "en" | "zh";
export type ViewModeId = "founder" | "investor" | "public";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export const landingContent = {
  en: {
    navItems: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Use cases", href: "#use-cases" },
      { label: "Demo", href: "#demo" },
      { label: "Pricing", href: "#pricing" },
    ],
    actions: {
      signIn: "Sign in",
      getStarted: "Get started",
      viewDemo: "View live demo",
      createProject: "Create your project",
      alreadyHaveAccount: "Already have an account?",
      joinEarlyAccess: "Join early access",
    },
    hero: {
      title: "Turn real project progress into an investor-ready story.",
      subtitle:
        "ViseCraft connects your project activity, identifies meaningful progress and turns it into a living pitch page backed by real evidence.",
    },
    trust:
      "Built from a real founder workflow. First demonstrated through the live development history of VisePanda.",
    sourceStrip: [
      { label: "GitHub", status: "supported" },
      { label: "Releases", status: "supported" },
      { label: "Issues", status: "supported" },
      { label: "Pull requests", status: "supported" },
      { label: "Deployments", status: "coming soon" },
      { label: "Founder notes", status: "supported" },
    ],
    problems: [
      "Static pitch decks become outdated the moment product work continues.",
      "Investors cannot easily verify what actually changed in the product.",
      "GitHub activity is too technical for business readers to understand.",
      "Founders repeatedly rewrite weekly updates from scattered sources.",
      "Decisions, risks and failed experiments disappear across tools.",
    ],
    livingStoryRows: [
      ["Activity", "Collect repository and founder activity without forcing it into slide format."],
      ["Narrative", "Translate technical work into business meaning with human review."],
      ["Evidence", "Keep source links and evidence levels attached to every milestone."],
      ["Views", "Switch between founder, investor and public language from the same project base."],
    ],
    capabilities: [
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
    ],
    howItWorks: [
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
    ],
    timelineEvents: [
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
    ],
    viewModes: [
      {
        id: "founder" as ViewModeId,
        label: "Founder",
        items: ["Detailed progress", "Blockers", "Internal roadmap", "Evidence gaps", "Risks"],
      },
      {
        id: "investor" as ViewModeId,
        label: "Investor",
        items: ["Executive summary", "Key milestones", "Commercial meaning", "Current traction", "Risks", "Ask"],
      },
      {
        id: "public" as ViewModeId,
        label: "Public",
        items: ["Product story", "Changelog", "Public roadmap", "Build in public updates"],
      },
    ],
    useCases: [
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
    ],
    pricingPlans: [
      { name: "Builder", body: "For independent builders and one serious project story.", status: "Coming soon" },
      { name: "Founder", body: "For startup teams preparing investor and partner updates.", status: "Join early access" },
      { name: "Studio", body: "For accelerators, venture studios and multi-project operators.", status: "Future team plan" },
    ],
    sections: {
      problem: ["Problem", "Static decks cannot keep up with real execution.", "Static deck", "Living project story"],
      product: ["Product", "Progress infrastructure, narrative engine, presentation layer."],
      how: ["How it works", "From source activity to a living project story."],
      demo: ["Live demo", "VisePanda is the first real case study, not the ViseCraft product."],
      useCases: ["Use cases", "Built for teams that need trustable progress, not prettier slides."],
      privacy: ["Privacy and evidence", "Private by default. Evidence-aware by design."],
      pricing: ["Pricing preview", "Early access first. Commercial plans later."],
    },
    demo: {
      title: "VisePanda - Live case study",
      body: "VisePanda is an independent AI travel software project. Its interactive project page became the original inspiration for ViseCraft.",
      cta: "Explore the live VisePanda story",
      rows: ["Timeline", "Version history", "Development challenge", "Roadmap", "Investor view"],
    },
    privacyCards: [
      ["Visibility control", "Projects are not public by default. Founders choose public, unlisted or protected sharing."],
      ["Least-privilege GitHub", "Repository connection is separate from login and starts with metadata, not full source publishing."],
      ["Human-confirmed AI", "Generated narratives require user review before they become accepted project events."],
    ],
    finalCta: {
      title: "Your project is already telling a story. ViseCraft helps you make it visible.",
    },
    consoleLabels: {
      version: "Version",
      phase: "Phase",
      lastVerified: "Last verified",
      timeline: "Project timeline",
      selected: "Selected event",
      what: "What happened",
      why: "Why it matters",
      technical: "Technical summary",
      business: "Business meaning",
      sources: "Source links",
      viewAs: "View as",
      raw: "Raw project activity",
      translated: "translated without exaggeration",
      narrative: "Investor-ready narrative",
    },
    comparisons: {
      raw: ["Commits", "Issues", "Releases", "Founder notes"],
      narrative: ["Business meaning", "Evidence level", "Audience view", "Weekly update"],
    },
    footer: ["Product", "Demo", "Privacy", "Terms", "Contact", "Sign in"],
  },
  zh: {
    navItems: [
      { label: "产品", href: "#product" },
      { label: "工作流", href: "#how-it-works" },
      { label: "使用场景", href: "#use-cases" },
      { label: "案例", href: "#demo" },
      { label: "价格", href: "#pricing" },
    ],
    actions: {
      signIn: "登录",
      getStarted: "开始使用",
      viewDemo: "查看真实案例",
      createProject: "创建项目",
      alreadyHaveAccount: "已有账号？",
      joinEarlyAccess: "申请早期访问",
    },
    hero: {
      title: "把真实项目进展，转化为投资人看得懂的项目故事。",
      subtitle:
        "ViseCraft 连接项目活动，识别真正有意义的进展，并生成带证据的动态 BP、项目时间轴和投资人更新。",
    },
    trust: "源自真实创始人工作流。VisePanda 的动态项目展示，是 ViseCraft 的第一个真实案例。",
    sourceStrip: [
      { label: "GitHub", status: "已支持" },
      { label: "版本发布", status: "已支持" },
      { label: "Issues", status: "已支持" },
      { label: "Pull requests", status: "已支持" },
      { label: "部署记录", status: "即将支持" },
      { label: "创始人笔记", status: "已支持" },
    ],
    problems: [
      "静态 BP 很快过期，项目一继续推进就需要重写。",
      "投资人很难判断产品到底发生了什么真实变化。",
      "GitHub 活动对非技术读者来说太难理解。",
      "创始人反复从零整理周报、路演材料和进展说明。",
      "关键决策、风险和失败实验分散在不同工具里。",
    ],
    livingStoryRows: [
      ["活动", "收集仓库活动和创始人笔记，不强行塞进幻灯片格式。"],
      ["叙事", "把技术工作翻译成商业进展，并保留人工确认。"],
      ["证据", "每个里程碑都保留来源链接和证据等级。"],
      ["视图", "同一套项目数据可切换创始人、投资人和公开视角。"],
    ],
    capabilities: [
      {
        title: "动态 BP 页面",
        body: "把静态 BP 转化成结构化项目页面，持续呈现产品故事、进展、路线图、团队和融资需求。",
        points: ["产品故事", "市场与商业模式", "Roadmap", "融资需求"],
      },
      {
        title: "可追溯项目时间轴",
        body: "把重要项目事件组织成时间轴，并让每个关键结论都靠近真实来源。",
        points: ["Commits", "Pull requests", "Issues", "Releases"],
      },
      {
        title: "技术到商业的翻译",
        body: "把原始研发活动转换成投资人可读的项目成果，同时避免夸大事实。",
        points: ["影响摘要", "技术背景", "风险说明", "创始人编辑"],
      },
      {
        title: "投资人更新",
        body: "生成周报和月报，包括亮点、挑战、风险、下一步和创始人需要的支持。",
        points: ["周报", "月报", "风险", "下一步"],
      },
    ],
    howItWorks: [
      { step: "01", title: "创建项目", body: "填写公司、产品、市场、阶段、创始人信息和默认可见性。" },
      { step: "02", title: "连接数据源", body: "第一阶段从 GitHub 活动和创始人笔记开始，后续逐步支持更多工具。" },
      { step: "03", title: "审核有意义的进展", body: "接受、编辑、合并或隐藏系统生成的候选事件。" },
      { step: "04", title: "生成动态项目故事", body: "生成时间轴、里程碑、路线图、证据摘要和 BP 模块。" },
      { step: "05", title: "发布并分享", body: "通过公开、非公开或受保护链接分享给投资人、合作方或公众。" },
    ],
    timelineEvents: [
      {
        date: "7月15日",
        time: "10:42 UTC",
        title: "ViseCraft V1 启动页上线",
        status: "来源链接",
        evidence: "来源链接",
        tone: "jade",
        what: "ViseCraft 的第一个公开启动页和认证入口已作为独立产品创建。",
        why: "这让投资人沟通、用户访谈和早期访问收集都有一个正式入口。",
        technical: "Next.js App Router、暗色设计 token、Supabase Auth adapter、preview auth fallback 和受保护 workspace。",
        business: "ViseCraft 现在可以作为独立 SaaS 展示，而不是只能通过 VisePanda 案例解释。",
        sources: ["仓库提交", "产品规格", "Auth callback route"],
      },
      {
        date: "7月12日",
        time: "14:18 UTC",
        title: "证据模型与产品 claims 解耦",
        status: "代码支持",
        evidence: "代码支持",
        tone: "blue",
        what: "产品文案、Demo 事件、证据等级和视图模式被拆分到独立数据模块。",
        why: "设计系统可以被不同项目复用，而不会强迫某个创始人故事或夸大商业结论。",
        technical: "营销内容独立于 UI 组件，后续可以替换为数据库驱动的项目数据。",
        business: "这保护了信任：ViseCraft 展示证据和人工编辑，不暗示所有 claims 都具备同等证明力。",
        sources: ["内容模块", "设计 token", "证据标签"],
      },
      {
        date: "7月09日",
        time: "09:31 UTC",
        title: "VisePanda 案例被定义",
        status: "自述信息",
        evidence: "自述信息",
        tone: "amber",
        what: "VisePanda 被定义为启发 ViseCraft 的第一个真实项目故事。",
        why: "Demo 可以用真实创始人工作流解释产品，同时保持 VisePanda 的独立性。",
        technical: "真实案例链接到 vp.jtcao.space，并作为 Demo 内容处理，不写死进平台逻辑。",
        business: "访客可以理解 ViseCraft 的来源，而不会误以为它是旅游产品或 VisePanda 功能。",
        sources: ["vp.jtcao.space", "创始人工作流", "Demo 项目笔记"],
      },
    ],
    viewModes: [
      { id: "founder" as ViewModeId, label: "创始人", items: ["详细进展", "阻塞问题", "内部 Roadmap", "证据缺口", "风险"] },
      { id: "investor" as ViewModeId, label: "投资人", items: ["执行摘要", "关键里程碑", "商业意义", "当前进展", "风险", "融资需求"] },
      { id: "public" as ViewModeId, label: "公开", items: ["产品故事", "Changelog", "公开 Roadmap", "Build in public 更新"] },
    ],
    useCases: [
      { title: "早期创业者", body: "把融资、顾问沟通和合作方更新与真实执行证据连接起来。" },
      { title: "AI Native 团队", body: "把快速模型迭代、Agent 协作和产品变化讲给非技术利益相关方听。" },
      { title: "独立开发者", body: "用比零散 changelog 更清晰的方式 build in public。" },
      { title: "非技术创始人", body: "理解技术团队到底完成、测试、阻塞或调整了什么。" },
      { title: "加速器与工作室", body: "未来面向多项目组合和周期性 founder updates 的团队方案。" },
    ],
    pricingPlans: [
      { name: "Builder", body: "适合独立开发者和一个认真维护的项目故事。", status: "即将开放" },
      { name: "Founder", body: "适合准备投资人和合作方更新的创业团队。", status: "申请早期访问" },
      { name: "Studio", body: "适合加速器、venture studio 和多项目运营者。", status: "未来团队方案" },
    ],
    sections: {
      problem: ["问题", "静态 BP 跟不上真实执行。", "静态 BP", "动态项目故事"],
      product: ["产品", "进展基础设施、叙事引擎和展示层。"],
      how: ["工作流", "从项目活动到动态项目故事。"],
      demo: ["真实案例", "VisePanda 是第一个真实案例，不是 ViseCraft 产品本身。"],
      useCases: ["使用场景", "为需要可信进展展示的团队而生，不只是让幻灯片更漂亮。"],
      privacy: ["隐私与证据", "默认私有，证据优先。"],
      pricing: ["价格预览", "先开放早期访问，商业计划后续发布。"],
    },
    demo: {
      title: "VisePanda - 真实案例",
      body: "VisePanda 是一个独立的入境游 AI 软件项目。它的交互式项目页面，是 ViseCraft 的最初灵感来源。",
      cta: "查看 VisePanda 真实项目故事",
      rows: ["时间轴", "版本历史", "开发挑战", "Roadmap", "投资人视图"],
    },
    privacyCards: [
      ["可见性控制", "项目默认不会公开。创始人可以选择公开、非公开或受保护分享。"],
      ["最小 GitHub 权限", "仓库连接独立于登录流程，第一阶段从 metadata 开始，不默认公开完整源码。"],
      ["AI 需人工确认", "AI 生成内容在成为正式项目事件前，需要用户审核。"],
    ],
    finalCta: {
      title: "你的项目已经在讲述一个故事。ViseCraft 帮你把它变得可见、可读、可验证。",
    },
    consoleLabels: {
      version: "版本",
      phase: "阶段",
      lastVerified: "最后确认",
      timeline: "项目时间轴",
      selected: "选中事件",
      what: "发生了什么",
      why: "为什么重要",
      technical: "技术摘要",
      business: "商业意义",
      sources: "来源链接",
      viewAs: "视图",
      raw: "原始项目活动",
      translated: "不夸大地翻译",
      narrative: "投资人可读叙事",
    },
    comparisons: {
      raw: ["Commits", "Issues", "Releases", "创始人笔记"],
      narrative: ["商业意义", "证据等级", "受众视图", "周报"],
    },
    footer: ["产品", "案例", "隐私", "条款", "联系", "登录"],
  },
};
