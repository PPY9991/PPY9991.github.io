// 主题管理模块
const ThemeManager = {
    init() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        
        if (!this.themeToggle) return;

        // 每次访问时根据时间设置主题
        this.setThemeByTime();
        
        // 更新图标
        this.updateIcon();

        // 绑定点击事件
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    },

    setThemeByTime() {
        const hour = new Date().getHours();
        // 早上6点到晚上6点使用日间模式
        const isDayTime = hour >= 8 && hour < 17;
        this.body.classList.toggle('dark-theme', !isDayTime);
        // 不保存到 localStorage，每次访问都重新检测
    },

    toggleTheme() {
        this.body.classList.toggle('dark-theme');
        const isDark = this.body.classList.contains('dark-theme');
        // 手动切换时也不保存设置
        this.updateIcon();
    },

    updateIcon() {
        const isDark = this.body.classList.contains('dark-theme');
        this.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
};

// 语言管理模块
const LanguageManager = {
    init() {
        this.langToggle = document.getElementById('lang-toggle');
        if (!this.langToggle) return;

        // 从本地存储加载语言设置，如果没有则默认使用英文
        this.currentLang = localStorage.getItem('language');
        if (!this.currentLang) {
            this.currentLang = 'en';
            localStorage.setItem('language', 'en');
        }
        
        // 设置开关状态
        this.langToggle.checked = this.currentLang === 'zh';
        
        // 应用语言设置
        document.documentElement.setAttribute('lang', this.currentLang);
        this.updateContent();

        // 绑定事件
        this.langToggle.addEventListener('change', () => this.toggleLanguage());
    },

    toggleLanguage() {
        this.currentLang = this.langToggle.checked ? 'zh' : 'en';
        localStorage.setItem('language', this.currentLang);
        document.documentElement.setAttribute('lang', this.currentLang);
        this.updateContent();
    },

    updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(translations[this.currentLang], key);
            if (translation) {
                if (typeof translation === 'object' && translation[this.currentLang]) {
                    if (element.tagName.toLowerCase() === 'meta') {
                        element.setAttribute('content', translation[this.currentLang]);
                    } else {
                        element.textContent = translation[this.currentLang];
                    }
                } else {
                    if (element.tagName.toLowerCase() === 'meta') {
                        element.setAttribute('content', translation);
                    } else {
                        element.textContent = translation;
                    }
                }
            }
        });

        // 更新技能描述
        this.updateSkillDescriptions();
    },

    getNestedTranslation(obj, path) {
        return path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : null;
        }, obj);
    },

    updateSkillDescriptions() {
        const skills = document.querySelectorAll('.skill-item');
        skills.forEach(skill => {
            const key = skill.getAttribute('data-skill');
            if (key && translations.skills && translations.skills[key]) {
                const description = translations.skills[key][this.currentLang];
                const descElement = skill.querySelector('.skill-description');
                if (descElement) {
                    descElement.textContent = description;
                }
            }
        });
    }
};

// 头像交互模块
const AvatarManager = {
    config: {
        perspective: 1000,
        maxTilt: 15,
        scale: 1.05,
        transitionDuration: 400,
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        throttleInterval: 16,
        edgeThreshold: 0.15,
        glareOpacity: 0.15
    },

    init() {
        this.avatar = document.querySelector('.hero-image-container');
        if (!this.avatar) return;

        this.image = this.avatar.querySelector('img');
        if (!this.image) return;

        this.rect = this.avatar.getBoundingClientRect();
        this.isHovering = false;
        this.lastUpdate = 0;
        this.requestId = null;

        this.bindEvents();
        this.resetTransform();
    },

    bindEvents() {
        this.avatar.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
        this.avatar.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.avatar.addEventListener('mouseleave', () => this.handleMouseLeave());
        window.addEventListener('resize', () => this.updateRect());
    },

    handleMouseEnter(e) {
        this.isHovering = true;
        this.avatar.style.animation = 'none';
        this.updateRect();
        const { tiltX, tiltY, distance } = this.calculateTilt(e);
        this.applyTransform(tiltX, tiltY, distance);
    },

    handleMouseMove(e) {
        if (!this.isHovering) return;
        this.throttledUpdate(e);
    },

    handleMouseLeave() {
        this.isHovering = false;
        this.cancelAnimation();
        this.resetTransform();
        setTimeout(() => {
            this.avatar.style.animation = 'float 4s ease-in-out infinite';
        }, 300);
    },

    calculateTilt(e) {
        const centerX = this.rect.left + this.rect.width / 2;
        const centerY = this.rect.top + this.rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const relativeX = (mouseX - centerX) / (this.rect.width / 2);
        const relativeY = (mouseY - centerY) / (this.rect.height / 2);
        
        const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
        const tiltX = -relativeY * this.config.maxTilt;
        const tiltY = relativeX * this.config.maxTilt;

        return { tiltX, tiltY, distance };
    },

    applyTransform(tiltX, tiltY, distance) {
        const scale = 1 - Math.min(distance * 0.05, 0.1);
        const translateZ = 50 - distance * 20;
        
        const transform = `
            perspective(${this.config.perspective}px)
            rotateX(${tiltX}deg)
            rotateY(${tiltY}deg)
            translateZ(${translateZ}px)
            scale3d(${scale}, ${scale}, ${scale})
        `;
        
        this.avatar.style.transform = transform;
        
        // 更新阴影效果
        const shadowBlur = 20 + distance * 10;
        const shadowOffset = 5 + distance * 5;
        this.image.style.boxShadow = `
            ${tiltY * 2}px 
            ${tiltX * 2}px 
            ${shadowBlur}px rgba(0, 0, 0, 0.2),
            ${tiltY}px 
            ${tiltX}px 
            ${shadowOffset}px rgba(0, 0, 0, 0.1)
        `;
    },

    resetTransform() {
        this.avatar.style.transform = 'perspective(2000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
        this.image.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15), 0 6px 10px rgba(0, 0, 0, 0.1)';
    },

    throttledUpdate(e) {
        const now = Date.now();
        if (now - this.lastUpdate >= this.config.throttleInterval) {
            this.lastUpdate = now;
            this.updateTilt(e);
        } else if (!this.requestId) {
            this.requestId = requestAnimationFrame(() => {
                this.updateTilt(e);
                this.requestId = null;
            });
        }
    },

    updateTilt(e) {
        if (!this.isHovering) return;
        this.updateRect();
        const { tiltX, tiltY, distance } = this.calculateTilt(e);
        this.applyTransform(tiltX, tiltY, distance);
    },

    updateRect() {
        this.rect = this.avatar.getBoundingClientRect();
    },

    cancelAnimation() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }
};

// 流星效果模块
const ShootingStarManager = {
    config: {
        minStars: 2,
        maxStars: 5,
        genProbability: 0.4,
        checkInterval: {
            min: 1500,
            max: 3000
        },
        position: {
            top: { min: 0, max: 60 },
            right: { min: 0, max: 40 }
        },
        animation: {
            duration: { min: 5, max: 8 },
            delay: { min: 0, max: 2 },
            scale: { min: 0.7, max: 1.2 },
            angle: { base: -35, variance: 3 }
        }
    },

    init() {
        this.container = document.querySelector('.shooting-stars');
        if (!this.container) return;

        this.activeStars = 0;
        this.isEnabled = document.body.classList.contains('dark-theme');
        
        this.observeThemeChanges();
        if (this.isEnabled) {
            this.scheduleNextGeneration();
        }
    },

    observeThemeChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDarkTheme = document.body.classList.contains('dark-theme');
                    this.isEnabled = isDarkTheme;
                    
                    if (isDarkTheme) {
                        this.scheduleNextGeneration();
                    } else {
                        this.container.innerHTML = '';
                        this.activeStars = 0;
                    }
                }
            });
        });

        observer.observe(document.body, { attributes: true });
    },

    createShootingStar() {
        if (this.activeStars >= this.config.maxStars) return;
        
        const star = document.createElement('div');
        star.className = 'shooting-star';
        this.activeStars++;
        
        const startY = this.getRandomRange(this.config.position.top.min, this.config.position.top.max);
        const startX = this.getRandomRange(this.config.position.right.min, this.config.position.right.max);
        const duration = this.getRandomRange(this.config.animation.duration.min, this.config.animation.duration.max);
        const delay = this.getRandomRange(this.config.animation.delay.min, this.config.animation.delay.max);
        const scale = this.getRandomRange(this.config.animation.scale.min, this.config.animation.scale.max);
        const angleVar = this.getRandomRange(-this.config.animation.angle.variance, this.config.animation.angle.variance);
        
        Object.assign(star.style, {
            top: `${startY}%`,
            right: `${startX}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            transform: `scale(${scale})`,
            '--star-angle': `${this.config.animation.angle.base + angleVar}deg`
        });
        
        this.container.appendChild(star);
        
        star.addEventListener('animationend', () => {
            star.remove();
            this.activeStars--;
            if (this.isEnabled) {
                this.scheduleNextGeneration();
            }
        });
    },

    scheduleNextGeneration() {
        if (!this.isEnabled) return;
        
        if (this.activeStars < this.config.minStars) {
            this.createShootingStar();
        } else if (this.activeStars < this.config.maxStars && Math.random() < this.config.genProbability) {
            this.createShootingStar();
        }
        
        const nextCheck = this.getRandomRange(this.config.checkInterval.min, this.config.checkInterval.max);
        setTimeout(() => this.scheduleNextGeneration(), nextCheck);
    },

    getRandomRange(min, max) {
        return min + Math.random() * (max - min);
    }
};

// 社交功能模块
const SocialManager = {
    init() {
        this.initContactCopy();
        this.initBackToTop();
    },

    initContactCopy() {
        // 邮箱复制
        const emailContainer = document.querySelector('.email-container');
        if (emailContainer) {
            const email = 'ppy@paangbaobao.cn';
            emailContainer.addEventListener('click', () => {
                this.copyToClipboard(email, '邮箱已复制！');
            });
        }

        // 微信复制
        const wechatContainer = document.querySelector('.wechat-container');
        if (wechatContainer) {
            const wechat = 'x.xPPY9991';
            wechatContainer.addEventListener('click', () => {
                this.copyToClipboard(wechat, '微信号已复制！');
            });
        }

        // GitHub 链接
        const githubContainer = document.querySelector('.github-container a');
        if (githubContainer) {
            githubContainer.href = 'https://github.com/PPY9991';
            githubContainer.target = '_blank';
            githubContainer.rel = 'noopener noreferrer';
        }

        // Gitee 链接
        const giteeContainer = document.querySelector('.gitee-container a');
        if (giteeContainer) {
            giteeContainer.href = 'https://gitee.com/PPY9991';
            giteeContainer.target = '_blank';
            giteeContainer.rel = 'noopener noreferrer';
        }
    },

    async copyToClipboard(text, successMessage) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast(successMessage);
        } catch {
            this.showToast('复制失败，请手动复制');
        }
    },

    showToast(message) {
        // 移除现有的 toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            zIndex: '10000',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        document.body.appendChild(toast);
        
        // 强制重排以触发动画
        toast.getBoundingClientRect();
        
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        });
    },

    initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;

        // 监听滚动事件，控制按钮显示/隐藏
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // 点击返回顶部
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// 技能卡片管理模块
const SkillManager = {
    // 技能图标背景色配置
    iconColors: {
        'html': { bg: 'rgba(255, 99, 71, 0.15)', glow: 'rgba(255, 99, 71, 0.3)' },
        'css': { bg: 'rgba(41, 98, 255, 0.15)', glow: 'rgba(41, 98, 255, 0.3)' },
        'javascript': { bg: 'rgba(255, 215, 0, 0.15)', glow: 'rgba(255, 215, 0, 0.3)' },
        'typescript': { bg: 'rgba(0, 122, 204, 0.15)', glow: 'rgba(0, 122, 204, 0.3)' },
        'react': { bg: 'rgba(97, 219, 251, 0.15)', glow: 'rgba(97, 219, 251, 0.3)' },
        'vue': { bg: 'rgba(65, 184, 131, 0.15)', glow: 'rgba(65, 184, 131, 0.3)' },
        'node': { bg: 'rgba(104, 160, 99, 0.15)', glow: 'rgba(104, 160, 99, 0.3)' },
        'python': { bg: 'rgba(55, 118, 171, 0.15)', glow: 'rgba(55, 118, 171, 0.3)' },
        'cloud': { 
            bg: 'rgba(128, 0, 128, 0.15)', 
            glow: 'rgba(128, 0, 128, 0.3)',
            useImage: true,
            imagePath: 'images/云服务.png'
        },
        'ai': { bg: 'rgba(0, 255, 255, 0.15)', glow: 'rgba(0, 255, 255, 0.3)', icon: 'fas fa-robot' },
        'database': { bg: 'rgba(255, 140, 0, 0.15)', glow: 'rgba(255, 140, 0, 0.3)' }
    },

    init() {
        this.skillsContainer = document.querySelector('.skills-container');
        if (!this.skillsContainer) return;

        this.initSkillIcons();
        this.observeThemeChanges();
    },

    initSkillIcons() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const skillType = item.getAttribute('data-skill');
            const iconContainer = item.querySelector('.skill-icon');
            if (!iconContainer || !skillType) return;

            const skillConfig = this.iconColors[skillType];
            
            // 更新图标
            if (skillConfig?.useImage) {
                // 使用图片图标
                iconContainer.innerHTML = `<img src="${skillConfig.imagePath}" alt="${skillType}" style="width: 24px; height: 24px;">`;
            } else if (skillConfig?.icon) {
                // 使用 Font Awesome 图标
                iconContainer.innerHTML = `<i class="${skillConfig.icon}"></i>`;
            }

            // 应用颜色和效果
            this.applyIconStyle(item, skillType);

            // 添加悬停效果
            item.addEventListener('mouseenter', () => this.enhanceIconEffect(item, skillType));
            item.addEventListener('mouseleave', () => this.resetIconEffect(item, skillType));
        });
    },

    applyIconStyle(item, skillType) {
        const isDark = document.body.classList.contains('dark-theme');
        const iconContainer = item.querySelector('.skill-icon');
        const iconElement = iconContainer.querySelector('i, img');
        const colors = this.iconColors[skillType] || { bg: 'rgba(150, 150, 150, 0.15)', glow: 'rgba(150, 150, 150, 0.3)' };

        // 设置图标容器样式
        iconContainer.style.backgroundColor = colors.bg;
        iconContainer.style.borderRadius = '12px';
        iconContainer.style.padding = '15px';
        iconContainer.style.transition = 'all 0.3s ease';
        iconContainer.style.position = 'relative';

        if (isDark) {
            // 暗色模式下的样式
            iconContainer.style.boxShadow = `
                0 4px 8px rgba(0, 0, 0, 0.2),
                0 0 15px ${colors.glow},
                inset 0 0 20px ${colors.glow}
            `;
            
            if (iconElement) {
                if (colors.useImage) {
                    // 图片特殊处理
                    iconElement.style.filter = `drop-shadow(0 0 3px ${colors.glow})`;
                } else {
                    // Font Awesome 图标处理
                    iconElement.style.color = 'rgba(255, 255, 255, 0.9)';
                    iconElement.style.textShadow = `0 0 10px ${colors.glow}`;
                    iconElement.style.filter = `drop-shadow(0 0 3px ${colors.glow})`;
                }
            }
        }
    },

    enhanceIconEffect(item, skillType) {
        const isDark = document.body.classList.contains('dark-theme');
        if (!isDark) return;

        const iconContainer = item.querySelector('.skill-icon');
        const iconElement = iconContainer.querySelector('i, img');
        const colors = this.iconColors[skillType] || { bg: 'rgba(150, 150, 150, 0.15)', glow: 'rgba(150, 150, 150, 0.3)' };

        // 增强容器效果
        iconContainer.style.transform = 'translateY(-3px)';
        iconContainer.style.backgroundColor = colors.bg.replace('0.15', '0.25');
        iconContainer.style.boxShadow = `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 0 20px ${colors.glow},
            inset 0 0 25px ${colors.glow}
        `;

        // 增强图标效果
        if (iconElement) {
            iconElement.style.transform = 'scale(1.1)';
            if (colors.useImage) {
                // 图片特殊处理
                iconElement.style.filter = `drop-shadow(0 0 5px ${colors.glow})`;
            } else {
                // Font Awesome 图标处理
                iconElement.style.textShadow = `0 0 15px ${colors.glow}`;
                iconElement.style.filter = `drop-shadow(0 0 5px ${colors.glow})`;
            }
        }
    },

    resetIconEffect(item, skillType) {
        const isDark = document.body.classList.contains('dark-theme');
        if (!isDark) return;

        const iconContainer = item.querySelector('.skill-icon');
        const iconElement = iconContainer.querySelector('i, img');
        const colors = this.iconColors[skillType] || { bg: 'rgba(150, 150, 150, 0.15)', glow: 'rgba(150, 150, 150, 0.3)' };

        // 重置容器效果
        iconContainer.style.transform = 'translateY(0)';
        iconContainer.style.backgroundColor = colors.bg;
        iconContainer.style.boxShadow = `
            0 4px 8px rgba(0, 0, 0, 0.2),
            0 0 15px ${colors.glow},
            inset 0 0 20px ${colors.glow}
        `;

        // 重置图标效果
        if (iconElement) {
            iconElement.style.transform = 'scale(1)';
            if (colors.useImage) {
                // 图片特殊处理
                iconElement.style.filter = `drop-shadow(0 0 3px ${colors.glow})`;
            } else {
                // Font Awesome 图标处理
                iconElement.style.textShadow = `0 0 10px ${colors.glow}`;
                iconElement.style.filter = `drop-shadow(0 0 3px ${colors.glow})`;
            }
        }
    },

    observeThemeChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const skillItems = document.querySelectorAll('.skill-item');
                    skillItems.forEach(item => {
                        const skillType = item.getAttribute('data-skill');
                        if (skillType) {
                            this.applyIconStyle(item, skillType);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { attributes: true });
    }
};

// 添加延迟加载功能
document.addEventListener('DOMContentLoaded', function() {
    // 使用 Intersection Observer 延迟加载项目部分
    const projectsSection = document.querySelector('.projects-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    if (projectsSection) {
        observer.observe(projectsSection);
    }
});

// 优化滚动性能
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            // 处理滚动相关的操作
        }, 66); // 约15fps的频率
    }
});

// 优化调整窗口大小的性能
let resizeTimeout;
window.addEventListener('resize', function() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            // 执行调整窗口大小相关的操作
        }, 66);
    }
}, { passive: true });

// 添加欢迎框管理模块
const WelcomeManager = {
    init() {
        this.welcomeBox = document.querySelector('.welcome-box');
        this.welcomeText = document.querySelector('.welcome-text');
        if (!this.welcomeBox || !this.welcomeText) return;

        this.getLocationAndShow();
    },

    async getLocationAndShow() {
        try {
            const response = await fetch('https://ip.useragentinfo.com/json');
            if (!response.ok) throw new Error('Failed to get location');
            
            const data = await response.json();
            if (!data || (!data.country && !data.region && !data.city)) {
                throw new Error('No location data available');
            }

            const location = this.formatLocation(data);
            const greeting = this.getGreeting();
            
            const welcomeMessage = this.getCurrentLang() === 'zh'
                ? `${greeting}，欢迎来自${location}的朋友`
                : `${greeting}, welcome friend from ${location}`;
            
            this.welcomeText.textContent = welcomeMessage;
            
            // 显示欢迎框
            this.welcomeBox.classList.add('show');

            setTimeout(() => {
                this.welcomeBox.classList.remove('show');
            }, 8000);

        } catch (error) {
            console.warn('Failed to get location:', error);
        }
    },

    getGreeting() {
        const hour = new Date().getHours();
        const isZh = this.getCurrentLang() === 'zh';
        
        if (hour >= 5 && hour < 12) {
            return isZh ? '早上好' : 'Good morning';
        } else if (hour >= 12 && hour < 18) {
            return isZh ? '下午好' : 'Good afternoon';
        } else {
            return isZh ? '晚上好' : 'Good evening';
        }
    },

    getCurrentLang() {
        return document.documentElement.getAttribute('lang') || 'en';
    },

    formatLocation(data) {
        const isZh = this.getCurrentLang() === 'zh';
        try {
            // 扩展地点名称映射
            const zhLocationMap = {
                country: {
                    'China': '中国',
                    'United States': '美国',
                    'Japan': '日本',
                    'Korea': '韩国',
                    'United Kingdom': '英国',
                    'Germany': '德国',
                    'France': '法国',
                    'Russia': '俄罗斯',
                    'Canada': '加拿大',
                    'Australia': '澳大利亚'
                },
                region: {
                    // 直辖市
                    'Beijing': '北京市',
                    'Shanghai': '上海市',
                    'Tianjin': '天津市',
                    'Chongqing': '重庆市',
                    // 省份
                    'Guangdong': '广东省',
                    'Zhejiang': '浙江省',
                    'Jiangsu': '江苏省',
                    'Fujian': '福建省',
                    'Shandong': '山东省',
                    'Hubei': '湖北省',
                    'Hunan': '湖南省',
                    'Henan': '河南省',
                    'Hebei': '河北省',
                    'Sichuan': '四川省',
                    'Shanxi': '山西省',
                    'Shaanxi': '陕西省',
                    'Yunnan': '云南省',
                    'Guizhou': '贵州省',
                    'Jiangxi': '江西省',
                    'Anhui': '安徽省',
                    'Liaoning': '辽宁省',
                    'Jilin': '吉林省',
                    'Heilongjiang': '黑龙江省',
                    'Hainan': '海南省',
                    'Gansu': '甘肃省',
                    'Qinghai': '青海省',
                    // 自治区
                    'Guangxi': '广西壮族自治区',
                    'Inner Mongolia': '内蒙古自治区',
                    'Tibet': '西藏自治区',
                    'Ningxia': '宁夏回族自治区',
                    'Xinjiang': '新疆维吾尔自治区',
                    // 特别行政区
                    'Hong Kong': '香港特别行政区',
                    'Macau': '澳门特别行政区',
                    'Taiwan': '台湾省'
                }
            };

            if (isZh) {
                // 中文模式
                let location = '';
                if (data.country) {
                    location += zhLocationMap.country[data.country] || data.country;
                }
                if (data.region) {
                    location += zhLocationMap.region[data.region] || data.region;
                }
                if (data.city) {
                    // 对直辖市做特殊处理
                    if (['北京市', '上海市', '天津市', '重庆市'].includes(zhLocationMap.region[data.region])) {
                        location = zhLocationMap.region[data.region];
                    } else {
                        location += data.city;
                    }
                }
                return location || '互联网';
            } else {
                // 英文模式
                const parts = [];
                
                // 处理城市名称
                if (data.city_en || data.city) {
                    parts.push(data.city_en || data.city);
                }
                
                // 处理地区名称
                if (data.region_en || data.region) {
                    parts.push(data.region_en || data.region);
                }
                
                // 处理国家名称
                if (data.country_en || data.country) {
                    parts.push(data.country_en || data.country);
                }
                
                return parts.length > 0 ? parts.join(', ') : 'the Internet';
            }
        } catch (error) {
            return isZh ? '互联网' : 'the Internet';
        }
    }
};

// 移动端菜单处理
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // 点击导航链接后自动关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// 添加移动端性能优化
document.addEventListener('DOMContentLoaded', function() {
    // 延迟加载图片
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // 优化滚动性能
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // 处理滚动相关的操作
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    LanguageManager.init();
    AvatarManager.init();
    ShootingStarManager.init();
    SocialManager.init();
    SkillManager.init();
    WelcomeManager.init();
});

// 在文件末尾添加项目板块的动画初始化
document.addEventListener('DOMContentLoaded', function() {
    // 项目板块入场动画
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });

        observer.observe(projectsSection);
    }

    // 项目卡片链接效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const link = card.querySelector('.project-title-link');
        if (link) {
            const originalHref = link.getAttribute('href');
            card.addEventListener('click', (e) => {
                // 如果点击的是链接本身其子元素，不做理
                if (e.target.closest('.project-link') || e.target.closest('.project-title-link')) {
                    return;
                }
                // 否则整个卡片可点
                window.open(originalHref, '_blank');
            });
        }
    });
});

// 添加折叠功能
document.addEventListener('DOMContentLoaded', function() {
    // 为所有可折叠标题添加点击事件
    document.querySelectorAll('.section-subtitle.collapsible').forEach(title => {
        const btn = title.querySelector('.collapse-btn');
        const content = title.nextElementSibling;
        
        title.addEventListener('click', function(e) {
            // 如果点击的是按钮本身，阻止事件冒泡
            if (e.target.closest('.collapse-btn')) {
                return;
            }
            toggleSection(btn, content);
        });

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSection(btn, content);
        });
    });

    function toggleSection(btn, content) {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('collapsed');
    }
});

// 概念图片3D效果管理
const ConceptImageManager = {
    config: {
        perspective: 1000,
        maxTilt: 10,
        scale: 1.05,
        transitionDuration: 400,
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        throttleInterval: 16
    },

    init() {
        this.images = document.querySelectorAll('.concept-image');
        if (!this.images.length) return;

        this.images.forEach(image => {
            // 创建容器并包裹图片
            const container = document.createElement('div');
            container.className = 'concept-image-container';
            image.parentNode.insertBefore(container, image);
            container.appendChild(image);

            // 初始化事件监听
            this.initializeEvents(container, image);
        });
    },

    initializeEvents(container, image) {
        let rect = container.getBoundingClientRect();
        let isHovering = false;
        let lastUpdate = 0;

        const updateRect = () => {
            rect = container.getBoundingClientRect();
        };

        const handleMouseEnter = (e) => {
            isHovering = true;
            updateRect();
            const { tiltX, tiltY, distance } = this.calculateTilt(e, rect);
            this.applyTransform(image, tiltX, tiltY, distance);
        };

        const handleMouseMove = (e) => {
            if (!isHovering) return;
            
            const now = Date.now();
            if (now - lastUpdate >= this.config.throttleInterval) {
                lastUpdate = now;
                updateRect();
                const { tiltX, tiltY, distance } = this.calculateTilt(e, rect);
                this.applyTransform(image, tiltX, tiltY, distance);
            }
        };

        const handleMouseLeave = () => {
            isHovering = false;
            this.resetTransform(image);
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', updateRect);
    },

    calculateTilt(e, rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const relativeX = (mouseX - centerX) / (rect.width / 2);
        const relativeY = (mouseY - centerY) / (rect.height / 2);
        
        const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
        const tiltX = -relativeY * this.config.maxTilt;
        const tiltY = relativeX * this.config.maxTilt;

        return { tiltX, tiltY, distance };
    },

    applyTransform(image, tiltX, tiltY, distance) {
        const scale = 1 + Math.min(distance * 0.05, 0.05);
        const translateZ = 50 - distance * 20;
        
        image.style.transform = `
            perspective(${this.config.perspective}px)
            rotateX(${tiltX}deg)
            rotateY(${tiltY}deg)
            translateZ(${translateZ}px)
            scale3d(${scale}, ${scale}, ${scale})
        `;
        
        // 更新阴影效果
        const shadowBlur = 20 + distance * 10;
        const shadowOffset = 5 + distance * 5;
        image.style.boxShadow = `
            ${tiltY * 2}px 
            ${tiltX * 2}px 
            ${shadowBlur}px rgba(0, 0, 0, 0.2),
            ${tiltY}px 
            ${tiltX}px 
            ${shadowOffset}px rgba(0, 0, 0, 0.1)
        `;
    },

    resetTransform(image) {
        image.style.transform = 'perspective(2000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
        image.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    }
};

// 在初始化部分添加
document.addEventListener('DOMContentLoaded', () => {
    // ... 其他初始化
    ConceptImageManager.init();
});

// 导航栏收缩功能
function initNavToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const sideNav = document.querySelector('.side-nav');
    
    if (!navToggle || !sideNav) return;

    // 从localStorage获取之前的状态
    const isCollapsed = localStorage.getItem('navCollapsed') === 'true';
    if (isCollapsed) {
        sideNav.classList.add('collapsed');
        navToggle.setAttribute('data-tooltip', '展开侧栏');
    }

    navToggle.addEventListener('click', () => {
        sideNav.classList.toggle('collapsed');
        const isNowCollapsed = sideNav.classList.contains('collapsed');
        // 更新提示文本
        navToggle.setAttribute('data-tooltip', isNowCollapsed ? '展开侧栏' : '收起侧栏');
        // 保存状态到localStorage
        localStorage.setItem('navCollapsed', isNowCollapsed);
    });

    // 添加hover效果
    sideNav.addEventListener('mouseenter', () => {
        if (sideNav.classList.contains('collapsed')) {
            navToggle.style.opacity = '1';
        }
    });

    sideNav.addEventListener('mouseleave', () => {
        if (sideNav.classList.contains('collapsed')) {
            navToggle.style.opacity = '0.6';
        }
    });
}

// 在初始化部分添加
document.addEventListener('DOMContentLoaded', () => {
    // ... 其他初始化
    initNavToggle();
}); 