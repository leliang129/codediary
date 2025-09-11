import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function ResourceCard({title, link, icon}) {
  return (
    <Link 
      to={link}
      style={{
        display: 'block',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid var(--ifm-color-emphasis-200)',
        backgroundColor: '#ffffff',
        transition: 'all 0.3s ease',
        height: '100%',
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => { 
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => { 
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%'
      }}>
        <div style={{
          fontSize: '20px',
          marginRight: '12px',
          flexShrink: 0
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '500',
          color: 'var(--ifm-color-primary)',
          margin: 0,
          lineHeight: '1.4',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default function Resources() {
  const [expandedCategories, setExpandedCategories] = useState({});
  
  const toggleCategory = (index) => {
    setExpandedCategories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const resourceCategories = [
    {
      title: '🐧 Linux系统资源',
      resources: [
        {
          title: 'Linux命令大全',
          link: 'https://man.linuxde.net/',
          icon: '🐧'
        },
        {
          title: 'Linux性能优化',
          link: 'https://www.brendangregg.com/linuxperf.html',
          icon: '⚡'
        },
        {
          title: 'Shell脚本编程',
          link: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/',
          icon: '📜'
        },
        {
          title: 'Linux内核文档',
          link: 'https://www.kernel.org/doc/html/latest/',
          icon: '⚙️'
        }
      ]
    },
    {
      title: '☁️ 云原生技术栈',
      resources: [
        {
          title: 'Kubernetes官方文档',
          link: 'https://kubernetes.io/zh-cn/docs/',
          icon: '☸️'
        },
        {
          title: 'Prometheus监控',
          link: 'https://prometheus.io/docs/',
          icon: '📊'
        },
        {
          title: 'Docker技术手册',
          link: 'https://docs.docker.com/',
          icon: '🐳'
        },
        {
          title: 'Helm包管理器',
          link: 'https://helm.sh/zh/docs/',
          icon: '⛵'
        }
      ]
    },
    {
      title: '💻 脚本编程语言',
      resources: [
        {
          title: 'Python官方文档',
          link: 'https://docs.python.org/zh-cn/3/',
          icon: '🐍'
        },
        {
          title: '自动化运维',
          link: 'https://ansible-tran.readthedocs.io/en/latest/',
          icon: '🤖'
        },
        {
          title: 'Shell脚本教程',
          link: 'https://wangdoc.com/bash/',
          icon: '셸'
        },
        {
          title: '正则表达式',
          link: 'https://regexr.com/',
          icon: '🔍'
        }
      ]
    },
    {
      title: '🔧 开发工具链',
      resources: [
        {
          title: 'Git版本控制',
          link: 'https://git-scm.com/book/zh/v2',
          icon: '🔄'
        },
        {
          title: 'VS Code编辑器',
          link: 'https://code.visualstudio.com/docs',
          icon: '📝'
        },
        {
          title: 'Vim编辑器',
          link: 'https://vim.fandom.com/wiki/Vim_Tips_Wiki',
          icon: '⌨️'
        },
        {
          title: '正则表达式测试',
          link: 'https://regex101.com/',
          icon: '🔬'
        }
      ]
    },
    {
      title: '📦 镜像加速服务',
      resources: [
        {
          title: '清华源镜像站',
          link: 'https://mirrors.tuna.tsinghua.edu.cn/',
          icon: '🚀'
        },
        {
          title: '阿里云镜像站',
          link: 'https://developer.aliyun.com/mirror/',
          icon: '🌐'
        },
        {
          title: '华为云镜像站',
          link: 'https://mirrors.huaweicloud.com/',
          icon: '📡'
        },
        {
          title: 'Docker镜像加速',
          link: 'https://github.com/docker-practice/docker-registry-cn-mirror-test/actions',
          icon: '🐋'
        }
      ]
    }
  ];

  return (
    <Layout title="资源导航" description="有用的开发资源和工具链接">
      <main style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '80px 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'var(--ifm-color-primary)',
              margin: '0 0 16px 0',
              lineHeight: '1.2'
            }}>
              资源导航
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--ifm-color-emphasis-700)',
              margin: 0,
              lineHeight: '1.6'
            }}>
              精选的开发工具和学习资源
            </p>
          </div>

          {resourceCategories.map((category, index) => (
            <div key={index} style={{marginBottom: '40px'}}>
              <div 
                onClick={() => toggleCategory(index)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--ifm-color-primary)',
                  margin: '0 0 16px 0',
                  paddingBottom: '12px',
                  borderBottom: '2px solid var(--ifm-color-primary)',
                  cursor: 'pointer'
                }}
              >
                <h2 style={{
                  margin: 0
                }}>
                  {category.title}
                </h2>
                <span style={{
                  fontSize: '1.2rem',
                  transition: 'transform 0.2s ease'
                }}>
                  {expandedCategories[index] ? '▲' : '▼'}
                </span>
              </div>
              
              <div style={{
                display: expandedCategories[index] ? 'grid' : 'none',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px',
                alignItems: 'stretch'
              }}>
                {category.resources.map((resource, idx) => (
                  <ResourceCard key={idx} {...resource} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}