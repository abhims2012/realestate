import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { handleRoute } from './router.js';

function init() {
    const app = document.getElementById('app');
    if (!app) return;
    
    // Inject the main structure
    app.innerHTML = `
        <div id="navbar-root">${renderNavbar()}</div>
        <main id="router-view">${handleRoute()}</main>
        <div id="footer-root">${renderFooter()}</div>
    `;
    
    // Initialize Lucide Icons for the initial view
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Listen to route changes
    window.addEventListener('hashchange', () => {
        const view = document.getElementById('router-view');
        if (view) {
            view.innerHTML = handleRoute();
            // Scroll to top on navigation
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            // Re-trigger Lucide Icons
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }
    });
}

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// If DOMContentLoaded already fired, execute immediately
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    init();
}
