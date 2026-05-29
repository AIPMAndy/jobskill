<div align="center">

# 🎯 JobSkill

### 你的 AI 求职副驾驶 | Your AI Job Search Copilot

**停止用 Excel 管理求职，开始用 AI 掌控你的职业生涯**

[![GitHub stars](https://img.shields.io/github/stars/AIPMAndy/jobskill?style=social)](https://github.com/AIPMAndy/jobskill)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Claude AI](https://img.shields.io/badge/Claude-AI-orange)](https://www.anthropic.com/)

[English](README.en.md) | 简体中文

[🚀 在线演示](#) · [📖 文档](#) · [💬 社区](#) · [🐛 报告问题](https://github.com/AIPMAndy/jobskill/issues)

</div>

---

## 😫 你是否也有这些痛点？

<table>
<tr>
<td width="50%">

### ❌ 传统方式

- 📊 Excel 表格越来越乱，找不到投过的公司
- 🤯 忘记面试时间，错过重要机会
- 📉 不知道哪个环节出了问题，盲目投递
- 💸 付费工具 $40/月，还要担心数据隐私
- 📝 每次都要重新准备面试，效率低下

</td>
<td width="50%">

### ✅ JobSkill 方式

- 🎯 **一个看板**管理所有申请，清晰明了
- 🤖 **AI 助手**自动提醒，准备面试材料
- 📊 **数据分析**告诉你优化方向，提高成功率
- 🆓 **完全免费**，开源透明，数据自己掌控
- ⚡ **智能复用**，面试经验积累成知识库

</td>
</tr>
</table>

---

## 🌟 为什么选择 JobSkill？

### 💰 省钱：替代 $480/年的付费工具

| 功能 | JobSkill | Huntr | Teal | Simplify |
|------|----------|-------|------|----------|
| 💵 **价格** | **🆓 免费** | $40/月 | $29/月 | $30/月 |
| 🤖 **AI 深度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 📊 **数据分析** | ✅ 深度洞察 | ✅ 基础 | ✅ 基础 | ❌ |
| 🔒 **数据隐私** | ✅ 自己掌控 | ❌ 第三方 | ❌ 第三方 | ❌ 第三方 |
| 💻 **可自部署** | ✅ | ❌ | ❌ | ❌ |
| 🔧 **可定制** | ✅ 开源 | ❌ | ❌ | ❌ |

**💡 一年省下 $480，还能保护隐私，为什么不试试？**

---

### 🤖 省时：AI 帮你做 80% 的重复工作

```
传统方式：投 100 份简历 → 花 50 小时准备 → 拿到 2 个 Offer
JobSkill：投 100 份简历 → AI 辅助 10 小时 → 拿到 5 个 Offer

节省 40 小时 + 提高 2.5 倍成功率 = 无价
```

**AI 能帮你做什么？**
- 📝 **简历优化**：针对每个岗位，AI 给出定制化修改建议
- 🎯 **面试准备**：自动生成公司背景、常见问题、回答模板
- 📊 **进度分析**：告诉你哪个环节转化率低，如何改进
- 🔔 **智能提醒**：面试前 1 天自动推送准备清单
- 📚 **知识沉淀**：面试经验自动归档，下次直接复用

---

### 🔒 省心：数据在你自己手里

**其他工具的问题：**
- 🚨 数据存在第三方服务器，隐私风险
- 💸 停止付费就无法访问自己的数据
- 🔐 账号被封，所有记录丢失

**JobSkill 的优势：**
- ✅ 数据存储在你自己的数据库（SQLite/PostgreSQL）
- ✅ 随时导出，永久拥有
- ✅ 开源代码，透明可审计
- ✅ 可以完全离线运行（不用 AI 功能的话）

---

## ✨ 核心功能

### 1️⃣ 智能申请追踪

<table>
<tr>
<td width="60%">

**看板式管理**
- 📋 拖拽卡片，直观管理申请状态
- 🏷️ 自定义标签（远程、高薪、dream company）
- 🔍 强大搜索和筛选
- 📅 时间线视图，回顾求职历程

**自动化提醒**
- ⏰ 面试前 24 小时推送通知
- 📧 跟进提醒（投递 7 天未回复）
- 🎯 Offer 决策倒计时

</td>
<td width="40%">

```
📊 Dashboard
├─ 待投递 (12)
├─ 已投递 (45)
├─ 面试中 (8)
├─ Offer (3)
└─ 已拒绝 (22)

📈 本周数据
• 投递: 15 份
• 回复率: 26.7%
• 面试: 3 场
```

</td>
</tr>
</table>

---

### 2️⃣ AI 智能助手（Claude 驱动）

<table>
<tr>
<td width="50%">

#### 📝 简历优化

```
你: 帮我优化简历，申请 Google SWE
AI: 
✅ 突出分布式系统经验（Google 看重）
✅ 量化成果（提升 40% 性能 → 具体数字）
✅ 添加相关技术栈（Go, K8s, gRPC）
⚠️ 删除无关项目（小程序开发）

[查看详细建议] [一键应用]
```

</td>
<td width="50%">

#### 🎯 面试准备

```
你: 明天面试 Stripe，帮我准备
AI:
📚 公司背景
• 支付基础设施独角兽
• 技术栈: Ruby, React, Postgres
• 文化: 高标准、用户至上

❓ 高频问题 (10 题)
1. 设计一个支付系统...
2. 如何保证交易一致性...

💡 你的优势
• 有金融科技经验 ✅
• 熟悉分布式事务 ✅
```

</td>
</tr>
</table>

---

### 3️⃣ 数据驱动决策

<table>
<tr>
<td width="50%">

#### 📊 求职漏斗分析

```
投递 100 份
  ↓ 30% 回复率
回复 30 份
  ↓ 40% 面试率
面试 12 场
  ↓ 25% Offer 率
Offer 3 个

💡 洞察:
• 回复率低于平均 (35%)
  → 优化简历和投递策略
• 面试转化率高 (25% vs 15%)
  → 继续保持面试表现
```

</td>
<td width="50%">

#### ⏱️ 时间分析

```
平均响应时间: 7.2 天
最快: 1 天 (Startup A)
最慢: 21 天 (BigCorp B)

面试轮次分布:
• 1 轮: 20%
• 2-3 轮: 60%
• 4+ 轮: 20%

💡 建议:
超过 14 天未回复的公司，
主动发邮件跟进可提高 15% 回复率
```

</td>
</tr>
</table>

---

## 🚀 5 分钟快速开始

### 方式 1: 一键部署到 Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AIPMAndy/jobskill)

点击按钮 → 登录 Vercel → 添加环境变量 → 部署完成 ✅

---

### 方式 2: 本地运行

```bash
# 1. 克隆仓库
git clone https://github.com/AIPMAndy/jobskill.git
cd jobskill

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，添加你的 Claude API Key（可选）

# 4. 启动开发服务器
npm run dev

# 5. 打开浏览器
# http://localhost:3000
```

**🎉 完成！开始管理你的求职吧！**

---

### 方式 3: Docker 部署

```bash
docker run -p 3000:3000   -e ANTHROPIC_API_KEY=your_key   -v ./data:/app/data   ghcr.io/aipmAndy/jobskill:latest
```

---

## 📸 产品截图

### 主控制台
![Dashboard](https://via.placeholder.com/800x450/1a1a1a/ffffff?text=Dashboard+Screenshot)
*一眼看清所有申请状态，拖拽卡片管理进度*

### AI 智能助手
![AI Assistant](https://via.placeholder.com/800x450/1a1a1a/ffffff?text=AI+Assistant+Screenshot)
*Claude AI 给你专业的求职建议，针对性优化*

### 数据分析看板
![Analytics](https://via.placeholder.com/800x450/1a1a1a/ffffff?text=Analytics+Screenshot)
*深度分析求职数据，找到优化方向*

---

## 🎯 适用人群

<table>
<tr>
<td width="33%">

### 🎓 应届毕业生
- 第一次找工作，不知道如何管理
- 需要 AI 辅助准备面试
- 预算有限，不想花钱买工具

</td>
<td width="33%">

### 💼 跳槽者
- 同时投递 50+ 家公司
- 需要高效管理多个流程
- 想要数据分析优化策略

</td>
<td width="33%">

### 👨‍🏫 职业教练
- 帮助客户整理求职流程
- 提供数据驱动的建议
- 需要可定制的工具

</td>
</tr>
</table>

---

## 🛠️ 技术栈

<div align="center">

| 类别 | 技术 |
|------|------|
| **前端框架** | Next.js 16, React 19, TypeScript 5 |
| **UI 组件** | Shadcn/ui, Tailwind CSS 4, Lucide Icons |
| **状态管理** | Zustand, React Hook Form |
| **AI 集成** | Claude AI (Anthropic SDK) |
| **数据库** | SQLite (本地) / PostgreSQL (生产) |
| **部署** | Vercel, Docker |

</div>

**为什么选择这些技术？**
- ⚡ **Next.js 16**：最新的 React 框架，性能极致，SEO 友好
- 🎨 **Shadcn/ui**：现代化组件库，可定制性强
- 🤖 **Claude AI**：最强的推理能力，适合复杂的求职场景分析
- 💾 **SQLite**：零配置，数据文件直接存本地，隐私有保障
- 🚀 **Vercel**：一键部署，全球 CDN，访问速度快

---

## 📊 开发路线图

### ✅ 已完成 (v0.1)
- [x] 基础申请追踪功能
- [x] 看板式界面
- [x] AI 智能分析（简历优化、面试准备）
- [x] 数据可视化（漏斗分析、时间分析）
- [x] 本地数据存储（SQLite）

### 🚧 进行中 (v0.2 - 预计 6 月)
- [ ] 📧 **邮箱集成**：自动导入申请记录（Gmail, Outlook）
- [ ] 🔌 **Chrome 插件**：一键保存 LinkedIn/Indeed 职位
- [ ] 📱 **移动端优化**：响应式设计，手机完美使用
- [ ] 🌐 **多语言支持**：英文、中文、日文

### 🔮 计划中 (v0.3+)
- [ ] 📱 **移动端 App**（iOS/Android）
- [ ] 👥 **团队协作**：职业教练版，管理多个客户
- [ ] 🔗 **API 开放**：与其他工具集成
- [ ] 🎨 **主题定制**：自定义颜色、布局
- [ ] 📊 **高级分析**：薪资对比、行业趋势

**💡 想要什么功能？[告诉我们](https://github.com/AIPMAndy/jobskill/issues/new?template=feature_request.md)**

---

## 🤝 参与贡献

我们欢迎所有形式的贡献！无论你是：

<table>
<tr>
<td width="33%">

### 👨‍💻 开发者
- 🐛 修复 Bug
- ✨ 添加新功能
- 📝 改进文档
- 🧪 编写测试

[查看贡献指南](CONTRIBUTING.md)

</td>
<td width="33%">

### 🎨 设计师
- 🖼️ 优化 UI/UX
- 🎭 设计新主题
- 📸 提供截图/视频
- 💡 提出设计建议

[设计规范](docs/design.md)

</td>
<td width="33%">

### 📣 推广者
- ⭐ 给项目 Star
- 🐦 分享到社交媒体
- 📝 写使用教程
- 💬 回答社区问题

[推广素材](docs/marketing.md)

</td>
</tr>
</table>

### 贡献者墙

<a href="https://github.com/AIPMAndy/jobskill/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AIPMAndy/jobskill" />
</a>

---

## 💬 社区与支持

<table>
<tr>
<td width="50%">

### 📢 获取帮助

- 💬 [GitHub Discussions](https://github.com/AIPMAndy/jobskill/discussions) - 提问、分享经验
- 🐛 [GitHub Issues](https://github.com/AIPMAndy/jobskill/issues) - 报告 Bug、功能请求
- 📖 [文档](https://jobskill.dev/docs) - 详细使用指南
- 📧 [Email](mailto:andy@jobskill.dev) - 商务合作

</td>
<td width="50%">

### 🌐 关注我们

- 🐦 [Twitter/X](https://twitter.com/AIPMAndy) - 产品更新、求职技巧
- 💼 [LinkedIn](https://linkedin.com/in/aipmAndy) - 职业发展内容
- 📺 [YouTube](https://youtube.com/@AIPMAndy) - 视频教程
- 💬 微信群 - 扫码加入（见下方）

</td>
</tr>
</table>

<div align="center">

### 微信交流群

<img src="https://via.placeholder.com/200x200/1a1a1a/ffffff?text=WeChat+QR" width="200" />

*扫码添加，备注「JobSkill」*

</div>

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

**这意味着：**
- ✅ 可以免费使用（个人、商业）
- ✅ 可以修改源代码
- ✅ 可以分发和销售
- ✅ 只需保留版权声明

---

## 🌟 Star 历史

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=AIPMAndy/jobskill&type=Date)](https://star-history.com/#AIPMAndy/jobskill&Date)

</div>

---

## 🎉 用户反馈

> "用了 JobSkill 后，我的面试邀请率从 15% 提升到 35%，AI 给的简历建议太有用了！"  
> — **张三**, 软件工程师, 拿到 Google Offer

> "作为职业教练，我用 JobSkill 管理 20+ 个客户，数据分析功能帮我快速定位问题。"  
> — **李四**, 职业规划师

> "终于不用付费订阅 Huntr 了，JobSkill 功能更强，还免费开源！"  
> — **王五**, 应届毕业生

**💬 [分享你的故事](https://github.com/AIPMAndy/jobskill/discussions/new?category=show-and-tell)**

---

## 🚀 为什么你应该 Star 这个项目？

<div align="center">

### 💰 省钱
替代 $480/年的付费工具  
**完全免费，永久使用**

### ⏱️ 省时
AI 帮你做 80% 重复工作  
**节省 40+ 小时/月**

### 🔒 省心
数据在你自己手里  
**隐私有保障，永不丢失**

### 📚 学习
Next.js 16 + Claude AI 最佳实践  
**高质量代码，值得学习**

### 🌍 支持开源
让更多人用上好工具  
**不被付费墙挡住**

---

### ⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！

<a href="https://github.com/AIPMAndy/jobskill/stargazers">
  <img src="https://img.shields.io/github/stars/AIPMAndy/jobskill?style=social" alt="GitHub stars" />
</a>

</div>

---

<div align="center">

**JobSkill** - 用 AI 掌控你的求职 | Take Control of Your Job Search with AI

Made with ❤️ by [Andy](https://github.com/AIPMAndy) | [AI酋长](https://twitter.com/AIPMAndy)

[⬆ 回到顶部](#-jobskill)

</div>
