const translations = {
    en: {
        nav: {
            home: "Home",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact",
            resources: "Resources"
        },
        hero: {
            greeting: "Hi, I'm PPY",
            role: "Backend Developer",
            description1: "Passionate about programming and creation",
            description2: "3 years of development experience, specializing in backend development and system architecture",
            viewSkills: "View Skills",
            contactMe: "Contact Me"
        },
        about: {
            title: "About Me",
            description: "I'm a backend developer with a passion for creating elegant solutions to complex problems. With 3 years of experience in system architecture and development, I specialize in building high-performance, scalable backend services. I'm also enthusiastic about AI technology and its applications in software development."
        },
        skills: {
            title: "Expertise",
            languages: "Programming Languages",
            devSkills: "Development Skills",
            categories: {
                database: "Database",
                cloud: "Cloud Services",
                tools: "Development Tools",
                ai: "AI",
                os: "Operating Systems"
            },
            descriptions: {
                java: "Enterprise development with Spring Boot, microservices architecture",
                javascript: "Modern JavaScript development with Node.js",
                python: "Data analysis with NumPy, Pandas, and visualization",
                go: "High-performance backend services with Go",
                git: "Version control and collaborative development",
                docker: "Containerization and deployment automation",
                ai: "LLM applications and AI integration",
                database: "MySQL, Redis, MongoDB optimization",
                cloud: "AWS, Alibaba Cloud, Tencent Cloud",
                os: "Proficient in Linux, Mac, and Win development environments"
            }
        },
        contact: {
            title: "Contact",
            email: "Email copied!",
            github: "View GitHub Profile",
            wechat: "WeChat ID copied!",
            gitee: "View Gitee Profile"
        },
        projects: {
            title: "Projects",
            stockAnalysis: {
                title: {
                    en: "Stock Sector Data Correlation Analysis",
                    zh: "股票板块数据相关性分析"
                },
                description: {
                    en: "A Python-based stock market data analysis tool with features including data collection, correlation analysis, and clustering analysis.",
                    zh: "基于Python的股票市场数据分析工具，实现了数据采集、相关性分析和聚类分析等功能。采用模块化设计，具有高扩展性和可维护性。"
                },
                feature1: {
                    en: "Data Collection & Preprocessing",
                    zh: "数据采集与预处理"
                },
                feature2: {
                    en: "Correlation Analysis",
                    zh: "相关性分析"
                },
                feature3: {
                    en: "Clustering Analysis",
                    zh: "聚类分析"
                }
            },
            ecommerce: {
                title: {
                    en: "Distributed E-commerce Order Management System",
                    zh: "分布式电商订单管理系统"
                },
                description: {
                    en: "Developed and optimized a highly available distributed order management system supporting complete order lifecycle. Processing 50k+ daily orders.",
                    zh: "开发并优化高可用分布式订单管理系统，支持订单创建、支付、库存管理等完整流程。系统日订单处理量5万+。"
                },
                feature1: {
                    en: "Distributed Architecture",
                    zh: "分布式架构设计"
                },
                feature2: {
                    en: "Distributed Transaction",
                    zh: "分布式事务处理"
                },
                feature3: {
                    en: "High Performance",
                    zh: "高性能优化"
                }
            },
            pythonTools: {
                title: {
                    en: "Python Utility Tools",
                    zh: "Python 实用工具集"
                },
                description: {
                    en: "Developed a series of Python utility tools, including batch file renaming, PDF processing tools, image compression tools, etc. Adopts modular design with good extensibility.",
                    zh: "开发了一系列Python实用工具，包括文件批量重命名、PDF处理工具、图片压缩工具等。采用模块化设计，具有良好的可扩展性。"
                },
                feature1: {
                    en: "File Processing Tools",
                    zh: "文件处理工具"
                },
                feature2: {
                    en: "PDF Tools",
                    zh: "PDF工具"
                },
                feature3: {
                    en: "Image Processing Tools",
                    zh: "图片处理工具"
                }
            },
            iwrite: {
                title: {
                    en: "Iwrite - GRE Essay Grading System",
                    zh: "慧作文Iwrite - 考研英语判卷系统"
                },
                description: {
                    en: "An AI-powered WeChat Mini Program for automatic GRE essay grading. Features include handwritten/digital essay recognition, intelligent scoring, and correction suggestions. Built with a microservice architecture, integrating multiple AI services for efficient and accurate essay evaluation.",
                    zh: "基于AI技术的考研英语作文自动评分小程序。支持手写/电子版作文识别、智能评分、批改建议生成等功能。采用前后端分离架构，整合多个AI服务接口，实现高效准确的作文评估。"
                },
                feature1: {
                    en: "AI Scoring",
                    zh: "AI智能评分"
                },
                feature2: {
                    en: "OCR Recognition",
                    zh: "OCR字迹识别"
                },
                feature3: {
                    en: "History Tracking",
                    zh: "历史记录追踪"
                }
            }
        },
        resources: {
            title: "Learning Resources",
            dataAnalyst: {
                title: "Data Analyst Career Guide",
                responsibilities: "Responsibilities and Skill Stack"
            },
            analysisProcess: {
                title: "Data Analysis Process",
                basic: {
                    title: "Basic Data Analysis"
                },
                advanced: {
                    title: "Advanced Data Mining"
                }
            },
            learningLinks: {
                title: {
                    en: "Learning Resources",
                    zh: "优秀学习资源"
                },
                python: {
                    en: "Python Learning",
                    zh: "Python 学习"
                },
                dataAnalysis: {
                    en: "Data Analysis Tools",
                    zh: "数据分析工具"
                },
                visualization: {
                    en: "Data Visualization",
                    zh: "数据可视化"
                }
            }
        }
    },
    zh: {
        nav: {
            home: "首页",
            skills: "技能",
            projects: "项目",
            contact: "联系",
            resources: "学习资源"
        },
        hero: {
            greeting: "你好，我是 PPY",
            role: "后端开发工程师",
            description1: "专注于构建高质量的系统与应用",
            description2: "3年研发经验，擅长全栈开发与架构设计",
            viewSkills: "查看技能",
            contactMe: "联系我"
        },
        about: {
            title: "关于我",
            description: "作为一名后端开发工程师，我热衷于用技术解决复杂问题。拥有3年系统研发经验，专注于构建高性能可扩展的应用服务。对AI技术充满热情，善于将其融入实际开发中。"
        },
        skills: {
            title: "技术栈",
            languages: "编程语言",
            devSkills: "开发技能",
            categories: {
                database: "数据库",
                cloud: "云服务",
                tools: "开发工具",
                ai: "AI",
                os: "操作系统"
            },
            descriptions: {
                java: "Spring Boot企业级开发，微服务架构",
                javascript: "现代 JavaScript 与 Node.js 开发",
                python: "数据分析，使用 NumPy、Pandas 和可视化工具",
                go: "Go语言高性能后端服务开发",
                git: "版本控制和协作开发",
                docker: "容器化和部署自动化",
                ai: "大语言模型应用与AI集成",
                database: "MySQL、Redis、MongoDB优化",
                cloud: "AWS、阿里云、腾讯云",
                os: "熟悉 Linux、Mac、Windows 操作系统开发环境"
            }
        },
        contact: {
            title: "联系方式",
            email: "邮箱已复制！",
            github: "查看 GitHub 主页",
            wechat: "微信号已复制！",
            gitee: "访问 Gitee 主页"
        },
        projects: {
            title: "项目展示",
            stockAnalysis: {
                title: {
                    en: "Stock Sector Data Correlation Analysis",
                    zh: "股票板块数据相关性分析"
                },
                description: {
                    en: "A Python-based stock market data analysis tool with features including data collection, correlation analysis, and clustering analysis.",
                    zh: "基于Python的股票市场数据分析工具，实现了数据采集、相关性分析和聚类分析等功能。采用模块化设计，具有高扩展性和可维护性。"
                },
                feature1: {
                    en: "Data Collection & Preprocessing",
                    zh: "数据采集与预处理"
                },
                feature2: {
                    en: "Correlation Analysis",
                    zh: "相关性分析"
                },
                feature3: {
                    en: "Clustering Analysis",
                    zh: "聚类分析"
                }
            },
            ecommerce: {
                title: {
                    en: "Distributed E-commerce Order Management System",
                    zh: "分布式电商订单管理系统"
                },
                description: {
                    en: "Developed and optimized a highly available distributed order management system supporting complete order lifecycle. Processing 50k+ daily orders.",
                    zh: "开发并优化高可用分布式订单管理系统，支持订单创建、支付、库存管理等完整流程。系统日订单处理量5万+。"
                },
                feature1: {
                    en: "Distributed Architecture",
                    zh: "分布式架构设计"
                },
                feature2: {
                    en: "Distributed Transaction",
                    zh: "分布式事务处理"
                },
                feature3: {
                    en: "High Performance",
                    zh: "高性能优化"
                }
            },
            pythonTools: {
                title: {
                    en: "Python Utility Tools",
                    zh: "Python 实用工具集"
                },
                description: {
                    en: "Developed a series of Python utility tools, including batch file renaming, PDF processing tools, image compression tools, etc. Adopts modular design with good extensibility.",
                    zh: "开发了一系列Python实用工具，包括文件批量重命名、PDF处理工具、图片压缩工具等。采用模块化设计，具有良好的可扩展性。"
                },
                feature1: {
                    en: "File Processing Tools",
                    zh: "文件处理工具"
                },
                feature2: {
                    en: "PDF Tools",
                    zh: "PDF工具"
                },
                feature3: {
                    en: "Image Processing Tools",
                    zh: "图片处理工具"
                }
            },
            iwrite: {
                title: {
                    en: "Iwrite - GRE Essay Grading System",
                    zh: "慧作文Iwrite - 考研英语判卷系统"
                },
                description: {
                    en: "An AI-powered WeChat Mini Program for automatic GRE essay grading. Features include handwritten/digital essay recognition, intelligent scoring, and correction suggestions. Built with a microservice architecture, integrating multiple AI services for efficient and accurate essay evaluation.",
                    zh: "基于AI技术的考研英语作文自动评分小程序。支持手写/电子版作文识别、智能评分、批改建议生成等功能。采用前后端分离架构，整合多个AI服务接口，实现高效准确的作文评估。"
                },
                feature1: {
                    en: "AI Scoring",
                    zh: "AI智能评分"
                },
                feature2: {
                    en: "OCR Recognition",
                    zh: "OCR字迹识别"
                },
                feature3: {
                    en: "History Tracking",
                    zh: "历史记录追踪"
                }
            }
        },
        resources: {
            title: "学习资源",
            dataAnalyst: {
                title: "数据分析师职业指南",
                responsibilities: "职责和技能栈"
            },
            analysisProcess: {
                title: "数据分析流程",
                basic: {
                    title: "基础数据分析"
                },
                advanced: {
                    title: "深入数据挖掘"
                }
            },
            learningLinks: {
                title: {
                    en: "Learning Resources",
                    zh: "优秀学习资源"
                },
                python: {
                    en: "Python Learning",
                    zh: "Python 学习"
                },
                dataAnalysis: {
                    en: "Data Analysis Tools",
                    zh: "数据分析工具"
                },
                visualization: {
                    en: "Data Visualization",
                    zh: "数据可视化"
                }
            }
        }
    }
}; 