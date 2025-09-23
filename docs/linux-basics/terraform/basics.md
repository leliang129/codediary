---
id: basics
title: Terraform 基础入门
sidebar_label: 基础入门
sidebar_position: 1
---

Terraform 是 HashiCorp 推出的开源基础设施即代码（Infrastructure as Code, IaC）工具，可以通过声明式配置文件自动化地创建、变更和销毁各类云资源。下面从安装、核心概念、常用命令以及初次实践四个方面介绍 Terraform 的基础知识。

## 安装与环境准备

Terraform 的发布包为单个二进制文件，Linux 下只需下载并放入 `PATH` 中即可使用。

```bash
curl -fsSL https://releases.hashicorp.com/terraform/1.9.5/terraform_1.9.5_linux_amd64.zip -o terraform.zip
unzip terraform.zip
sudo mv terraform /usr/local/bin/
terraform version
```

常见的 Linux 发行版也可以使用包管理器安装：

- Debian/Ubuntu: `sudo apt-get install terraform`
- RHEL/CentOS: `sudo dnf install terraform`
- 使用 Homebrew: `brew install terraform`

> 提示：Terraform 依赖有效的云提供商凭据（如 AWS_ACCESS_KEY_ID），后续实践前务必正确配置。

## 核心概念

- **Provider**：云服务或平台的插件，决定 Terraform 能管理哪些资源，例如 `aws`、`azurerm`、`kubernetes`。
- **Resource**：由 Provider 定义的基础设施对象，如虚拟机、VPC、数据库实例等。
- **Data Source**：只读资源，用于查询现有基础设施信息并在配置中引用。
- **State**：Terraform 保存的基础设施期望状态与实际状态的映射，默认存储为 `terraform.tfstate` 文件。
- **Module**：一组可复用的 Terraform 配置，方便封装与分享。

了解上述概念有助于阅读官方文档和社区模块。

## 编写第一个配置

以下示例演示如何在 AWS 中创建一台 EC2 实例。建立目录结构后，新建 `main.tf` 并填入基础配置。

```hcl
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-east-1"
}

resource "aws_instance" "example" {
  ami           = "ami-08ff54a685f975d3c"
  instance_type = "t3.micro"
  tags = {
    Name = "terraform-demo"
  }
}
```

> 演示使用公共 AMI，仅供测试；生产环境请选择符合安全策略的镜像。

## 常用命令工作流

1. **初始化**：安装需要的 Provider 与模块。

   ```bash
   terraform init
   ```

2. **预览变更**：生成执行计划，确保资源修改符合预期。

   ```bash
   terraform plan
   ```

3. **应用变更**：根据计划创建或更新资源。

   ```bash
   terraform apply
   ```

4. **销毁资源**：删除当前状态中的所有资源。

   ```bash
   terraform destroy
   ```

通用命令选项：

- `-var`/`-var-file`：传入变量；
- `-auto-approve`：跳过交互确认；
- `-target`：仅操作指定资源，适合局部调试。

## 状态文件管理

- 默认文件：`terraform.tfstate`，记录资源 ID、依赖关系等。
- `.tfstate.backup`：最后一次成功状态的备份。
- 建议使用 `.gitignore` 忽略状态文件，避免敏感信息泄露。

> 默认本地状态适用于单人环境；团队协作请搭配远程后端（见进阶篇）。

## 输入变量与输出

通过变量增强配置复用性。例如在 `variables.tf` 中定义：

```hcl
variable "instance_type" {
  type        = string
  default     = "t3.micro"
  description = "EC2 实例规格"
}
```

在资源中引用 `var.instance_type`，运行时可通过 `-var` 或 `*.tfvars` 文件覆盖。使用 `output` 块暴露关键信息：

```hcl
output "public_ip" {
  description = "Demo 实例的公网 IP"
  value       = aws_instance.example.public_ip
}
```

`terraform output` 可以查看执行结果，便于后续脚本或工具链使用。

## 小结

- Terraform 采用声明式语法描述基础设施，适合版本化管理。
- 常见流程：编写配置 → `init` → `plan` → `apply`。
- 管理好状态文件与变量，为团队协作和自动化打好基础。

继续阅读进阶篇，了解模块化设计、远程状态、工作区以及在 CI/CD 中集成 Terraform 的最佳实践。
