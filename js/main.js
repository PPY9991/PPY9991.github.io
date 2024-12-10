// 打字效果初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题 - 默认使用暗黑模式
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark'; // 默认为 dark
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // 强制应用暗黑模式
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 语言切换功能
    function initLanguageSwitch() {
        const langBtns = document.querySelectorAll('.lang-btn');
        const defaultLang = localStorage.getItem('language') || 'en'; // 默认为 en
        
        // 初始化语言为英文
        setLanguage('en');
        localStorage.setItem('language', 'en');
        
        // 设置英文按钮为激活状态
        langBtns.forEach(btn => {
            if (btn.dataset.lang === 'en') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
            
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                setLanguage(lang);
                
                // 更新按钮状态
                langBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 保存语言偏好
                localStorage.setItem('language', lang);
            });
        });
    }

    function setLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            const translation = getNestedTranslation(translations[lang], key);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // 更新按钮文本
        document.querySelector('.btn.primary').textContent = translations[lang].hero.viewSkills;
        document.querySelector('.btn.secondary').textContent = translations[lang].hero.contactMe;
        
        // 更新技能描述
        updateSkillDescriptions(lang);
        
        // 更新技能类别标题
        const skillCategories = document.querySelectorAll('.skill-category h3');
        skillCategories.forEach(category => {
            const key = category.textContent.toLowerCase();
            if (translations[lang].skills.categories && translations[lang].skills.categories[key]) {
                category.textContent = translations[lang].skills.categories[key];
            }
        });
    }

    function updateSkillDescriptions(lang) {
        const skillDescriptions = document.querySelectorAll('.skill-description');
        skillDescriptions.forEach(desc => {
            const skillType = desc.closest('.skill-item').querySelector('span').textContent.toLowerCase();
            const key = skillType.split('/')[0]; // 处理 "JavaScript/TypeScript" 的情况
            if (translations[lang].skills.descriptions[key]) {
                desc.textContent = translations[lang].skills.descriptions[key];
            }
        });
    }

    function getNestedTranslation(obj, path) {
        return path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : null;
        }, obj);
    }

    // 初始化主题
    initTheme();
    // 初始化语言切换
    initLanguageSwitch();

    // 初始化邮箱复制功能
    const emailBtn = document.getElementById('emailBtn');
    const emailText = emailBtn.querySelector('.email-text');
    const tooltipHint = emailBtn.querySelector('.tooltip-hint');

    // 初始化 GitHub 跳转功能
    const githubBtn = document.getElementById('githubBtn');
    githubBtn.addEventListener('click', () => {
        if (confirm('是否跳转到 GitHub 页面？')) {
            window.open('https://github.com/PPY9991', '_blank');
        }
    });

    emailBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(emailText.textContent);
            const originalText = tooltipHint.textContent;
            tooltipHint.textContent = '已复制!';
            setTimeout(() => {
                tooltipHint.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('复制失败:', err);
        }
    });

    // 初始化邮箱复制功能（导航栏）
    const copyEmailBtn = document.querySelector('.copy-email');
    copyEmailBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText('2764357258@qq.com');
            const originalText = copyEmailBtn.querySelector('span').textContent;
            copyEmailBtn.querySelector('span').textContent = '已复制!';
            setTimeout(() => {
                copyEmailBtn.querySelector('span').textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('复制失败:', err);
        }
    });

    // 修改头像 3D 倾斜效果
    function initImageTilt() {
        const imageContainer = document.querySelector('.hero-image-container');
        const image = imageContainer.querySelector('img');
        
        let rect = imageContainer.getBoundingClientRect();
        const height = rect.height;
        const width = rect.width;
        
        imageContainer.addEventListener('mousemove', (e) => {
            rect = imageContainer.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const xRotation = 12 * ((mouseY - height / 2) / height);
            const yRotation = -12 * ((mouseX - width / 2) / width);
            
            const transform = `
                perspective(1000px)
                rotateX(${xRotation}deg)
                rotateY(${yRotation}deg)
                scale3d(1.03, 1.03, 1.03)
            `;
            
            imageContainer.style.transform = transform;
            
            const shadowX = (mouseX - width / 2) / 35;
            const shadowY = (mouseY - height / 2) / 35;
            image.style.boxShadow = `
                ${shadowX}px ${shadowY}px 15px rgba(0,0,0,0.15),
                ${shadowX * 0.5}px ${shadowY * 0.5}px 8px rgba(0,0,0,0.08)
            `;
        });
        
        imageContainer.addEventListener('mouseleave', () => {
            imageContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            image.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
        
        window.addEventListener('resize', () => {
            rect = imageContainer.getBoundingClientRect();
        });
    }

    // 初始化头像倾斜效果
    initImageTilt();
}); 