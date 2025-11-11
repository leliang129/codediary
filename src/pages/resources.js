import React, {useMemo} from 'react';
import Layout from '@theme/Layout';
import styles from './nav.module.css';

// 资源数据配置
const resourcesData = [
  {
    id: 1,
    title: '清华源',
    url: 'https://mirrors.tuna.tsinghua.edu.cn/',
    category: '软件源',
    tags: ['软件源', '清华大学', '镜像站'],
    featured: false,
    image: '/img/react-logo.png'
  },
  {
    id: 2,
    title: '阿里源',
    url: 'https://mirrors.aliyun.com/',
    category: '软件源',
    tags: ['软件源', '阿里巴巴', '镜像站'],
    featured: false,
    image: '/img/mdn-logo.png'
  },
  {
    id: 3,
    title: '华为源',
    url: 'https://mirrors.huaweicloud.com/',
    category: '软件源',
    tags: ['软件源', '华为', '镜像站'],
    featured: false,
    image: '/img/huawei-logo.png'
  },
  {
    id: 4,
    title: 'MAVEN中央仓库',
    url: 'https://mvnrepository.com/',
    category: '软件源',
    tags: ['Maven', 'Repository', 'Central'],
    featured: false,
    image: '/img/maven-logo.png'
  },
  {
    id: 5,
    title: 'MAVEN阿里仓库',
    url: 'https://maven.aliyun.com/mvn/guide',
    category: '软件源',
    tags: ['Maven', 'Repository', '阿里云'],
    featured: false,
    image: '/img/maven-logo.png'
  },
  {
    id: 6,
    title: 'NPM淘宝源',
    url: 'https://npmmirror.com/',
    category: '软件源',
    tags: ['Package Manager', 'Node.js', 'npm'],
    featured: false,
    image: '/img/npm-logo.png'
  },
  {
    id: 7,
    title: 'Dockerfile 参考文档',
    url: 'https://deepzz.com/post/dockerfile-reference.html',
    category: '容器类',
    tags: ['Docker', 'Container', '镜像构建'],
    featured: false,
    image: '/img/kubernetes-logo.png'
  },
  {
    id: 8,
    title: 'DockerCompose生成',
    url: 'https://www.composerize.com/',
    category: '容器类',
    tags: ['docker', 'compose', '多容器应用'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 9,
    title: 'K3s',
    url: 'https://docs.k3s.io/zh/',
    category: '容器类',
    tags: ['k3s', 'kubernetes', '轻量级'],
    featured: false,
    image: '/img/k3s-logo.png'
  },
  {
    id: 10,
    title: 'Kind',
    url: 'https://kind.sigs.k8s.io/',
    category: '容器类',
    tags: ['kubernetes', 'docker', '本地开发'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 11,
    title: 'K8s API 文档',
    url: 'https://kubernetes.io/docs/reference/kubernetes-api/',
    category: '容器类',
    tags: ['kubernetes', 'API', '文档'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 12,
    title: 'Helm 仓库',
    url: 'https://artifacthub.io/',
    category: '容器类',
    tags: ['kubernetes', 'helm', 'charts'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 13,
    title: 'Helm 文档',
    url: 'https://helm.sh/',
    category: '容器类',
    tags: ['kubernetes', 'helm', '包管理'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 14,
    title: 'Registry Explorer',
    url: 'https://explore.ggcr.dev/',
    category: '容器类',
    tags: ['kubernetes', 'docker', '镜像分析'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 15,
    title: '渡渡鸟镜像同步',
    url: 'https://docker.aityp.com/',
    category: '容器类',
    tags: ['docker', '镜像同步', '加速'],
    featured: false,
    image: '/img/docker-logo.png' 
  },
  {
    id: 16,
    title: '常用工具合集',
    url: 'https://ctool.dev/',
    category: '工具类',
    tags: ['开发工具', '在线工具', '实用工具'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 17,
    title: 'Crontab 可视化',
    url: 'https://crontab-generator.org/',
    category: '工具类',
    tags: ['crontab', '定时任务', '可视化'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 18,
    title: '快速参考备忘录',
    url: 'https://wangchujiang.com/reference/',
    category: '工具类',
    tags: ['备忘录', '参考手册', '开发文档'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 19,
    title: '在线待办清单',
    url: 'https://www.ricocc.com/todo/',
    category: '工具类',
    tags: ['待办清单', '任务管理', '生产力工具'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 20,
    title: 'IP测试工具',
    url: 'https://ping.sx/ping',
    category: '工具类',
    tags: ['网络测试', 'IP诊断', '网络工具'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 21,
    title: 'Excalidraw',
    url: 'https://excalidraw.com/',
    category: '工具类',
    tags: ['白板', '绘图工具', '协作'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 22,
    title: 'openjdk镜像站',
    url: 'https://adoptium.net/zh-CN/',
    category: '工具类',
    tags: ['Java', 'OpenJDK', 'Eclipse'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 23,
    title: 'JDK下载站',
    url: 'https://www.injdk.cn/',
    category: '工具类',
    tags: ['Java', 'JDK', '下载'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 24,
    title: '临时邮箱',
    url: 'https://tempmail.plus/zh/#!',
    category: '工具类',
    tags: ['临时邮箱', '隐私保护', '测试工具'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 25,
    title: 'Email Once',
    url: 'https://email-once.com/',
    category: '工具类',
    tags: ['临时邮箱', '一次性邮箱', '测试工具'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 26,
    title: 'OPENJDK下载站',
    url: 'https://mirrors.tuna.tsinghua.edu.cn/Adoptium/',
    category: '工具类',
    tags: ['Java', 'OpenJDK', '镜像站'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 27,
    title: 'Curl 转换工具',
    url: 'https://curlconverter.com/',
    category: '工具类',
    tags: ['curl', 'HTTP', '代码生成'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 28,
    title: 'LOVART设计',
    url: 'https://www.lovart.ai/',
    category: 'AI工具',
    tags: ['AI', '工具', '合集'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 29,
    title: 'FastGPT',
    url: 'https://fastgpt.io/zh',
    category: 'AI工具',
    tags: ['AI', '工具', '合集'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 30,
    title: 'n8n',
    url: 'https://github.com/n8n-io/n8n',
    category: 'AI工具',
    tags: ['AI', '工具', '合集'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 31,
    title: 'Dify',
    url: 'https://docs.dify.ai/zh-hans/introduction',
    category: 'AI工具',
    tags: ['AI', '工具', '合集'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 32,
    title: 'ChatGPT',
    url: 'https://chatgpt.com/',
    category: 'AI工具',
    tags: ['AI', '工具', '合集'],
    featured: false,
    image: '/img/docker-logo.png'
  },
  {
    id: 33,
    title: 'Google Gemini',
    url: 'https://gemini.google.com/',
    category: 'AI工具',
    tags: ['AI', '工具', '合集'],
    featured: false,
    image: '/img/docker-logo.png'
  }
];

const categoryDescriptions = {
  软件源: '',
  容器类: '',
  工具类: '',
  AI工具: '',
};

const categoryOrder = ['软件源', '容器类', '工具类'];

const toAnchor = (name, index) => {
  const base = name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\-\u4e00-\u9fa5]/g, '')
    .toLowerCase();
  return `category-${base || index}`;
};

export default function ResourceNavigation() {

  const categories = useMemo(() => {
    const grouped = new Map();
    resourcesData.forEach((resource) => {
      if (!grouped.has(resource.category)) {
        grouped.set(resource.category, []);
      }
      grouped.get(resource.category).push(resource);
    });

    const orderedEntries = Array.from(grouped.entries()).sort((a, b) => {
      const indexA = categoryOrder.indexOf(a[0]);
      const indexB = categoryOrder.indexOf(b[0]);
      return (indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA) -
        (indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB);
    });

    return orderedEntries.map(([name, items], index) => ({
      name,
      description: categoryDescriptions[name] ?? '相关精选链接，供日常查阅。',
      anchor: toAnchor(name, index),
      items: [...items].sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN')),
    }));
  }, []);

  return (
    <Layout title="资源导航" description="常用镜像源、云原生工具与效率服务汇总">
      <main className={styles.layout}>
        <div className="container">
          {categories.map((category) => (
              <section key={category.name} id={category.anchor} className={styles.categorySection}>
                <div className={styles.sectionHeader}>
                  <h2>{category.name}</h2>
                  <span className={styles.sectionCount}>{category.items.length}</span>
                </div>
                <ul className={styles.resourceList}>
                  {category.items.map((resource) => (
                    <li key={resource.id}>
                      <a
                        className={styles.resourceItem}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={styles.resourceTitle}>{resource.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
          ))}
        </div>
      </main>
    </Layout>
  );
}
