---
title: Linux环境安装nvm
sidebar_position: 1
---

# Linux环境安装nvm

## 什么是nvm

nvm（Node Version Manager）是一个用于管理多个Node.js版本的bash脚本。它允许您在同一台机器上安装和切换不同的Node.js版本，非常适合需要在不同项目中使用不同Node.js版本的开发者。

### 主要功能

- 安装多个Node.js版本
- 在已安装的版本之间无缝切换
- 设置默认Node.js版本
- 管理全局包和npm版本

## 安装nvm

### 方法一：使用curl安装（推荐）

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### 方法二：使用wget安装

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### 安装后配置

安装完成后，需要重新加载配置文件或重新打开终端：

```bash
source ~/.bashrc
# 如果使用zsh
source ~/.zshrc
```

### 验证安装

```bash
nvm --version
```

如果显示版本号，说明安装成功。

## 使用nvm管理Node.js版本

### 安装Node.js版本

```bash
# 安装最新的Node.js稳定版本
nvm install node

# 安装特定版本
nvm install 16.14.0

# 安装最新的LTS版本
nvm install --lts
```

### 查看可用版本

```bash
# 查看本地已安装的版本
nvm list

# 查看所有可安装的远程版本
nvm list-remote
```

### 切换Node.js版本

```bash
# 切换到最新版本
nvm use node

# 切换到特定版本
nvm use 16.14.0

# 设置默认版本
nvm alias default 16.14.0
```

### 卸载Node.js版本

```bash
nvm uninstall 16.14.0
```

## 高级用法

### 使用.nvmrc文件

在项目根目录创建`.nvmrc`文件指定Node.js版本：

```bash
echo "16.14.0" > .nvmrc
```

在项目目录中使用该版本：

```bash
nvm use
```

### 使用国内镜像加速

设置npm镜像：

```bash
npm config set registry https://registry.npmmirror.com
```

### 常用命令总结

| 命令 | 说明 |
|------|------|
| `nvm --version` | 查看nvm版本 |
| `nvm install <version>` | 安装指定版本 |
| `nvm use <version>` | 切换到指定版本 |
| `nvm list` | 列出已安装版本 |
| `nvm list-remote` | 列出可安装版本 |
| `nvm alias default <version>` | 设置默认版本 |
| `nvm current` | 显示当前使用版本 |
| `nvm which <version>` | 显示指定版本的路径 |

## 故障排除

### nvm命令未找到

如果安装后`nvm`命令不可用，请检查：

1. 确认配置文件是否正确加载
2. 检查`~/.nvm`目录是否存在
3. 手动添加以下内容到`~/.bashrc`或`~/.zshrc`：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

然后重新加载配置：

```bash
source ~/.bashrc
```

通过以上步骤，您就可以在Linux环境中成功安装和使用nvm来管理Node.js版本了。