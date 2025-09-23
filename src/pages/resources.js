import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './nav.module.css';

// 资源数据配置
const resourcesData = [
  {
    id: 1,
    title: '清华源',
    description: '清华大学开源软件镜像站，提供各种开源软件的高速下载服务，包括操作系统、开发工具等',
    url: 'https://mirrors.tuna.tsinghua.edu.cn/',
    category: '软件源',
    tags: ['软件源', '清华大学', '镜像站'],
    featured: false,
    image: '/img/react-logo.png'
  },
  {
    id: 2,
    title: '阿里源',
    description: '阿里巴巴开源软件镜像站，提供国内外主流开源软件的镜像服务，加速软件下载',
    url: 'https://mirrors.aliyun.com/',
    category: '软件源',
    tags: ['软件源', '阿里巴巴', '镜像站'],
    featured: false,
    image: '/img/mdn-logo.png'
  },
  {
    id: 3,
    title: '华为源',
    description: '华为开源软件镜像站，提供多种开源软件和开发工具的镜像服务',
    url: 'https://mirrors.huaweicloud.com/',
    category: '软件源',
    tags: ['软件源', '华为', '镜像站'],
    featured: false,
    image: '/img/huawei-logo.png'
  },
  {
    id: 4,
    title: 'MAVEN中央仓库',
    description: 'Maven中央仓库，Java开发中最重要的依赖管理仓库，包含大量开源Java库',
    url: 'https://mvnrepository.com/',
    category: '软件源',
    tags: ['Maven', 'Repository', 'Central'],
    featured: false,
    image: '/img/maven-logo.png'
  },
  {
    id: 5,
    title: 'MAVEN阿里仓库',
    description: '阿里云Maven仓库，提供更快的Maven依赖下载速度，支持国内开发者',
    url: 'https://maven.aliyun.com/mvn/guide',
    category: '软件源',
    tags: ['Maven', 'Repository', '阿里云'],
    featured: false,
    image: '/img/maven-logo.png'
  },
  {
    id: 6,
    title: 'NPM淘宝源',
    description: '淘宝NPM镜像站，提供更快的Node.js包下载服务，加速前端开发',
    url: 'https://npmmirror.com/',
    category: '软件源',
    tags: ['Package Manager', 'Node.js', 'npm'],
    featured: false,
    image: '/img/npm-logo.png'
  },
  {
    id: 7,
    title: 'Dockerfile 参考文档',
    description: 'Dockerfile编写参考文档，详细介绍Docker镜像构建的最佳实践',
    url: 'https://deepzz.com/post/dockerfile-reference.html',
    category: '容器类',
    tags: ['Docker', 'Container', '镜像构建'],
    featured: false,
    image: '/img/kubernetes-logo.png'
  },
  {
    id: 8,
    title: 'DockerCompose文件生成器',
    description: 'Docker Compose文件生成工具，帮助快速创建多容器应用配置文件',
    url: 'https://www.composerize.com/',
    category: '容器类',
    tags: ['docker', 'compose', '多容器应用'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 9,
    title: 'K3s',
    description: '轻量级Kubernetes发行版，专为边缘计算、物联网和开发测试环境设计',
    url: 'https://docs.k3s.io/zh/',
    category: '容器类',
    tags: ['k3s', 'kubernetes', '轻量级'],
    featured: false,
    image: '/img/k3s-logo.png'
  },
  {
    id: 10,
    title: 'Kind',
    description: 'Kubernetes in Docker，用于本地开发和测试的K8s工具，快速创建集群',
    url: 'https://kind.sigs.k8s.io/',
    category: '容器类',
    tags: ['kubernetes', 'docker', '本地开发'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 11,
    title: 'K8s API 文档',
    description: 'Kubernetes官方API文档，详细说明各种资源对象的API规范和使用方法',
    url: 'https://kubernetes.io/docs/reference/kubernetes-api/',
    category: '容器类',
    tags: ['kubernetes', 'API', '文档'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 12,
    title: 'Helm 仓库',
    description: 'Artifact Hub，Helm Charts仓库，提供大量预配置的K8s应用包',
    url: 'https://artifacthub.io/',
    category: '容器类',
    tags: ['kubernetes', 'helm', 'charts'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 13,
    title: 'Helm 文档',
    description: 'Helm官方文档，Kubernetes包管理器的完整使用指南和最佳实践',
    url: 'https://helm.sh/',
    category: '容器类',
    tags: ['kubernetes', 'helm', '包管理'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 14,
    title: 'Registry Explorer',
    description: '容器镜像仓库浏览器，可视化查看和分析Docker镜像内容',
    url: 'https://explore.ggcr.dev/',
    category: '容器类',
    tags: ['kubernetes', 'docker', '镜像分析'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 15,
    title: '渡渡鸟镜像同步',
    description: 'Docker镜像同步工具，帮助在国内网络环境下快速获取海外镜像',
    url: 'https://docker.aityp.com/',
    category: '容器类',
    tags: ['docker', '镜像同步', '加速'],
    featured: false,
    image: '/img/docker-logo.png' 
  },
  {
    id: 16,
    title: '常用工具合集',
    description: '程序员常用工具集合，包含JSON格式化、Base64编码、时间戳转换等实用工具',
    url: 'https://ctool.dev/',
    category: '工具类',
    tags: ['开发工具', '在线工具', '实用工具'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 17,
    title: 'Crontab 可视化',
    description: 'Crontab表达式可视化生成器，帮助开发者轻松创建定时任务表达式',
    url: 'https://crontab-generator.org/',
    category: '工具类',
    tags: ['crontab', '定时任务', '可视化'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 18,
    title: '快速参考备忘录',
    description: '开发者快速参考备忘录，包含各种编程语言和工具的常用命令和语法',
    url: 'https://wangchujiang.com/reference/',
    category: '工具类',
    tags: ['备忘录', '参考手册', '开发文档'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 19,
    title: '在线待办清单',
    description: '简洁的在线待办事项管理工具，支持任务分类和优先级设置',
    url: 'https://www.ricocc.com/todo/',
    category: '工具类',
    tags: ['待办清单', '任务管理', '生产力工具'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 20,
    title: 'IP测试工具',
    description: '网络IP测试工具，支持Ping、Traceroute等多种网络诊断功能',
    url: 'https://ping.sx/ping',
    category: '工具类',
    tags: ['网络测试', 'IP诊断', '网络工具'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 21,
    title: 'Excalidraw',
    description: '手绘风格的在线白板工具，支持团队协作绘制图表和思维导图',
    url: 'https://excalidraw.com/',
    category: '工具类',
    tags: ['白板', '绘图工具', '协作'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 22,
    title: 'openjdk镜像站',
    description: 'Eclipse Adoptium项目，提供高质量的OpenJDK发行版下载',
    url: 'https://adoptium.net/zh-CN/',
    category: '工具类',
    tags: ['Java', 'OpenJDK', 'Eclipse'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 23,
    title: 'JDK下载站',
    description: '多种JDK发行版下载站，提供Oracle JDK、OpenJDK等不同厂商的Java开发包',
    url: 'https://www.injdk.cn/',
    category: '工具类',
    tags: ['Java', 'JDK', '下载'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 24,
    title: '临时邮箱',
    description: '临时邮箱服务，用于注册测试账号或保护个人隐私的在线邮箱',
    url: 'https://tempmail.plus/zh/#!',
    category: '工具类',
    tags: ['临时邮箱', '隐私保护', '测试工具'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 25,
    title: 'Email Once',
    description: '一次性邮箱服务，提供临时邮箱地址用于验证和测试',
    url: 'https://email-once.com/',
    category: '工具类',
    tags: ['临时邮箱', '一次性邮箱', '测试工具'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 26,
    title: 'OPENJDK下载站',
    description: '清华大学Adoptium镜像站，提供高速的OpenJDK下载服务',
    url: 'https://mirrors.tuna.tsinghua.edu.cn/Adoptium/',
    category: '工具类',
    tags: ['Java', 'OpenJDK', '镜像站'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 27,
    title: 'Curl 转换工具',
    description: 'Curl命令转换工具，支持将Curl命令转换为多种编程语言的HTTP请求代码',
    url: 'https://curlconverter.com/',
    category: '工具类',
    tags: ['curl', 'HTTP', '代码生成'],
    featured: false,
    image: '/img/docker-logo.png'
  },
];

const tileColors = ['#f8637b', '#4c8dff', '#44c392', '#f8b84c', '#9372ff', '#2cc0f4'];

const truncateText = (text, maxLength = 42) => (text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text);

// Dashboard-style landing page inspired by Sun-Panel
export default function ResourceNavigation() {
  const {siteConfig} = useDocusaurusContext();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const categoriesWithResources = useMemo(() => {
    const grouped = new Map();
    resourcesData.forEach((resource) => {
      if (!grouped.has(resource.category)) {
        grouped.set(resource.category, []);
      }
      grouped.get(resource.category).push(resource);
    });
    return Array.from(grouped.entries());
  }, []);

  const formattedTime = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const formattedDate = now.toLocaleDateString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  });

  return (
    <Layout title="资源导航" description="精选的开发资源和工具导航页面">
      <div className={styles.dashboard}>
        <div className={styles.gradientBackground} />
        <div className={styles.dashboardContent}>
          <header className={styles.heroArea}>
            <div className={styles.branding}>{siteConfig.title ?? 'sonews'}</div>
            <div className={styles.clockBox}>
              <span className={styles.time}>{formattedTime}</span>
              <span className={styles.date}>{formattedDate}</span>
            </div>
          </header>

          <main className={styles.tilesArea}>
            {categoriesWithResources.map(([category, items], categoryIndex) => (
              <section key={category} className={styles.tilesRow}>
                <div className={styles.rowHeader}>
                  <h2 className={styles.rowTitle}>{category}</h2>
                  <span className={styles.rowCount}>{items.length} 个资源</span>
                </div>
                <div className={styles.tilesRowList}>
                  {items.map((resource, tileIndex) => {
                    const color = tileColors[(categoryIndex * tileColors.length + tileIndex) % tileColors.length];
                    return (
                      <Link
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.tile}
                        style={{'--tile-color': color}}
                      >
                        <div className={styles.tileInner}>
                          {resource.image && (
                            <img
                              src={resource.image}
                              alt={resource.title}
                              className={styles.tileIcon}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                          <span className={styles.tileName}>{resource.title}</span>
                        </div>
                        <span className={styles.tileSubtitle}>{truncateText(resource.description)}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </Layout>
  );
}
