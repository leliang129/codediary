import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Linux基础',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        系统管理、命令行操作、Shell脚本编程等Linux核心技术，
        涵盖常用命令、系统监控、性能优化等实用技能。
      </>
    ),
  },
  {
    title: '云原生技术',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Kubernetes容器编排、Prometheus监控、Docker容器化等云原生技术栈，
        现代应用部署和管理的完整解决方案。
      </>
    ),
  },
  {
    title: '脚本编程',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Python自动化脚本、Shell系统脚本、Bash编程等脚本语言技术，
        提高工作效率的自动化工具和技巧。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
