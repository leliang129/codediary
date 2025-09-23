---
id: advanced
title: Terraform 进阶实践
sidebar_label: 进阶实践
sidebar_position: 2
---

在掌握基础语法后，可以通过远程状态管理、模块设计、工作区以及团队协作流程进一步提高 Terraform 项目的可维护性。本篇对这些主题进行总结，并提供排错与优化建议。

## 远程状态与锁

本地状态文件适合个人环境，但在多人协同时需要集中存储与版本控制，常见做法是使用远程后端（Backend）。以下示例演示在 AWS S3 + DynamoDB 上启用远程状态及独占锁：

```hcl
terraform {
  backend "s3" {
    bucket         = "iac-demo-state"
    key            = "prod/network/terraform.tfstate"
    region         = "ap-east-1"
    dynamodb_table = "iac-demo-lock"
    encrypt        = true
  }
}
```

配置完成后执行 `terraform init -migrate-state` 迁移现有状态。远程后端的好处：

- 自动版本化与集中备份；
- 通过锁机制避免并发修改；
- 结合 IAM 或 KMS 提升安全性。

## 模块化设计与版本控制

模块可以拆分重复的资源配置，便于在多个环境重用。推荐目录结构：

```
modules/
  network/
    main.tf
    variables.tf
    outputs.tf
envs/
  prod/
    main.tf
  staging/
    main.tf
```

引用模块时显式声明版本，确保环境一致性：

```hcl
module "vpc" {
  source  = "git::https://github.com/example/terraform-modules.git//network?v=1.2.0"
  cidr_block = "10.0.0.0/16"
  az_count   = 3
}
```

> 同一模块可以通过不同变量组合实现差异化部署，尽量保持幂等和无副作用。

## 工作区（Workspace）策略

`terraform workspace` 允许在同一配置下维护多个状态，常见用于 dev/staging/prod 区分：

```bash
terraform workspace new staging
terraform workspace select staging
```

在配置文件中使用 `terraform.workspace` 区分资源命名：

```hcl
resource "aws_s3_bucket" "artifact" {
  bucket = "ci-artifacts-${terraform.workspace}"
}
```

工作区适合轻量级环境区分，但若差异较大，仍建议拆分目录或模块。

## 变量文件与密钥管理

- 使用 `*.tfvars` 与 `-var-file` 管理不同环境变量。
- 将敏感信息放入 `terraform.tfvars.json` 并结合 `git-crypt`、`sops` 或密钥管理服务（如 AWS Secrets Manager）。
- 自 Terraform 1.1 起，可使用 `TF_VAR_xxx` 环境变量传递密钥或从 CI 管道注入。

## 测试与验证

- 语法检查：`terraform fmt -check`、`terraform validate`。
- 静态扫描：`tfsec`、`checkov` 可识别安全配置问题。
- 单元测试：`terratest`（Go 语言）支持对模块的部署与回滚测试。

建议在 CI 中增加格式化、验证与安全扫描步骤，阻止风险配置合入主干。

## 与 CI/CD 集成

典型流水线：

1. `terraform fmt`/`validate` → 确保语法一致；
2. `terraform plan -out=tfplan` → 生成计划文件；
3. 审核通过后再 `terraform apply tfplan`；
4. 使用远程状态后端及单独的服务账号执行，减少权限泄露风险。

针对多环境，可在流水线中切换工作区或指定不同的变量文件。

## 常见问题排查

- **计划与实际不一致**：检查是否修改了状态文件或外部手工改动资源。必要时执行 `terraform refresh` 或 `import` 将资源纳入管理。
- **Provider 版本冲突**：在 `required_providers` 中锁定版本，并运行 `terraform init -upgrade` 更新依赖。
- **状态锁超时**：查看后端锁表（如 DynamoDB）并确认是否有正在执行的任务，必要时释放锁再操作。
- **资源漂移**：结合 `terraform plan` 和 `terraform state list/show` 定位差异，使用生命周期参数 `ignore_changes` 降低噪声，但需谨慎使用。

## 最佳实践清单

- 强制执行代码审查与计划输出审核。
- 将模块与环境配置分别管理，选择合适的版本控制策略（Git 子模块、私有模块注册表等）。
- 使用 `locals` 抽象公共逻辑，避免硬编码字符串。
- 在生产环境启用远程状态、锁和加密。
- 避免在模块中直接使用可变数据源，必要时在上层提供输入。

通过以上进阶实践，可以让 Terraform 项目在团队场景下保持可维护、可审计和安全合规。结合基础篇的内容，即可建立完整的 IaC 工作流程。
