---
title: Docker 基础
description: Docker 核心概念与常用命令速览
sidebar_position: 1
---

## Docker 简介

Docker 是一个开源的容器化平台，能够将应用及其依赖打包为轻量级、可移植的容器镜像，从而实现“一次构建，到处运行”。

## 常见使用场景

- **本地开发**：以统一环境快速启动服务，避免“在我电脑上可以运行”。
- **持续集成/交付**：结合 CI/CD 管道，将镜像推送到镜像仓库并部署到各类环境。
- **多环境交付**：通过 Docker Compose 或 Kubernetes 等编排工具实现多容器协同。

## 下一步

- 了解镜像的构建流程与最佳实践。
- 熟悉常用命令（`docker build`、`docker run`、`docker ps` 等）。
- 结合容器编排平台（如 Kubernetes）管理大规模容器工作负载。
