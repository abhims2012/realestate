import { getSavedCount } from '../state.js';

export function renderNavbar() {
    const savedCount = getSavedCount();
    
    // Set up the HTML template
    const html = `
        <div class="navbar-container">
            <div class="container navbar">
                <a href="#/" class="nav-brand">
                    realestate<span>.com.au</span>
                </a>
                
                <ul class="nav-links">
                    <li><a href="#/search?type=buy" class="nav-link" id="nav-buy">Buy</a></li>
                    <li><a href="#/search?type=rent" class="nav-link" id="nav-rent">Rent</a></li>
                    <li><a href="#/search?type=sold" class="nav-link" id="nav-sold">Sold</a></li>
                    <li><a href="#/" class="nav-link">Home Loans</a></li>
                    <li><a href="#/" class="nav-link">News</a></li>
                    <li><a href="#/" class="nav-link">Agents</a></li>
                </ul>
                
                <div class="nav-actions">
                    <a href="#/saved" class="btn-saved">
                        <i data-lucide="heart" style="width: 18px; height: 18px; fill: ${savedCount > 0 ? '#e4002b' : 'transparent'}; color: ${savedCount > 0 ? '#e4002b' : 'currentColor'}"></i>
                        <span>Saved</span>
                        <span class="badge" id="nav-saved-badge" style="display: ${savedCount > 0 ? 'inline-block' : 'none'}">${savedCount}</span>
                    </a>
                    <button class="btn-signin">Sign in</button>
                    <button class="mobile-menu-toggle">
                        <i data-lucide="menu"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Hook up dynamic state listener after navbar is injected into DOM
    setTimeout(() => {
        const badge = document.getElementById('nav-saved-badge');
        const heartIcon = document.querySelector('.btn-saved i');
        
        window.addEventListener('savedPropertiesChanged', (e) => {
            const count = e.detail.savedIds.length;
            if (badge) {
                badge.textContent = count;
                badge.style.display = count > 0 ? 'inline-block' : 'none';
            }
            if (heartIcon) {
                if (count > 0) {
                    heartIcon.style.fill = '#e4002b';
                    heartIcon.style.color = '#e4002b';
                } else {
                    heartIcon.style.fill = 'transparent';
                    heartIcon.style.color = 'currentColor';
                }
            }
        });
        
        // Highlights the active navigation tab based on the current URL
        highlightActiveTab();
    }, 0);

    return html;
}

function highlightActiveTab() {
    const hash = window.location.hash;
    const links = {
        'nav-buy': hash.includes('type=buy'),
        'nav-rent': hash.includes('type=rent'),
        'nav-sold': hash.includes('type=sold')
    };

    Object.keys(links).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (links[id]) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        }
    });
}

// Make sure to re-highlight tab when URL changes
window.addEventListener('hashchange', highlightActiveTab);
