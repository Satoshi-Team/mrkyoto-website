/**
 * MrKyoto.com - Language Switcher
 * Handles language switching between English 🇬🇧 and Japanese 🇯🇵
 */

class LanguageSwitcher {
    constructor() {
        this.currentLanguage = this.detectCurrentLanguage();
        console.log('🌐 Language Switcher initialized:', this.currentLanguage);
        this.init();
    }

    detectCurrentLanguage() {
        const path = window.location.pathname;
        if (path.startsWith('/ja/')) {
            return 'ja';
        }
        return 'en';
    }

    init() {
        this.setupLanguageToggle();
        this.setupDropdownBehavior();
        this.updateLanguageButton();
    }

    setupLanguageToggle() {
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');

        if (languageToggle && languageDropdown) {
            console.log('✅ Language toggle elements found');
            languageToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Language toggle clicked');
                this.toggleDropdown();
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                    this.closeDropdown();
                }
            });

            // Close dropdown on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeDropdown();
                }
            });
        } else {
            console.error('❌ Language toggle elements not found');
        }
    }

    setupDropdownBehavior() {
        const languageDropdown = document.getElementById('language-dropdown');
        if (languageDropdown) {
            // Prevent dropdown from closing when clicking inside it
            languageDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            // Handle language selection
            const languageLinks = languageDropdown.querySelectorAll('a');
            console.log('🔗 Found language links:', languageLinks.length);
            languageLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    console.log('🔗 Language link clicked:', href);
                    if (href) {
                        this.switchLanguage(href);
                    }
                });
            });
        }
    }

    toggleDropdown() {
        const languageDropdown = document.getElementById('language-dropdown');
        if (languageDropdown) {
            if (languageDropdown.classList.contains('hidden')) {
                this.openDropdown();
            } else {
                this.closeDropdown();
            }
        }
    }

    openDropdown() {
        const languageDropdown = document.getElementById('language-dropdown');
        if (languageDropdown) {
            languageDropdown.classList.remove('hidden');
            languageDropdown.classList.add('opacity-100');
            languageDropdown.classList.remove('opacity-0');
            console.log('📂 Language dropdown opened');
        }
    }

    closeDropdown() {
        const languageDropdown = document.getElementById('language-dropdown');
        if (languageDropdown) {
            languageDropdown.classList.add('hidden');
            languageDropdown.classList.remove('opacity-100');
            languageDropdown.classList.add('opacity-0');
            console.log('📂 Language dropdown closed');
        }
    }

    updateLanguageButton() {
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            const flagSpan = languageToggle.querySelector('span');
            if (flagSpan) {
                if (this.currentLanguage === 'ja') {
                    flagSpan.textContent = '🇯🇵';
                } else {
                    flagSpan.textContent = '🇬🇧';
                }
                console.log('🏁 Language button updated:', flagSpan.textContent);
            }
        }
    }

    switchLanguage(targetPath) {
        // Get current page path
        const currentPath = window.location.pathname;
        console.log('🔄 Switching language from:', currentPath);
        
        // Determine the target path based on current language
        let newPath;
        
        if (this.currentLanguage === 'ja') {
            // Currently on Japanese page, switch to English
            if (currentPath.startsWith('/ja/')) {
                // Remove /ja/ prefix and add to root
                newPath = currentPath.replace('/ja/', '/');
                if (newPath === '/') {
                    newPath = '/';
                }
            } else {
                newPath = '/';
            }
        } else {
            // Currently on English page, switch to Japanese
            if (currentPath === '/') {
                newPath = '/ja/';
            } else {
                // Add /ja/ prefix
                newPath = '/ja' + currentPath;
            }
        }

        console.log('🔄 Navigating to:', newPath);
        
        // Use window.location.replace for better navigation
        try {
            window.location.replace(newPath);
        } catch (error) {
            console.error('❌ Navigation failed:', error);
            // Fallback to href
            window.location.href = newPath;
        }
    }

    // Utility method to get current page type
    getCurrentPageType() {
        const path = window.location.pathname;
        if (path.includes('/live-from-kyoto/')) return 'live-from-kyoto';
        if (path.includes('/real-estate/')) return 'real-estate';
        if (path.includes('/activities/')) return 'activities';
        if (path.includes('/events/')) return 'events';
        if (path.includes('/news/')) return 'news';
        if (path.includes('/privacy/')) return 'privacy';
        if (path.includes('/terms/')) return 'terms';
        return 'home';
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Language Switcher...');
    new LanguageSwitcher();
});

// Also initialize if script is loaded after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 Initializing Language Switcher (loading state)...');
        new LanguageSwitcher();
    });
} else {
    console.log('🚀 Initializing Language Switcher (immediate)...');
    new LanguageSwitcher();
} 