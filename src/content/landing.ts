export type Locale = "en" | "zh";
export type ViewModeId = "founder" | "investor" | "public";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export const landingContent = {
  en: {
    navItems: [
      { label: "Proof Engine", href: "#proof-engine" },
      { label: "BP Builder", href: "#bp-builder" },
      { label: "Publish", href: "#publish" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Use cases", href: "#use-cases" },
      { label: "Demo", href: "#demo" },
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
      title: "Proof-backed startup reporting, published as a living website.",
      subtitle:
        "Claim-level verification, formal BP creation and publishable investor reports in one workflow.",
    },
    trust:
      "Proof Engine first. Commercial BP second. Published website third.",
    proofEngine: {
      label: "Core product",
      title: "ViseCraft Proof Engine is the verification layer behind every living BP.",
      body:
        "Claim-level checks for evidence, freshness, limitations and contradictions.",
      rows: [
        ["Claim-level", "Each major BP, timeline and update statement becomes a specific claim with its own result."],
        ["Evidence-backed", "GitHub, releases, issues, deployment records, URLs and founder notes keep source context attached."],
        ["Freshness-aware", "Current claims expire. A live URL, active project or current version must be rechecked."],
        ["Non-misleading", "The system explains limitations instead of certifying the whole company or implying investment quality."],
      ],
      profile: [
        ["Product evidence", "Code-backed"],
        ["Deployment evidence", "Source-linked"],
        ["Usage evidence", "Not provided"],
        ["Freshness", "Current"],
        ["Contradictions", "None detected"],
      ],
    },
    publish: {
      label: "One-click publishing direction",
      title: "Create a name, publish a BP/report, and get a website people can visit.",
      body:
        "Choose a project name. Generate the BP/report. Publish it as a website such as project-name.jtcao.space.",
      current:
        "Current stage: Vercel deployment + Spaceship DNS are operator-assisted.",
      steps: [
        ["Name", "Choose a project slug, for example atlas-ai."],
        ["Generate", "Build the living BP, timeline, evidence summaries and audience views."],
        ["Deploy", "Publish as atlas-ai.jtcao.space or another configured domain."],
        ["Share", "Send the link to investors, partners, advisors or the public."],
      ],
    },
    bpBuilder: {
      label: "Commercial BP capability",
      title: "Build a formal investor-ready BP, not just a project log.",
      body:
        "A polished commercial BP structure with evidence-aware claims.",
      modules: [
        ["Executive summary", "A crisp company narrative, stage, product thesis, current status and ask."],
        ["Problem and solution", "Market pain, product answer, target user and why now."],
        ["Product and architecture", "Product workflow, technical moat, integrations, roadmap and release history."],
        ["Market and business model", "Market framing, monetization logic, pricing hypothesis and go-to-market path."],
        ["Traction and milestones", "Progress, demos, launches, evidence-backed timeline and current gaps."],
        ["Team, risks and ask", "Founder context, execution risks, next milestones, funding needs and use of funds."],
      ],
      outputs: [
        "Investor View",
        "Founder View",
        "Public View",
        "Weekly Update",
        "Living BP Website",
      ],
    },
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
        title: "Proof Engine",
        body: "Check each important claim against source evidence, freshness rules and limitations before it appears as trusted progress.",
        points: ["Claim extraction", "Evidence matching", "Freshness", "Contradictions"],
      },
      {
        title: "Published BP Websites",
        body: "Turn a dynamic BP or investor report into a deployable website with a memorable project subdomain.",
        points: ["Living BP", "Investor report", "Public page", "Share link"],
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
      { step: "04", title: "Verify the claims", body: "Proof Engine checks evidence, freshness and limitations at claim level before the report is trusted." },
      {
        step: "05",
        title: "Publish and share",
        body: "Deploy the BP/report as a website, currently operator-assisted through Vercel plus Spaceship DNS for jtcao.space subdomains.",
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
      proof: ["Proof Engine", "The main product is verification, not decoration."],
      bpBuilder: ["BP Builder", "Formal commercial BP structure, backed by claim-level evidence."],
      publish: ["Publish", "A dynamic BP should become a real website, not another file attachment."],
      product: ["Product system", "Proof Engine, Narrative Engine and one-click publishing."],
      how: ["How it works", "From source activity to a living project story."],
      demo: ["Live demo", "VisePanda live interactive BP."],
      useCases: ["Use cases", "Built for teams that need trustable progress, not prettier slides."],
      privacy: ["Privacy and evidence", "Private by default. Evidence-aware by design."],
      pricing: ["Pricing preview", "Early access first. Commercial plans later."],
    },
    demo: {
      title: "VisePanda - Live case study",
      body: "A live interactive BP with timeline, roadmap, version history and project evidence.",
      cta: "Explore the live VisePanda story",
      rows: ["Timeline", "Version history", "Development challenge", "Roadmap", "Investor view"],
    },
    privacyCards: [
      ["Visibility control", "Projects are not public by default. Founders choose public, unlisted or protected sharing."],
      ["Least-privilege GitHub", "Repository connection is separate from login and starts with metadata, not full source publishing."],
      ["Human-confirmed AI", "Generated narratives require user review before they become accepted project events."],
    ],
    finalCta: {
      title: "Give your project a name. Turn its evidence-backed story into a website.",
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
      { label: "Proof Engine", href: "#proof-engine" },
      { label: "BP 制作", href: "#bp-builder" },
      { label: "发布网站", href: "#publish" },
      { label: "工作流", href: "#how-it-works" },
      { label: "使用场景", href: "#use-cases" },
      { label: "案例", href: "#demo" },
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
      title: "带证据验证的创业汇报，一键发布成动态网站。",
      subtitle:
        "Claim 级验证、正式商业 BP 制作、可发布投资人汇报，在一个工作流里完成。",
    },
    trust: "第一核心：Proof Engine。第二核心：正式商业 BP。第三核心：发布成网站。",
    proofEngine: {
      label: "核心产品",
      title: "ViseCraft Proof Engine 是每份动态 BP 背后的验证层。",
      body:
        "对关键声明逐条检查证据、时效、限制和矛盾。",
      rows: [
        ["Claim 级验证", "每条重要 BP、时间轴和周报表述都有独立验证结果。"],
        ["证据支持", "GitHub、版本发布、Issue、部署记录、URL 和创始人笔记都保留来源上下文。"],
        ["时效检查", "当前在线、项目活跃、当前版本等声明必须定期重新检查。"],
        ["不误导", "系统解释限制，不认证整个公司，也不暗示投资价值。"],
      ],
      profile: [
        ["产品证据", "代码支持"],
        ["部署证据", "来源链接"],
        ["用户使用证据", "未提供"],
        ["时效", "当前"],
        ["矛盾", "未发现"],
      ],
    },
    publish: {
      label: "一键发布方向",
      title: "取一个名字，生成 BP/汇报，并变成所有人能看的项目网站。",
      body:
        "选择项目名称，生成 BP/汇报，并发布为 project-name.jtcao.space 这类网站。",
      current:
        "当前阶段：Vercel 部署 + Spaceship DNS 由 operator 辅助手动完成。",
      steps: [
        ["命名", "选择项目 slug，例如 atlas-ai。"],
        ["生成", "生成动态 BP、时间轴、证据摘要和多受众视图。"],
        ["部署", "发布成 atlas-ai.jtcao.space 或其他已配置域名。"],
        ["分享", "把链接发给投资人、合作方、顾问或公众。"],
      ],
    },
    bpBuilder: {
      label: "正式商业 BP 能力",
      title: "制作投资人能直接阅读的正式商业化 BP，而不只是项目日志。",
      body:
        "成熟商业 BP 结构，关键结论继续连接证据。",
      modules: [
        ["执行摘要", "公司叙事、阶段、产品判断、当前状态和融资需求。"],
        ["问题与解决方案", "市场痛点、产品答案、目标用户和为什么是现在。"],
        ["产品与架构", "产品流程、技术壁垒、集成、路线图和版本历史。"],
        ["市场与商业模式", "市场框架、变现逻辑、定价假设和 go-to-market 路径。"],
        ["进展与里程碑", "项目进展、Demo、上线记录、证据支持时间轴和当前缺口。"],
        ["团队、风险与融资需求", "创始人背景、执行风险、下一阶段里程碑、融资金额和资金用途。"],
      ],
      outputs: [
        "投资人视图",
        "创始人视图",
        "公开视图",
        "周报更新",
        "动态 BP 网站",
      ],
    },
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
        title: "Proof Engine",
        body: "在项目进展被展示为可信叙事之前，先逐条检查声明、证据、时效和限制。",
        points: ["声明提取", "证据匹配", "时效检查", "矛盾检测"],
      },
      {
        title: "发布成 BP 网站",
        body: "把动态 BP 或投资人汇报变成可部署的网站，并绑定一个容易分享的项目子域名。",
        points: ["动态 BP", "投资人汇报", "公开页面", "分享链接"],
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
      { step: "04", title: "验证项目声明", body: "Proof Engine 在汇报被信任前，逐条检查证据、时效、限制和矛盾。" },
      { step: "05", title: "发布并分享", body: "把 BP/汇报部署成网站。目前通过 Vercel 加 Spaceship DNS 手动配置 jtcao.space 子域名。" },
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
      proof: ["Proof Engine", "核心产品是验证，不是装饰。"],
      bpBuilder: ["BP 制作", "正式商业 BP 结构，并由 claim 级证据支持。"],
      publish: ["发布", "动态 BP 应该变成真正的网站，而不是另一个附件。"],
      product: ["产品系统", "Proof Engine、叙事引擎和一键发布。"],
      how: ["工作流", "从项目活动到动态项目故事。"],
      demo: ["真实案例", "VisePanda 动态交互式 BP。"],
      useCases: ["使用场景", "为需要可信进展展示的团队而生，不只是让幻灯片更漂亮。"],
      privacy: ["隐私与证据", "默认私有，证据优先。"],
      pricing: ["价格预览", "先开放早期访问，商业计划后续发布。"],
    },
    demo: {
      title: "VisePanda - 真实案例",
      body: "一个包含时间轴、Roadmap、版本历史和项目证据的动态交互式 BP。",
      cta: "查看 VisePanda 真实项目故事",
      rows: ["时间轴", "版本历史", "开发挑战", "Roadmap", "投资人视图"],
    },
    privacyCards: [
      ["可见性控制", "项目默认不会公开。创始人可以选择公开、非公开或受保护分享。"],
      ["最小 GitHub 权限", "仓库连接独立于登录流程，第一阶段从 metadata 开始，不默认公开完整源码。"],
      ["AI 需人工确认", "AI 生成内容在成为正式项目事件前，需要用户审核。"],
    ],
    finalCta: {
      title: "给项目取一个名字，把带证据的创业故事发布成网站。",
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
