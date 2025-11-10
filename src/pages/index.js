import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const docSections = [
  {
    title: '🧠 Linux 基础',
    description: '从命令行、权限、服务管理到日志监控，涵盖日常运维必备技能。',
    items: [
      {
        title: 'Linux 入门指南',
        description: '建立对系统结构、常用命令的整体认识。',
        href: '/docs/linux-basics/intro',
      },
      {
        title: '命令与网络工具',
        description: '常用命令、网络排障与诊断技巧。',
        href: '/docs/linux-basics/commands/netools',
      },
      {
        title: '监控与日志',
        description: '系统监控、日志分析与常见告警处理。',
        href: '/docs/linux-basics/system-admin/system-monitoring',
      },
    ],
  },
  {
    title: '☁️ 云原生实践',
    description: 'Kubernetes、容器仓库、监控告警等专题，帮助你完成集群部署与运维。',
    items: [
      {
        title: 'Kubernetes 专题',
        description: '从集群搭建到进阶组件的完整讲解。',
        href: '/docs/cloud-native/kubernetes/intro',
      },
      {
        title: 'Harbor 镜像仓库',
        description: '企业级镜像管理与安全加固实践。',
        href: '/docs/cloud-native/kubernetes/harbor',
      },
      {
        title: 'Prometheus 观测',
        description: '指标采集、告警规则与常见可观测方案。',
        href: '/docs/cloud-native/prometheus/intro',
      },
    ],
  },
  {
    title: '⚙️ 脚本与自动化',
    description: 'Python、Shell 等脚本语言案例，帮助你将重复工作自动化。',
    items: [
      {
        title: '脚本语言概览',
        description: '了解 Python / Shell 等章节的组织方式。',
        href: '/docs/scripting-languages/intro',
      },
      {
        title: 'Python 自动化',
        description: '函数、模块与实用脚本示例。',
        href: '/docs/scripting-languages/python/pythonseparation-line',
      },
      {
        title: 'Shell 实战',
        description: '编写高效脚本处理日常排障与资源管理。',
        href: '/docs/scripting-languages/shell/intro',
      },
    ],
  },
];

// const extraLinks = [
//   {
//     label: '资源导航',
//     description: '常用镜像源、在线工具合集。',
//     href: '/resources',
//   },
//   {
//     label: '技术博客',
//     description: '同步实战文章与案例分析。',
//     href: '/blog',
//   },
// ];

export default function Home() {
  return (
    <Layout title="Is Liang的烂笔头" description="Linux · 云原生 · 脚本自动化中文文档">
      <main>

        {docSections.map((section) => (
          <section key={section.title} className={styles.topicSection}>
            <div className="container">
              <div className={styles.topicHeader}>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
              <div className={styles.topicGrid}>
                {section.items.map((item) => (
                  <Link key={item.title} className={styles.topicCard} to={item.href}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* <section className={styles.extraSection}>
          <div className="container">
            <div className={styles.extraGrid}>
              {extraLinks.map((link) => (
                <Link key={link.label} className={styles.extraCard} to={link.href}>
                  <strong>{link.label}</strong>
                  <span>{link.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section> */}
      </main>
    </Layout>
  );
}
