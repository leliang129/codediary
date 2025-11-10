---
title: 入门指南
sidebar_position: 1
---

## 🎯 说明   
    - 俗话说，好记性不如烂笔头，建站本意是借助GitHub&cloudflare的便捷性来确保更换设备不丢失这部分学习笔记，希望能够养成勤记笔记的习惯吧。
## ✨ 站点特性

- **主题化结构**：内容按「Linux 基础、云原生、脚本语言、工具/资源」分层收纳，快速定位主题。
- **代码优先**：示例都以命令或脚本为核心，少讲套话，便于直接复制到终端。
- **搜索即达**：`Cmd/Ctrl + K` 唤出全局搜索，支持中文、拼音与英文关键字。
- **持续沉淀**：排障记录、Runbook 模版都可以在对应目录补充，长期积累个人知识库。

## 📚 内容概览

| 模块 | 亮点 | 适合人群 |
| --- | --- | --- |
| **Linux 基础**  | 权限管理、服务日志、命令速查、系统调优 | Linux 初学者、运维工程师 |
| **云原生** | Kubernetes、Prometheus、镜像仓库与可观测性 | 平台团队、SRE、DevOps |
| **脚本语言** | Python / Shell 自动化片段与常见库速查 | 自动化/工具开发相关角色 |
| **工具 / 资源** | 常用软件清单、镜像源、在线工具入口 | 新人入职、环境搭建 |
| **Troubleshooting** | 故障复盘、排障模板、常见告警处理 | 值班同学、On-Call 场景 |

## 🚀 推荐路线

1. **新手**：Linux 基础 → Shell/Python → 工具/资源 → 故障记录。
2. **运维 / SRE**：Linux 基础 → 云原生 → Prometheus → Troubleshooting 模板。
3. **开发 / 自动化**：脚本语言 → Linux 命令速查 → 云原生 CI/CD 章节。

目录结构一览：

```text
docs/
├── intro/                 # 入门指南（当前页面）
├── linux-basics/          # Linux 基础 + 系统管理
├── cloud-native/          # Kubernetes / Prometheus
├── scripting-languages/   # Python / Shell
├── other/software         # 常用软件 / 镜像源 / 工具
└── other/troubleshooting  # 故障记录与模板
```

## 🔍 快速定位内容

1. **侧边栏**：按模块展开章节，适合顺序阅读。
2. **全局搜索**：`Cmd/Ctrl + K` 输入关键字即可跳转到标题或具体段落。
3. **标签 / 资源页**：共用的镜像源、环境变量等集中在 `docs/other/software`。
4. **代码块复制**：示例代码均内置复制按钮，确保复制即用。

## 🛠 本地调试 & 贡献

```bash
yarn install        # 安装依赖
yarn start          # 本地开发（含热更新）
yarn build          # 生成静态站点
yarn deploy         # 可选：推送到 gh-pages
```

- 推荐 Node.js 18+，配合 `corepack enable` 保持 Yarn 版本一致。
- 任何文档改动都可以先运行 `yarn start` 进行本地预览，检查目录与代码块渲染。

## 🤝 写作与贡献建议

1. **结构化**：拆分为「背景 / 步骤 / 验证 / 常见坑」，方便复现。
2. **自包含**：命令要给出上下文（目标节点、依赖、示例输出）。
3. **可复制**：尽量用 bash 代码块或表格，使读者无需修改即可执行。
4. **提交方式**：通过 Issue / PR 补充脚本、排障案例或修正文档，注明适用场景和环境。

## ✅ 下一步

- 不确定入口 → 阅读 `docs/linux-basics/intro`。
- 准备搭建容器平台 → 查看 `docs/cloud-native/kubernetes`。
- 想要自动化脚本模板 → 浏览 `docs/scripting-languages`。
- 只想找到常用软件或镜像源 → 访问 `docs/other/software`。

