# 贡献指南

感谢你考虑为 JobSkill 做贡献！🎉

## 🚀 快速开始

### 开发环境设置

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/YOUR_USERNAME/jobskill.git
cd jobskill

# 2. 安装依赖
npm install

# 3. 创建开发分支
git checkout -b feature/your-feature-name

# 4. 启动开发服务器
npm run dev
```

## 📝 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 添加新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
test: 添加测试
chore: 构建/工具链更新
```

**示例：**
```bash
git commit -m "feat: 添加邮箱集成功能"
git commit -m "fix: 修复看板拖拽问题"
git commit -m "docs: 更新 API 文档"
```

## 🐛 报告 Bug

请使用 [Bug Report 模板](https://github.com/AIPMAndy/jobskill/issues/new?template=bug_report.md)，包含：

- 问题描述
- 复现步骤
- 预期行为
- 实际行为
- 截图（如果适用）
- 环境信息（浏览器、操作系统）

## 💡 功能建议

请使用 [Feature Request 模板](https://github.com/AIPMAndy/jobskill/issues/new?template=feature_request.md)，包含：

- 功能描述
- 使用场景
- 为什么需要这个功能
- 可能的实现方案

## 🔧 Pull Request 流程

1. **Fork 仓库**并创建你的分支
2. **编写代码**，遵循项目代码风格
3. **添加测试**（如果适用）
4. **更新文档**（如果改变了 API）
5. **确保测试通过**：`npm run test`
6. **提交 PR**，填写 PR 模板

### PR 标题格式

```
feat: 添加邮箱集成功能
fix: 修复看板拖拽 Bug (#123)
docs: 更新贡献指南
```

## 🎨 代码风格

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件使用函数式写法
- 优先使用 React Hooks

## 📚 项目结构

```
jobskill/
├── app/              # Next.js App Router
├── components/       # React 组件
├── lib/             # 工具函数
├── data/            # 数据层
└── public/          # 静态资源
```

## 🤝 行为准则

- 尊重所有贡献者
- 保持友好和专业
- 接受建设性批评
- 关注项目目标

## 💬 需要帮助？

- [GitHub Discussions](https://github.com/AIPMAndy/jobskill/discussions)
- [Discord 社区](#)
- [Email](mailto:andy@jobskill.dev)

---

再次感谢你的贡献！🙏
