import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--8">
            <Heading as="h1" className="hero__title">
              🚀 sonews | 技术学习笔记
            </Heading>
            <p className="hero__subtitle">
              🎯 专注Linux系统管理 | 云原生技术栈 | 脚本编程实战 <br/>
              📚 从入门到精通的技术成长之路
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/linux-basics/intro">
                📖 开始探索
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function TechnologyCards() {
  const technologies = [
    {
      title: '🐧 Linux基础',
      description: '系统管理、命令行操作、Shell脚本',
      link: '/docs/linux-basics/intro',
      features: ['常用命令', '系统监控', '性能优化', 'Shell编程']
    },
    {
      title: '☁️ 云原生',
      description: '容器化、编排、监控、DevOps',
      link: '/docs/cloud-native/intro',
      features: ['Kubernetes', 'Prometheus', 'Docker', 'CI/CD']
    },
    {
      title: '💻 脚本编程',
      description: '自动化、工具开发、任务处理',
      link: '/docs/scripting-languages/intro',
      features: ['Python', 'Shell', 'Bash', '自动化']
    }
  ];

  return (
    <section className={styles.technologies}>
      <div className="container">
        <div className="row">
          {technologies.map((tech, idx) => (
            <div key={idx} className="col col--4">
              <div className="card">
                <div className="card__header">
                  <h3>{tech.title}</h3>
                </div>
                <div className="card__body">
                  <p>{tech.description}</p>
                  <ul>
                    {tech.features.map((feature, i) => (
                      <li key={i}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--primary button--block"
                    to={tech.link}>
                    学习更多
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <Layout
      title="技术学习笔记 | Linux系统管理 & 云原生技术 & 脚本编程"
      description="个人技术学习笔记网站，包含Linux系统管理、云原生技术栈、脚本编程语言的详细教程和实践经验">
      <HomepageHeader />
      <main>
        <TechnologyCards />
      </main>
    </Layout>
  );
}