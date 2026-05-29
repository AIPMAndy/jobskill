# JobSkill 🎯

**真正好用的 AI 求职管理系统**

> 🚀 追踪申请进度 | 📊 数据分析洞察 | 🤖 AI 智能助手 | ⚡ Next.js + Claude AI 驱动

[![GitHub stars](https://img.shields.io/github/stars/AIPMAndy/jobskill?style=social)](https://github.com/AIPMAndy/jobskill)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

[English](README.md) | 简体中文

---

## 💡 为什么做这个项目

**求职管理太痛苦了**：
- 📝 用 Excel 追踪 50+ 份申请，表格越来越乱
- 🔍 忘记自己投了哪些公司，什么时候投的
- 📊 完全不知道自己的求职进展如何
- 🤯 面试安排、跟进提醒全靠脑子记，经常漏掉

**JobSkill 帮你解决**：
- ✅ **集中管理** - 所有申请一目了然，再也不用翻 Excel
- ✅ **AI 智能分析** - Claude AI 分析你的求职数据，给出优化建议
- ✅ **自动提醒** - 再也不会错过面试和跟进时间
- ✅ **现代化界面** - 好看好用，让求职不再痛苦

---

## 🌟 核心优势

### 1. 🆓 完全开源免费
- **对比 Huntr/Teal**：他们要 $20-40/月，我们完全免费
- **对比其他工具**：代码开源，数据在你自己手里，隐私有保障
- **可自部署**：不想用我们的服务？自己部署一套，完全掌控

### 2. 🤖 深度 AI 集成
- **Claude AI 驱动**：不是简单的 GPT 套壳，而是针对求职场景深度优化
- **智能简历优化**：AI 帮你分析简历，针对不同岗位给出修改建议
- **面试准备助手**：根据公司和岗位，生成针对性的面试问题和答案
- **进度分析**：AI 分析你的求职数据，告诉你哪里需要改进

### 3. 💻 技术栈先进
- **Next.js 15**：最新的 React 框架，性能极致
- **TypeScript**：类型安全，代码质量有保障
- **Tailwind CSS**：现代化 UI，响应式设计
- **易于二次开发**：代码结构清晰，想加功能很容易

### 4. 📊 数据可视化
- **求职漏斗分析**：投递 → 回复 → 面试 → Offer，每一步转化率清晰可见
- **时间线追踪**：每个申请的完整历史记录
- **统计报表**：回复率、面试率、平均响应时间等关键指标

---

## ✨ 核心功能

- 🎯 **申请追踪** - 添加职位，追踪状态（已投递 → 面试中 → 已拿 Offer）
- 🤖 **AI 助手** - Claude AI 帮你优化简历、准备面试、分析进度
- 📊 **数据看板** - 可视化你的求职数据（回复率、面试率、时间分布等）
- 🔔 **智能提醒** - 自动提醒面试时间、跟进时间，不再错过机会
- 📱 **响应式设计** - 电脑、手机、平板都能完美使用
- 🔒 **隐私保护** - 数据存储在你自己的数据库，不会泄露

---

## 🚀 快速开始

### 在线试用
**演示地址**：[jobskill.vercel.app](https://jobskill.vercel.app) *(即将上线)*

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/AIPMAndy/jobskill.git
cd jobskill

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 在 .env.local 中添加你的 Claude API Key

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 开始管理你的求职！

---

## 📸 功能截图

### 主控制台
![Dashboard](docs/images/dashboard.png)
*一眼看清所有申请状态*

### AI 智能助手
![AI Assistant](docs/images/ai-assistant.png)
*Claude AI 给你专业的求职建议*

### 数据分析
![Analytics](docs/images/analytics.png)
*了解你的求职表现，找到优化方向*

---

## 🎯 适用场景

**求职者**：管理 50+ 份申请，AI 辅助面试准备，不错过任何机会

**职业教练**：帮助客户整理求职流程，提供数据驱动的建议

**招聘者**：了解候选人求职旅程，优化招聘流程

---

## 🛠️ 技术栈

- **前端**：Next.js 15, React, TypeScript, Tailwind CSS
- **AI**：Claude AI (Anthropic API)
- **数据库**：PostgreSQL / Supabase
- **部署**：Vercel

---

## 📊 开发路线图

- [x] 基础申请追踪功能
- [x] AI 智能分析
- [ ] 邮箱集成（自动导入申请记录）
- [ ] Chrome 插件（一键保存职位）
- [ ] 移动端 App（iOS/Android）
- [ ] 团队协作功能（职业教练版）

---

## 🆚 竞品对比

| 功能 | JobSkill | Huntr | Teal | Excel |
|------|----------|-------|------|-------|
| 💰 价格 | **免费开源** | $40/月 | $29/月 | 免费 |
| 🤖 AI 助手 | ✅ Claude AI | ✅ 基础 | ✅ 基础 | ❌ |
| 📊 数据分析 | ✅ 深度分析 | ✅ | ✅ | ❌ |
| 🔒 数据隐私 | ✅ 自己掌控 | ❌ 存在他们服务器 | ❌ 存在他们服务器 | ✅ |
| 💻 可自部署 | ✅ | ❌ | ❌ | N/A |
| 🔧 可二次开发 | ✅ 开源 | ❌ | ❌ | N/A |
| 📱 移动端 | 🚧 开发中 | ✅ | ✅ | ❌ |

**核心差异化**：
- 💰 **完全免费** - 竞品都要 $20-40/月，我们开源免费
- 🤖 **AI 深度集成** - 不是简单套壳，而是针对求职场景优化
- 🔒 **隐私保护** - 数据在你自己手里，不用担心泄露
- 💻 **开发者友好** - Next.js + TypeScript，易于二次开发

---

## 🤝 参与贡献

欢迎贡献代码！你可以这样帮助我们：

- 🐛 [报告 Bug](https://github.com/AIPMAndy/jobskill/issues)
- 💡 [提出新功能建议](https://github.com/AIPMAndy/jobskill/issues)
- 🔧 [提交 Pull Request](https://github.com/AIPMAndy/jobskill/pulls)

详细贡献指南请查看 [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 开源协议

MIT License - 详见 [LICENSE](LICENSE)

---

## 💬 社区交流

- **Issues**：[GitHub Issues](https://github.com/AIPMAndy/jobskill/issues)
- **讨论区**：[GitHub Discussions](https://github.com/AIPMAndy/jobskill/discussions)
- **Twitter/X**：[@AIPMAndy](https://twitter.com/AIPMAndy)
- **微信**：[加入微信群](docs/wechat-group.md)

---

## 🌟 Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=AIPMAndy/jobskill&type=Date)](https://star-history.com/#AIPMAndy/jobskill&Date)

---

**JobSkill** - 用 AI 掌控你的求职

Made with ❤️ by [Andy](https://github.com/AIPMAndy) | [AI酋长](https://twitter.com/AIPMAndy)

---

## 💪 为什么你应该 Star 这个项目

1. **省钱**：替代 $40/月的付费工具，完全免费
2. **省时**：AI 帮你优化简历和准备面试，节省大量时间
3. **隐私**：数据在你自己手里，不用担心泄露
4. **学习**：Next.js 15 + Claude AI 的最佳实践，代码质量高
5. **支持开源**：让更多人用上好工具，不被付费墙挡住

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**
