# ViseCraft：Vercel + GitHub + Spaceship 零基础部署教程

目标生产地址：`https://vc.jtcao.space`

本教程写给第一次部署网站的操作者。它覆盖：用 GitHub 登录 Vercel、导入 ViseCraft 仓库、保持默认构建设置、完成首次部署、在 Spaceship 添加 DNS、判断生效、排查失败、回滚，以及以后通过 `git push` 自动更新。

> 安全规则：不要把 GitHub 密码、Vercel token、Supabase secret、GitHub OAuth secret、域名账号密码或任何私有证据写进仓库、Issue、截图或聊天。不要删除 `jtcao.space` 已有的 MX、SPF、DKIM、DMARC 或其他邮件记录。

> 产品边界：本教程部署 ViseCraft 的公开产品站和现有 Next.js 应用。它不配置 VisePitch 的动态 BP 发布，也不创建任何 `*.visepitch.space` 域名。

官方参考：

- [Vercel：Deploying Git Repositories](https://vercel.com/docs/git)
- [Vercel：Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain)
- [Spaceship：DNS record types and Custom records](https://www.spaceship.com/en-GB/knowledgebase/dns-records-types/)
- [Spaceship：DNS propagation](https://www.spaceship.com/en-GB/knowledgebase/dns-propagation-guide/)

## 0. 开始前准备

你需要：

1. 能访问 `JTCAO515/visecraft` 的 GitHub 账号。
2. 一个 Vercel 账号；个人账号或有权限的 Team 均可。
3. 能管理 `jtcao.space` DNS 的 Spaceship 账号。
4. `main` 分支中已经包含准备上线的版本。
5. GitHub Actions 最新的 `main` CI 是绿色。
6. 已读 `docs/OPERATOR_ACTIONS.md`，知道 Supabase Auth 和 GitHub OAuth 仍需由操作者配置。

### 0.1 本地发布门禁

在仓库根目录运行：

```bash
npm install
npm run lint
npx tsc --noEmit
npm run build
npm run test:e2e
```

你会看到：每条命令最终退出，没有红色 error；`next build` 列出成功生成的路由；Playwright smoke tests 全部通过。

如果失败：不要进入 Vercel 或修改 DNS。先保留错误原文，在本地修复并重新运行全部门禁。DNS 不能修复代码构建错误。

### 0.2 准备安全的生产环境值

公开站至少使用：

```text
NEXT_PUBLIC_SITE_URL=https://vc.jtcao.space
NEXT_PUBLIC_AUTH_MODE=supabase
```

第二行会关闭本地 preview auth。若生产 Supabase 尚未配置，登录/注册不会成为真实生产账号系统；这是比在公网启用 preview cookie 更安全、也更诚实的降级状态。

只有完成 `OA-001` 后，才额外准备：

```text
NEXT_PUBLIC_SUPABASE_URL=<Supabase 项目的 Project URL>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<Supabase publishable key>
```

这些是可公开的浏览器配置，但仍应放进 Vercel Environment Variables，不要硬编码。**绝对不要**添加 Supabase service role key。GitHub OAuth client secret 只放在 Supabase 控制台，不放 Vercel 公共环境变量。

## 1. 注册 Vercel 并使用 GitHub 登录

### 1.1 打开注册页

1. 浏览器打开 [vercel.com](https://vercel.com/)。
2. 看页面右上角：新用户点击 **Sign Up**；已有账号点击 **Log In**。
3. 在登录方式中点击 **Continue with GitHub**。
4. GitHub 页面会显示 Vercel 请求的账号权限；确认当前头像和用户名正确。
5. 点击 **Authorize Vercel**。
6. 如果 GitHub 要求验证码或安全密钥，按页面完成二次验证。

你会看到：浏览器回到 Vercel Dashboard，左上角显示你的个人账号或 Team，页面上有 **Add New…** 或 **New Project**。

### 1.2 看不到仓库时怎么处理

失败长相：后续仓库列表里搜索 `visecraft` 没有结果，或显示 **Configure GitHub App**。

处理：

1. 打开 GitHub。
2. 右上角头像 → **Settings**。
3. 左侧 **Applications**。
4. 点击 **Installed GitHub Apps**。
5. 找到 Vercel，点击 **Configure**。
6. 在 Repository access 中选择允许访问 `visecraft`；不要为了省事扩大到不相关私有仓库。
7. 保存，回 Vercel 刷新。

回退：如果登录了错误账号，先退出 Vercel，再用正确 GitHub 账号重新登录。注册或授权本身不会修改代码或 DNS。

截图位说明：此处截图应同时框出 Vercel 右上角 **Sign Up / Log In** 和登录卡片中的 **Continue with GitHub**；截图不得包含邮箱、token 或团队账单信息。

## 2. Import GitHub 仓库

1. 在 Vercel Dashboard 右上角点击 **Add New…**。
2. 下拉菜单选择 **Project**。
3. 进入 **Import Git Repository** 页面。
4. 左上角账号下拉确认是持有仓库权限的 GitHub 账号或组织。
5. 搜索框输入 `visecraft`。
6. 找到 `JTCAO515/visecraft`。
7. 点击仓库右侧 **Import**。

你会看到：标题为 **Configure Project** 的页面，下面有 Project Name、Framework Preset、Root Directory、Build and Output Settings、Environment Variables 和底部 **Deploy** 按钮。

失败长相：

- **Repository not found**：回到第 1.2 节配置 GitHub App 权限。
- **Insufficient permissions**：个人仓库通常需要 owner；组织仓库需要组织和仓库访问权限。请让仓库 owner 调整授权，不要复制仓库或上传 zip 绕过治理。
- 导入了同名错误仓库：点击浏览器返回，不要 Deploy；重新确认 owner 是 `JTCAO515`。

截图位说明：截图应框出仓库行左侧的 `JTCAO515/visecraft` 和右侧 **Import** 按钮，不要截出其他私有仓库名称。

## 3. Configure Project：构建设置保持默认

在 **Configure Project** 页面逐项检查。除环境变量外，不要点击 Override，不要手填输出目录。

| 页面字段 | 应看到的值 | 要做什么 | 不要做什么 |
| --- | --- | --- | --- |
| Project Name | `visecraft` 或 Vercel 自动生成名称 | 保持默认即可 | 不需要改成域名 |
| Framework Preset | `Next.js` | 确认自动识别 | 不选 Other |
| Root Directory | `./` | 保持默认 | 不选 `src`、`docs` 或子目录 |
| Build Command | Default / `next build` | 不展开 Override | 不手填 `npm run dev` |
| Output Directory | Default | 不修改 | 不填 `.next` 或 `out` |
| Install Command | Default / `npm install` | 不展开 Override | 不改为全局安装命令 |
| Development Command | Default / `next dev` | 不修改 | 不影响生产部署 |

为什么 Output Directory 不填：这是标准 Next.js 项目，Vercel 会根据 Framework Preset 自动处理 `.next`。手填经常会导致构建成功但没有可发布输出。

### 3.1 添加生产环境变量

1. 找到 **Environment Variables** 区域。
2. 点击 **Add** 或展开该区域。
3. Name 输入 `NEXT_PUBLIC_SITE_URL`。
4. Value 输入 `https://vc.jtcao.space`。
5. Environment 勾选 **Production**；Preview 和 Development 可按团队需要，但不要把正式域名误用于本地开发。
6. 点击 **Add** / **Save**。
7. 再添加 `NEXT_PUBLIC_AUTH_MODE`，Value 输入 `supabase`，Environment 勾选 **Production**。
8. 如果 `OA-001` 已完成，再逐项添加 Supabase Project URL 和 publishable key。不要粘贴 service role key。

你会看到：每个变量以变量名显示，Value 通常被遮挡；Production 环境被选中。

失败长相：变量名拼错、Value 带多余引号、URL 末尾带路径，或把值粘到 Name 栏。删除错误行后重新添加；不要在构建日志或截图里展示值。

### 3.2 开始首次部署

1. 再检查一次 Root Directory 是 `./`、Framework Preset 是 Next.js。
2. 点击页面底部 **Deploy**。

你会看到：Vercel 进入构建进度页，依次显示 Queued / Building，日志包含安装依赖、`next build`、路由生成；成功后出现庆祝页或 **Congratulations!**，状态为 **Ready**，并提供一个 `*.vercel.app` 地址和 **Visit** 按钮。

失败长相与处理：

- **Build Failed**：点击失败 deployment → **Build Logs**，定位第一条真实 error；回本地复现、修复、push。不要修改 DNS。
- **Module not found**：确认仓库分支包含文件且大小写一致，Root Directory 为 `./`。
- **Install failed / lockfile error**：确认 `package-lock.json` 已提交，Install Command 没有 Override。
- **Environment variable missing**：确认变量 Name 无空格、选择了 Production，然后在 deployment 的三点菜单选择 **Redeploy**。
- **Node.js version incompatible**：Project → **Settings** → **General** → **Node.js Version**，选择项目支持的当前 LTS，再 Redeploy。只有日志明确指向 Node 版本时才改。

回退：首次 deployment 失败不会覆盖任何已有生产版本。保留日志，修复代码后重新部署；不要删除仓库或重写 Git 历史。

截图位说明：一张截图框出 Configure Project 中的 Framework Preset、Root Directory、三个未 Override 的 build 字段；另一张截图框出成功页的 **Ready**、deployment URL 和 **Visit**。环境变量 Value 必须遮挡。

## 4. 先验证 Vercel 默认地址

在修改域名前，先证明 deployment 本身可用。

1. 成功页点击 **Visit**；或 Project → **Deployments** → 打开最新 `main` deployment。
2. 复制 `*.vercel.app` 地址。
3. 打开浏览器无痕窗口，粘贴该地址。
4. 检查首页、语言、移动端和页面路由，见第 7 节。
5. 回 Vercel，确认 deployment 同时显示 **Ready**、**Production**、分支 `main` 和正确 commit SHA。

你会看到：无痕首次打开默认为英文；首页是 ViseCraft，不是 VisePitch；Vercel deployment 详情中的 commit 与 GitHub `main` 最新 commit 一致。

如果页面旧：

1. 在 GitHub 打开 `main`，复制最新 commit 的前 7 位 SHA。
2. 在 Vercel Deployments 打开当前 Production deployment。
3. 比对 Git Commit SHA。
4. 若不一致，确认 Project → **Settings** → **Environments** → **Production** → **Branch Tracking** 是 `main`。
5. 需要时回 Deployments 点击 **Create Deployment**，输入 `main` 的完整 GitHub branch URL 或 commit SHA，再点击 **Create Deployment**。

不要在默认地址未通过 smoke 时绑定域名。

## 5. 在 Vercel 添加 `vc.jtcao.space`

1. Vercel Dashboard 点击 `visecraft` Project。
2. 左侧或顶部点击 **Settings**。
3. Settings 左侧点击 **Domains**。
4. 在域名输入框填写：

```text
vc.jtcao.space
```

5. 点击 **Add**。
6. 如果页面询问环境，选择 **Production**。

你会看到：域名出现在列表中。由于 DNS 仍在 Spaceship，初始常显示黄色或红色 **Invalid Configuration**，并展开需要的 DNS record。

### 5.1 精确抄下 Vercel 当次显示的 DNS 值

`vc.jtcao.space` 是子域名，Vercel通常要求 CNAME。页面会显示类似：

| Type | Name | Value |
| --- | --- | --- |
| `CNAME` | `vc` | 可能是 `cname.vercel-dns-0.com`，也可能是该项目专属 `*.vercel-dns-*.com` |

**必须以 Vercel Domains 页面当次显示的 Type、Name、Value 为唯一准绳，逐字复制。** Vercel 官方明确说明通用值可能被项目专属值替代。不要根据本教程猜测或硬填示例。

若 Vercel 显示域名已被其他账号使用，还会给一条 TXT ownership record。该 TXT 的 Name 和 Value 也必须逐字复制，只用于本次所有权验证。

记录方法：在不包含账号隐私的安全笔记中写下：

```text
Type: <Vercel 显示值>
Name: <Vercel 显示值>
Value: <Vercel 显示值>
```

不要把 `https://`、`/`、端口或路径放进 DNS Value。

失败长相：

- **Domain already assigned to another project**：先确认是否属于你自己的旧 Vercel Project；从旧 Project 移除后再加。若不认识该项目，按 Vercel 提示添加 TXT 验证，不要删除别人的 DNS。
- **Invalid Configuration**：这是 DNS 尚未添加或未传播的正常中间状态，先完成下一节。

截图位说明：截图需框出 Domains 页的 `vc.jtcao.space`、状态、Type、Name 和 Value。若截图对外分享，先遮挡团队标识和无关域名。

## 6. 在 Spaceship 添加 DNS

### 6.1 先确认 DNS 确实由 Spaceship 管理

1. 登录 [spaceship.com](https://www.spaceship.com/)。
2. 打开 **Launchpad**。
3. 点击 **Advanced DNS**。
4. 找到并展开 `jtcao.space`。

如果 Spaceship 提示 nameservers 指向第三方，停止：DNS 记录必须在当前权威 DNS provider 添加，而不是在 Spaceship 的空 zone 里添加。不要为了本次部署随意更换 nameserver。

### 6.2 记录回滚基线

在添加前，检查 Host 为 `vc` 的现有 A、AAAA、CNAME 和 TXT 记录。

1. 截图或抄写每条记录的 Type、Host、Value、TTL。
2. 同时记下操作日期。
3. 不要截图账号密码或其他域名的私有配置。

若已有 `vc` 的 A、AAAA 或 CNAME，它可能和新 CNAME 冲突。先确认旧记录用途；不要直接删除。若该 Host 正在服务旧站，先准备 Vercel Ready 地址和回滚值，再安排切换。

### 6.3 逐字段添加 Vercel record

1. 在 `jtcao.space` 下进入 **DNS records**。
2. 找到 **Custom records**。
3. 点击 **Add record** 或右侧加号。
4. Type 下拉选择 Vercel 显示的类型；对子域名通常是 `CNAME`。
5. Host 填 `vc`，除非 Vercel 显示的 Name 明确不同。
6. Value / Target 粘贴 Vercel Domains 页面复制的完整值。
7. TTL 保持 Spaceship 默认值；不要为了“更快”反复改 TTL。
8. 点击 **Add** / **Save**。

典型示意，**不是可跳过 Vercel 检查的固定答案**：

```text
Type:  CNAME
Host:  vc
Value: <复制 Vercel 当次显示的完整 CNAME target>
TTL:   Default
```

如果 Vercel 额外要求 TXT：

1. 再点 **Add record**。
2. Type 选 `TXT`。
3. Host / Name 复制 Vercel 显示值。
4. Value 粘贴完整 TXT 字符串，不删引号内部字符、不换行。
5. TTL 保持默认。
6. 点击 **Add**。

你会看到：Custom records 列表出现新行，Spaceship 可能显示 propagation 图标或状态。

不要做：

- 不要把 Host 写成 `https://vc.jtcao.space`。
- 不要在 Host 填路径 `/`。
- 除非 Spaceship 输入框明确要求 FQDN，否则 Host 只填 `vc`，不填完整 `vc.jtcao.space`。
- 不要让同一 `vc` Host 同时保留冲突的 A/AAAA 和 CNAME。
- 不要删除根域 `@`、`www` 或邮件记录。
- 不要为一个子域名切换整套 nameserver。

失败长相：

- **Record conflicts with existing record**：同 Host 有 A/AAAA/CNAME；回到 6.2 确认旧用途，再决定切换。
- **Invalid host**：Host 含 `https://`、完整路径或不允许字符；改成 Vercel 指定的 Name，通常是 `vc`。
- **Invalid value**：Value 带协议、空格或 `/`；从 Vercel 重新复制纯 target。

截图位说明：截图应框出 Advanced DNS → `jtcao.space` → DNS records → Custom records → **Add record**，以及 Type、Host、Value、TTL 四个字段。截图中的其他业务和邮件记录应打码，但不要删除。

## 7. 等待生效并验证

DNS record 通常在几分钟到数小时内传播；极端情况下可能更久。短时间显示旧结果不等于失败。不要每几分钟删除重建，因为这会重新开始等待并增加错误概率。

### 7.1 在 Spaceship 看传播

1. 保持在 Advanced DNS。
2. 找到刚添加的 `vc` 记录。
3. 点击 propagation 状态或地图图标（若界面提供）。
4. 等多数检查点显示新值。

### 7.2 在 Vercel 看域名状态

1. 回 Vercel → `visecraft` Project → **Settings** → **Domains**。
2. 刷新页面或点击域名旁的重新检查按钮。
3. 等 `vc.jtcao.space` 从 **Invalid Configuration** 变成 **Valid Configuration**。
4. Vercel 会自动申请 SSL；等待 HTTPS 状态就绪。

### 7.3 用终端核对

```bash
dig CNAME vc.jtcao.space +short
curl -I https://vc.jtcao.space
```

你会看到：

- `dig` 返回 Vercel 指定的 CNAME 链；
- `curl` 返回 `200` 或正常重定向；
- 浏览器地址栏有锁形图标并使用 `https://`；
- Vercel Domains 显示 Valid Configuration。

失败长相与定位：

- `NXDOMAIN`：Host 写错、记录未保存、权威 DNS 不在 Spaceship，或仍在传播。
- `dig` 返回旧 target：等待 TTL，确认没有在错误 zone 修改。
- Vercel 一直 **Invalid Configuration**：逐字符比较 Type、Name、Value；检查冲突 A/AAAA/CNAME。
- 浏览器 `DNS_PROBE_FINISHED_NXDOMAIN`：DNS 尚未解析，不是 Next.js 构建错误。
- 浏览器证书警告：不要继续或忽略；先等 Vercel Valid Configuration 和自动证书签发，检查 CAA/冲突记录。
- 页面是其他项目：域名可能加到了错误 Vercel Project，或 DNS target 指向旧 provider。

### 7.4 DNS 回滚

如果需要恢复旧站：

1. Spaceship → Advanced DNS → `jtcao.space` → Custom records。
2. 删除本次新增的 `vc` CNAME/TXT；只删本次记录。
3. 按 6.2 的截图逐字段恢复原 `vc` Type、Host、Value、TTL。
4. Vercel → Project → Settings → Domains，移除 `vc.jtcao.space`，避免以后误绑定。
5. 等旧 TTL 传播并再次运行 `dig`。

DNS 回滚不删除 Vercel 项目，`*.vercel.app` 地址仍可用于排查。

## 8. Production smoke / 生产冒烟检查

用无痕窗口分别打开 `https://vc.jtcao.space`，并完成以下检查。

### 8.1 产品真实性

- [ ] 首页产品名是 ViseCraft，默认英文，可切换完整中文。
- [ ] 定位是项目记录、claim/evidence/freshness 和 Proof Engine。
- [ ] 十二章明确是 ViseCraft 自身的 evidence-framed company record。
- [ ] 没有把 ViseCraft 写成 BP builder、deck converter、BP chatbot 或动态 BP publisher。
- [ ] VisePitch 被描述为独立产品，VisePanda只作为独立案例。
- [ ] 没有虚构客户、收入、采用、融资、合规或投资人认可。
- [ ] Proof Engine 不被描述为审计、认证、法律意见或投资建议。

### 8.2 路由和交互

- [ ] `/`、`/login`、`/signup`、`/privacy`、`/terms` 可达。
- [ ] 未登录访问 `/app` 按当前生产 auth 配置诚实处理，不开放 preview 生产会话。
- [ ] VisePanda verification dashboard 和 claim report 的权限边界符合预期。
- [ ] 中英文切换后正文、CTA、限制和 FAQ 都变化；刷新行为符合设计。
- [ ] 移动菜单、tabs、FAQ、按钮和锚点可用。
- [ ] 所有外链指向预期地址，不出现 VisePitch 发布地址。

### 8.3 桌面、移动与无障碍

- [ ] 1440px 宽度下 hero、Proof Engine、12 章和 release history 层级完整。
- [ ] 390px 宽度下无横向滚动，按钮和文字不被裁切。
- [ ] 键盘 Tab 可到达所有控件，focus-visible 清楚。
- [ ] 触控目标易点按，移动菜单可关闭。
- [ ] `prefers-reduced-motion` 下没有影响阅读的大幅动画。
- [ ] 浏览器 console 无 error/warn。

### 8.4 部署证据

- [ ] Vercel 最新 Production deployment 状态为 Ready。
- [ ] deployment commit SHA 与 GitHub `main` 一致。
- [ ] GitHub Actions 对应 commit 的 lint、tsc、build 和 e2e 为绿色。
- [ ] Vercel Domains 为 Valid Configuration。
- [ ] 正式域名 HTTPS 正常。

任一真实性、权限或私密证据条目失败时，停止对外推广。优先回滚到上一个绿色 deployment，再修复。

## 9. 以后如何更新：`git push` 自动部署

Vercel Git Integration 默认会为非生产分支创建 Preview deployment，并为 Production Branch（本项目应为 `main`）的每次 push 创建 Production deployment。正式域名会自动指向最新成功的 Production deployment；**以后更新代码不需要再改 DNS**。

正常流程：

1. 先读 `docs/INDEX.md` 的 mandatory reading order。
2. 内容改动按 `docs/CONTENT_GUIDE.md` 同时更新英文和中文。
3. 产品主张、版本、架构或 operator state 变化时同步对应文档。
4. 本地运行：

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run test:e2e
git diff --check
git status
git diff
```

5. 确认 diff 不含 secret、私有证据或无关文件。
6. 提交到 Git，push 到 `main`：

```bash
git add <本次文件>
git commit -m "<准确描述本次变化>"
git push origin main
```

7. 打开 GitHub 仓库 → 顶部 **Actions** → 点击最新 `main` workflow，等待所有 job 绿色。
8. 打开 Vercel Project → **Deployments**，找到相同 commit SHA，等待 **Ready** 和 **Production**。
9. 用正式域名重跑与本次变化相关的第 8 节 smoke。

你会看到：push 后 GitHub Actions 和 Vercel 各自出现一条对应 commit 的运行记录。CI 绿色不等于 Vercel 已部署；两边都要确认。

失败长相：

- GitHub Actions 红色、Vercel 绿色：不要把绿色 deployment 当完整发布；修复 CI 并重新 push。
- GitHub Actions 绿色、Vercel Failed：打开 Vercel Build Logs；检查环境和 provider 差异。
- Vercel 没有新 deployment：Project → Settings → Git 确认连接 `JTCAO515/visecraft`；Settings → Environments → Production → Branch Tracking 确认 `main`。
- deployment Ready 但域名旧：确认正式域名绑定 Production，不是某个 Preview branch；比对 commit SHA，必要时清浏览器缓存。

## 10. Production rollback / 生产回滚

优先恢复服务，再修复 Git。

### 10.1 Vercel 立即回滚

1. Vercel Dashboard → `visecraft` → **Deployments**。
2. 找到上一个已知正常、绿色 **Ready** 的 Production deployment。
3. 点击右侧三点菜单。
4. 选择 **Promote to Production** 或 **Rollback**；按钮名以当时 Vercel UI 为准。
5. 阅读确认框中的目标 commit 和域名。
6. 点击确认。
7. 无痕打开 `https://vc.jtcao.space`，确认页面恢复。

你会看到：旧 deployment 成为当前 Production，正式域名指向它。DNS 不需要修改。

### 10.2 Git 中永久修正

Vercel 回滚只恢复线上流量，`main` 仍可能包含坏 commit。随后使用非破坏性 revert：

```bash
git revert <bad-commit-sha>
git push origin main
```

等新 CI 和 Vercel deployment 绿色，再重复 smoke。不要使用 `git reset --hard` 或强制 push 改写共享 `main` 历史。

### 10.3 何时才回滚 DNS

只有域名配置本身错误、域名需迁回旧 provider 或 Vercel Project 绑定错误时，才按 7.4 回滚 DNS。普通页面错误只回滚 deployment，不要同时改代码、deployment 和 DNS，以免无法判断哪一步生效。

## 11. Final release checklist / 最终发布清单

- [ ] `npm run lint` 通过
- [ ] `npx tsc --noEmit` 通过
- [ ] `npm run build` 通过
- [ ] `npm run test:e2e` 通过
- [ ] GitHub Actions 最新 `main` workflow 全绿
- [ ] Vercel 最新 Production deployment 为 Ready
- [ ] Vercel deployment commit SHA 等于 GitHub `main`
- [ ] `vc.jtcao.space` 为 Valid Configuration
- [ ] HTTPS 证书正常
- [ ] 英文默认、中文完整
- [ ] 桌面 1440px 和移动 390px 检查完成
- [ ] 全部公开路由可达，console 无 error/warn
- [ ] Production 未启用 preview auth
- [ ] 没有 secret、私有证据或虚构商业事实
- [ ] ViseCraft / VisePitch 产品边界保持准确
- [ ] 已知道 deployment 回滚和 DNS 回滚的区别
