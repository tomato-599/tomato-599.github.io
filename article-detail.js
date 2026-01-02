// article-detail.js - 文章详情页面逻辑

// 从XML加载特定文章
async function loadArticleById(articleId) {
    try {
        const response = await fetch('passages.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // 查找指定ID的文章
        const articleNode = xmlDoc.querySelector(`article[id="${articleId}"]`);
        if (!articleNode) return null;
        
        return {
            id: articleNode.getAttribute('id'),
            title: articleNode.querySelector('title')?.textContent || '',
            category: articleNode.querySelector('category')?.textContent || '',
            author: articleNode.querySelector('author')?.textContent || '',
            date: articleNode.querySelector('date')?.textContent || '',
            readTime: articleNode.querySelector('readTime')?.textContent || '',
            excerpt: articleNode.querySelector('excerpt')?.textContent || '',
            image: articleNode.querySelector('image')?.textContent || '',
            url: articleNode.querySelector('url')?.textContent || '',
            tags: Array.from(articleNode.querySelectorAll('tags tag')).map(tag => tag.textContent),
            // 这里可以添加文章内容字段
            content: articleNode.querySelector('content')?.textContent || 
                    `这是${articleNode.querySelector('title')?.textContent || '这篇文章'}的详细内容。文章详情页面展示了完整的文章内容，包括文本、图片、代码示例等。`
        };
    } catch (error) {
        console.error('加载文章详情失败:', error);
        return null;
    }
}

// 从XML加载所有文章
async function loadAllArticles() {
    try {
        const response = await fetch('passages.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        const articles = [];
        const articleNodes = xmlDoc.querySelectorAll('article');
        
        articleNodes.forEach(articleNode => {
            const article = {
                id: articleNode.getAttribute('id'),
                title: articleNode.querySelector('title')?.textContent || '',
                category: articleNode.querySelector('category')?.textContent || '',
                excerpt: articleNode.querySelector('excerpt')?.textContent || ''
            };
            articles.push(article);
        });
        
        return articles;
    } catch (error) {
        console.error('加载文章列表失败:', error);
        return [];
    }
}

// 渲染文章详情
function renderArticleDetail(article) {
    const container = document.getElementById('article-detail');
    if (!container) return;
    
    container.innerHTML = `
        <article class="article-detail">
            <header class="article-detail-header">
                <h1 class="article-detail-title">${article.title}</h1>
                
                <div class="article-detail-meta">
                    <span>
                        <i class="fas fa-user"></i>
                        ${article.author || '凌风'}
                    </span>
                    <span>
                        <i class="far fa-calendar"></i>
                        ${article.date}
                    </span>
                    <span>
                        <i class="far fa-clock"></i>
                        ${article.readTime}
                    </span>
                    <span>
                        <i class="fas fa-folder"></i>
                        ${article.category}
                    </span>
                </div>
                
                ${article.image ? `
                    <div class="article-detail-image">
                        <img src="${article.image}" alt="${article.title}">
                    </div>
                ` : ''}
            </header>
            
            <div class="article-detail-content">
                ${article.content || article.excerpt}
                
                ${article.tags.length > 0 ? `
                    <div class="article-detail-tags">
                        ${article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
            
            <div class="article-detail-actions">
                <a href="articles.html" class="article-nav-btn">
                    <i class="fas fa-arrow-left"></i>
                    返回文章列表
                </a>
                
                <div class="article-share">
                    <button class="share-btn" title="分享到微博">
                        <i class="fab fa-weibo"></i>
                    </button>
                    <button class="share-btn" title="分享到微信">
                        <i class="fab fa-weixin"></i>
                    </button>
                    <button class="share-btn" title="分享到Twitter">
                        <i class="fab fa-twitter"></i>
                    </button>
                    <button class="share-btn" title="复制链接" onclick="copyArticleLink()">
                        <i class="fas fa-link"></i>
                    </button>
                </div>
            </div>
        </article>
    `;
    
    // 更新页面标题
    document.title = `${article.title} | 凌风小站`;
}

// 渲染相关文章
function renderRelatedArticles(currentArticleId, allArticles) {
    const container = document.getElementById('related-articles');
    if (!container) return;
    
    // 过滤掉当前文章，随机选择2-3篇相关文章
    const otherArticles = allArticles.filter(article => article.id !== currentArticleId);
    const relatedArticles = otherArticles
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(3, otherArticles.length));
    
    if (relatedArticles.length === 0) {
        container.innerHTML = `
            <div class="no-related">
                <p>暂无相关文章</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = relatedArticles.map(article => `
        <a href="article-detail.html?id=${article.id}" class="related-card">
            <h4>${article.title}</h4>
            <p>${article.excerpt}</p>
            <div class="related-meta">
                <span>${article.category}</span>
                <span>点击阅读</span>
            </div>
        </a>
    `).join('');
}

// 复制文章链接
function copyArticleLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('文章链接已复制到剪贴板！');
    }).catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制链接');
    });
}

// 初始化文章详情页面
async function initArticleDetailPage() {
    // 从URL获取文章ID
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        window.location.href = 'articles.html';
        return;
    }
    
    const detailContainer = document.getElementById('article-detail');
    if (!detailContainer) return;
    
    // 显示加载状态
    detailContainer.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>正在加载文章...</p>
        </div>
    `;
    
    // 并行加载当前文章和所有文章
    const [article, allArticles] = await Promise.all([
        loadArticleById(articleId),
        loadAllArticles()
    ]);
    
    if (!article) {
        detailContainer.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-circle"></i>
                <h3>文章未找到</h3>
                <p>抱歉，您要查看的文章不存在或已被删除</p>
                <a href="articles.html" class="btn btn-primary" style="margin-top: 20px;">
                    返回文章列表
                </a>
            </div>
        `;
        return;
    }
    
    // 渲染文章详情
    renderArticleDetail(article);
    
    // 渲染相关文章
    renderRelatedArticles(articleId, allArticles);
}

// 初始化主题切换
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // 检查本地存储的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initArticleDetailPage();
    initThemeToggle();
});