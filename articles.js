// articles.js - 文章列表页面逻辑

// 从XML加载文章数据
async function loadArticlesData() {
    try {
        const response = await fetch('passages.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // 解析XML数据
        const articles = [];
        const articleNodes = xmlDoc.querySelectorAll('article');
        
        articleNodes.forEach(articleNode => {
            const article = {
                id: articleNode.getAttribute('id'),
                title: articleNode.querySelector('title')?.textContent || '',
                category: articleNode.querySelector('category')?.textContent || '',
                author: articleNode.querySelector('author')?.textContent || '',
                date: articleNode.querySelector('date')?.textContent || '',
                readTime: articleNode.querySelector('readTime')?.textContent || '',
                excerpt: articleNode.querySelector('excerpt')?.textContent || '',
                image: articleNode.querySelector('image')?.textContent || '',
                url: articleNode.querySelector('url')?.textContent || '',
                featured: articleNode.querySelector('featured')?.textContent === 'true',
                tags: Array.from(articleNode.querySelectorAll('tags tag')).map(tag => tag.textContent)
            };
            articles.push(article);
        });
        
        return articles;
    } catch (error) {
        console.error('加载文章数据失败:', error);
        return [];
    }
}

// 创建文章卡片HTML
function createArticleCard(article) {
    const featuredClass = article.featured ? ' featured' : '';
    const authorSection = article.author ? `
        <div class="article-author">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="作者" class="author-avatar">
            <span class="author-name">${article.author}</span>
        </div>
    ` : '';
    
    return `
        <article class="article-card${featuredClass}" data-id="${article.id}" data-category="${article.category.toLowerCase()}">
            ${article.featured ? `
                <div class="article-badge">
                    <i class="fas fa-star"></i>
                    推荐阅读
                </div>
            ` : ''}
            
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <div class="article-category">${article.category}</div>
            </div>
            
            <div class="article-content">
                <h2 class="article-title">
                    <a href="${article.url}">${article.title}</a>
                </h2>
                <p class="article-excerpt">${article.excerpt}</p>
                
                <div class="article-meta">
                    ${authorSection}
                    <div class="article-info">
                        <span class="article-date">
                            <i class="far fa-calendar"></i>
                            ${article.date}
                        </span>
                        <span class="article-reading-time">
                            <i class="far fa-clock"></i>
                            ${article.readTime}
                        </span>
                    </div>
                </div>
                
                ${article.tags.length > 0 ? `
                    <div class="article-tags">
                        ${article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </article>
    `;
}

// 渲染文章列表
function renderArticles(articles) {
    const gridContainer = document.querySelector('.articles-grid');
    if (!gridContainer) return;
    
    // 清空现有内容
    gridContainer.innerHTML = '';
    
    // 创建并插入文章卡片
    articles.forEach(article => {
        const cardHTML = createArticleCard(article);
        gridContainer.innerHTML += cardHTML;
    });
    
    // 如果没有文章，显示提示信息
    if (articles.length === 0) {
        gridContainer.innerHTML = `
            <div class="no-articles">
                <i class="fas fa-newspaper"></i>
                <h3>暂无文章</h3>
                <p>这里还没有发布文章，请稍后再来</p>
            </div>
        `;
    }
}

// 过滤文章
function filterArticles(articles, category) {
    if (category === 'all') {
        return articles;
    }
    return articles.filter(article => 
        article.category.toLowerCase() === category.toLowerCase() ||
        article.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
    );
}

// 搜索文章
function searchArticles(articles, query) {
    if (!query.trim()) return articles;
    
    const searchTerm = query.toLowerCase();
    return articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        article.author.toLowerCase().includes(searchTerm)
    );
}

// 初始化文章列表页面
async function initArticlesPage() {
    const gridContainer = document.querySelector('.articles-grid');
    if (!gridContainer) return;
    
    // 显示加载状态
    gridContainer.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>正在加载文章...</p>
        </div>
    `;
    
    // 加载文章数据
    const allArticles = await loadArticlesData();
    
    if (allArticles.length === 0) {
        gridContainer.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-circle"></i>
                <h3>加载失败</h3>
                <p>无法加载文章数据，请检查网络连接或刷新页面</p>
            </div>
        `;
        return;
    }
    
    // 渲染文章列表
    renderArticles(allArticles);
    
    // 设置搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchSubmit = document.querySelector('.search-submit');
    
    if (searchInput && searchSubmit) {
        const handleSearch = () => {
            const query = searchInput.value;
            const filteredArticles = searchArticles(allArticles, query);
            renderArticles(filteredArticles);
        };
        
        searchInput.addEventListener('input', handleSearch);
        searchSubmit.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
    
    // 设置分类过滤
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // 更新活动状态
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            // 获取分类
            const category = tag.textContent.trim().toLowerCase();
            const filteredArticles = filterArticles(allArticles, category);
            renderArticles(filteredArticles);
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initArticlesPage);

// 主题切换功能
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

// 初始化主题切换
document.addEventListener('DOMContentLoaded', initThemeToggle);