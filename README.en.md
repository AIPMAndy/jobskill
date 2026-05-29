<div align="center">

# 🎯 JobSkill

### Your AI Job Search Copilot

**Stop managing job applications in Excel. Start taking control with AI.**

[![GitHub stars](https://img.shields.io/github/stars/AIPMAndy/jobskill?style=social)](https://github.com/AIPMAndy/jobskill)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Claude AI](https://img.shields.io/badge/Claude-AI-orange)](https://www.anthropic.com/)

English | [简体中文](README.md)

[🚀 Live Demo](#) · [📖 Docs](#) · [💬 Community](#) · [🐛 Report Bug](https://github.com/AIPMAndy/jobskill/issues)

</div>

---

## 😫 Sound Familiar?

<table>
<tr>
<td width="50%">

### ❌ The Old Way

- 📊 Excel chaos - can't find which companies you applied to
- 🤯 Missed interviews because you forgot
- 📉 No idea what's working, just blindly applying
- 💸 $40/month tools with privacy concerns
- 📝 Reinventing the wheel for every interview

</td>
<td width="50%">

### ✅ The JobSkill Way

- 🎯 **One dashboard** for all applications
- 🤖 **AI assistant** for reminders & prep
- 📊 **Data insights** to optimize your strategy
- 🆓 **Completely free**, open source, your data
- ⚡ **Smart reuse** of interview prep & learnings

</td>
</tr>
</table>

---

## 🌟 Why JobSkill?

### 💰 Save $480/year

| Feature | JobSkill | Huntr | Teal | Simplify |
|---------|----------|-------|------|----------|
| 💵 **Price** | **🆓 Free** | $40/mo | $29/mo | $30/mo |
| 🤖 **AI Depth** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 📊 **Analytics** | ✅ Deep insights | ✅ Basic | ✅ Basic | ❌ |
| 🔒 **Privacy** | ✅ Your control | ❌ 3rd party | ❌ 3rd party | ❌ 3rd party |
| 💻 **Self-host** | ✅ | ❌ | ❌ | ❌ |
| 🔧 **Customizable** | ✅ Open source | ❌ | ❌ | ❌ |

---

### 🤖 Save 40+ hours with AI

**What AI does for you:**
- 📝 **Resume optimization** - Tailored suggestions for each role
- 🎯 **Interview prep** - Company research, common questions, answer templates
- 📊 **Progress analysis** - Identify bottlenecks, improve conversion
- 🔔 **Smart reminders** - Never miss an interview or follow-up
- 📚 **Knowledge base** - Reuse interview prep across applications

---

### 🔒 Your data, your control

**Other tools:**
- 🚨 Data on 3rd party servers
- 💸 Lose access when you stop paying
- 🔐 Account suspension = data loss

**JobSkill:**
- ✅ Data in your own database (SQLite/PostgreSQL)
- ✅ Export anytime, own forever
- ✅ Open source, auditable
- ✅ Works completely offline (without AI features)

---

## ✨ Core Features

### 1️⃣ Smart Application Tracking

- 📋 Kanban board with drag & drop
- 🏷️ Custom tags (remote, high-pay, dream company)
- 🔍 Powerful search and filters
- 📅 Timeline view of your journey

### 2️⃣ AI Assistant (Claude-powered)

- 📝 Resume optimization for each role
- 🎯 Interview prep with company research
- 📊 Progress analysis with actionable insights
- 🔔 Smart reminders for interviews & follow-ups

### 3️⃣ Data-Driven Decisions

- 📊 Funnel analysis (applied → replied → interviewed → offered)
- ⏱️ Response time tracking
- 📈 Conversion rate optimization
- 💡 AI-powered recommendations

---

## 🚀 Quick Start

### Option 1: Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AIPMAndy/jobskill)

Click → Login → Add env vars → Deploy ✅

---

### Option 2: Run Locally

```bash
# 1. Clone
git clone https://github.com/AIPMAndy/jobskill.git
cd jobskill

# 2. Install
npm install

# 3. Configure
cp .env.example .env.local
# Edit .env.local, add your Claude API Key (optional)

# 4. Run
npm run dev

# 5. Open http://localhost:3000
```

---

### Option 3: Docker

```bash
docker run -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your_key \
  -v ./data:/app/data \
  ghcr.io/aipmAndy/jobskill:latest
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript 5 |
| **UI** | Shadcn/ui, Tailwind CSS 4, Lucide Icons |
| **State** | Zustand, React Hook Form |
| **AI** | Claude AI (Anthropic SDK) |
| **Database** | SQLite (local) / PostgreSQL (production) |
| **Deploy** | Vercel, Docker |

---

## 📊 Roadmap

### ✅ Done (v0.1)
- [x] Application tracking
- [x] Kanban interface
- [x] AI analysis (resume, interview prep)
- [x] Data visualization
- [x] Local storage (SQLite)

### 🚧 In Progress (v0.2 - June)
- [ ] 📧 Email integration (Gmail, Outlook)
- [ ] 🔌 Chrome extension (save jobs with 1 click)
- [ ] 📱 Mobile optimization
- [ ] 🌐 Multi-language support

### 🔮 Planned (v0.3+)
- [ ] 📱 Mobile apps (iOS/Android)
- [ ] 👥 Team collaboration (for career coaches)
- [ ] 🔗 API access
- [ ] 🎨 Theme customization

---

## 🤝 Contributing

We welcome all contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 💬 Community

- 💬 [GitHub Discussions](https://github.com/AIPMAndy/jobskill/discussions)
- 🐛 [GitHub Issues](https://github.com/AIPMAndy/jobskill/issues)
- 🐦 [Twitter/X](https://twitter.com/AIPMAndy)
- 📧 [Email](mailto:andy@jobskill.dev)

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=AIPMAndy/jobskill&type=Date)](https://star-history.com/#AIPMAndy/jobskill&Date)

---

<div align="center">

### ⭐ If this project helps you, please give it a star!

**JobSkill** - Take Control of Your Job Search with AI

Made with ❤️ by [Andy](https://github.com/AIPMAndy)

</div>
