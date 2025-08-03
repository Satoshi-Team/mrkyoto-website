// Shared Footer Component for MrKyoto
// This ensures consistent footer across all pages

function createSharedFooter() {
    return `
        <!-- Footer -->
        <footer class="bg-gradient-to-r from-sumi to-kobicha text-white py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <div class="w-8 h-8 bg-gradient-to-br from-shinku to-kobicha rounded-lg flex items-center justify-center">
                                <img src="/images/mrkyoto-logo.png" alt="MrKyoto Logo" width="32" height="32" class="rounded-lg">
                            </div>
                            <span class="text-xl font-serif font-semibold text-white">MrKyoto</span>
                        </div>
                        <p class="text-white text-sm leading-relaxed">
                            Your gateway to timeless Kyoto — explore, live, and connect with the heart of Japan's cultural capital.
                        </p>
                    </div>
                    
                    <div>
                        <h3 class="font-serif font-semibold mb-4 text-white">Explore</h3>
                        <ul class="space-y-2 text-sm text-white">
                            <li><a href="/activities/" class="hover:text-white transition-colors duration-200">Activities</a></li>
                            <li><a href="/events/" class="hover:text-white transition-colors duration-200">Events & Festivals</a></li>
                            <li><a href="/news/" class="hover:text-white transition-colors duration-200">News</a></li>
                            <li><a href="/live-from-kyoto/" class="hover:text-white transition-colors duration-200">Live from Kyoto</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="font-serif font-semibold mb-4 text-white">Real Estate</h3>
                        <ul class="space-y-2 text-sm text-white">
                            <li><a href="/real-estate/" class="hover:text-white transition-colors duration-200">Property Listings</a></li>
                            <li><a href="/real-estate/" class="hover:text-white transition-colors duration-200">Local Areas</a></li>
                            <li><a href="/real-estate/" class="hover:text-white transition-colors duration-200">Market Insights</a></li>
                            <li><a href="/real-estate/" class="hover:text-white transition-colors duration-200">Neighborhood Guide</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="font-serif font-semibold mb-4 text-white">Connect</h3>
                        <ul class="space-y-2 text-sm text-white">
                            <li><a href="mailto:hello@mrkyoto.com" class="hover:text-white transition-colors duration-200">hello@mrkyoto.com</a></li>
                            <li><a href="/privacy/" class="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                            <li><a href="/terms/" class="hover:text-white transition-colors duration-200">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-white/20 mt-8 pt-8 text-center">
                    <p class="text-white text-sm">
                        © 2025 MrKyoto.com. All rights reserved. Your gateway to timeless Kyoto.
                    </p>
                </div>
            </div>
        </footer>

        <!-- Floating CTA -->
        <div class="fixed bottom-6 right-6 z-40">
            <button class="bg-gradient-to-r from-shinku to-kobicha text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            </button>
        </div>
    `;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createSharedFooter };
} 