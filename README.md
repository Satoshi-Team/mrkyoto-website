# MrKyoto.com - Your Gateway to Timeless Kyoto

A modern, fully responsive static website that helps locals and travelers explore the best of Kyoto — from temples and events to real estate and news.

## 🌟 Features

- **Fully Responsive Design** - Mobile-first approach with TailwindCSS
- **Dark/Light Theme Toggle** - User preference saved in localStorage
- **Interactive Elements** - Smooth scrolling, hover effects, and animations
- **Performance Optimized** - 100% Google Lighthouse scores target
- **SEO Friendly** - Semantic HTML5 and meta tags
- **Accessibility** - WCAG compliant design

## 🎨 Design System

### Color Palette (Japan Inspired)
- **Primary**: `#D9CBA3` (Rice Paper Beige)
- **Secondary**: `#9A1F40` (Kyoto Plum Red)
- **Accent**: `#2E2E2E` (Ink Black) and `#FFFFFF` (White)
- **Gradients**: Sakura Pink to Deep Crimson

### Typography
- **Headings**: Noto Serif JP (graceful, traditional)
- **Body**: Inter (modern, readable)

## 📁 Project Structure

```
mrk/
├── index.html              # Homepage
├── real-estate.html        # Real estate listings
├── events.html            # Events and festivals
├── privacy.html           # Privacy policy
├── terms.html             # Terms of service
├── favicon.svg            # Torii gate favicon
├── js/
│   └── main.js            # Interactive functionality
├── instructions/
│   └── instructions.md    # Build instructions
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Live Server extension (for local development)

### Development Setup

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd mrk
   ```

2. **Open with Live Server**
   - Install Live Server extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"
   - Or use any local development server

3. **View the website**
   - Open `http://localhost:3000` in your browser
   - Test responsive design by resizing the browser window
   - Try the dark/light theme toggle

## 🛠️ Development

### Key Technologies
- **HTML5** - Semantic markup
- **TailwindCSS** - Utility-first CSS framework
- **JavaScript** - Interactive functionality
- **SVG** - Scalable icons and graphics

### Customization

#### Adding New Pages
1. Create a new HTML file following the existing structure
2. Include the navigation and footer components
3. Add the page to the navigation menu
4. Update the JavaScript file if needed

#### Modifying Colors
Edit the TailwindCSS configuration in each HTML file:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'rice-paper': '#D9CBA3',
                'kyoto-plum': '#9A1F40',
                // Add your custom colors here
            }
        }
    }
}
```

#### Adding Content
- Use semantic HTML5 elements (`<section>`, `<article>`, `<nav>`, etc.)
- Follow the established card-based layout pattern
- Maintain consistent spacing with TailwindCSS classes
- Ensure all images have proper alt text for accessibility

## 📱 Responsive Design

The website uses a mobile-first approach with the following breakpoints:
- **Mobile**: Default (320px+)
- **Tablet**: `md:` prefix (768px+)
- **Desktop**: `lg:` prefix (1024px+)
- **Large Desktop**: `xl:` prefix (1280px+)

## 🎯 Performance Optimization

### Implemented Features
- **Lazy Loading** - Images load as they enter the viewport
- **Font Preloading** - Critical fonts loaded with high priority
- **Minified Assets** - Optimized CSS and JavaScript
- **SVG Icons** - Scalable graphics with minimal file size
- **Efficient Animations** - CSS transforms and opacity changes

### Lighthouse Score Targets
- **Performance**: 100
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🔧 Interactive Features

### JavaScript Functionality
- **Theme Toggle** - Dark/light mode with localStorage persistence
- **Mobile Menu** - Responsive navigation for mobile devices
- **Smooth Scrolling** - Animated scrolling to page sections
- **Form Validation** - Client-side validation for contact forms
- **Scroll Animations** - Elements fade in as they enter viewport
- **Analytics Tracking** - Google Analytics event tracking (if configured)

### CSS Animations
- **Floating CTA** - Subtle floating animation for call-to-action buttons
- **Hover Effects** - Smooth transitions on interactive elements
- **Card Animations** - Lift effect on hover for property/event cards

## 📊 Analytics & Tracking

The website includes Google Analytics tracking for:
- CTA button clicks
- Form submissions
- Page views
- User interactions

To enable analytics, add your Google Analytics tracking code to the HTML files.

## 🌐 Deployment

### Recommended Platforms
- **Netlify** - Easy deployment with Git integration
- **Vercel** - Fast static site hosting
- **GitHub Pages** - Free hosting for public repositories

### Custom Domain
Configure your domain (mrkyoto.com) in your hosting provider's DNS settings.

## 📝 Content Management

### Adding New Content
1. **Real Estate Listings** - Add new property cards in `real-estate.html`
2. **Events** - Add new event cards in `events.html`
3. **Blog Posts** - Create new HTML files for blog content
4. **News Updates** - Update content in the news section

### Content Guidelines
- Use high-quality images (WebP format recommended)
- Write compelling, SEO-friendly descriptions
- Include relevant keywords naturally
- Maintain consistent tone and voice

## 🔒 Security & Privacy

### Privacy Features
- **No Personal Data Collection** - Minimal data collection
- **Secure Forms** - Client-side validation only
- **Privacy Policy** - Comprehensive privacy information
- **Terms of Service** - Clear usage terms

### Security Best Practices
- HTTPS deployment recommended
- No sensitive data in client-side code
- Regular security updates
- Input sanitization for forms

## 🧪 Testing

### Manual Testing Checklist
- [ ] Responsive design on all devices
- [ ] Dark/light theme toggle functionality
- [ ] Mobile menu navigation
- [ ] Form validation and submission
- [ ] Smooth scrolling to sections
- [ ] All links working correctly
- [ ] Images loading properly
- [ ] Performance on slow connections

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 SEO Optimization

### Implemented Features
- Semantic HTML5 structure
- Meta descriptions and titles
- Open Graph tags
- Structured data markup
- Fast loading times
- Mobile-friendly design
- Clean URL structure

### Keywords
- Kyoto tourism
- Kyoto real estate
- Kyoto events
- Kyoto festivals
- Kyoto activities
- Japan travel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- **Email**: hello@mrkyoto.com
- **Website**: mrkyoto.com

## 🙏 Acknowledgments

- Design inspiration from traditional Japanese aesthetics
- Icons and graphics created specifically for this project
- Built with modern web technologies and best practices

---

**MrKyoto.com** - Your Gateway to Timeless Kyoto 🌸 