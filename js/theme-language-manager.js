// Theme and Language Manager for MrKyoto
// Handles dark/light theme toggle and multi-language support with country flags

class ThemeLanguageManager {
    constructor() {
        console.log('🎨 ThemeLanguageManager constructor called');
        this.currentTheme = this.getStoredTheme() || 'light';
        this.currentLanguage = this.getCurrentLanguage(); // Initialize based on URL path
        this.languages = {
            en: { name: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'en' },
            ja: { name: '日本語', flag: '🇯🇵', code: 'ja' },
            ko: { name: '한국어', flag: '🇰🇷', code: 'ko' },
            zh: { name: '中文', flag: '🇨🇳', code: 'zh' },
            fr: { name: 'Français', flag: '🇫🇷', code: 'fr' },
            de: { name: 'Deutsch', flag: '🇩🇪', code: 'de' },
            es: { name: 'Español', flag: '🇪🇸', code: 'es' },
            it: { name: 'Italiano', flag: '🇮🇹', code: 'it' },
            pt: { name: 'Português', flag: '🇵🇹', code: 'pt' },
            ru: { name: 'Русский', flag: '🇷🇺', code: 'ru' }
        };
        
        console.log('🎨 ThemeLanguageManager constructor completed');
        this.init();
    }

    init() {
        console.log('🎨 Initializing Theme & Language Manager...');
        console.log('🎨 Current URL:', window.location.href);
        console.log('🎨 Current path:', window.location.pathname);
        try {
            this.applyTheme();
            this.setupThemeToggle();
            this.setupLanguageDropdown();
            this.updateUI();
            console.log('✅ Theme & Language Manager initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing Theme & Language Manager:', error);
        }
    }

    // Theme Management
    getStoredTheme() {
        const stored = localStorage.getItem('mrkyoto-theme');
        // Default to dark mode like our perfect activities page
        const theme = stored || 'dark';
        console.log('🎨 Stored theme:', stored, 'Final theme:', theme);
        return theme;
    }

    setStoredTheme(theme) {
        localStorage.setItem('mrkyoto-theme', theme);
        console.log('🎨 Theme saved to localStorage:', theme);
    }

    applyTheme() {
        console.log('🎨 Applying theme:', this.currentTheme);
        const html = document.documentElement;
        const body = document.body;
        
        // Remove existing theme classes
        html.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');
        
        // Apply current theme
        html.classList.add(this.currentTheme);
        body.classList.add(this.currentTheme);
        
        // Set data-theme attribute for CSS custom properties
        html.setAttribute('data-theme', this.currentTheme);
        
        // Force a repaint to ensure all elements update
        document.body.offsetHeight;
        
        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', this.currentTheme === 'dark' ? '#0F0F0F' : '#FFFFFF');
        }
        
        // Force CSS recalculation
        document.body.style.display = 'none';
        document.body.offsetHeight;
        document.body.style.display = '';
        
        // Update all elements with theme-specific classes
        this.updateThemeElements();
        
        // Dispatch theme change event for any components that need to react
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: this.currentTheme } 
        }));
        
        console.log(`🎨 Applied ${this.currentTheme} theme to HTML and body`);
    }

    toggleTheme() {
        console.log('🔄 Toggling theme from:', this.currentTheme);
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setStoredTheme(this.currentTheme);
        this.applyTheme();
        this.updateThemeToggleUI();
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: this.currentTheme } 
        }));
        
        console.log(`🔄 Theme toggled to ${this.currentTheme}`);
    }

    setupThemeToggle() {
        console.log('🎨 Setting up theme toggle...');
        const themeToggle = document.getElementById('theme-toggle');
        console.log('🎨 Theme toggle element found:', !!themeToggle);
        
        if (themeToggle) {
            // Remove any existing event listeners
            const newToggle = themeToggle.cloneNode(true);
            themeToggle.parentNode.replaceChild(newToggle, themeToggle);
            
            newToggle.addEventListener('click', (e) => {
                console.log('🎨 Theme toggle clicked');
                e.preventDefault();
                this.toggleTheme();
            });
            
            // Add keyboard support
            newToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
            
            console.log('✅ Theme toggle setup complete');
        } else {
            console.warn('⚠️ Theme toggle button not found');
        }
    }

    updateThemeToggleUI() {
        console.log('🎨 Updating theme toggle UI...');
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) {
            console.warn('⚠️ Theme toggle button not found for UI update');
            return;
        }

        const svg = themeToggle.querySelector('svg');
        if (!svg) {
            console.warn('⚠️ SVG element not found in theme toggle');
            return;
        }

        // Update icon based on current theme
        if (this.currentTheme === 'dark') {
            // Sun icon for dark mode (to switch to light)
            svg.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                </path>
            `;
        } else {
            // Moon icon for light mode (to switch to dark)
            svg.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
                </path>
            `;
        }
        console.log('✅ Theme toggle UI updated');
    }

    // Language Management
    getStoredLanguage() {
        const lang = localStorage.getItem('mrkyoto-language') || 'en';
        console.log('🌍 Stored language:', lang);
        return lang;
    }

    setStoredLanguage(lang) {
        localStorage.setItem('mrkyoto-language', lang);
        console.log('🌍 Language saved to localStorage:', lang);
    }

    changeLanguage(lang) {
        console.log('🌍 changeLanguage called with:', lang);
        
        // Check if language is supported (only en and ja)
        if (lang !== 'en' && lang !== 'ja') {
            console.warn(`⚠️ Language ${lang} not supported`);
            return;
        }

        // Get current page path
        const currentPath = window.location.pathname;
        console.log('🌍 Current path:', currentPath);
        
        // Determine the target path based on language change
        let newPath;
        
        if (lang === 'ja') {
            // Switching to Japanese
            if (currentPath === '/') {
                newPath = '/ja/';
            } else {
                // Add /ja/ prefix
                newPath = '/ja' + currentPath;
            }
        } else {
            // Switching to English
            if (currentPath.startsWith('/ja/')) {
                // Remove /ja/ prefix
                newPath = currentPath.replace('/ja/', '/');
                if (newPath === '/') {
                    newPath = '/';
                }
            } else {
                newPath = '/';
            }
        }
        
        console.log('🌍 Navigating to:', newPath);
        console.log('🌍 Current language detected:', this.getCurrentLanguage());
        console.log('🌍 Target language:', lang);
        
        // Navigate to the new path
        try {
            console.log('🌍 Attempting navigation to:', newPath);
            window.location.href = newPath;
        } catch (error) {
            console.error('❌ Navigation failed:', error);
            // Fallback to replace
            window.location.replace(newPath);
        }
    }

    setupLanguageDropdown() {
        console.log('🌍 Setting up language toggle...');
        console.log('🌍 Current URL:', window.location.pathname);
        console.log('🌍 Current language detected:', this.getCurrentLanguage());
        
        // Skip language toggle setup for live-from-kyoto pages (handled by initializeAllButtons)
        if (window.location.pathname.includes('live-from-kyoto')) {
            console.log('⚠️ Live-from-kyoto page detected, skipping ThemeLanguageManager language setup');
            return;
        }
        
        const languageToggle = document.getElementById('language-toggle');
        const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
        
        console.log('🌍 Language toggle found:', !!languageToggle);
        console.log('🌍 Mobile language toggle found:', !!mobileLanguageToggle);
        console.log('🌍 Language toggle element:', languageToggle);
        
        // Check if language toggles are already initialized by initializeAllButtons
        if (languageToggle && languageToggle.hasAttribute('data-language-toggle-initialized')) {
            console.log('⚠️ Language toggle already initialized by initializeAllButtons, skipping ThemeLanguageManager setup');
            return;
        }
        
        if (mobileLanguageToggle && mobileLanguageToggle.hasAttribute('data-language-toggle-initialized')) {
            console.log('⚠️ Mobile language toggle already initialized by initializeAllButtons, skipping ThemeLanguageManager setup');
            return;
        }
        
        // Additional check: if any language toggle has event listeners, skip setup
        if (languageToggle && languageToggle.onclick !== null) {
            console.log('⚠️ Language toggle already has click handler, skipping ThemeLanguageManager setup');
            return;
        }
        
        if (mobileLanguageToggle && mobileLanguageToggle.onclick !== null) {
            console.log('⚠️ Mobile language toggle already has click handler, skipping ThemeLanguageManager setup');
            return;
        }
        
        if (languageToggle) {
            // Remove any existing event listeners
            const newToggle = languageToggle.cloneNode(true);
            languageToggle.parentNode.replaceChild(newToggle, languageToggle);
            
            // Toggle language on click
            newToggle.addEventListener('click', (e) => {
                console.log('🌍 Language toggle clicked');
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle between English and Japanese
                const currentLang = this.getCurrentLanguage();
                const newLang = currentLang === 'en' ? 'ja' : 'en';
                console.log('🌍 Current URL:', window.location.pathname);
                console.log('🌍 Current language detected:', currentLang);
                console.log('🌍 Switching to:', newLang);
                
                this.changeLanguage(newLang);
            });
            
            console.log('✅ Language toggle setup complete');
        } else {
            console.warn('⚠️ Language toggle element not found');
            console.log('🔍 Available elements with "language" in ID:', 
                Array.from(document.querySelectorAll('[id*="language"]')).map(el => el.id));
        }
    }

    setupLanguageOptions() {
        console.log('🌍 Setting up language options...');
        const languageDropdown = document.getElementById('language-dropdown');
        console.log('🌍 Language dropdown element found:', !!languageDropdown);
        console.log('🌍 Language dropdown element:', languageDropdown);
        
        if (!languageDropdown) {
            console.warn('⚠️ Language dropdown not found');
            return;
        }

        // Clear existing options
        languageDropdown.innerHTML = '';
        console.log('🌍 Cleared dropdown content');

        // Add language options for English and Japanese only
        const languageOptions = [
            { code: 'en', flag: '🇬🇧', name: 'English' },
            { code: 'ja', flag: '🇯🇵', name: '日本語' }
        ];

        languageOptions.forEach(({ code, flag, name }) => {
            const item = document.createElement('a');
            item.href = '#';
            item.className = 'block px-4 py-2 text-sm text-sumi dark:text-gofun hover:bg-zen dark:hover:bg-aiiro';
            item.setAttribute('data-lang', code);
            item.innerHTML = `${flag} ${name}`;
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🌍 Language option clicked:', code);
                console.log('🌍 Event target:', e.target);
                console.log('🌍 Event currentTarget:', e.currentTarget);
                console.log('🌍 About to call changeLanguage with:', code);
                this.changeLanguage(code);
                console.log('🌍 changeLanguage called, now closing dropdown');
                this.closeLanguageDropdown();
            });
            
            languageDropdown.appendChild(item);
            console.log(`🌍 Added language option: ${name} (${code})`);
        });
        console.log(`✅ Language options setup complete - ${languageOptions.length} languages added`);
        console.log('🌍 Final dropdown content HTML:', languageDropdown.innerHTML);
    }

    toggleLanguageDropdown() {
        console.log('🌍 Toggling language dropdown...');
        const dropdown = document.getElementById('language-dropdown');
        console.log('🌍 Dropdown element found:', !!dropdown);
        if (dropdown) {
            const isOpen = dropdown.classList.contains('opacity-100') || dropdown.classList.contains('show');
            console.log('🌍 Dropdown is currently open:', isOpen);
            console.log('🌍 Current dropdown classes:', dropdown.className);
            console.log('🌍 Dropdown element:', dropdown);
            if (isOpen) {
                this.closeLanguageDropdown();
            } else {
                this.openLanguageDropdown();
            }
        } else {
            console.warn('⚠️ Language dropdown element not found');
            console.log('🔍 Available elements with "dropdown" in ID:', 
                Array.from(document.querySelectorAll('[id*="dropdown"]')).map(el => el.id));
        }
    }

    openLanguageDropdown() {
        console.log('🌍 Opening language dropdown...');
        const dropdown = document.getElementById('language-dropdown');
        if (dropdown) {
            // Remove hidden class first (Tailwind's display: none)
            dropdown.classList.remove('hidden');
            
            // Add visibility classes
            dropdown.classList.add('opacity-100');
            dropdown.classList.add('show');
            
            // Force visibility with inline styles
            dropdown.style.display = 'block';
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.pointerEvents = 'auto';
            dropdown.style.transform = 'translateY(0) scale(1)';
            
            console.log('✅ Language dropdown opened');
            console.log('🌍 Updated dropdown classes:', dropdown.className);
            console.log('🌍 Applied inline styles:', {
                opacity: dropdown.style.opacity,
                visibility: dropdown.style.visibility,
                pointerEvents: dropdown.style.pointerEvents,
                transform: dropdown.style.transform
            });
            
            // Add a small delay to ensure CSS is applied
            setTimeout(() => {
                // Debug dropdown position and size
                const rect = dropdown.getBoundingClientRect();
                console.log('🌍 Dropdown position:', {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                    visible: rect.width > 0 && rect.height > 0
                });
                console.log('🌍 Dropdown computed styles:', {
                    display: window.getComputedStyle(dropdown).display,
                    visibility: window.getComputedStyle(dropdown).visibility,
                    opacity: window.getComputedStyle(dropdown).opacity,
                    position: window.getComputedStyle(dropdown).position,
                    zIndex: window.getComputedStyle(dropdown).zIndex
                });
                
                // Log the actual values
                console.log('🌍 Dropdown rect values:', rect);
                console.log('🌍 Dropdown width:', rect.width, 'height:', rect.height);
                console.log('🌍 Dropdown top:', rect.top, 'left:', rect.left);
                console.log('🌍 Dropdown visible:', rect.width > 0 && rect.height > 0);
                
                const computedStyle = window.getComputedStyle(dropdown);
                console.log('🌍 Dropdown display:', computedStyle.display);
                console.log('🌍 Dropdown visibility:', computedStyle.visibility);
                console.log('🌍 Dropdown opacity:', computedStyle.opacity);
                console.log('🌍 Dropdown position:', computedStyle.position);
                console.log('🌍 Dropdown zIndex:', computedStyle.zIndex);
                
                // Check parent container positioning
                const parent = dropdown.parentElement;
                if (parent) {
                    const parentRect = parent.getBoundingClientRect();
                    const parentStyle = window.getComputedStyle(parent);
                    console.log('🌍 Parent container:', {
                        tagName: parent.tagName,
                        className: parent.className,
                        position: parentStyle.position,
                        top: parentRect.top,
                        left: parentRect.left,
                        width: parentRect.width,
                        height: parentRect.height
                    });
                }
            }, 10);
        } else {
            console.warn('⚠️ Language dropdown not found for opening');
        }
    }

    closeLanguageDropdown() {
        console.log('🌍 Closing language dropdown...');
        const dropdown = document.getElementById('language-dropdown');
        if (dropdown) {
            // Remove visibility classes
            dropdown.classList.remove('opacity-100');
            dropdown.classList.remove('show');
            
            // Add hidden class back (Tailwind's display: none)
            dropdown.classList.add('hidden');
            
            // Reset inline styles
            dropdown.style.display = '';
            dropdown.style.opacity = '';
            dropdown.style.visibility = '';
            dropdown.style.pointerEvents = '';
            dropdown.style.transform = '';
            
            console.log('✅ Language dropdown closed');
            console.log('🌍 Updated dropdown classes:', dropdown.className);
        } else {
            console.warn('⚠️ Language dropdown not found for closing');
        }
    }

    updateLanguageUI() {
        console.log('🌍 Updating language UI...');
        const languageToggle = document.getElementById('language-toggle');
        if (!languageToggle) {
            console.warn('⚠️ Language toggle not found for UI update');
            return;
        }

        // Update the toggle button text to show current language flag
        const currentLang = this.getCurrentLanguage();
        const flagText = currentLang === 'en' ? '🇬🇧' : '🇯🇵';
        
        // Find the span inside the button and update it
        const span = languageToggle.querySelector('span');
        if (span) {
            span.textContent = flagText;
            console.log('✅ Language UI updated with flag:', flagText);
        } else {
            console.warn('⚠️ Span element not found in language toggle');
        }
    }

    // Update all UI elements
    updateUI() {
        console.log('🎨 Updating all UI elements...');
        this.updateThemeToggleUI();
        this.updateLanguageUI();
        console.log('✅ All UI elements updated');
    }

    // Public methods for external use
    getCurrentTheme() {
        return this.currentTheme;
    }

    getCurrentLanguage() {
        // Detect current language from URL path
        const currentPath = window.location.pathname;
        if (currentPath.startsWith('/ja/')) {
            return 'ja';
        } else {
            return 'en';
        }
    }

    getSupportedLanguages() {
        return Object.keys(this.languages);
    }

    updateThemeElements() {
        // Update all elements that need theme-specific styling
        const elements = document.querySelectorAll('[class*="text-sumi"], [class*="bg-white"], [class*="zen-card"]');
        elements.forEach(element => {
            // Force a repaint
            element.style.display = 'none';
            element.offsetHeight;
            element.style.display = '';
        });
        
        // Update specific elements (removed updateHeaderTheme and updateNavigationTheme to use Tailwind classes)
        this.updateFooterTheme();
        this.updatePropertyCardsTheme();
    }



    updateFooterTheme() {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.background = 'linear-gradient(to right, #0A0A0A, #7C2D12)';
            footer.style.color = '#FFFFFF';
        }
    }



    updatePropertyCardsTheme() {
        const propertyCards = document.querySelectorAll('.zen-card, .bg-white');
        propertyCards.forEach(card => {
            if (this.currentTheme === 'dark') {
                card.style.backgroundColor = '#0F0F0F';
                card.style.color = '#F9FAFB';
            } else {
                card.style.backgroundColor = '#FFFFFF';
                card.style.color = '#0A0A0A';
            }
        });
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeLanguageManager;
} 