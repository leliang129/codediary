---
title: codex安装及配置
sidebar_position: 3
---

## 环境要求与准备

- **操作系统**：macOS 12及以上、主流Linux发行版或Windows（推荐在WSL2内使用）。
- **Node.js**：建议使用Node.js 18或更高版本，搭配npm。
- **终端工具**：支持Bash或Zsh的终端，确保能够访问互联网。
- **OpenAI账户**：可使用ChatGPT Plus/Pro/Team/Edu/Enterprise账号或有效的OpenAI API Key。

在继续之前，先确认本地环境：

```bash
node -v
npm -v
```

若终端提示未找到命令，请先完成Node.js环境安装。推荐参考《[Linux环境安装nvm](./nvminstall.md)》通过nvm管理Node.js版本。

## 安装 Node 环境

### 使用 nvm 安装 Node.js（推荐）

1. 安装nvm（以curl为例）：

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. 重新加载终端环境：

   ```bash
   source ~/.bashrc
   # 如果使用zsh
   source ~/.zshrc
   ```

3. 安装最新LTS版本的Node.js：

   ```bash
   nvm install --lts
   nvm alias default --lts
   ```

4. 验证版本：

   ```bash
   node -v
   npm -v
   ```

### 常用 nvm 命令速查

```bash
# 查看所有可用的远程版本
nvm ls-remote

# 切换使用指定版本
nvm use 18.20.3

# 查看本地已安装版本
nvm ls

# 卸载指定版本
nvm uninstall 16.14.0
```

## 安装 Codex CLI

Codex CLI可以通过npm、Homebrew或直接下载二进制包安装，以下列出常用方式：

### 方式一：通过 npm 全局安装（跨平台）

```bash
npm install -g @openai/codex

# 验证是否安装成功
codex --version
```

如遇到网络缓慢，可将npm源切换到国内镜像：

```bash
npm config set registry https://registry.npmmirror.com
```

### 方式二：通过 Homebrew 安装（macOS）

```bash
brew update
brew install codex
```

### 方式三：下载官方二进制包

前往 [Codex CLI GitHub Releases](https://github.com/openai/codex/releases/latest)，根据操作系统下载对应的压缩包：

- macOS (Apple Silicon)：`codex-aarch64-apple-darwin.tar.gz`
- macOS (Intel)：`codex-x86_64-apple-darwin.tar.gz`
- Linux (x86_64)：`codex-x86_64-unknown-linux-musl.tar.gz`
- Linux (arm64)：`codex-aarch64-unknown-linux-musl.tar.gz`

解压后将可执行文件重命名为`codex`并放入`PATH`目录（如`/usr/local/bin`）。

## 首次启动与登录

完成安装后，在终端直接运行：

```bash
codex
```

首次启动会进入交互式向导：

1. 选择 **Sign in with ChatGPT**，使用已有的ChatGPT套餐（Plus / Pro / Team / Edu / Enterprise）登录。
2. 按提示完成浏览器授权后返回终端，Codex会自动保存凭据。
3. 如需使用API Key，可执行：

   ```bash
   export OPENAI_API_KEY="sk-..."  # 建议只在当前shell会话中导出
   codex login --api-key "$OPENAI_API_KEY"
   ```

   或者直接在命令中附带密钥（注意终端历史记录安全）：`codex login --api-key sk-...`。

4. 使用 `codex login status` 可以查看当前登录方式。

5. 登录状态保存在 `~/.codex` 目录，若需要退出可使用 `codex logout`。

> 提示：切换账号或遇到登录异常时，可先执行 `codex logout` 清除凭据，再重新登录。

## 常用命令与配置

- `codex --help`：查看完整命令说明。
- `codex exec "你的指令"`：以非交互模式运行，适合脚本化调用。
- `codex resume`：恢复上一段会话。
- `codex apply`：将上一轮生成的补丁应用到当前仓库。
- `codex mcp`：管理并启用Model Context Protocol (MCP)服务器。

Codex的配置文件位于 `~/.codex/config.toml`，支持调整模型、沙盒策略、代理、MCP服务器等高级选项，示例：

```bash
cat > ~/.codex/config.toml << 'EOF'
model_provider = "crs"
model = "gpt-5-codex"
model_reasoning_effort = "high"
disable_response_storage = true
preferred_auth_method = "apikey"
[model_providers.crs]
name = "crs"
base_url = "<base_url>"
wire_api = "responses"
EOF
```
openai api-key
```bash
cat > ~/.codex/auth.json << 'EOF'
{
    "OPENAI_API_KEY": "xxxxxx"
}
EOF
```
> 提示：执行/logout退出之后需要重新配置auth.json    

也可以在运行命令时临时覆盖配置：

```bash
codex -c model="o4-preview" --sandbox read-only
```

## 更新与卸载

- **npm安装用户**：

  ```bash
  npm update -g @openai/codex   # 更新
  npm uninstall -g @openai/codex
  ```

- **Homebrew用户**：

  ```bash
  brew upgrade codex
  brew uninstall codex
  ```

- **二进制包用户**：重新下载最新压缩包替换旧版本即可，卸载时删除安装目录中的`codex`可执行文件。

## 常见问题与排查

- **Node.js 版本过低**：运行 `node -v` 确认版本，低于18需使用nvm升级。
- **登录失败或无法弹出浏览器**：确保网络可以访问 `chat.openai.com`，必要时使用 `codex login --api-key` 并提前准备好API Key。
- **执行命令缺少权限**：如需更高权限，可在命令中指定 `--sandbox danger-full-access` 或根据实际情况放宽权限策略。
- **国内网络下载缓慢**：使用npm镜像或通过离线二进制包安装。
- **配置生效问题**：修改 `~/.codex/config.toml` 后，可重启终端或运行 `codex --help` 验证是否加载到新配置。

更多高级用法、MCP配置与FAQ，可查阅官方文档：[https://developers.openai.com/codex/cli/](https://developers.openai.com/codex/cli/)。
