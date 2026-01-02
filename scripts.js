// scripts.js - 修复版

// 背景图片数组
const backgroundImages = [
    'https://youke3.picui.cn/s1/2026/01/02/69575d7dcd855.png',
    'https://youke3.picui.cn/s1/2026/01/02/69575d7e9b375.jpg',
    'https://youke3.picui.cn/s1/2026/01/02/69575d7e3cafe.jpg'
];

// 默认打字效果文本
let typingTexts = [
    "欢迎来到创意空间...",
    "探索工具与灵感...",
    "构建美好数字体验...",
    "让创作更简单..."
];

// 安全本地存储
function safeLocalStorage() {
    try {
        return window.localStorage;
    } catch (e) {
        console.warn('LocalStorage is not available:', e.message);
        return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
            clear: () => {}
        };
    }
}

// 设置随机背景图片
function setRandomBackground() {
    const blurElement = document.querySelector('.background-blur');
    if (blurElement && backgroundImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        const randomImage = backgroundImages[randomIndex];
        blurElement.style.backgroundImage = `url('${randomImage}')`;
    }
}

// 打字机效果
function typeWriterEffect() {
    const typingElement = document.getElementById('typing-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (!typingElement || !cursorElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let typingTimeout = null;
    
    function type() {
        if (textIndex >= typingTexts.length) textIndex = 0;
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            // 删除字符
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // 输入字符
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // 如果完成输入，开始删除
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 1500;
            isDeleting = true;
        }
        // 如果完成删除，切换到下一个文本
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingSpeed = 500;
        }
        
        typingTimeout = setTimeout(type, typingSpeed);
    }
    
    // 清除现有定时器
    if (window.typingTimeout) {
        clearTimeout(window.typingTimeout);
    }
    
    // 启动打字效果
    typingTimeout = setTimeout(type, 1000);
    window.typingTimeout = typingTimeout;
}

// 更新打字效果文本
function updateTypingTexts(newTexts) {
    if (newTexts && Array.isArray(newTexts)) {
        typingTexts = newTexts;
        // 重置打字效果
        const typingElement = document.getElementById('typing-text');
        if (typingElement) {
            typingElement.textContent = '';
            if (window.typingTimeout) {
                clearTimeout(window.typingTimeout);
            }
            typeWriterEffect();
        }
    }
}

// 创建浮动元素
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    
    // 清空现有元素
    container.innerHTML = '';
    
    // 创建多个浮动元素
    for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // 随机大小和位置
        const size = Math.random() * 40 + 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 20;
        
        // 随机颜色
        const colors = ['#6c63ff', '#36d1dc', '#ff6b6b', '#4ecdc4', '#ffe66d'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        element.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: 0.1;
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: floatElement ${duration}s infinite linear ${delay}s;
            pointer-events: none;
        `;
        
        container.appendChild(element);
    }
    
    // 添加浮动动画关键帧
    if (!document.getElementById('float-animation-style')) {
        const style = document.createElement('style');
        style.id = 'float-animation-style';
        style.textContent = `
            @keyframes floatElement {
                0% {
                    transform: translateY(0) rotate(0deg) scale(1);
                    -webkit-transform: translateY(0) rotate(0deg) scale(1);
                    -moz-transform: translateY(0) rotate(0deg) scale(1);
                }
                25% {
                    transform: translateY(-30px) rotate(90deg) scale(1.1);
                    -webkit-transform: translateY(-30px) rotate(90deg) scale(1.1);
                    -moz-transform: translateY(-30px) rotate(90deg) scale(1.1);
                }
                50% {
                    transform: translateY(-60px) rotate(180deg) scale(1);
                    -webkit-transform: translateY(-60px) rotate(180deg) scale(1);
                    -moz-transform: translateY(-60px) rotate(180deg) scale(1);
                }
                75% {
                    transform: translateY(-30px) rotate(270deg) scale(0.9);
                    -webkit-transform: translateY(-30px) rotate(270deg) scale(0.9);
                    -moz-transform: translateY(-30px) rotate(270deg) scale(0.9);
                }
                100% {
                    transform: translateY(0) rotate(360deg) scale(1);
                    -webkit-transform: translateY(0) rotate(360deg) scale(1);
                    -moz-transform: translateY(0) rotate(360deg) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 主题切换功能
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    const storage = safeLocalStorage();
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.className = 'fas fa-sun';
            storage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            storage.setItem('theme', 'light');
        }
    });
    
    // 检查本地存储的主题偏好
    const savedTheme = storage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// 添加点击涟漪效果
function addRippleEffects() {
    const buttons = document.querySelectorAll('.btn:not(.btn-disabled)');
    
    // 添加涟漪动画样式
    if (!document.getElementById('ripple-animation-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建点击波纹效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // 移除波纹元素
            setTimeout(() => {
                if (ripple.parentNode === this) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// 安全地加载外部脚本
function safeLoadExternalScript() {
    // 检查是否已经有web.js相关的canvas
    const existingCanvas = document.querySelector('canvas[style*="position: absolute"]');
    if (existingCanvas) {
        return;
    }
    
    // 延迟加载外部脚本，避免阻塞
    setTimeout(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/Ukenn2112/UkennWeb@3.0/index/web.js';
        script.defer = true;
        script.onerror = () => {
            console.warn('Failed to load external web.js script');
        };
        document.head.appendChild(script);
    }, 1000);
}

// 页面加载完成后执行
function init() {
    // 等待DOM完全加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeApp();
        });
    } else {
        initializeApp();
    }
}

// 初始化应用
function initializeApp() {
    // 设置随机背景
    setRandomBackground();
    
    // 启动打字效果
    typeWriterEffect();
    
    // 创建浮动元素
    createFloatingElements();
    
    // 设置主题切换
    setupThemeToggle();
    
    // 添加点击涟漪效果
    addRippleEffects();
    
    // 安全加载外部脚本
    safeLoadExternalScript();
    
    // 每30秒切换一次背景
    setInterval(setRandomBackground, 30000);
    
    // 窗口大小调整时重新设置浮动元素位置
    window.addEventListener('resize', () => {
        const container = document.querySelector('.floating-elements');
        if (container) {
            container.innerHTML = '';
            createFloatingElements();
        }
    });
}

// 开始初始化
init();

// 暴露函数给i18n.js调用
window.updateTypingTexts = updateTypingTexts;