// MrKyoto.com - Main JavaScript
// Enhanced theme switching and UI interactions with improved color scheme

class MrKyotoApp {
    constructor() {
        console.log('🏗️ MrKyotoApp constructor called');
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        console.log('🔧 MrKyotoApp init() called');
        this.setupTheme();
        this.setupNavigation();
        this.setupAnimations();
        this.setupAccessibility();
        this.setupServiceWorker();
        this.setupNewFeatures();
        this.setupRealEstateData();
        console.log('✅ MrKyotoApp init() completed');
    }

    setupTheme() {
        console.log('🎨 Setting up theme system...');
        
        // Get saved theme or default to light
        const savedTheme = localStorage.getItem('mrkyoto-theme') || 'light';
        console.log('🎨 Saved theme:', savedTheme);
        this.setTheme(savedTheme);

        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            console.log('🎨 Theme toggle button found');
            themeToggle.addEventListener('click', () => {
                console.log('🎨 Theme toggle clicked');
                this.toggleTheme();
            });
        } else {
            console.warn('⚠️ Theme toggle button not found');
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('mrkyoto-theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        console.log('✅ Theme system setup complete');
    }

    setTheme(theme) {
        this.currentTheme = theme;
        console.log('🎨 Setting theme to:', theme);
        
        // Update document attributes - ensure both data-theme and dark class are set
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
            console.log('🌙 Dark mode classes added');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
            console.log('☀️ Light mode classes removed');
        }
        
        // Save to localStorage
        localStorage.setItem('mrkyoto-theme', theme);
        
        // Update theme toggle button
        this.updateThemeToggle();
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
        
        console.log('✅ Theme applied successfully');
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            if (this.currentTheme === 'dark') {
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    }

    setupNavigation() {
        console.log('📱 Setting up navigation...');
        
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            console.log('📱 Mobile menu elements found');
            mobileMenuToggle.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.contains('hidden');
                console.log('📱 Mobile menu toggle clicked, current state:', isOpen);
                
                if (isOpen) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenuToggle.setAttribute('aria-expanded', 'true');
                    mobileMenuToggle.setAttribute('aria-label', 'Close navigation menu');
                    console.log('📱 Mobile menu opened');
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
                    console.log('📱 Mobile menu closed');
                }
            });
        } else {
            console.warn('⚠️ Mobile menu elements not found:', { mobileMenuToggle, mobileMenu });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuToggle?.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                if (mobileMenuToggle) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation highlighting
        this.updateActiveNavigation();
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Parallax effect for hero sections
        this.setupParallax();
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupAccessibility() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Escape key closes modals and mobile menu
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                }

                // Close any open modals
                const modals = document.querySelectorAll('.modal');
                modals.forEach(modal => {
                    if (!modal.classList.contains('hidden')) {
                        modal.classList.add('hidden');
                    }
                });
            }
        });

        // Focus management for modals
        this.setupModalFocus();
    }

    setupModalFocus() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-trigger')) {
                const modalId = e.target.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    // Store current focus
                    this.previousFocus = document.activeElement;
                    
                    // Focus first focusable element in modal
                    const focusableElements = modal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
            }
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    setupNewFeatures() {
        this.setupLanguageSwitcher();
        this.setupSearch();
        this.setupReadingProgress();
        this.setupBackToTop();
        this.setupCookieConsent();
        this.setupWeatherWidget();
        this.setupNotifications();
        this.setupInteractiveCards();
        this.setupQuickMenu();
        this.setupLoadingStates(); // Add loading states handler
        this.setupPropertyGalleries(); // Add property gallery setup
        this.setupRealEstateData(); // Add real estate data integration
    }

    setupLanguageSwitcher() {
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        
        if (languageToggle && languageDropdown) {
            console.log('🌐 Setting up language switcher...');
            
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = languageToggle.getAttribute('aria-expanded') === 'true';
                
                console.log('🌐 Language toggle clicked, current state:', isExpanded);
                
                if (isExpanded) {
                    // Close dropdown
                    languageDropdown.classList.remove('opacity-100', 'visible', 'scale-100');
                    languageDropdown.classList.add('opacity-0', 'invisible', 'scale-95');
                    languageToggle.setAttribute('aria-expanded', 'false');
                    console.log('🌐 Language dropdown closed');
                } else {
                    // Open dropdown
                    languageDropdown.classList.remove('opacity-0', 'invisible', 'scale-95');
                    languageDropdown.classList.add('opacity-100', 'visible', 'scale-100');
                    languageToggle.setAttribute('aria-expanded', 'true');
                    console.log('🌐 Language dropdown opened');
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                    languageDropdown.classList.remove('opacity-100', 'visible', 'scale-100');
                    languageDropdown.classList.add('opacity-0', 'invisible', 'scale-95');
                    languageToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Language selection
            languageDropdown.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (link && link.dataset.lang) {
                    const lang = link.dataset.lang;
                    console.log('🌐 Language selected:', lang);
                    this.changeLanguage(lang);
                    languageDropdown.classList.remove('opacity-100', 'visible', 'scale-100');
                    languageDropdown.classList.add('opacity-0', 'invisible', 'scale-95');
                    languageToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Keyboard navigation
            languageToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    languageToggle.click();
                }
            });
            
            console.log('✅ Language switcher setup complete');
        } else {
            console.warn('⚠️ Language switcher elements not found:', { languageToggle, languageDropdown });
        }
    }

    changeLanguage(lang) {
        // Store language preference
        localStorage.setItem('mrkyoto-language', lang);
        
        // Show notification
        this.showNotification(`Language changed to ${lang === 'en' ? 'English' : lang === 'ja' ? '日本語' : lang === 'zh' ? '中文' : '한국어'}`, 'info');
        
        // In a real app, you would load translations here
        console.log(`Language changed to: ${lang}`);
    }

    setupSearch() {
        const searchToggle = document.getElementById('search-toggle');
        const searchOverlay = document.getElementById('search-overlay');
        const searchClose = document.getElementById('search-close');
        const searchInput = document.getElementById('search-input');
        const searchSuggestions = document.getElementById('search-suggestions');
        
        if (searchToggle && searchOverlay) {
            searchToggle.addEventListener('click', () => {
                searchOverlay.classList.remove('hidden');
                setTimeout(() => searchInput.focus(), 100);
            });

            searchClose.addEventListener('click', () => {
                searchOverlay.classList.add('hidden');
            });

            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    searchOverlay.classList.add('hidden');
                }
            });

            // Search functionality
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const query = e.target.value.trim();
                    if (query.length > 2) {
                        this.showSearchSuggestions(query, searchSuggestions);
                    } else {
                        searchSuggestions.classList.add('hidden');
                    }
                });

                searchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        searchOverlay.classList.add('hidden');
                    }
                });
            }
        }
    }

    showSearchSuggestions(query, container) {
        // Mock search suggestions
        const suggestions = [
            { text: 'Kiyomizudera Temple', url: '/pages/temple-tours.html' },
            { text: 'Tea Ceremony Experience', url: '/pages/tea-ceremony.html' },
            { text: 'Kyoto Real Estate', url: '/real-estate/' },
            { text: 'Cherry Blossom Season', url: '/pages/top-activities.html' },
            { text: 'Traditional Machiya Houses', url: '/real-estate/' }
        ].filter(item => item.text.toLowerCase().includes(query.toLowerCase()));

        if (suggestions.length > 0) {
            container.innerHTML = suggestions.map(item => 
                `<a href="${item.url}" class="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                    <div class="font-medium text-sumi dark:text-white">${item.text}</div>
                    <div class="text-sm text-sumi/60 dark:text-gray-400">Click to explore</div>
                </a>`
            ).join('');
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    }

    setupReadingProgress() {
        const progressBar = document.getElementById('reading-progress');
        
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.offsetHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        }
    }

    setupBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupCookieConsent() {
        const cookieBanner = document.getElementById('cookie-banner');
        const cookieAccept = document.getElementById('cookie-accept');
        const cookieDecline = document.getElementById('cookie-decline');
        
        if (cookieBanner && !localStorage.getItem('mrkyoto-cookies')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 2000);
        }

        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => {
                localStorage.setItem('mrkyoto-cookies', 'accepted');
                cookieBanner.classList.remove('show');
                this.showNotification('Cookie preferences saved', 'success');
            });
        }

        if (cookieDecline) {
            cookieDecline.addEventListener('click', () => {
                localStorage.setItem('mrkyoto-cookies', 'declined');
                cookieBanner.classList.remove('show');
                this.showNotification('Cookie preferences saved', 'info');
            });
        }
    }

    setupWeatherWidget() {
        // Mock weather data - in a real app, you'd fetch from a weather API
        const weatherData = {
            temperature: '22°C',
            condition: 'Partly Cloudy',
            humidity: '65%',
            icon: '🌤️'
        };

        // Update weather widget every 30 minutes
        setInterval(() => {
            // Simulate weather changes
            const conditions = ['🌤️', '☀️', '🌧️', '⛅', '🌨️'];
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
            console.log('Weather updated:', randomCondition);
        }, 1800000); // 30 minutes
    }

    setupNotifications() {
        // Notifications system is ready but no automatic welcome messages
        // Notifications can be triggered manually when needed
    }

    setupInteractiveCards() {
        // Add interactive card effects
        document.querySelectorAll('.zen-card').forEach(card => {
            card.classList.add('interactive-card');
        });
    }

    setupQuickMenu() {
        const quickMenuToggle = document.getElementById('quick-menu-toggle');
        const quickMenu = document.getElementById('quick-menu');
        
        if (quickMenuToggle && quickMenu) {
            quickMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isVisible = quickMenu.classList.contains('opacity-100');
                
                if (isVisible) {
                    quickMenu.classList.remove('opacity-100', 'visible', 'scale-100');
                    quickMenu.classList.add('opacity-0', 'invisible', 'scale-95');
                } else {
                    quickMenu.classList.remove('opacity-0', 'invisible', 'scale-95');
                    quickMenu.classList.add('opacity-100', 'visible', 'scale-100');
                }
            });

            document.addEventListener('click', () => {
                quickMenu.classList.remove('opacity-100', 'visible', 'scale-100');
                quickMenu.classList.add('opacity-0', 'invisible', 'scale-95');
            });
        }
    }

    setupLoadingStates() {
        // Handle elements with data-load attributes
        document.addEventListener('DOMContentLoaded', () => {
            // Process all elements with data-load attributes
            const loadingElements = document.querySelectorAll('[data-load]');
            loadingElements.forEach(element => {
                const loadData = element.dataset.load;
                if (loadData === 'loaded') {
                    // Remove loading class and add loaded class
                    element.classList.remove('loading');
                    element.classList.add('loaded');
                }
            });
            
            // Also handle any elements that should be visible by default
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.opacity = '1';
                section.style.visibility = 'visible';
            });
        });
        
        // Fallback: ensure all sections are visible after a short delay
        setTimeout(() => {
            document.querySelectorAll('section').forEach(section => {
                section.style.opacity = '1';
                section.style.visibility = 'visible';
            });
            
            document.querySelectorAll('.loading').forEach(element => {
                element.classList.remove('loading');
                element.classList.add('loaded');
            });
        }, 100);
    }

    setupPropertyGalleries() {
        const galleries = document.querySelectorAll('.property-gallery');
        
        galleries.forEach(gallery => {
            const images = gallery.querySelectorAll('img');
            const navButtons = gallery.parentElement.querySelectorAll('.gallery-nav');
            let currentIndex = 0;
            let autoRotateInterval;
            
            if (images.length <= 1) return;
            
            // Function to show image at specific index
            const showImage = (index) => {
                images.forEach((img, i) => {
                    img.style.opacity = i === index ? '1' : '0';
                });
                
                // Update navigation buttons
                navButtons.forEach((btn, i) => {
                    if (i === index) {
                        btn.classList.add('bg-white/70');
                        btn.classList.remove('bg-white/40');
                    } else {
                        btn.classList.remove('bg-white/70');
                        btn.classList.add('bg-white/40');
                    }
                });
                
                currentIndex = index;
            };
            
            // Function to go to next image
            const nextImage = () => {
                const nextIndex = (currentIndex + 1) % images.length;
                showImage(nextIndex);
            };
            
            // Function to go to previous image
            const prevImage = () => {
                const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
                showImage(prevIndex);
            };
            
            // Setup navigation buttons
            navButtons.forEach((btn, index) => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showImage(index);
                    resetAutoRotate();
                });
            });
            
            // Auto-rotate functionality
            const startAutoRotate = () => {
                autoRotateInterval = setInterval(nextImage, 4000);
            };
            
            const resetAutoRotate = () => {
                if (autoRotateInterval) {
                    clearInterval(autoRotateInterval);
                    startAutoRotate();
                }
            };
            
            // Touch/swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            const handleTouchStart = (e) => {
                touchStartX = e.changedTouches[0].screenX;
            };
            
            const handleTouchEnd = (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            };
            
            const handleSwipe = () => {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe left - next image
                        nextImage();
                    } else {
                        // Swipe right - previous image
                        prevImage();
                    }
                    resetAutoRotate();
                }
            };
            
            // Add touch event listeners
            gallery.addEventListener('touchstart', handleTouchStart, { passive: true });
            gallery.addEventListener('touchend', handleTouchEnd, { passive: true });
            
            // Pause auto-rotate on hover
            gallery.addEventListener('mouseenter', () => {
                if (autoRotateInterval) {
                    clearInterval(autoRotateInterval);
                }
            });
            
            gallery.addEventListener('mouseleave', () => {
                startAutoRotate();
            });
            
            // Keyboard navigation
            gallery.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevImage();
                    resetAutoRotate();
                } else if (e.key === 'ArrowRight') {
                    nextImage();
                    resetAutoRotate();
                }
            });
            
            // Start auto-rotation
            startAutoRotate();
            
            // Make gallery focusable for keyboard navigation
            gallery.setAttribute('tabindex', '0');
        });
    }

    setupRealEstateData() {
        console.log('🚀 setupRealEstateData called');
        
        // Check if realEstateData is available immediately
        if (typeof realEstateData !== 'undefined') {
            console.log('✅ realEstateData is available immediately');
            console.log('🔍 realEstateData methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(realEstateData)));
            console.log('🔍 Sale properties count:', realEstateData.getPropertiesForSale().length);
            console.log('🔍 Rent properties count:', realEstateData.getPropertiesForRent().length);
            this.displayHomepageProperties();
        } else {
            console.log('⏳ realEstateData not available yet, waiting...');
            // Wait a bit and try again
            setTimeout(() => {
                console.log('🔄 Retrying setupRealEstateData...');
                if (typeof realEstateData !== 'undefined') {
                    console.log('✅ realEstateData is now available');
                    this.displayHomepageProperties();
                } else {
                    console.log('❌ realEstateData still not available after timeout');
                    // Try to display a fallback message
                    const featuredContainer = document.querySelector('#properties-grid');
                    if (featuredContainer) {
                        featuredContainer.innerHTML = `
                            <div class="col-span-1 md:col-span-2 text-center py-8">
                                <div class="text-4xl mb-4" role="img" aria-label="Error loading properties">⚠️</div>
                                <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2">Error Loading Properties</h3>
                                <p class="text-sumi/70 dark:text-gray-300">Please refresh the page to try again.</p>
                            </div>
                        `;
                    }
                }
            }, 1000);
        }
        
        // Initialize real estate data manager if available
        if (window.realEstateManager) {
            console.log('Real estate data manager initialized');
            
            // Update property display when data is loaded
            window.realEstateManager.updatePropertyDisplay();
            
            // Set up search integration with real estate data
            this.setupRealEstateSearch();
            
            // Set up property filtering
            this.setupPropertyFiltering();
        } else {
            console.log('Real estate data manager not available, using static data');
        }
        
        // Setup analytics dashboard
        this.setupAnalyticsDashboard();
        
        // Setup global search
        this.setupGlobalSearch();
    }

    displayHomepageProperties() {
        // DISABLED: Using static HTML property cards instead of dynamic JavaScript
        console.log('🔍 Homepage properties display disabled - using static HTML cards');
        return;
        
        // Original dynamic loading code commented out below
        /*
        console.log('🔍 Checking for homepage properties...');
        console.log('🔍 Current URL:', window.location.href);
        console.log('🔍 Is homepage:', window.location.pathname === '/' || window.location.pathname === '/index.html');
        
        // Check if we're on the homepage and real estate data is available
        if (typeof realEstateData !== 'undefined') {
            console.log('✅ Real estate data is available');
            console.log('🔍 realEstateData object:', realEstateData);
            
            // Try multiple possible container selectors
            let featuredContainer = document.querySelector('#properties-grid');
            console.log('🔍 #properties-grid found:', !!featuredContainer);
            
            if (!featuredContainer) {
                featuredContainer = document.querySelector('#featured-properties .grid');
                console.log('🔍 #featured-properties .grid found:', !!featuredContainer);
            }
            if (!featuredContainer) {
                featuredContainer = document.querySelector('#featured-properties');
                console.log('🔍 #featured-properties found:', !!featuredContainer);
            }
            
            if (featuredContainer) {
                console.log('✅ Found featured properties container:', featuredContainer);
                console.log('🔍 Container classes:', featuredContainer.className);
                console.log('🔍 Container computed style:', window.getComputedStyle(featuredContainer).display);
                console.log('🔍 Container innerHTML before:', featuredContainer.innerHTML.substring(0, 100));
                
                // Get all properties for sale and rent
                const saleProperties = realEstateData.getPropertiesForSale();
                const rentProperties = realEstateData.getPropertiesForRent();
                const featuredProperties = [...saleProperties, ...rentProperties];
                
                console.log(`📊 Found ${featuredProperties.length} featured properties`);
                console.log('🔍 Sale properties:', saleProperties.length);
                console.log('🔍 Rent properties:', rentProperties.length);
                console.log('🔍 First property:', featuredProperties[0]);
                
                if (featuredProperties.length > 0) {
                    console.log('🎨 Rendering property cards...');
                    const propertyCards = featuredProperties.map(property => 
                        this.createPropertyCard(property)
                    );
                    console.log('🔍 Generated property cards:', propertyCards.length);
                    console.log('🔍 First card HTML:', propertyCards[0]);
                    
                    featuredContainer.innerHTML = propertyCards.join('');
                    console.log('✅ Property cards rendered successfully');
                    console.log('🔍 Container innerHTML after:', featuredContainer.innerHTML.substring(0, 100));
                    
                    // Force grid display after rendering
                    setTimeout(() => {
                        featuredContainer.style.display = 'grid';
                        console.log('🔧 Forced grid display');
                        
                        // Disable any property galleries that might be interfering
                        const galleries = featuredContainer.querySelectorAll('.property-gallery');
                        galleries.forEach(gallery => {
                            gallery.style.display = 'none';
                        });
                        
                        // Remove any thumbnail elements that might be added
                        const thumbnails = featuredContainer.querySelectorAll('[class*="thumbnail"]');
                        thumbnails.forEach(thumb => {
                            thumb.remove();
                        });
                    }, 100);
                } else {
                    console.log('⚠️  No properties found, showing fallback message');
                    featuredContainer.innerHTML = `
                        <div class="col-span-1 md:col-span-2 text-center py-8">
                            <div class="text-4xl mb-4" role="img" aria-label="No properties">🏠</div>
                            <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2">Properties Coming Soon</h3>
                            <p class="text-sumi/70 dark:text-gray-300">We're updating our property listings. Please check back soon!</p>
                        </div>
                    `;
                }
            } else {
                console.log('❌ Featured properties container not found');
                console.log('🔍 Available containers:', document.querySelectorAll('[id*="property"]'));
                console.log('🔍 All containers with "grid" class:', document.querySelectorAll('.grid'));
            }
        } else {
            console.log('❌ Real estate data not available');
            console.log('🔍 typeof realEstateData:', typeof realEstateData);
            console.log('🔍 window.realEstateData:', window.realEstateData);
        }
        */
    }

    createPropertyCard(property) {
        // Validate property data (temporarily disabled for debugging)
        // if (!this.validatePropertyData(property)) {
        //     console.warn('⚠️ Invalid property data:', property.id);
        //     return '';
        // }
        
        const isRental = property.type?.toLowerCase().includes('rent') || property.id.includes('rent');
        const isVerified = this.isValidProperty(property);
        
        return `
            <div class="zen-card${isVerified ? ' border-2 border-matcha' : ' border border-shinku/30'} bg-white dark:bg-sumi rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group" data-property-id="${property.id}">
                <!-- Property Image -->
                <div class="relative overflow-hidden rounded-t-lg h-48 lg:h-56">
                    <img src="${property.image}" alt="${property.title}" 
                         class="w-full h-full object-cover"
                         loading="lazy">
                    <div class="absolute top-3 left-3 bg-shinku text-white px-2 py-1 rounded text-xs font-bold">
                        ${isRental ? 'For Rent' : 'For Sale'}
                    </div>
                    <div class="absolute top-3 right-3 bg-matcha text-white px-2 py-1 rounded text-xs font-bold">
                        ${property.walkScore} Walk
                    </div>
                    ${isVerified ? '<span class="absolute bottom-3 right-3 bg-matcha text-white px-2 py-1 rounded text-xs font-bold">Verified</span>' : ''}
                </div>
                
                <!-- Property Content -->
                <div class="p-4 lg:p-6">
                    <!-- Header -->
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1 min-w-0">
                            <h3 class="font-serif text-lg lg:text-xl font-bold text-sumi dark:text-white mb-1 truncate">
                                ${property.title}
                            </h3>
                            <p class="text-sm text-sumi/70 dark:text-gray-300 mb-1">
                                <span class="inline-block mr-3">📍 ${property.location}</span>
                                <span class="inline-block">🏘️ ${property.neighborhood}</span>
                            </p>
                            <div class="flex items-center gap-2 text-xs text-sumi/60 dark:text-gofun/60">
                                <span>Listed by: ${property.agency}</span>
                                <span>•</span>
                                <span>ID: ${property.id}</span>
                            </div>
                        </div>
                        <div class="text-right ml-3">
                            <div class="text-xl lg:text-2xl font-bold text-shinku">${property.price}</div>
                            <div class="text-sm text-sumi/60 dark:text-gofun/60">${property.priceUSD}</div>
                        </div>
                    </div>
                    
                    <!-- Property Stats -->
                    <div class="grid grid-cols-3 gap-2 mb-4">
                        <div class="text-center p-2 bg-washi/30 dark:bg-gray-700/30 rounded">
                            <div class="text-lg font-bold text-sumi dark:text-white">${property.bedrooms}</div>
                            <div class="text-xs text-sumi/60 dark:text-gofun/60">Bedrooms</div>
                        </div>
                        <div class="text-center p-2 bg-washi/30 dark:bg-gray-700/30 rounded">
                            <div class="text-lg font-bold text-sumi dark:text-white">${property.bathrooms}</div>
                            <div class="text-xs text-sumi/60 dark:text-gofun/60">Bathrooms</div>
                        </div>
                        <div class="text-center p-2 bg-washi/30 dark:bg-gray-700/30 rounded">
                            <div class="text-lg font-bold text-sumi dark:text-white">${property.size}</div>
                            <div class="text-xs text-sumi/60 dark:text-gofun/60">Size</div>
                        </div>
                    </div>
                    
                    <!-- Features -->
                    <div class="mb-4">
                        <h4 class="font-semibold text-sumi dark:text-white mb-2 text-sm">Features:</h4>
                        <div class="flex flex-wrap gap-1">
                            ${property.features.slice(0, 3).map(feature => 
                                `<span class="px-2 py-1 bg-matcha/20 text-matcha text-xs rounded">${feature}</span>`
                            ).join('')}
                            ${property.features.length > 3 ? 
                                `<span class="px-2 py-1 bg-sumi/20 dark:bg-gofun/20 text-sumi dark:text-gofun text-xs rounded">+${property.features.length - 3} more</span>` : 
                                ''
                            }
                        </div>
                    </div>
                    
                    <!-- Property Actions -->
                    <div class="flex gap-2">
                        <a href="/real-estate/#property-${property.id}" 
                           class="flex-1 bg-shinku text-white px-3 py-2 rounded text-sm font-semibold hover:bg-shinku/80 transition-colors text-center">
                            View Details
                        </a>
                        <a href="tel:${property.contact}" 
                           class="flex-1 bg-matcha text-white px-3 py-2 rounded text-sm font-semibold hover:bg-matcha/80 transition-colors text-center">
                            Call Agent
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
                        <div class="price-usd">${priceUSD}</div>
                    </div>
                    
                    <div class="card-stats">
                        <div class="stat">
                            <div class="stat-value">${property.bedrooms}</div>
                            <div class="stat-label">Beds</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${property.bathrooms}</div>
                            <div class="stat-label">Baths</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${property.size}</div>
                            <div class="stat-label">Size</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${property.yearBuilt}</div>
                            <div class="stat-label">Built</div>
                        </div>
                    </div>
                    
                    <div class="card-features">
                        <h4>Features:</h4>
                        <div class="feature-tags">
                            ${property.features.slice(0, 2).map(feature => 
                                `<span class="feature-tag">${feature}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="card-buttons">
                        <a href="/pages/${isRental ? 'rent' : 'buy'}-house-kyoto.html" class="btn-primary">View Details</a>
                        <a href="mailto:hello@mrkyoto.com?subject=Inquiry about ${property.title}" class="btn-secondary">Contact</a>
                    </div>
                </div>
            </div>
        `;
    }

    setupRealEstateSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput && window.realEstateManager) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 2) {
                    const results = window.realEstateManager.searchProperties(query);
                    this.displayPropertySearchResults(results);
                }
            });
        }
    }

    displayPropertySearchResults(results) {
        const searchSuggestions = document.getElementById('search-suggestions');
        if (searchSuggestions && results.length > 0) {
            const propertyResults = results.slice(0, 5).map(property => 
                `<a href="/pages/${property.type === 'sale' ? 'buy' : 'rent'}-house-kyoto/" class="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                    <div class="font-medium text-sumi dark:text-white">${property.title}</div>
                    <div class="text-sm text-sumi/60 dark:text-gray-400">${property.priceFormatted} • ${property.location}</div>
                </a>`
            );
            
            searchSuggestions.innerHTML = propertyResults.join('');
            searchSuggestions.classList.remove('hidden');
        }
    }

    setupPropertyFiltering() {
        // Add filter functionality for property pages
        const filterButtons = document.querySelectorAll('[data-property-filter]');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filterType = e.target.dataset.propertyFilter;
                if (window.realEstateManager) {
                    const filteredProperties = window.realEstateManager.getProperties(filterType);
                    this.updatePropertyDisplay(filteredProperties);
                }
            });
        });
    }

    updatePropertyDisplay(properties = null) {
        if (!window.realEstateManager) return;
        
        const propertiesToShow = properties || window.realEstateManager.getProperties();
        
        // Update featured properties on homepage
        const featuredContainer = document.querySelector('#featured-properties .grid');
        if (featuredContainer) {
            const featuredProperties = propertiesToShow.slice(0, 2);
            featuredContainer.innerHTML = featuredProperties.map(property => 
                window.realEstateManager.createPropertyCard(property)
            ).join('');
            
            // Reinitialize gallery functionality
            this.setupPropertyGalleries();
        }
        
        // Update property pages
        const propertyPages = ['buy-house-kyoto', 'rent-house-kyoto'];
        propertyPages.forEach(page => {
            const container = document.querySelector(`[data-page="${page}"]`);
            if (container) {
                const pageProperties = propertiesToShow.filter(p => 
                    page === 'buy-house-kyoto' ? p.type === 'sale' : p.type === 'rent'
                );
                container.innerHTML = pageProperties.map(property => 
                    window.realEstateManager.createDetailedPropertyCard(property)
                ).join('');
            }
        });
    }

    // Utility methods
    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type === 'success' ? 'border-l-4 border-green-500' : type === 'warning' ? 'border-l-4 border-yellow-500' : type === 'error' ? 'border-l-4 border-red-500' : 'border-l-4 border-blue-500'}`;
        
        const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️';
        
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-lg">${icon}</span>
                <div class="flex-1">
                    <p class="text-sumi dark:text-white font-medium">${message}</p>
                </div>
                <button class="text-sumi/60 dark:text-gray-400 hover:text-sumi dark:hover:text-white transition-colors" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    showLoading(element) {
        if (element) {
            element.innerHTML = '<div class="spinner"></div>';
            element.disabled = true;
        }
    }

    hideLoading(element, originalContent) {
        if (element) {
            element.innerHTML = originalContent;
            element.disabled = false;
        }
    }

    // Form validation
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
        });

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('border-error');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error text-error text-sm mt-1';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('border-error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // API utilities
    async fetchAPI(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Local storage utilities
    setStorageItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Storage error:', error);
        }
    }

    getStorageItem(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage error:', error);
            return defaultValue;
        }
    }

    // Analytics tracking
    trackEvent(category, action, label = null, value = null) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
    }

    // Performance monitoring
    trackPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        this.trackEvent('Performance', 'Page Load', window.location.pathname, Math.round(perfData.loadEventEnd - perfData.loadEventStart));
                    }
                }, 0);
            });
        }
    }

    // Analytics Dashboard Setup
    setupAnalyticsDashboard() {
        console.log('📊 Setting up analytics dashboard...');
        
        // Initialize analytics data
        this.analyticsData = {
            properties: 0,
            activities: 0,
            events: 0,
            news: 0,
            marketHealth: 'Strong'
        };
        
        // Load data from all sources
        this.loadAnalyticsData();
        
        // Setup chart rendering
        this.setupCharts();
        
        // Setup live data updates
        this.startLiveDataStream();
        
        // Setup dashboard interactions
        this.setupDashboardInteractions();
        
        console.log('✅ Analytics dashboard setup complete');
    }

    loadAnalyticsData() {
        console.log('📊 Loading analytics data...');
        
        // Load property data
        if (typeof realEstateData !== 'undefined') {
            const properties = realEstateData.getPropertiesForSale().concat(realEstateData.getPropertiesForRent());
            this.analyticsData.properties = properties.length;
            
            // Update hero stats
            this.updateHeroStats();
        }
        
        // Load activities data
        if (typeof activitiesData !== 'undefined') {
            this.analyticsData.activities = activitiesData.length;
        }
        
        // Load events data
        if (typeof eventsData !== 'undefined') {
            this.analyticsData.events = eventsData.length;
        }
        
        // Load news data
        if (typeof newsData !== 'undefined') {
            this.analyticsData.news = newsData.length;
        }
        
        // Update dashboard displays
        this.updateAnalyticsDisplay();
    }

    updateHeroStats() {
        const heroProperties = document.getElementById('hero-total-properties');
        const heroActivities = document.getElementById('hero-total-activities');
        const heroEvents = document.getElementById('hero-total-events');
        
        if (heroProperties) heroProperties.textContent = this.analyticsData.properties;
        if (heroActivities) heroActivities.textContent = this.analyticsData.activities;
        if (heroEvents) heroEvents.textContent = this.analyticsData.events;
    }

    updateAnalyticsDisplay() {
        const totalProperties = document.getElementById('total-properties');
        const totalActivities = document.getElementById('total-activities');
        const totalEvents = document.getElementById('total-events');
        const marketHealth = document.getElementById('market-health');
        const featuredCount = document.getElementById('featured-count');
        const premiumCount = document.getElementById('premium-count');
        
        if (totalProperties) totalProperties.textContent = this.analyticsData.properties;
        if (totalActivities) totalActivities.textContent = this.analyticsData.activities;
        if (totalEvents) totalEvents.textContent = this.analyticsData.events;
        if (marketHealth) marketHealth.textContent = this.analyticsData.marketHealth;
        
        // Calculate featured and premium counts
        if (typeof realEstateData !== 'undefined') {
            const properties = realEstateData.getPropertiesForSale().concat(realEstateData.getPropertiesForRent());
            const featured = properties.filter(p => p.featured).length;
            const premium = properties.filter(p => p.premium).length;
            
            if (featuredCount) featuredCount.textContent = featured;
            if (premiumCount) premiumCount.textContent = premium;
        }
    }

    setupCharts() {
        console.log('📊 Setting up charts...');
        
        // Property distribution chart
        this.setupPropertyChart();
        
        // Activity categories chart
        this.setupActivityChart();
    }

    setupPropertyChart() {
        const ctx = document.getElementById('property-chart');
        if (!ctx) return;
        
        const properties = typeof realEstateData !== 'undefined' ? 
            realEstateData.getPropertiesForSale().concat(realEstateData.getPropertiesForRent()) : [];
        
        const categories = {};
        properties.forEach(property => {
            const category = property.category || 'Other';
            categories[category] = (categories[category] || 0) + 1;
        });
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: [
                        '#991B1B', '#B45309', '#166534', '#1E3A8A',
                        '#7C2D12', '#92400E', '#374151', '#B91C1C'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: this.currentTheme === 'dark' ? '#ffffff' : '#0F0F0F',
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    }

    setupActivityChart() {
        const ctx = document.getElementById('activity-chart');
        if (!ctx) return;
        
        const activities = typeof activitiesData !== 'undefined' ? activitiesData : [];
        
        const categories = {};
        activities.forEach(activity => {
            const category = activity.category || 'Other';
            categories[category] = (categories[category] || 0) + 1;
        });
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    label: 'Activities',
                    data: Object.values(categories),
                    backgroundColor: '#166534',
                    borderColor: '#166534',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: this.currentTheme === 'dark' ? '#ffffff' : '#0F0F0F'
                        }
                    },
                    x: {
                        ticks: {
                            color: this.currentTheme === 'dark' ? '#ffffff' : '#0F0F0F'
                        }
                    }
                }
            }
        });
    }

    startLiveDataStream() {
        console.log('📊 Starting live data stream...');
        
        // Simulate live data updates
        this.liveDataInterval = setInterval(() => {
            this.updateLiveData();
        }, 30000); // Update every 30 seconds
    }

    updateLiveData() {
        // Simulate market updates
        const marketTrends = ['Strong', 'Stable', 'Growing', 'Active'];
        this.analyticsData.marketHealth = marketTrends[Math.floor(Math.random() * marketTrends.length)];
        
        // Update display
        this.updateAnalyticsDisplay();
        this.updateLiveIndicators();
    }

    updateLiveIndicators() {
        const liveIndicator = document.getElementById('live-indicator');
        if (liveIndicator) {
            const timestamp = new Date().toLocaleTimeString();
            liveIndicator.innerHTML = `
                <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live Data - ${timestamp}</span>
                </div>
            `;
        }
    }

    setupDashboardInteractions() {
        // Refresh analytics button
        const refreshBtn = document.getElementById('refresh-analytics');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadAnalyticsData();
                this.setupCharts();
                this.showNotification('Analytics data refreshed', 'success');
            });
        }
        
        // Export analytics button
        const exportBtn = document.getElementById('export-analytics');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportAnalyticsData();
            });
        }
    }

    exportAnalyticsData() {
        const csvContent = `data:text/csv;charset=utf-8,Property,Value\nProperties,${this.analyticsData.properties}\nActivities,${this.analyticsData.activities}\nEvents,${this.analyticsData.events}\nMarket Health,${this.analyticsData.marketHealth}`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'kyoto-analytics-2026.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Analytics data exported successfully', 'success');
    }

    // Global Search Setup
    setupGlobalSearch() {
        console.log('🔍 Setting up global search...');
        
        const searchInput = document.getElementById('global-search');
        const searchResults = document.getElementById('search-results');
        
        if (!searchInput || !searchResults) return;
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            clearTimeout(searchTimeout);
            
            if (query.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }
            
            searchTimeout = setTimeout(() => {
                this.performGlobalSearch(query, searchResults);
            }, 300);
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
        
        console.log('✅ Global search setup complete');
    }

    performGlobalSearch(query, resultsContainer) {
        console.log('🔍 Performing global search for:', query);
        
        const results = [];
        
        // Search properties
        if (typeof realEstateData !== 'undefined') {
            const properties = realEstateData.getPropertiesForSale().concat(realEstateData.getPropertiesForRent());
            const propertyResults = properties.filter(property => 
                property.title.toLowerCase().includes(query.toLowerCase()) ||
                property.location.toLowerCase().includes(query.toLowerCase()) ||
                property.category.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 3);
            
            propertyResults.forEach(property => {
                results.push({
                    type: 'property',
                    title: property.title,
                    subtitle: `${property.location} • ¥${property.price.toLocaleString()}`,
                    url: `/real-estate/#property-${property.id}`,
                    icon: '🏠'
                });
            });
        }
        
        // Search activities
        if (typeof activitiesData !== 'undefined') {
            const activityResults = activitiesData.filter(activity => 
                activity.title.toLowerCase().includes(query.toLowerCase()) ||
                activity.category.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 2);
            
            activityResults.forEach(activity => {
                results.push({
                    type: 'activity',
                    title: activity.title,
                    subtitle: `${activity.category} • ${activity.duration}`,
                    url: `/activities/#activity-${activity.id}`,
                    icon: '🎯'
                });
            });
        }
        
        // Search events
        if (typeof eventsData !== 'undefined') {
            const eventResults = eventsData.filter(event => 
                event.title.toLowerCase().includes(query.toLowerCase()) ||
                event.category.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 2);
            
            eventResults.forEach(event => {
                results.push({
                    type: 'event',
                    title: event.title,
                    subtitle: `${event.date} • ${event.category}`,
                    url: `/events/#event-${event.id}`,
                    icon: '🎭'
                });
            });
        }
        
        this.displayGlobalSearchResults(results, resultsContainer);
    }

    displayGlobalSearchResults(results, container) {
        if (results.length === 0) {
            container.innerHTML = `
                <div class="p-4 text-center text-sumi/60 dark:text-gofun/60">
                    No results found
                </div>
            `;
        } else {
            container.innerHTML = results.map(result => `
                <a href="${result.url}" class="block p-3 hover:bg-zen dark:hover:bg-aiiro transition-colors border-b border-zen dark:border-aiiro last:border-b-0">
                    <div class="flex items-center space-x-3">
                        <span class="text-lg">${result.icon}</span>
                        <div class="flex-1 min-w-0">
                            <div class="font-medium text-sumi dark:text-gofun truncate">${result.title}</div>
                            <div class="text-sm text-sumi/60 dark:text-gofun/60 truncate">${result.subtitle}</div>
                        </div>
                    </div>
                </a>
            `).join('');
        }
        
        container.classList.remove('hidden');
    }

    // Data Validation Methods
    validatePropertyData(property) {
        if (!property) return false;
        
        // Required fields
        const requiredFields = ['id', 'title', 'price', 'location', 'neighborhood', 'bedrooms', 'bathrooms', 'size', 'image', 'agency', 'contact'];
        for (const field of requiredFields) {
            if (!property[field]) {
                console.warn(`⚠️ Missing required field: ${field}`, property.id);
                return false;
            }
        }
        
        // Validate contact information
        if (!this.isValidPhone(property.contact)) {
            console.warn(`⚠️ Invalid phone number: ${property.contact}`, property.id);
            return false;
        }
        
        // Validate agency information
        if (!this.isValidAgency(property.agency, property.agencyUrl)) {
            console.warn(`⚠️ Invalid agency: ${property.agency}`, property.id);
            return false;
        }
        
        // Validate image URL
        if (!this.isValidImage(property.image)) {
            console.warn(`⚠️ Invalid image URL: ${property.image}`, property.id);
            return false;
        }
        
        // Validate price format
        if (!this.isValidPrice(property.price)) {
            console.warn(`⚠️ Invalid price format: ${property.price}`, property.id);
            return false;
        }
        
        return true;
    }

    isValidProperty(property) {
        return this.validatePropertyData(property);
    }

    isValidPhone(phone) {
        if (!phone) return false;
        
        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '');
        
        // Japanese phone number patterns
        const japanesePatterns = [
            /^81\d{9}$/, // International format: +81-XX-XXXX-XXXX
            /^0\d{9}$/,  // Domestic format: 0XX-XXXX-XXXX
            /^0\d{8}$/,  // Domestic format: 0XX-XXX-XXXX
            /^0\d{7}$/,  // Domestic format: 0XX-XX-XXXX
        ];
        
        return japanesePatterns.some(pattern => pattern.test(digits));
    }

    isValidAgency(agency, agencyUrl) {
        if (!agency || agency.trim().length < 2) return false;
        
        // Check for common invalid agency names
        const invalidNames = ['test', 'example', 'placeholder', 'unknown', 'n/a', 'tbd'];
        if (invalidNames.some(invalid => agency.toLowerCase().includes(invalid))) {
            return false;
        }
        
        // Validate against known legitimate Japanese real estate companies
        const legitimateAgencies = [
            'At Home Co., Ltd.',
            'SUUMO Co., Ltd.',
            'Rakumachi Co., Ltd.',
            'Homes Co., Ltd.',
            'LIFULL Co., Ltd.',
            'GAIAX Co., Ltd.',
            'Apaman Shop Co., Ltd.',
            'Sumai Web Co., Ltd.',
            'Chintai Co., Ltd.',
            'Real Estate Japan Co., Ltd.'
        ];
        
        const isLegitimateAgency = legitimateAgencies.some(legitimate => 
            agency.toLowerCase().includes(legitimate.toLowerCase().replace(/[.,]/g, ''))
        );
        
        // If agency URL is provided, validate it
        if (agencyUrl && !this.isValidUrl(agencyUrl)) {
            return false;
        }
        
        return isLegitimateAgency;
    }

    isValidImage(url) {
        if (!url) return false;
        
        // Check if it's a valid URL
        if (!this.isValidUrl(url)) return false;
        
        // Check for common image extensions
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
        const hasValidExtension = imageExtensions.some(ext => 
            url.toLowerCase().includes(ext)
        );
        
        if (!hasValidExtension) return false;
        
        // Check for placeholder images
        const placeholderPatterns = [
            'placeholder.com',
            'via.placeholder.com',
            'picsum.photos',
            'lorempixel.com',
            'placehold.it',
            'dummyimage.com'
        ];
        
        return !placeholderPatterns.some(pattern => url.includes(pattern));
    }

    isValidUrl(url, whitelist = []) {
        if (!url) return false;
        
        try {
            const urlObj = new URL(url);
            
            // Check if it's a valid protocol
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                return false;
            }
            
            // Check whitelist if provided
            if (whitelist.length > 0) {
                return whitelist.some(domain => urlObj.hostname.includes(domain));
            }
            
            // Validate against known legitimate real estate domains
            const legitimateDomains = [
                'athome.co.jp',
                'suumo.jp',
                'rakumachi.jp',
                'homes.co.jp',
                'realestate.co.jp',
                'lifullhomes.jp',
                'chintai.net',
                'gaiax.co.jp',
                'apamanshop.com',
                'sumaiweb.com'
            ];
            
            return legitimateDomains.some(domain => urlObj.hostname.includes(domain));
        } catch (error) {
            return false;
        }
    }

    isValidPrice(price) {
        if (!price) return false;
        
        // Check for Japanese yen format
        const yenPattern = /^¥[\d,]+(\.\d{2})?(\/month)?$/;
        if (yenPattern.test(price)) return true;
        
        // Check for USD format
        const usdPattern = /^\$[\d,]+(\.\d{2})?(\/month)?$/;
        if (usdPattern.test(price)) return true;
        
        // Check for number format
        const numberPattern = /^[\d,]+(\.\d{2})?(\/month)?$/;
        return numberPattern.test(price);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOMContentLoaded - Initializing MrKyotoApp...');
    
    try {
    window.mrKyotoApp = new MrKyotoApp();
        console.log('✅ MrKyotoApp initialized successfully');
    
        // Track performance (wrapped in try-catch)
        try {
    window.mrKyotoApp.trackPerformance();
            console.log('✅ Performance tracking initialized');
        } catch (error) {
            console.warn('⚠️ Performance tracking failed:', error);
        }
        
        // Force display of homepage properties after a short delay
        setTimeout(() => {
            console.log('🔄 Force checking homepage properties...');
            if (window.mrKyotoApp && typeof realEstateData !== 'undefined') {
                window.mrKyotoApp.displayHomepageProperties();
            }
        }, 500);
        
        // Additional fallback for properties display
        setTimeout(() => {
            console.log('🔄 Final fallback for homepage properties...');
            if (window.mrKyotoApp) {
                window.mrKyotoApp.displayHomepageProperties();
            }
        }, 2000);
        
    } catch (error) {
        console.error('❌ Failed to initialize MrKyotoApp:', error);
    }
});

// Global test function for debugging
window.testProperties = function() {
    console.log('🧪 Global test function called');
    console.log('🔍 realEstateData available:', typeof realEstateData !== 'undefined');
    if (typeof realEstateData !== 'undefined') {
        console.log('🔍 Sale properties:', realEstateData.getPropertiesForSale().length);
        console.log('🔍 Rent properties:', realEstateData.getPropertiesForRent().length);
        console.log('🔍 First property:', realEstateData.getPropertiesForSale()[0]);
    }
    console.log('🔍 mrKyotoApp available:', !!window.mrKyotoApp);
    if (window.mrKyotoApp) {
        window.mrKyotoApp.displayHomepageProperties();
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MrKyotoApp;
} 