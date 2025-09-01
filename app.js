// Enhanced MVP Knowledge Hub Application
class MVPKnowledgeHub {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.currentSection = 'dashboard';
        this.currentNewsCategory = 'all';
        this.currentContentType = 'all';
        this.searchQuery = '';
        this.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        this.rssFeeds = JSON.parse(localStorage.getItem('rssFeeds')) || [];
        this.articles = [];
        this.conferences = JSON.parse(localStorage.getItem('conferences')) || [];
        this.contentIdeas = JSON.parse(localStorage.getItem('contentIdeas')) || [];
        this.goals = JSON.parse(localStorage.getItem('goals')) || [];
        this.userProfile = JSON.parse(localStorage.getItem('userProfile')) || this.getDefaultProfile();
        this.settings = JSON.parse(localStorage.getItem('settings')) || this.getDefaultSettings();
        this.stats = JSON.parse(localStorage.getItem('stats')) || this.getDefaultStats();
        this.editingEventId = null;
        this.editingContentId = null;
        
        // Wait for DOM to be fully loaded before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing Enhanced MVP Knowledge Hub...');
        this.loadData();
        this.applyTheme();
        this.setupEventListeners();
        this.renderInitialContent();
        this.showSection('dashboard');
    }

    getDefaultProfile() {
        return {
            name: "MVP Candidate",
            linkedIn: "https://linkedin.com/in/mvp-candidate",
            blog: "https://mvpcandidate.blog",
            gitHub: "https://github.com/mvpcandidate",
            twitter: "https://twitter.com/mvpcandidate",
            location: "Your City, Country",
            specialties: ["Business Central", "Azure AI", "Development"]
        };
    }

    getDefaultSettings() {
        return {
            newsNotifications: true,
            conferenceNotifications: true,
            mvpNotifications: true
        };
    }

    getDefaultStats() {
        return {
            blogPosts: 23,
            forumAnswers: 87,
            conferences: 3,
            contributions: 156
        };
    }

    loadData() {
        // Load sample articles with full content
        this.articles = [
            {
                "id": 1,
                "title": "Business Central 2025 Wave 2: AI Agents and Enhanced Copilot Features",
                "source": "Microsoft Dynamics 365 Blog",
                "category": "Business Central",
                "date": "2025-08-31T14:30:00Z",
                "excerpt": "Discover the revolutionary AI agents coming to Business Central, including Sales Order Agent with email processing and Payables Agent for automated invoice matching.",
                "fullContent": "Microsoft has announced groundbreaking AI capabilities in Business Central 2025 Wave 2 that will transform how organizations handle business processes. The new Sales Order Agent can now process emails with attachments, automatically extract relevant information, manage multiple ship-to addresses, and handle capable-to-promise scenarios without human intervention.\n\nThe Payables Agent introduces contextual invoice drafts and automated purchase invoice matching, reducing manual data entry by up to 80%. These agents leverage Azure AI Foundry's enterprise-grade capabilities to provide intelligent automation.\n\nKey features include:\n• Advanced email processing with attachment handling\n• Multi-address order management\n• Intelligent invoice matching algorithms\n• Contextual draft generation\n• Seamless integration with existing workflows\n\nThese enhancements position Business Central as a leader in AI-powered ERP solutions, enabling organizations to achieve higher productivity and accuracy in their financial operations.",
                "url": "https://www.microsoft.com/dynamics365/blog/business-central-ai-agents",
                "tags": ["AI", "Copilot", "Wave 2", "Agents"],
                "readTime": "5 min read"
            },
            {
                "id": 2,
                "title": "Azure AI Foundry August 2025: Fine-tuning Enhancements and Pause/Resume",
                "source": "Azure AI Foundry Blog",
                "category": "Azure AI",
                "date": "2025-08-28T16:00:00Z",
                "excerpt": "New fine-tuning capabilities including Pause & Resume functionality and Cross-Region support now available in Azure AI Foundry.",
                "fullContent": "Azure AI Foundry continues to evolve with significant enhancements to its fine-tuning capabilities. The August 2025 update introduces game-changing features that address enterprise needs for cost optimization and global deployment.\n\nPause & Resume Functionality:\nOrganizations can now pause expensive fine-tuning jobs during off-hours and resume them when needed, potentially reducing costs by 40-60% for long-running training processes.\n\nCross-Region Support:\nModels can now be fine-tuned in one region and deployed globally, improving latency and compliance with data residency requirements.\n\nAdditional features:\n• Enhanced checkpoint management\n• Automated hyperparameter optimization\n• Integration with Azure Cost Management\n• Advanced monitoring and alerting\n• Support for custom evaluation metrics\n\nThese improvements make Azure AI Foundry more accessible to organizations of all sizes while maintaining enterprise-grade security and compliance standards.",
                "url": "https://azure.microsoft.com/blog/ai-foundry-fine-tuning-updates",
                "tags": ["Fine-tuning", "GPT", "Azure AI Foundry"],
                "readTime": "4 min read"
            }
        ];

        // Load default RSS feeds if none exist
        if (this.rssFeeds.length === 0) {
            this.rssFeeds = [
                {
                    "name": "Microsoft Dynamics 365 Blog",
                    "url": "https://www.microsoft.com/en-us/dynamics-365/blog/feed/",
                    "category": "Business Central",
                    "status": "active",
                    "lastUpdated": "2025-09-01T08:30:00Z"
                },
                {
                    "name": "Azure AI Foundry Blog",
                    "url": "https://techcommunity.microsoft.com/category/azure-ai-foundry/feed",
                    "category": "Azure AI",
                    "status": "active",
                    "lastUpdated": "2025-09-01T07:15:00Z"
                }
            ];
            this.saveToStorage('rssFeeds', this.rssFeeds);
        }

        // Load default conferences if none exist
        if (this.conferences.length === 0) {
            this.conferences = [
                {
                    "id": Date.now(),
                    "name": "Microsoft Ignite 2025",
                    "startDate": "2025-11-17",
                    "endDate": "2025-11-21",
                    "location": "San Francisco, CA",
                    "type": "Premier Conference",
                    "cfpDeadline": "2025-09-15",
                    "website": "https://ignite.microsoft.com",
                    "topics": ["AI", "Cloud", "Business Applications"],
                    "involvement": "attending",
                    "notes": "Planning to attend keynotes and Business Central sessions"
                }
            ];
            this.saveToStorage('conferences', this.conferences);
        }

        // Load default content ideas if none exist
        if (this.contentIdeas.length === 0) {
            this.contentIdeas = [
                {
                    "id": Date.now(),
                    "type": "blog",
                    "title": "Building Your First AI Agent in Business Central",
                    "status": "draft",
                    "priority": "high",
                    "notes": "Cover the new Sales Order Agent features, practical implementation tips",
                    "dateCreated": "2025-09-01T10:00:00Z"
                },
                {
                    "id": Date.now() + 1,
                    "type": "speaking",
                    "title": "Enterprise AI Strategy with Azure AI Foundry",
                    "status": "idea",
                    "priority": "medium",
                    "notes": "Good for regional conferences, focus on ROI and business value",
                    "dateCreated": "2025-08-28T14:30:00Z"
                }
            ];
            this.saveToStorage('contentIdeas', this.contentIdeas);
        }

        // Load default goals if none exist
        if (this.goals.length === 0) {
            this.goals = [
                {
                    "id": Date.now(),
                    "title": "Write 24 blog posts this year",
                    "current": 23,
                    "target": 24,
                    "deadline": "2025-12-31",
                    "category": "content"
                },
                {
                    "id": Date.now() + 1,
                    "title": "Speak at 5 conferences",
                    "current": 3,
                    "target": 5,
                    "deadline": "2025-12-31",
                    "category": "speaking"
                },
                {
                    "id": Date.now() + 2,
                    "title": "Reach 100 forum contributions",
                    "current": 87,
                    "target": 100,
                    "deadline": "2025-10-31",
                    "category": "community"
                }
            ];
            this.saveToStorage('goals', this.goals);
        }
    }

    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
    }

    applyTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Navigation - use event delegation for more reliable handling
        document.addEventListener('click', (e) => {
            // Handle navigation clicks
            if (e.target.matches('.nav-item') || e.target.closest('.nav-item')) {
                e.preventDefault();
                const navItem = e.target.matches('.nav-item') ? e.target : e.target.closest('.nav-item');
                const section = navItem.dataset.section;
                if (section) {
                    console.log('Navigation clicked:', section);
                    this.showSection(section);
                }
                return;
            }

            // Handle dashboard navigation buttons
            if (e.target.matches('[data-section]') || e.target.closest('[data-section]')) {
                e.preventDefault();
                const element = e.target.matches('[data-section]') ? e.target : e.target.closest('[data-section]');
                const section = element.dataset.section;
                if (section) {
                    console.log('Dashboard navigation clicked:', section);
                    this.showSection(section);
                }
                return;
            }

            // Handle theme toggle
            if (e.target.matches('#themeToggle') || e.target.closest('#themeToggle')) {
                e.preventDefault();
                this.toggleTheme();
                return;
            }

            // Handle search
            if (e.target.matches('#searchBtn') || e.target.closest('#searchBtn')) {
                e.preventDefault();
                this.performSearch();
                return;
            }

            // Handle modal close buttons
            if (e.target.matches('.modal-close') || e.target.matches('.modal-backdrop')) {
                e.preventDefault();
                this.closeAllModals();
                return;
            }

            // Handle specific button clicks
            this.handleButtonClicks(e);
        });

        // Handle search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch();
                }
            });
        }

        console.log('Event listeners setup complete');
    }

    handleButtonClicks(e) {
        const buttonHandlers = {
            'editProfileBtn': () => this.showEditProfileModal(),
            'addEventBtn': () => this.showAddEventModal(),
            'findEventsBtn': () => this.showFindEventsModal(),
            'manageBlogIdeasBtn': () => this.showContentIdeasModal('blog'),
            'manageSpeakingTopicsBtn': () => this.showContentIdeasModal('speaking'),
            'exploreContributionsBtn': () => this.showContentIdeasModal('contribution'),
            'addFeedBtn': () => this.showModal('addFeedModal'),
            'exportDataBtn': () => this.exportUserData(),
            'cancelFeed': () => this.hideModal('addFeedModal'),
            'saveFeed': () => this.addNewFeed(),
            'cancelProfile': () => this.hideModal('editProfileModal'),
            'saveProfile': () => this.saveProfile(),
            'cancelEvent': () => { this.hideModal('addEventModal'); this.editingEventId = null; },
            'saveEvent': () => this.saveEvent(),
            'searchEventsBtn': () => this.searchEvents(),
            'addContentIdeaBtn': () => this.showAddContentIdeaModal(),
            'cancelContentIdea': () => { this.hideModal('addContentIdeaModal'); this.editingContentId = null; },
            'saveContentIdea': () => this.saveContentIdea()
        };

        for (const [id, handler] of Object.entries(buttonHandlers)) {
            if (e.target.matches(`#${id}`) || e.target.closest(`#${id}`)) {
                e.preventDefault();
                handler();
                return;
            }
        }

        // Handle dynamic buttons with data attributes
        if (e.target.matches('.bookmark-btn') || e.target.closest('.bookmark-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const btn = e.target.matches('.bookmark-btn') ? e.target : e.target.closest('.bookmark-btn');
            const articleId = parseInt(btn.dataset.articleId);
            this.toggleBookmark(articleId);
            return;
        }

        if (e.target.matches('.share-btn') || e.target.closest('.share-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const btn = e.target.matches('.share-btn') ? e.target : e.target.closest('.share-btn');
            const articleId = parseInt(btn.dataset.articleId);
            this.shareArticle(articleId);
            return;
        }

        // Handle article clicks for expansion
        if (e.target.matches('.article-card') || e.target.closest('.article-card')) {
            if (!e.target.closest('.action-btn')) {
                const card = e.target.matches('.article-card') ? e.target : e.target.closest('.article-card');
                const articleId = parseInt(card.dataset.articleId);
                if (articleId) {
                    this.showArticleDetail(articleId);
                }
            }
            return;
        }

        // Handle list item clicks
        if (e.target.matches('.list-item') || e.target.closest('.list-item')) {
            const item = e.target.matches('.list-item') ? e.target : e.target.closest('.list-item');
            const articleId = parseInt(item.dataset.articleId);
            if (articleId) {
                this.showArticleDetail(articleId);
            }
            return;
        }

        // Handle tab clicks
        if (e.target.matches('.tab-btn') || e.target.closest('.tab-btn')) {
            e.preventDefault();
            const btn = e.target.matches('.tab-btn') ? e.target : e.target.closest('.tab-btn');
            if (btn.dataset.category) {
                this.switchNewsCategory(btn.dataset.category);
            } else if (btn.dataset.contentType) {
                this.switchContentType(btn.dataset.contentType);
            }
            return;
        }
    }

    showSection(sectionName) {
        console.log('Showing section:', sectionName);
        
        if (!sectionName) return;
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            console.log('Section activated:', sectionName);
        } else {
            console.error('Section not found:', `${sectionName}-section`);
            return;
        }

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`.nav-item[data-section="${sectionName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        this.currentSection = sectionName;
        this.renderSectionContent(sectionName);
    }

    renderSectionContent(sectionName) {
        console.log('Rendering content for:', sectionName);
        
        switch(sectionName) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'news':
                this.renderNews();
                break;
            case 'rss':
                this.renderRSSFeeds();
                break;
            case 'events':
                this.renderEvents();
                break;
            case 'journey':
                this.renderJourney();
                break;
            case 'content':
                this.renderContentHub();
                break;
            case 'bookmarks':
                this.renderBookmarks();
                break;
            case 'profile':
                this.renderProfile();
                break;
        }
    }

    renderInitialContent() {
        console.log('Rendering initial content');
        this.updateStats();
        this.renderDashboard();
    }

    updateStats() {
        const elements = {
            'blogPostCount': this.stats.blogPosts,
            'forumAnswerCount': this.stats.forumAnswers,
            'conferenceCount': this.stats.conferences,
            'contributionCount': this.stats.contributions
        };

        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }
    }

    renderDashboard() {
        console.log('Rendering dashboard');
        
        // Render latest news
        const latestNews = this.articles.slice(0, 3);
        const newsContainer = document.getElementById('latestNews');
        if (newsContainer) {
            newsContainer.innerHTML = latestNews.map(article => `
                <div class="list-item" data-article-id="${article.id}">
                    <div class="list-item-content">
                        <h4 class="list-item-title">${article.title}</h4>
                        <div class="list-item-meta">${article.source}</div>
                    </div>
                    <div class="list-item-date">${this.formatDate(article.date)}</div>
                </div>
            `).join('');
        }

        // Render upcoming events
        const upcomingEvents = this.conferences
            .filter(conf => new Date(conf.startDate) > new Date())
            .slice(0, 3);
        const eventsContainer = document.getElementById('upcomingEvents');
        if (eventsContainer) {
            if (upcomingEvents.length === 0) {
                eventsContainer.innerHTML = '<div class="empty-state">No upcoming events. <a href="#" data-section="events">Add some events</a> to your calendar.</div>';
            } else {
                eventsContainer.innerHTML = upcomingEvents.map(event => `
                    <div class="list-item">
                        <div class="list-item-content">
                            <h4 class="list-item-title">${event.name}</h4>
                            <div class="list-item-meta">${event.location}</div>
                        </div>
                        <div class="list-item-date">${this.formatDate(event.startDate)}</div>
                    </div>
                `).join('');
            }
        }

        // Render recent bookmarks
        this.renderRecentBookmarks();
    }

    renderRecentBookmarks() {
        const bookmarksContainer = document.getElementById('recentBookmarks');
        if (bookmarksContainer) {
            if (this.bookmarks.length === 0) {
                bookmarksContainer.innerHTML = '<p class="empty-state">No bookmarks yet. Save articles to see them here.</p>';
            } else {
                const recentBookmarks = this.bookmarks.slice(-3).reverse();
                bookmarksContainer.innerHTML = recentBookmarks.map(bookmark => `
                    <div class="list-item" data-article-id="${bookmark.id}">
                        <div class="list-item-content">
                            <h4 class="list-item-title">${bookmark.title}</h4>
                            <div class="list-item-meta">${bookmark.source}</div>
                        </div>
                        <div class="list-item-date">${this.formatDate(bookmark.date)}</div>
                    </div>
                `).join('');
            }
        }
    }

    renderNews() {
        console.log('Rendering news section');
        this.filterArticles();
    }

    filterArticles() {
        let filteredArticles = [...this.articles];

        // Apply filters
        if (this.currentNewsCategory !== 'all') {
            filteredArticles = filteredArticles.filter(article => 
                article.category === this.currentNewsCategory
            );
        }

        const sourceFilter = document.getElementById('sourceFilter');
        if (sourceFilter && sourceFilter.value) {
            filteredArticles = filteredArticles.filter(article => 
                article.source === sourceFilter.value
            );
        }

        const dateFilter = document.getElementById('dateFilter');
        if (dateFilter && dateFilter.value) {
            const daysAgo = parseInt(dateFilter.value);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
            
            filteredArticles = filteredArticles.filter(article => 
                new Date(article.date) >= cutoffDate
            );
        }

        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filteredArticles = filteredArticles.filter(article => 
                article.title.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query) ||
                article.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        this.renderArticles(filteredArticles);
    }

    renderArticles(articles) {
        const container = document.getElementById('articlesList');
        if (!container) return;
        
        if (articles.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>No articles found</h3><p>Try adjusting your filters or search terms</p></div>';
            return;
        }

        container.innerHTML = articles.map(article => `
            <article class="article-card" data-article-id="${article.id}">
                <div class="article-content">
                    <div class="article-header">
                        <h3 class="article-title">${article.title}</h3>
                        <div class="article-actions">
                            <button class="action-btn bookmark-btn" data-article-id="${article.id}" title="Save to bookmarks">
                                ${this.isBookmarked(article.id) ? '★' : '☆'}
                            </button>
                            <button class="action-btn share-btn" data-article-id="${article.id}" title="Share">
                                📤
                            </button>
                        </div>
                    </div>
                    <div class="article-meta">
                        <span>${article.source}</span>
                        <span>${this.formatDate(article.date)}</span>
                        <span class="tag">${article.category}</span>
                        ${article.readTime ? `<span>${article.readTime}</span>` : ''}
                    </div>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `).join('');
    }

    switchNewsCategory(category) {
        console.log('Switching news category to:', category);
        this.currentNewsCategory = category;
        
        // Update active tab
        document.querySelectorAll('.tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeTab = document.querySelector(`.tabs .tab-btn[data-category="${category}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        this.filterArticles();
    }

    showArticleDetail(articleId) {
        console.log('Showing article detail for:', articleId);
        const article = this.articles.find(a => a.id === articleId) || this.bookmarks.find(b => b.id === articleId);
        if (!article) {
            console.error('Article not found:', articleId);
            return;
        }

        const modal = document.getElementById('articleModal');
        const title = document.getElementById('articleModalTitle');
        const content = document.getElementById('articleModalContent');

        if (title) title.textContent = article.title;
        if (content) {
            content.innerHTML = `
                <div class="article-meta-full">
                    <span><strong>Source:</strong> ${article.source}</span>
                    <span><strong>Published:</strong> ${this.formatDate(article.date)}</span>
                    <span><strong>Category:</strong> ${article.category}</span>
                    ${article.readTime ? `<span><strong>Read Time:</strong> ${article.readTime}</span>` : ''}
                </div>
                <div class="article-full-content">
                    ${this.formatFullContent(article.fullContent || article.excerpt)}
                </div>
                <div class="article-tags" style="margin-top: var(--space-16);">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                ${article.url ? `<div style="margin-top: var(--space-16);"><a href="${article.url}" target="_blank" class="btn btn--outline">Read Original Article</a></div>` : ''}
            `;
        }

        this.showModal('articleModal');
    }

    formatFullContent(content) {
        if (!content) return '<p>Content not available.</p>';
        
        return content
            .split('\n\n')
            .map(paragraph => {
                if (paragraph.startsWith('•')) {
                    const items = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
                    return `<ul>${items.map(item => `<li>${item.substring(1).trim()}</li>`).join('')}</ul>`;
                }
                return `<p>${paragraph}</p>`;
            })
            .join('');
    }

    renderRSSFeeds() {
        const container = document.getElementById('rssFeeds');
        if (!container) return;
        
        container.innerHTML = this.rssFeeds.map(feed => `
            <div class="rss-feed-card">
                <div class="rss-feed-header">
                    <h4 class="rss-feed-name">${feed.name}</h4>
                    <span class="rss-status ${feed.status}">${feed.status}</span>
                </div>
                <div class="rss-feed-url">${feed.url}</div>
                <div class="rss-feed-meta">
                    Category: ${feed.category} • Last updated: ${this.formatDate(feed.lastUpdated)}
                </div>
            </div>
        `).join('');
    }

    renderEvents() {
        const container = document.getElementById('eventsList');
        if (!container) return;
        
        if (this.conferences.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>No events yet</h3><p>Add events to track your conference and speaking schedule</p></div>';
            return;
        }

        container.innerHTML = this.conferences.map(event => `
            <div class="event-card" data-event-id="${event.id}">
                <div class="event-actions-buttons">
                    <button class="event-action-btn edit-event-btn" data-event-id="${event.id}" title="Edit Event">✏️</button>
                    <button class="event-action-btn delete-event-btn" data-event-id="${event.id}" title="Delete Event">🗑️</button>
                </div>
                <div class="event-header">
                    <h3 class="event-name">${event.name}</h3>
                    <span class="event-type">${event.type}</span>
                </div>
                <div class="event-details">
                    <div class="event-detail">
                        <strong>Date:</strong> <span>${this.formatDateRange(event.startDate, event.endDate)}</span>
                    </div>
                    <div class="event-detail">
                        <strong>Location:</strong> <span>${event.location}</span>
                    </div>
                    ${event.cfpDeadline ? `
                        <div class="event-detail">
                            <strong>CFP Deadline:</strong> <span>${this.formatDate(event.cfpDeadline)}</span>
                        </div>
                    ` : ''}
                    <div class="event-detail">
                        <strong>Topics:</strong> <span>${event.topics ? event.topics.join(', ') : 'Not specified'}</span>
                    </div>
                </div>
                <div class="event-badges">
                    <span class="event-badge ${event.involvement}">${this.getInvolvementLabel(event.involvement)}</span>
                </div>
                ${event.notes ? `<div style="margin-top: var(--space-12); font-size: var(--font-size-sm); color: var(--color-text-secondary);">${event.notes}</div>` : ''}
            </div>
        `).join('');
    }

    getInvolvementLabel(involvement) {
        const labels = {
            'considering': 'Considering',
            'attending': 'Attending',
            'speaking': 'Speaking',
            'organizing': 'Organizing'
        };
        return labels[involvement] || 'Unknown';
    }

    renderJourney() {
        this.renderGoals();
    }

    renderGoals() {
        const container = document.getElementById('goalsGrid');
        if (!container) return;

        container.innerHTML = this.goals.map(goal => {
            const percentage = Math.round((goal.current / goal.target) * 100);
            return `
                <div class="goal-card">
                    <h4>${goal.title}</h4>
                    <div class="goal-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span>${goal.current}/${goal.target} (${percentage}%)</span>
                    </div>
                    <p class="goal-deadline">Deadline: ${this.formatDate(goal.deadline)}</p>
                </div>
            `;
        }).join('');
    }

    renderContentHub() {
        // Update content statistics
        const blogIdeasCount = this.contentIdeas.filter(idea => idea.type === 'blog').length;
        const speakingTopicsCount = this.contentIdeas.filter(idea => idea.type === 'speaking').length;
        const contributionOppsCount = this.contentIdeas.filter(idea => idea.type === 'contribution').length;

        const updates = {
            'blogIdeasCount': `${blogIdeasCount} ideas`,
            'speakingTopicsCount': `${speakingTopicsCount} topics`,
            'contributionOppsCount': `${contributionOppsCount} tracked`
        };

        for (const [id, text] of Object.entries(updates)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            }
        }
    }

    renderBookmarks() {
        const container = document.getElementById('bookmarksList');
        if (!container) return;
        
        if (this.bookmarks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No bookmarks yet</h3>
                    <p>Save articles from the news section to see them here</p>
                </div>
            `;
            return;
        }

        let filteredBookmarks = [...this.bookmarks];
        
        const categoryFilter = document.getElementById('bookmarksCategory');
        if (categoryFilter && categoryFilter.value) {
            filteredBookmarks = filteredBookmarks.filter(bookmark => 
                bookmark.category === categoryFilter.value
            );
        }

        container.innerHTML = filteredBookmarks.map(bookmark => `
            <article class="article-card" data-article-id="${bookmark.id}">
                <div class="article-content">
                    <div class="article-header">
                        <h3 class="article-title">${bookmark.title}</h3>
                        <div class="article-actions">
                            <button class="action-btn remove-bookmark-btn" data-article-id="${bookmark.id}" title="Remove bookmark">
                                🗑️
                            </button>
                        </div>
                    </div>
                    <div class="article-meta">
                        <span>${bookmark.source}</span>
                        <span>${this.formatDate(bookmark.date)}</span>
                        <span class="tag">${bookmark.category}</span>
                    </div>
                    <p class="article-excerpt">${bookmark.excerpt}</p>
                    <div class="article-tags">
                        ${bookmark.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `).join('');
    }

    renderProfile() {
        const container = document.getElementById('profileDisplay');
        if (!container) return;

        container.innerHTML = `
            <div class="profile-links">
                <div class="profile-link">
                    <strong>Name:</strong> <span>${this.userProfile.name}</span>
                </div>
                <div class="profile-link">
                    <strong>Location:</strong> <span>${this.userProfile.location}</span>
                </div>
                <div class="profile-link">
                    <strong>LinkedIn:</strong> <a href="${this.userProfile.linkedIn}" target="_blank">${this.userProfile.linkedIn}</a>
                </div>
                <div class="profile-link">
                    <strong>Blog:</strong> <a href="${this.userProfile.blog}" target="_blank">${this.userProfile.blog}</a>
                </div>
                <div class="profile-link">
                    <strong>GitHub:</strong> <a href="${this.userProfile.gitHub}" target="_blank">${this.userProfile.gitHub}</a>
                </div>
                <div class="profile-link">
                    <strong>Twitter/X:</strong> <a href="${this.userProfile.twitter}" target="_blank">${this.userProfile.twitter}</a>
                </div>
            </div>
            <div class="specialties">
                <strong>Specialties:</strong>
                <div class="specialty-tags">
                    ${this.userProfile.specialties.map(specialty => `<span class="tag">${specialty}</span>`).join('')}
                </div>
            </div>
        `;

        // Update settings checkboxes
        const checkboxes = {
            'newsNotifications': this.settings.newsNotifications,
            'conferenceNotifications': this.settings.conferenceNotifications,
            'mvpNotifications': this.settings.mvpNotifications
        };

        for (const [id, checked] of Object.entries(checkboxes)) {
            const element = document.getElementById(id);
            if (element) {
                element.checked = checked;
            }
        }
    }

    // Modal Management
    showModal(modalId) {
        console.log('Showing modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        console.log('Hiding modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    closeAllModals() {
        console.log('Closing all modals');
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    // Profile Management
    showEditProfileModal() {
        console.log('Showing edit profile modal');
        // Populate form with current values
        const fields = {
            'profileName': this.userProfile.name,
            'profileLinkedIn': this.userProfile.linkedIn,
            'profileBlog': this.userProfile.blog,
            'profileGitHub': this.userProfile.gitHub,
            'profileTwitter': this.userProfile.twitter,
            'profileLocation': this.userProfile.location,
            'profileSpecialties': this.userProfile.specialties.join(', ')
        };

        for (const [id, value] of Object.entries(fields)) {
            const element = document.getElementById(id);
            if (element) {
                element.value = value;
            }
        }

        this.showModal('editProfileModal');
    }

    saveProfile() {
        const getValue = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : '';
        };

        const name = getValue('profileName');
        if (!name) {
            this.showToast('Please enter your name', 'error');
            return;
        }

        this.userProfile = {
            name,
            linkedIn: getValue('profileLinkedIn'),
            blog: getValue('profileBlog'),
            gitHub: getValue('profileGitHub'),
            twitter: getValue('profileTwitter'),
            location: getValue('profileLocation'),
            specialties: getValue('profileSpecialties').split(',').map(s => s.trim()).filter(s => s.length > 0)
        };

        this.saveToStorage('userProfile', this.userProfile);
        this.hideModal('editProfileModal');
        this.renderProfile();
        this.showToast('Profile updated successfully!', 'success');
    }

    // Event Management
    showAddEventModal() {
        console.log('Showing add event modal');
        this.editingEventId = null;
        document.getElementById('eventModalTitle').textContent = 'Add Event';
        this.clearEventForm();
        this.showModal('addEventModal');
    }

    clearEventForm() {
        const fields = [
            'eventName', 'eventStartDate', 'eventEndDate', 'eventLocation', 
            'eventWebsite', 'eventCfpDeadline', 'eventTopics', 'eventNotes'
        ];
        
        fields.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });

        const selects = {
            'eventType': 'Conference',
            'eventInvolvement': 'considering'
        };

        for (const [id, value] of Object.entries(selects)) {
            const element = document.getElementById(id);
            if (element) element.value = value;
        }
    }

    saveEvent() {
        const getValue = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : '';
        };

        const name = getValue('eventName');
        const startDate = getValue('eventStartDate');
        const location = getValue('eventLocation');

        if (!name || !startDate || !location) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        const eventData = {
            name,
            startDate,
            endDate: getValue('eventEndDate') || startDate,
            location,
            type: getValue('eventType') || 'Conference',
            website: getValue('eventWebsite') || null,
            cfpDeadline: getValue('eventCfpDeadline') || null,
            topics: getValue('eventTopics').split(',').map(t => t.trim()).filter(t => t.length > 0),
            involvement: getValue('eventInvolvement') || 'considering',
            notes: getValue('eventNotes') || null
        };

        if (this.editingEventId) {
            // Update existing event
            const index = this.conferences.findIndex(e => e.id === this.editingEventId);
            if (index !== -1) {
                this.conferences[index] = { ...eventData, id: this.editingEventId };
            }
            this.showToast('Event updated successfully!', 'success');
        } else {
            // Add new event
            eventData.id = Date.now();
            this.conferences.push(eventData);
            this.showToast('Event added successfully!', 'success');
        }

        this.saveToStorage('conferences', this.conferences);
        this.hideModal('addEventModal');
        this.renderEvents();
        this.editingEventId = null;
    }

    showFindEventsModal() {
        console.log('Showing find events modal');
        this.showModal('findEventsModal');
        document.getElementById('eventSearchResults').innerHTML = '';
        const locationInput = document.getElementById('searchLocation');
        if (locationInput && this.userProfile.location !== 'Your City, Country') {
            locationInput.value = this.userProfile.location;
        }
    }

    searchEvents() {
        console.log('Searching events');
        const location = document.getElementById('searchLocation').value.trim();
        const selectedTopics = Array.from(document.querySelectorAll('#findEventsModal input[type="checkbox"]:checked'))
            .map(cb => cb.value);

        if (!location) {
            this.showToast('Please enter your location', 'error');
            return;
        }

        this.showLoading();

        // Simulate API call
        setTimeout(() => {
            const mockResults = this.getMockEventResults(location, selectedTopics);
            this.renderEventSearchResults(mockResults);
            this.hideLoading();
        }, 1500);
    }

    getMockEventResults(location, topics) {
        const baseEvents = [
            {
                name: "Microsoft Tech Summit Vienna 2026",
                date: "2026-03-15",
                location: "Vienna, Austria",
                type: "Regional Conference",
                distance: "250 km",
                topics: ["Azure", "AI", "Business Applications"],
                cfpOpen: true,
                cfpDeadline: "2025-12-15",
                website: "https://techsummit.microsoft.com"
            },
            {
                name: "European Business Central User Group",
                date: "2025-11-20",
                location: "Munich, Germany",
                type: "User Group",
                distance: "400 km",
                topics: ["Business Central", "Best Practices"],
                cfpOpen: false,
                registration: "Open"
            },
            {
                name: "AI & Automation Conference Prague",
                date: "2026-04-08",
                location: "Prague, Czech Republic",
                type: "AI Conference",
                distance: "300 km",
                topics: ["AI", "Automation", "Enterprise"],
                cfpOpen: true,
                cfpDeadline: "2026-01-30"
            }
        ];

        return baseEvents.filter(event => 
            topics.length === 0 || event.topics.some(topic => topics.includes(topic))
        );
    }

    renderEventSearchResults(results) {
        const container = document.getElementById('eventSearchResults');
        if (!container) return;

        if (results.length === 0) {
            container.innerHTML = '<div class="empty-state"><h4>No events found</h4><p>Try different topics or expand your search area</p></div>';
            return;
        }

        container.innerHTML = `
            <h4 style="margin-bottom: var(--space-16);">Found ${results.length} events</h4>
            ${results.map(event => `
                <div class="search-result-item">
                    <div class="search-result-header">
                        <h4 class="search-result-name">${event.name}</h4>
                        <span class="search-result-distance">${event.distance}</span>
                    </div>
                    <div class="search-result-details">
                        <span><strong>Date:</strong> ${this.formatDate(event.date)}</span>
                        <span><strong>Location:</strong> ${event.location}</span>
                        <span><strong>Type:</strong> ${event.type}</span>
                    </div>
                    <div class="search-result-topics">
                        ${event.topics.map(topic => `<span class="tag">${topic}</span>`).join('')}
                    </div>
                    <div class="search-result-actions">
                        <button class="btn btn--outline btn--sm" onclick="mvpApp.addEventFromSearch('${event.name}', '${event.date}', '${event.location}', '${event.type}', ${JSON.stringify(event.topics).replace(/"/g, '&quot;')})">
                            Add to My Events
                        </button>
                        ${event.website ? `<a href="${event.website}" target="_blank" class="btn btn--outline btn--sm">Visit Website</a>` : ''}
                    </div>
                </div>
            `).join('')}
        `;
    }

    addEventFromSearch(name, date, location, type, topics) {
        const eventData = {
            id: Date.now(),
            name,
            startDate: date,
            endDate: date,
            location,
            type,
            topics,
            involvement: 'considering',
            website: null,
            cfpDeadline: null,
            notes: 'Added from event search'
        };

        this.conferences.push(eventData);
        this.saveToStorage('conferences', this.conferences);
        this.showToast('Event added to your calendar!', 'success');
    }

    // Content Ideas Management
    showContentIdeasModal(contentType = 'all') {
        console.log('Showing content ideas modal for:', contentType);
        this.currentContentType = contentType;
        this.renderContentIdeas();
        this.showModal('contentIdeasModal');
    }

    switchContentType(contentType) {
        this.currentContentType = contentType;
        
        // Update active tab
        document.querySelectorAll('#contentIdeasModal .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeTab = document.querySelector(`#contentIdeasModal [data-content-type="${contentType}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        this.renderContentIdeas();
    }

    renderContentIdeas() {
        const container = document.getElementById('contentIdeasList');
        if (!container) return;

        let filteredIdeas = this.contentIdeas;
        if (this.currentContentType !== 'all') {
            filteredIdeas = this.contentIdeas.filter(idea => idea.type === this.currentContentType);
        }

        if (filteredIdeas.length === 0) {
            container.innerHTML = '<div class="empty-state"><h4>No content ideas yet</h4><p>Start tracking your blog posts, speaking topics, and contributions</p></div>';
            return;
        }

        container.innerHTML = filteredIdeas.map(idea => `
            <div class="content-idea-card" data-idea-id="${idea.id}">
                <div class="content-idea-header">
                    <h4 class="content-idea-title">${idea.title}</h4>
                    <div class="content-idea-actions">
                        <button class="action-btn edit-idea-btn" data-idea-id="${idea.id}" title="Edit">✏️</button>
                        <button class="action-btn delete-idea-btn" data-idea-id="${idea.id}" title="Delete">🗑️</button>
                    </div>
                </div>
                <div class="content-idea-meta">
                    <span class="content-idea-type">${this.getContentTypeLabel(idea.type)}</span>
                    <span class="content-idea-priority ${idea.priority}">${idea.priority.toUpperCase()}</span>
                    <span class="content-idea-status ${idea.status}">${idea.status.toUpperCase().replace('-', ' ')}</span>
                </div>
                ${idea.notes ? `<p class="content-idea-notes">${idea.notes}</p>` : ''}
                <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: var(--space-8);">
                    Created: ${this.formatDate(idea.dateCreated)}
                </div>
            </div>
        `).join('');
    }

    getContentTypeLabel(type) {
        const labels = {
            'blog': 'Blog Post',
            'speaking': 'Speaking',
            'contribution': 'Contribution'
        };
        return labels[type] || type;
    }

    showAddContentIdeaModal() {
        console.log('Showing add content idea modal');
        this.editingContentId = null;
        this.clearContentIdeaForm();
        this.showModal('addContentIdeaModal');
    }

    clearContentIdeaForm() {
        const fields = {
            'contentIdeaType': 'blog',
            'contentIdeaTitle': '',
            'contentIdeaPriority': 'medium',
            'contentIdeaStatus': 'idea',
            'contentIdeaNotes': ''
        };

        for (const [id, value] of Object.entries(fields)) {
            const element = document.getElementById(id);
            if (element) element.value = value;
        }
    }

    saveContentIdea() {
        const getValue = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : '';
        };

        const title = getValue('contentIdeaTitle');
        if (!title) {
            this.showToast('Please enter a title', 'error');
            return;
        }

        const ideaData = {
            type: getValue('contentIdeaType') || 'blog',
            title,
            priority: getValue('contentIdeaPriority') || 'medium',
            status: getValue('contentIdeaStatus') || 'idea',
            notes: getValue('contentIdeaNotes') || null
        };

        if (this.editingContentId) {
            // Update existing idea
            const index = this.contentIdeas.findIndex(i => i.id === this.editingContentId);
            if (index !== -1) {
                this.contentIdeas[index] = { 
                    ...ideaData, 
                    id: this.editingContentId, 
                    dateCreated: this.contentIdeas[index].dateCreated 
                };
            }
            this.showToast('Content idea updated!', 'success');
        } else {
            // Add new idea
            ideaData.id = Date.now();
            ideaData.dateCreated = new Date().toISOString();
            this.contentIdeas.push(ideaData);
            this.showToast('Content idea added!', 'success');
        }

        this.saveToStorage('contentIdeas', this.contentIdeas);
        this.hideModal('addContentIdeaModal');
        this.renderContentIdeas();
        this.renderContentHub();
        this.editingContentId = null;
    }

    // Utility functions
    toggleBookmark(articleId) {
        console.log('Toggling bookmark for article:', articleId);
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;

        const isBookmarked = this.isBookmarked(articleId);
        
        if (isBookmarked) {
            this.removeBookmark(articleId);
        } else {
            this.addBookmark(article);
        }

        // Re-render current section
        this.renderSectionContent(this.currentSection);
    }

    addBookmark(article) {
        if (!this.isBookmarked(article.id)) {
            this.bookmarks.push({...article});
            this.saveToStorage('bookmarks', this.bookmarks);
            this.showToast('Article bookmarked!', 'success');
        }
    }

    removeBookmark(articleId) {
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== articleId);
        this.saveToStorage('bookmarks', this.bookmarks);
        this.showToast('Bookmark removed!', 'info');
    }

    isBookmarked(articleId) {
        return this.bookmarks.some(bookmark => bookmark.id === articleId);
    }

    shareArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;

        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: article.url
            });
        } else {
            const shareText = `${article.title}\n${article.excerpt}\n${article.url}`;
            navigator.clipboard.writeText(shareText).then(() => {
                this.showToast('Article link copied to clipboard!', 'success');
            }).catch(() => {
                this.showToast('Unable to copy to clipboard', 'error');
            });
        }
    }

    performSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            this.searchQuery = searchInput.value.trim();
            console.log('Performing search for:', this.searchQuery);
        }
        
        if (this.currentSection !== 'news') {
            this.showSection('news');
        } else {
            this.filterArticles();
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        console.log('Theme switched to:', this.currentTheme);
    }

    addNewFeed() {
        const getValue = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : '';
        };

        const name = getValue('feedName');
        const url = getValue('feedUrl');
        const category = getValue('feedCategory');

        if (!name || !url) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        const newFeed = {
            name,
            url,
            category,
            status: 'pending',
            lastUpdated: new Date().toISOString()
        };

        this.rssFeeds.push(newFeed);
        this.saveToStorage('rssFeeds', this.rssFeeds);
        this.hideModal('addFeedModal');
        this.renderRSSFeeds();
        this.showToast('RSS feed added successfully!', 'success');
        
        // Clear form
        ['feedName', 'feedUrl'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
    }

    exportUserData() {
        const userData = {
            profile: this.userProfile,
            bookmarks: this.bookmarks,
            conferences: this.conferences,
            contentIdeas: this.contentIdeas,
            goals: this.goals,
            rssFeeds: this.rssFeeds,
            settings: this.settings,
            stats: this.stats,
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `mvp-hub-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showToast('Data exported successfully!', 'success');
    }

    // UI Helper functions
    showLoading() {
        const indicator = document.getElementById('loadingIndicator');
        if (indicator) indicator.classList.remove('hidden');
    }

    hideLoading() {
        const indicator = document.getElementById('loadingIndicator');
        if (indicator) indicator.classList.add('hidden');
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-header">
                <h4 class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                <button class="toast-close">&times;</button>
            </div>
            <p class="toast-message">${message}</p>
        `;

        container.appendChild(toast);

        // Add close handler
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    formatDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (start.toDateString() === end.toDateString()) {
            return start.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
        
        return `${start.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        })} - ${end.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric' 
        })}`;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing enhanced MVP Hub...');
    window.mvpApp = new MVPKnowledgeHub();
});

// Fallback initialization
if (document.readyState !== 'loading') {
    console.log('DOM already loaded, initializing enhanced MVP Hub...');
    window.mvpApp = new MVPKnowledgeHub();
}