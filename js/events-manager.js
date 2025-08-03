// Events Page Manager for MrKyoto.com
// Handles event listings, search, filtering, and interactive features

class EventsManager {
    constructor() {
        console.log('🎭 EventsManager: Constructor called');
        this.currentFilters = {
            category: 'all',
            month: 'all',
            sort: 'date',
            price: 'all',
            neighborhood: 'all',
            date: 'all'
        };
        this.searchQuery = '';
        this.viewMode = localStorage.getItem('eventViewMode') || 'grid';
        this.favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '[]');
        this.savedSearches = JSON.parse(localStorage.getItem('savedEventSearches') || '[]');
        this.charts = {};
        this.analyticsData = null;
        this.liveDataInterval = null;
        this.lastUpdateTime = new Date();
        console.log('🎭 EventsManager: Constructor completed, calling init()');
        this.init();
    }

    init() {
        console.log('🎭 EventsManager: Initializing...');
        console.log('🎭 EventsManager: eventsData available?', typeof eventsData !== 'undefined');
        if (typeof eventsData !== 'undefined') {
            console.log('🎭 EventsManager: eventsData has', eventsData.getAllEvents().length, 'events');
        }
        
        this.loadEventsData();
        this.setupEventListeners();
        
        // Set a timeout to ensure we have data even if loading fails
        setTimeout(() => {
            console.log('🎭 EventsManager: Timeout check - eventsData available?', typeof eventsData !== 'undefined');
            if (typeof eventsData === 'undefined') {
                console.warn('🎭 EventsManager: eventsData not available after timeout, showing fallback');
                this.displayFallbackContent();
            } else {
                console.log('🎭 EventsManager: eventsData available, displaying events...');
                this.displayEvents();
            }
        }, 2000);
        
        // Initialize advanced features
        this.startLiveDataStream();
    }

    loadEventsData() {
        console.log('🎭 EventsManager: Checking events data availability...');
        
        // Check if eventsData is already available
        if (typeof eventsData !== 'undefined') {
            console.log('🎭 EventsManager: eventsData available, proceeding with initialization');
            this.displayEvents();
            return;
        }
        
        console.log('🎭 EventsManager: eventsData not available, will retry later');
        // The script loading is handled by the HTML, so we just need to wait
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('event-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.displayEvents();
            });
        }

        // Filter functionality
        const filterSelects = document.querySelectorAll('.event-filter');
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.currentFilters[e.target.name] = e.target.value;
                this.displayEvents();
            });
        });

        // Date picker functionality
        const dateInput = document.getElementById('date-filter');
        if (dateInput) {
            dateInput.addEventListener('change', (e) => {
                this.currentFilters.date = e.target.value;
                this.displayEvents();
            });
        }
    }

    displayEvents() {
        console.log('🎭 EventsManager: displayEvents() called');
        const eventsGrid = document.getElementById('events-grid');
        const eventsList = document.getElementById('events-list');
        const loadingSkeleton = document.getElementById('loading-skeleton');
        
        console.log('🎭 EventsManager: Found elements - eventsGrid:', !!eventsGrid, 'eventsList:', !!eventsList, 'loadingSkeleton:', !!loadingSkeleton);
        
        if (!eventsGrid || !eventsList) {
            console.log('🎭 EventsManager: events-grid or events-list not found');
            return;
        }

        console.log('🎭 EventsManager: Starting displayEvents...');

        // Show loading skeleton
        if (loadingSkeleton) {
            loadingSkeleton.classList.remove('hidden');
            eventsGrid.classList.add('hidden');
            eventsList.classList.add('hidden');
        }

        // Simulate loading delay for better UX
        setTimeout(() => {
            const events = this.getFilteredEvents();
            console.log(`🎭 EventsManager: Got ${events.length} filtered events`);

            // Hide loading skeleton
            if (loadingSkeleton) {
                loadingSkeleton.classList.add('hidden');
            }

            // Display events based on view mode
            if (this.viewMode === 'grid') {
                eventsGrid.classList.remove('hidden');
                eventsList.classList.add('hidden');
                eventsGrid.innerHTML = this.generateEventCards(events);
                console.log('🎭 EventsManager: Grid view updated');
            } else {
                eventsList.classList.remove('hidden');
                eventsGrid.classList.add('hidden');
                eventsList.innerHTML = this.generateEventList(events);
                console.log('🎭 EventsManager: List view updated');
            }

            // Update counters
            this.updateEventCounters(events);
        }, 300);
    }

    calculateAnalytics() {
        if (!eventsData) return;

        const allEvents = eventsData.getAllEvents();
        const currentMonth = new Date().getMonth();
        const currentMonthName = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
        
        // Calculate monthly statistics
        const monthlyStats = {};
        for (let i = 0; i < 12; i++) {
            const monthName = new Date(2026, i, 1).toLocaleString('default', { month: 'long' }).toLowerCase();
            monthlyStats[monthName] = 0;
        }
        
        allEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const eventMonth = eventDate.toLocaleString('default', { month: 'long' }).toLowerCase();
            if (monthlyStats[eventMonth] !== undefined) {
                monthlyStats[eventMonth]++;
            }
        });

        // Calculate category statistics
        const categoryStats = {};
        allEvents.forEach(event => {
            if (!categoryStats[event.category]) {
                categoryStats[event.category] = {
                    count: 0,
                    events: []
                };
            }
            categoryStats[event.category].count++;
            categoryStats[event.category].events.push(event);
        });

        // Calculate upcoming events (next 30 days)
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
        const upcomingEvents = allEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= now && eventDate <= thirtyDaysFromNow;
        });

        this.analyticsData = {
            totalEvents: allEvents.length,
            monthlyEvents: monthlyStats[currentMonthName] || 0,
            currentMonth: currentMonthName,
            totalCategories: Object.keys(categoryStats).length,
            upcomingEvents: upcomingEvents.length,
            categoryStats,
            monthlyStats,
            lastUpdated: new Date().toISOString()
        };
    }

    updateAnalyticsDashboard() {
        if (!this.analyticsData) return;

        // Update hero stats
        const heroTotalEventsEl = document.getElementById('hero-total-events');
        const heroMonthlyEventsEl = document.getElementById('hero-monthly-events');
        const heroCategoriesEl = document.getElementById('hero-categories');

        if (heroTotalEventsEl) heroTotalEventsEl.textContent = this.analyticsData.totalEvents;
        if (heroMonthlyEventsEl) heroMonthlyEventsEl.textContent = this.analyticsData.monthlyEvents;
        if (heroCategoriesEl) heroCategoriesEl.textContent = this.analyticsData.totalCategories;

        // Update dashboard stats
        const totalEventsEl = document.getElementById('total-events');
        const monthlyEventsEl = document.getElementById('monthly-events');
        const totalCategoriesEl = document.getElementById('total-categories');
        const upcomingEventsEl = document.getElementById('upcoming-events');
        const currentMonthEl = document.getElementById('current-month');
        const topCategoryEl = document.getElementById('top-category');

        if (totalEventsEl) totalEventsEl.textContent = this.analyticsData.totalEvents;
        if (monthlyEventsEl) monthlyEventsEl.textContent = this.analyticsData.monthlyEvents;
        if (totalCategoriesEl) totalCategoriesEl.textContent = this.analyticsData.totalCategories;
        if (upcomingEventsEl) upcomingEventsEl.textContent = this.analyticsData.upcomingEvents;
        if (currentMonthEl) currentMonthEl.textContent = this.analyticsData.currentMonth.charAt(0).toUpperCase() + this.analyticsData.currentMonth.slice(1);
        
        // Find top category
        const topCategory = Object.entries(this.analyticsData.categoryStats)
            .sort(([,a], [,b]) => b.count - a.count)[0];
        if (topCategoryEl && topCategory) {
            topCategoryEl.textContent = topCategory[0];
        }

        // Update category counters
        const traditionalCountEl = document.getElementById('traditional-count');
        const culturalCountEl = document.getElementById('cultural-count');
        
        if (traditionalCountEl && this.analyticsData.categoryStats.traditional) {
            traditionalCountEl.textContent = this.analyticsData.categoryStats.traditional.count;
        }
        if (culturalCountEl && this.analyticsData.categoryStats.cultural) {
            culturalCountEl.textContent = this.analyticsData.categoryStats.cultural.count;
        }
    }

    renderCharts() {
        if (!this.analyticsData) return;
        
        this.renderMonthlyChart();
        this.renderCategoryChart();
    }

    renderMonthlyChart() {
        const ctx = document.getElementById('monthly-chart');
        if (!ctx) return;

        if (this.charts.monthly) {
            this.charts.monthly.destroy();
        }

        const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                       'july', 'august', 'september', 'october', 'november', 'december'];
        const data = months.map(month => this.analyticsData.monthlyStats[month] || 0);
        
        this.charts.monthly = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
                datasets: [{
                    label: 'Events',
                    data: data,
                    backgroundColor: 'rgba(147, 51, 234, 0.8)',
                    borderColor: 'rgba(147, 51, 234, 1)',
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
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    renderCategoryChart() {
        const ctx = document.getElementById('category-chart');
        if (!ctx) return;

        if (this.charts.category) {
            this.charts.category.destroy();
        }

        const categories = Object.entries(this.analyticsData.categoryStats);
        
        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories.map(([name]) => name),
                datasets: [{
                    data: categories.map(([, stats]) => stats.count),
                    backgroundColor: [
                        'rgba(147, 51, 234, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                        'rgba(147, 51, 234, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(239, 68, 68, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Live Data Streaming Methods
    startLiveDataStream() {
        // Update data every 30 seconds for real-time feel
        this.liveDataInterval = setInterval(() => {
            this.updateLiveData();
        }, 30000);
        
        // Initial update
        this.updateLiveData();
    }

    updateLiveData() {
        const now = new Date();
        const timeSinceLastUpdate = now - this.lastUpdateTime;
        
        // Simulate live event updates
        this.simulateEventUpdates();
        
        // Update last update time
        this.lastUpdateTime = now;
        
        // Update live indicators
        this.updateLiveIndicators();
        
        // Show subtle notification for updates
        if (timeSinceLastUpdate > 60000) { // Only show if more than 1 minute has passed
            this.showNotification('Event data updated', 'info');
        }
    }

    simulateEventUpdates() {
        // Simulate new event additions or updates
        const events = eventsData.getUpcomingEvents();
        if (Math.random() < 0.1) { // 10% chance of new event
            // This would typically add a new event to the data
            console.log('New event added to calendar');
        }
    }

    updateLiveIndicators() {
        // Update live event indicators
        const liveIndicator = document.getElementById('live-indicator');
        if (liveIndicator) {
            liveIndicator.innerHTML = `
                <div class="flex items-center space-x-2 text-sm">
                    <div class="w-2 h-2 bg-[#d9c289] rounded-full animate-pulse"></div>
                    <span>Live Data</span>
                    <span class="text-gray-500">•</span>
                    <span>Last updated: ${this.lastUpdateTime.toLocaleTimeString()}</span>
                </div>
            `;
        }
    }

    getFilteredEvents() {
        if (!eventsData) {
            console.log('🎭 EventsManager: eventsData not available');
            return [];
        }

        console.log('🎭 EventsManager: Getting filtered events...');
        
        // Use getAllEvents instead of getUpcomingEvents to show all events
        let events = eventsData.getAllEvents();
        console.log(`🎭 EventsManager: Got ${events.length} total events from eventsData`);

        // Apply search filter
        if (this.searchQuery) {
            const beforeSearch = events.length;
            events = events.filter(event =>
                event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                event.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                event.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()))
            );
            console.log(`🎭 EventsManager: Search filter: ${beforeSearch} -> ${events.length} events`);
        }

        // Apply category filter
        if (this.currentFilters.category !== 'all') {
            const beforeCategory = events.length;
            events = events.filter(event => event.category === this.currentFilters.category);
            console.log(`🎭 EventsManager: Category filter: ${beforeCategory} -> ${events.length} events`);
        }

        // Apply price filter
        if (this.currentFilters.price !== 'all') {
            const beforePrice = events.length;
            events = events.filter(event => {
                if (this.currentFilters.price === 'free') return event.price === 'Free';
                if (this.currentFilters.price === 'paid') return event.price !== 'Free';
                return true;
            });
            console.log(`🎭 EventsManager: Price filter: ${beforePrice} -> ${events.length} events`);
        }

        // Apply neighborhood filter
        if (this.currentFilters.neighborhood !== 'all') {
            const beforeNeighborhood = events.length;
            events = events.filter(event => event.neighborhood === this.currentFilters.neighborhood);
            console.log(`🎭 EventsManager: Neighborhood filter: ${beforeNeighborhood} -> ${events.length} events`);
        }

        // Apply date filter
        if (this.currentFilters.date !== 'all') {
            const beforeDate = events.length;
            const today = new Date();
            const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

            events = events.filter(event => {
                const eventDate = new Date(event.date);
                switch (this.currentFilters.date) {
                    case 'today': return eventDate.toDateString() === today.toDateString();
                    case 'week': return eventDate <= nextWeek;
                    case 'month': return eventDate <= nextMonth;
                    default: return true;
                }
            });
            console.log(`🎭 EventsManager: Date filter: ${beforeDate} -> ${events.length} events`);
        }

        console.log(`🎭 EventsManager: Returning ${events.length} filtered events`);
        return events;
    }

    generateEventCards(events) {
        console.log('🎭 EventsManager: generateEventCards called with:', events);
        
        if (!events || events.length === 0) {
            console.log('🎭 EventsManager: No events found, showing fallback content');
            return this.generateFallbackContent();
        }

        console.log(`🎭 EventsManager: Generating ${events.length} event cards`);
        try {
            const cards = events.map(event => this.generateEventCard(event)).join('');
            console.log('🎭 EventsManager: Generated cards successfully');
            return cards;
        } catch (error) {
            console.error('🎭 EventsManager: Error generating event cards:', error);
            return this.generateFallbackContent();
        }
    }

    generateFallbackContent() {
        return `
            <div class="text-center py-8">
                <div class="text-4xl mb-4" role="img" aria-label="No events">🎭</div>
                <h3 class="font-serif text-xl font-semibold text-sumi dark:text-white mb-2">No Events Found</h3>
                <p class="text-sumi/70 dark:text-gray-300 mb-4">Try adjusting your search criteria or filters.</p>
                <div class="flex justify-center space-x-4">
                    <button onclick="if(window.eventsManager) window.eventsManager.clearFilters()" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Clear Filters
                    </button>
                    <button onclick="location.reload()" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        Refresh Page
                    </button>
                </div>
            </div>
        `;
    }

    displayFallbackContent() {
        console.log('🎭 EventsManager: Displaying fallback content');
        const eventsGrid = document.getElementById('events-grid');
        if (eventsGrid) {
            eventsGrid.innerHTML = this.generateFallbackContent();
        }
        
        // Update hero stats to show 0
        const heroTotalEvents = document.getElementById('hero-total-events');
        const heroMonthlyEvents = document.getElementById('hero-monthly-events');
        const heroCategories = document.getElementById('hero-categories');
        
        if (heroTotalEvents) heroTotalEvents.textContent = '0';
        if (heroMonthlyEvents) heroMonthlyEvents.textContent = '0';
        if (heroCategories) heroCategories.textContent = '-';
    }

    debugDisplay() {
        console.log('🎭 EventsManager: Debug display called');
        console.log('🎭 EventsManager: eventsData available:', !!eventsData);
        
        if (eventsData) {
            console.log('🎭 EventsManager: All events:', eventsData.getAllEvents());
            console.log('🎭 EventsManager: Upcoming events:', eventsData.getUpcomingEvents());
        }
        
        // Force display with all events
        const allEvents = eventsData ? eventsData.getAllEvents() : [];
        console.log('🎭 EventsManager: Forcing display with', allEvents.length, 'events');
        
        const eventsGrid = document.getElementById('events-grid');
        if (eventsGrid) {
            eventsGrid.innerHTML = this.generateEventCards(allEvents);
        }
    }

    toggleFavorite(eventId) {
        const favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '[]');
        const index = favorites.indexOf(eventId);
        
        if (index > -1) {
            favorites.splice(index, 1);
            console.log('🎭 EventsManager: Removed from favorites:', eventId);
        } else {
            favorites.push(eventId);
            console.log('🎭 EventsManager: Added to favorites:', eventId);
        }
        
        localStorage.setItem('favoriteEvents', JSON.stringify(favorites));
        this.favorites = favorites;
        
        // Update the button appearance
        const button = event.target;
        if (index > -1) {
            button.innerHTML = '<span class="mr-1">❤️</span>Save';
                            button.classList.remove('bg-[#000000]/10', 'text-[#000000]');
            button.classList.add('border-purple-600', 'text-purple-600');
        } else {
            button.innerHTML = '<span class="mr-1">💖</span>Saved';
            button.classList.remove('border-purple-600', 'text-purple-600');
                            button.classList.add('bg-[#000000]/10', 'text-[#000000]');
        }
    }

    generateEventCard(event) {
        console.log('🎭 EventsManager: Generating card for event:', event.title);
        
        const eventDate = new Date(event.date);
        const isToday = eventDate.toDateString() === new Date().toDateString();
        const isThisWeek = eventDate <= new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
        
        // Format date safely
        const formatDate = (dateString) => {
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch (error) {
                console.log('🎭 EventsManager: Error formatting date:', error);
                return dateString;
            }
        };
        
        return `
            <div class="bg-white dark:bg-sumi rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-zen dark:border-aiiro" data-event-id="${event.id}">
                <!-- Event Image with Overlay -->
                <div class="relative h-48 md:h-56 lg:h-64">
                    <img src="${event.image}" alt="${event.title}" 
                         class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                         loading="lazy">
                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <!-- Category Badge -->
                    <div class="absolute top-4 left-4">
                        <span class="bg-gradient-to-r from-[#d9c289] to-[#000000] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg max-w-[120px] truncate">
                            ${event.category}
                        </span>
                    </div>
                    
                    <!-- Status Badges -->
                    <div class="absolute top-4 right-4 flex flex-col gap-2">
                        ${isToday ? '<span class="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">Today</span>' : ''}
                        ${isThisWeek && !isToday ? '<span class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">This Week</span>' : ''}
                    </div>
                    
                    <!-- Price Badge -->
                    <div class="absolute bottom-4 left-4">
                        <span class="bg-white/95 text-sumi px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                            ${event.price}
                        </span>
                    </div>
                </div>
                
                <!-- Event Content -->
                <div class="p-4 md:p-6">
                    <!-- Event Header -->
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex-1 min-w-0">
                            <h3 class="font-serif text-lg md:text-xl font-bold text-sumi dark:text-white mb-2 line-clamp-2">
                                ${event.title}
                            </h3>
                            <div class="flex flex-wrap gap-2 text-xs md:text-sm text-sumi/70 dark:text-gray-300">
                                <span class="flex items-center">
                                    <span class="mr-1">📅</span>
                                    <span class="truncate">${formatDate(event.date)}</span>
                                </span>
                                <span class="flex items-center">
                                    <span class="mr-1">🕒</span>
                                    <span class="truncate">${event.time}</span>
                                </span>
                                <span class="flex items-center">
                                    <span class="mr-1">📍</span>
                                    <span class="truncate">${event.location}</span>
                                </span>
                            </div>
                        </div>
                        <div class="text-right ml-4 flex-shrink-0">
                            <div class="text-xl md:text-2xl font-bold text-purple-600 mb-1">${event.price}</div>
                            <div class="text-xs text-sumi/60 dark:text-gray-400">${event.priceUSD}</div>
                        </div>
                    </div>
                    
                    <!-- Event Description -->
                    <p class="text-sumi/70 dark:text-gray-300 mb-4 text-sm line-clamp-3">${event.description}</p>
                    
                    <!-- Event Highlights -->
                    <div class="mb-4">
                        <h4 class="font-semibold text-sumi dark:text-white mb-2 text-sm">Highlights:</h4>
                        <div class="flex flex-wrap gap-2">
                            ${event.highlights ? event.highlights.slice(0, 3).map(highlight => 
                                `<span class="bg-gradient-to-r from-[#d9c289]/20 to-[#d9c289]/30 dark:from-[#d9c289]/30 dark:to-[#d9c289]/40 text-[#000000] dark:text-[#d9c289] px-2 py-1 rounded-full text-xs font-medium">${highlight}</span>`
                            ).join('') : ''}
                                ${event.highlights.length > 3 ? 
                                    `<span class="bg-washi/50 dark:bg-gray-700/50 text-sumi dark:text-gray-300 px-2 py-1 rounded text-sm">+${event.highlights.length - 3} more</span>` : 
                                    ''
                                }
                            </div>
                        </div>
                        
                        <!-- Event Info -->
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                            <div class="text-center p-2 bg-gradient-to-br from-[#d9c289]/20 to-[#d9c289]/30 dark:from-[#d9c289]/20 dark:to-[#d9c289]/30 rounded-lg">
                                <div class="text-sm font-semibold text-[#000000] dark:text-[#d9c289]">${event.capacity}</div>
                                <div class="text-xs text-[#000000]/70 dark:text-[#d9c289]/70">Capacity</div>
                            </div>
                            <div class="text-center p-2 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                                                <div class="text-sm font-semibold text-[#d9c289] dark:text-[#d9c289]">${event.neighborhood}</div>
                <div class="text-xs text-[#d9c289]/70 dark:text-[#d9c289]/70">Area</div>
                            </div>
                            <div class="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                                <div class="text-sm font-semibold text-blue-700 dark:text-blue-300">${event.weather ? event.weather.split(' ')[0] : 'Indoor'}</div>
                                <div class="text-xs text-blue-600/70 dark:text-blue-400/70">Weather</div>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex flex-wrap gap-2">
                            <button onclick="if(window.eventsManager) window.eventsManager.showEventModal('${event.id}')" 
                                    class="flex-1 bg-gradient-to-r from-[#d9c289] to-[#000000] text-white px-4 py-2 rounded-lg hover:from-[#000000] hover:to-[#d9c289] transition-all duration-300 transform hover:scale-105 font-semibold text-sm">
                                <span class="mr-2">📋</span>
                                View Details
                            </button>
                            <button onclick="if(window.eventsManager) window.eventsManager.toggleFavorite('${event.id}')" 
                                    class="px-4 py-2 border border-[#d9c289] text-[#d9c289] dark:text-[#d9c289] rounded-lg hover:bg-[#d9c289]/20 dark:hover:bg-[#d9c289]/20 transition-all duration-300 font-semibold text-sm">
                                <span class="mr-1">❤️</span>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            `;
    }

    updateEventCounters(eventCount) {
        const eventCounter = document.getElementById('event-counter');
        if (eventCounter) eventCounter.textContent = eventCount;
    }

    displayEventStats() {
        if (!eventsData) return;
        
        const stats = eventsData.getEventStats();
        const statsContainer = document.getElementById('event-stats');
        
        if (!statsContainer) return;

        statsContainer.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="text-3xl font-bold text-kurenai mb-2">${stats.totalEvents}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Upcoming Events</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-matcha mb-2">${stats.categories}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Event Categories</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-kobicha mb-2">${stats.priceRanges.free}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Free Events</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-aiiro mb-2">${stats.neighborhoods}</div>
                    <div class="text-sm text-sumi/70 dark:text-gray-300">Neighborhoods</div>
                </div>
            </div>
        `;
    }

    displayVenues() {
        if (!eventsData) return;
        
        const venuesContainer = document.getElementById('venues-section');
        if (!venuesContainer) return;

        const venues = eventsData.getVenues();

        venuesContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${venues.map(venue => `
                    <div class="zen-card p-4 rounded-lg">
                        <h4 class="font-semibold text-sumi dark:text-white mb-2">${venue.name}</h4>
                        <p class="text-sm text-sumi/70 dark:text-gray-300 mb-2">${venue.address}</p>
                        <div class="text-xs text-sumi/60 dark:text-gray-400 mb-2">
                            <strong>Capacity:</strong> ${venue.capacity}
                        </div>
                        <div class="text-xs text-sumi/60 dark:text-gray-400">
                            <strong>Facilities:</strong> ${venue.facilities.join(', ')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    displayUpcomingEvents() {
        if (!eventsData) return;
        
        const upcomingContainer = document.getElementById('upcoming-events');
        if (!upcomingContainer) return;

        const upcomingEvents = eventsData.getUpcomingEvents().slice(0, 3);

        upcomingContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${upcomingEvents.map(event => `
                    <div class="zen-card p-4 rounded-lg">
                        <img src="${event.image}" alt="${event.title}" 
                             class="w-full h-32 object-cover rounded mb-3">
                        <h4 class="font-semibold text-sumi dark:text-white mb-2">${event.title}</h4>
                        <p class="text-sm text-sumi/70 dark:text-gray-300 mb-2">${eventsData.formatDate(event.date)}</p>
                        <p class="text-sm text-sumi/60 dark:text-gray-400 mb-3">${event.location}</p>
                        <a href="${event.ticketUrl}" target="_blank" rel="noopener noreferrer"
                           class="bg-kurenai text-white px-4 py-2 rounded text-sm font-semibold hover:bg-kurenai/90 transition-colors focus-zen inline-block">
                            Get Tickets
                        </a>
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupSearchAndFilters() {
        // Add search and filter UI if not present
        const mainContent = document.querySelector('main');
        if (!mainContent || document.getElementById('search-filters')) return;

        const searchFiltersHTML = `
            <div id="search-filters" class="zen-card p-6 rounded-2xl shadow-lg mb-8">
                <h3 class="font-serif text-xl font-bold text-sumi dark:text-white mb-4">Search & Filter Events</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <div class="lg:col-span-2">
                        <label for="event-search" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Search Events</label>
                        <input type="text" id="event-search" placeholder="Search by title, category, or location..."
                               class="w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                    </div>
                    
                    <div>
                        <label for="category-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Category</label>
                        <select name="category" id="category-filter" class="event-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                            <option value="all">All Categories</option>
                            <option value="Traditional Festival">Traditional Festival</option>
                            <option value="Seasonal Event">Seasonal Event</option>
                            <option value="Film Festival">Film Festival</option>
                            <option value="Music Festival">Music Festival</option>
                            <option value="Cultural Experience">Cultural Experience</option>
                            <option value="Food Festival">Food Festival</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="price-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Price</label>
                        <select name="price" id="price-filter" class="event-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                            <option value="all">All Prices</option>
                            <option value="free">Free Events</option>
                            <option value="paid">Paid Events</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="neighborhood-filter" class="block text-sm font-semibold text-sumi dark:text-white mb-2">Area</label>
                        <select name="neighborhood" id="neighborhood-filter" class="event-filter w-full px-4 py-2 border border-sumi/20 dark:border-gray-600/20 rounded-lg bg-washi/50 dark:bg-gray-800/50 text-sumi dark:text-white focus:outline-none focus:ring-2 focus:ring-kurenai focus-zen">
                            <option value="all">All Areas</option>
                            <option value="Gion">Gion</option>
                            <option value="Arashiyama">Arashiyama</option>
                            <option value="Higashiyama">Higashiyama</option>
                            <option value="Nakagyo">Nakagyo</option>
                            <option value="Sakyo">Sakyo</option>
                        </select>
                    </div>
                </div>
                
                <div class="flex justify-between items-center mt-4 pt-4 border-t border-sumi/10 dark:border-gray-600/10">
                    <div class="text-sm text-sumi/70 dark:text-gray-300">
                        Showing <span id="event-counter">0</span> events
                    </div>
                    <button onclick="if(window.eventsManager) window.eventsManager.clearFilters()" 
                            class="text-sm text-kurenai hover:underline focus-zen">
                        Clear All Filters
                    </button>
                </div>
            </div>
        `;

        mainContent.insertAdjacentHTML('afterbegin', searchFiltersHTML);
        this.setupEventListeners();
    }

    clearFilters() {
        this.searchQuery = '';
        this.currentFilters = {
            category: 'all',
            price: 'all',
            neighborhood: 'all',
            date: 'all'
        };
        
        // Reset form elements
        const searchInput = document.getElementById('event-search');
        if (searchInput) searchInput.value = '';
        
        const filterSelects = document.querySelectorAll('.event-filter');
        filterSelects.forEach(select => {
            select.value = 'all';
        });
        
        this.displayEvents();
    }

    showEventModal(eventId) {
        if (!eventsData) return;
        
        const event = eventsData.getEventById(eventId);
        if (!event) return;

        const modalHTML = `
            <div id="event-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h2 class="font-serif text-2xl font-bold text-gray-900">${event.title}</h2>
                            <button onclick="if(window.eventsManager) window.eventsManager.closeEventModal()" 
                                    class="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
                                ×
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <img src="${event.image}" alt="${event.title}" 
                                     class="w-full h-64 object-cover rounded-lg mb-4">
                                <div class="text-2xl font-bold text-[#000000] mb-2">${event.price}</div>
                                <div class="text-sm text-gray-600 mb-4">${event.priceUSD}</div>
                            </div>
                            
                            <div>
                                <h3 class="font-semibold text-gray-900 mb-2">Event Details</h3>
                                <div class="space-y-2 text-sm text-gray-700 mb-4">
                                    <div><strong class="text-gray-900">Date:</strong> ${eventsData.formatDate(event.date)}</div>
                                    <div><strong class="text-gray-900">Time:</strong> ${event.time}</div>
                                    <div><strong class="text-gray-900">Location:</strong> ${event.location}</div>
                                    <div><strong class="text-gray-900">Category:</strong> ${event.category}</div>
                                    <div><strong class="text-gray-900">Capacity:</strong> ${event.capacity}</div>
                                    <div><strong class="text-gray-900">Weather:</strong> ${event.weather}</div>
                                </div>
                                
                                <h3 class="font-semibold text-gray-900 mb-2">Description</h3>
                                <p class="text-sm text-gray-700 mb-4">${event.description}</p>
                                
                                <h3 class="font-semibold text-gray-900 mb-2">Highlights</h3>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    ${event.highlights.map(highlight => 
                                        `<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">${highlight}</span>`
                                    ).join('')}
                                </div>
                                
                                <h3 class="font-semibold text-gray-900 mb-2">Accessibility</h3>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    ${event.accessibility.map(access => 
                                        `<span class="bg-[#d9c289]/20 text-[#d9c289] px-2 py-1 rounded text-sm font-medium">${access}</span>`
                                    ).join('')}
                                </div>
                                
                                <div class="flex gap-3">
                                    <a href="${event.ticketUrl}" target="_blank" rel="noopener noreferrer"
                                       class="flex-1 bg-[#000000] text-white px-4 py-2 rounded font-semibold text-center hover:bg-[#000000]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#000000]" style="color: white !important;">
                                        Get Tickets
                                    </a>
                                    <a href="tel:${event.contact}" 
                                       class="bg-gray-100 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500">
                                        Call Organizer
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Close modal on backdrop click
        document.getElementById('event-modal').addEventListener('click', (e) => {
            if (e.target.id === 'event-modal') {
                this.closeEventModal();
            }
        });
    }

    closeEventModal() {
        const modal = document.getElementById('event-modal');
        if (modal) {
            modal.remove();
        }
    }
}

// Initialize events manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎭 DOM loaded, waiting for events data...');
    
    // Wait for eventsData to be available
    const initEventsManager = () => {
        if (typeof eventsData !== 'undefined') {
            console.log('🎭 eventsData available, creating EventsManager...');
            try {
                window.eventsManager = new EventsManager();
                console.log('🎭 EventsManager created successfully');
            } catch (error) {
                console.error('🎭 Error creating EventsManager:', error);
            }
        } else {
            console.log('🎭 eventsData not available yet, retrying in 500ms...');
            setTimeout(initEventsManager, 500);
        }
    };
    
    // Start the initialization process
    initEventsManager();
}); 