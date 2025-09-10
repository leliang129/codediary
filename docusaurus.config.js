// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'sonews',
  tagline: 'Linux • 云原生 • 脚本编程',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'sonews',
        logo: {
          alt: 'My Site Logo',
          src: 'img/favicon.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '入门指南',
          },
          {
            type: 'dropdown',
            label: 'Linux基础教程',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'linuxIntroSidebar',
                label: ' Linux基础教程',
              },
              {
                type: 'docSidebar',
                sidebarId: 'linuxSystemSidebar',
                label: ' Linux系统管理',
              },
              {
                type: 'docSidebar',
                sidebarId: 'linuxdatabaseSidebar',
                label: ' 数据库管理',
              }
            ],
          },
          {
            type: 'dropdown',
            label: '云原生',
            position: 'left',
            items: [
              // {
              //   type: 'docSidebar',
              //   sidebarId: 'cloudNativeSidebar',
              //   label: '云原生概览',
              // },
              {
                type: 'docSidebar',
                sidebarId: 'kubernetesSidebar',
                label: 'Kubernetes',
              },
              {
                type: 'docSidebar',
                sidebarId: 'prometheusSidebar',
                label: 'Prometheus',
              },
            ],
          },
          {
            type: 'dropdown',
            label: '脚本语言',
            position: 'left',
            items: [
              // {
              //   type: 'docSidebar',
              //   sidebarId: 'scriptingIntroSidebar',
              //   label: '脚本语言概览',
              // },
              {
                type: 'docSidebar',
                sidebarId: 'pythonSidebar',
                label: 'Python脚本',
              },
              {
                type: 'docSidebar',
                sidebarId: 'shellSidebar',
                label: 'Shell脚本',
              },
            ],
          },
          {
            type: 'dropdown',
            label: '更多',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'softwareSidebar',
                label: '运维工具',
              },
              {
                type: 'docSidebar',
                sidebarId: 'troubleshootingSidebar',
                label: '故障记录',
              },
            ],
          },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: 'Linux基础',
                to: '/docs/linux-basics/intro',
              },
              {
                label: '云原生',
                to: '/docs/cloud-native/intro',
              },
              {
                label: '脚本语言',
                to: '/docs/scripting-languages/intro',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/',
              },
              {
                label: '技术论坛',
                href: 'https://example.com',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 技术笔记. 基于 Docusaurus 构建.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
