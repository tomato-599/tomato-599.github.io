// 语言翻译数据
const translations = {
    zh: {
        // 导航和标题
        siteTitle: "凌曦小站",
        siteSubtitle: "一个正在构建中的博客",
        
        // 打字效果文本
        typingText1: "欢迎来到创意空间...",
        typingText2: "探索工具与灵感...",
        typingText3: "构建美好数字体验...",
        typingText4: "让创作更简单...",
        
        // 状态卡片
        constructionTitle: "网站正在施工中...",
        constructionText: "我们正在努力构建这个空间，目前部分功能还在开发中。你可以先探索以下可用工具。",
        
        // 卡片内容
        javaCardTitle: "Java开发工具包",
        javaCardDesc: "各版本JDK下载，支持从Java 8到最新版本",
        devToolsCardTitle: "开发工具集",
        devToolsCardDesc: "前端开发、调试、API测试等实用工具",
        articlesCardTitle: "文章列表",
        articlesCardDesc: "查看所有的文章",
        creativeLabTitle: "创意实验室",
        creativeLabDesc: "CSS效果、动画实验、创意交互演示",
        musicTitle: "音乐空间",
        musicDesc: "分享音乐推荐与播放列表",
        gamesTitle: "小游戏",
        gamesDesc: "有趣的HTML5小游戏集合",
        
        // 按钮文本
        enterButton: "点我进入",
        developingButton: "开发ing...",
        
        // 特色功能
        featuresTitle: "特色功能",
        feature1Title: "多语言支持",
        feature1Desc: "支持中文与英文切换",
        feature2Title: "响应式设计",
        feature2Desc: "适配各种设备屏幕",
        feature3Title: "快速加载",
        feature3Desc: "优化性能，体验流畅",
        feature4Title: "持续更新",
        feature4Desc: "定期添加新工具和功能",
        
        // 页脚
        mitLicense: "MIT协议",
        copyright: "© 2026 凌曦小站. 保留所有权利.",
        licenseText: "除另有声明，本站内容均采用",
        
        // 主题切换
        themeToggle: "切换主题"
    },
    
    en: {
        // Navigation and titles
        siteTitle: "Lingxi Station",
        siteSubtitle: "A Blog Under Construction",
        
        // Typing effect texts
        typingText1: "Welcome to creative space...",
        typingText2: "Explore tools and inspiration...",
        typingText3: "Building great digital experiences...",
        typingText4: "Making creation easier...",
        
        // Status card
        constructionTitle: "Website Under Construction...",
        constructionText: "We're working hard to build this space. Some features are still in development. You can explore the available tools below.",
        
        // Card content
        javaCardTitle: "Java Development Kit",
        javaCardDesc: "Download various JDK versions, from Java 8 to the latest",
        devToolsCardTitle: "Development Tools",
        devToolsCardDesc: "Frontend development, debugging, API testing and more",
        articlesCardTitle: "Article List",
        articlesCardDesc: "View all articles",
        creativeLabTitle: "Creative Lab",
        creativeLabDesc: "CSS effects, animation experiments, creative interactions",
        musicTitle: "Music Space",
        musicDesc: "Share music recommendations and playlists",
        gamesTitle: "Mini Games",
        gamesDesc: "Collection of fun HTML5 games",
        
        // Button texts
        enterButton: "Enter",
        developingButton: "Developing...",
        
        // Features
        featuresTitle: "Features",
        feature1Title: "Multi-language Support",
        feature1Desc: "Chinese and English switching",
        feature2Title: "Responsive Design",
        feature2Desc: "Adapts to various screen sizes",
        feature3Title: "Fast Loading",
        feature3Desc: "Optimized performance, smooth experience",
        feature4Title: "Continuous Updates",
        feature4Desc: "Regularly add new tools and features",
        
        // Footer
        mitLicense: "MIT License",
        copyright: "© 2026 Lingxi Station. All rights reserved.",
        licenseText: "Unless otherwise stated, all content is licensed under",
        
        // Theme toggle
        themeToggle: "Toggle Theme"
    }
};

// 当前语言
let currentLanguage = 'zh';

// 安全地获取本地存储（解决隐私模式下的问题）
function safeLocalStorage() {
    try {
        return window.localStorage;
    } catch (e) {
        // 在隐私模式下返回一个虚拟存储
        console.warn('LocalStorage is not available:', e.message);
        return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
            clear: () => {}
        };
    }
}

// 安全地更新元素文本
function safeUpdateElement(element, text) {
    if (element && text !== undefined) {
        if (element.tagName === 'INPUT' && element.type === 'text') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    }
}

// 设置语言
function setLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language "${lang}" not supported`);
        return;
    }
    
    currentLanguage = lang;
    const storage = safeLocalStorage();
    storage.setItem('preferredLanguage', lang);
    
    // 更新所有带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang][key];
        
        if (translation !== undefined) {
            safeUpdateElement(element, translation);
        } else {
            console.warn(`Translation missing for key: ${key} in language: ${lang}`);
        }
    });
    
    // 更新语言切换按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 更新页面语言属性
    document.documentElement.lang = lang;
    
    // 更新打字效果文本
    updateTypingTexts(lang);
}

// 更新打字效果文本
function updateTypingTexts(lang) {
    if (window.updateTypingTexts && translations[lang]) {
        const typingTexts = [
            translations[lang].typingText1,
            translations[lang].typingText2,
            translations[lang].typingText3,
            translations[lang].typingText4
        ];
        window.updateTypingTexts(typingTexts);
    }
}

// 初始化语言
function initLanguage() {
    const storage = safeLocalStorage();
    
    // 检查保存的语言偏好
    const savedLang = storage.getItem('preferredLanguage');
    
    // 检查浏览器语言
    const browserLang = navigator.language || navigator.userLanguage;
    const browserLangShort = browserLang ? browserLang.split('-')[0] : 'zh';
    
    // 决定使用哪种语言
    let lang = 'zh';
    if (savedLang && translations[savedLang]) {
        lang = savedLang;
    } else if (translations[browserLangShort]) {
        lang = browserLangShort;
    } else if (browserLangShort === 'en') {
        lang = 'en';
    }
    
    // 设置语言
    setLanguage(lang);
}

// 设置语言切换事件
function setupLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang && translations[lang]) {
                setLanguage(lang);
            }
        });
    });
}

// 页面加载完成后初始化
function init() {
    // 等待DOM完全加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initLanguage();
            setupLanguageSwitcher();
        });
    } else {
        initLanguage();
        setupLanguageSwitcher();
    }
}

// 开始初始化
init();

// 暴露函数给其他脚本
window.setLanguage = setLanguage;
window.currentLanguage = currentLanguage;