import { PROPERTIES } from '../data.js';

export function renderHome() {
    // Unique list of suburbs for suggestion dropdown
    const suburbs = [...new Set(PROPERTIES.map(p => p.suburb))];
    
    const html = `
        <div class="hero" style="background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80');">
            <div class="hero-content">
                <h1 class="hero-title">Discover your dream property</h1>
                
                <div class="search-box">
                    <div class="search-tabs">
                        <button class="search-tab active" data-type="buy">Buy</button>
                        <button class="search-tab" data-type="rent">Rent</button>
                        <button class="search-tab" data-type="sold">Sold</button>
                    </div>
                    
                    <div class="search-input-group">
                        <div class="search-input-wrapper">
                            <i data-lucide="map-pin"></i>
                            <input type="text" class="search-input" id="search-location" placeholder="Search suburb, postcode or state (e.g. Richmond, Surry Hills)..." autocomplete="off">
                            <div class="suggestions-dropdown" id="search-suggestions" style="display: none;">
                                ${suburbs.map(suburb => `
                                    <div class="suggestion-item" data-value="${suburb}">
                                        <i data-lucide="map-pin" style="width: 16px; height: 16px;"></i>
                                        <span>${suburb}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <button class="btn-search" id="btn-home-search">
                            <i data-lucide="search"></i>
                            <span>Search</span>
                        </button>
                    </div>
                    
                    <div class="search-filters-row">
                        <select class="filter-select" id="search-prop-type">
                            <option value="">Property Type</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Land">Land</option>
                        </select>
                        
                        <select class="filter-select" id="search-beds">
                            <option value="">Bedrooms (Any)</option>
                            <option value="1">1+ Bed</option>
                            <option value="2">2+ Beds</option>
                            <option value="3">3+ Beds</option>
                            <option value="4">4+ Beds</option>
                            <option value="5">5+ Beds</option>
                        </select>
                        
                        <select class="filter-select" id="search-max-price">
                            <option value="">Max Price (Any)</option>
                            <option value="800000">$800,000</option>
                            <option value="1200000">$1.2M</option>
                            <option value="1500000">$1.5M</option>
                            <option value="2000000">$2.0M</option>
                            <option value="2500000">$2.5M</option>
                            <option value="3000000">$3.0M</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        
        <section class="home-section container">
            <div class="section-title-wrapper">
                <h2 class="section-title">Explore popular suburbs</h2>
            </div>
            
            <div class="cards-grid">
                <div class="property-card" style="cursor: pointer;" onclick="window.location.hash='#/search?query=Richmond'">
                    <div class="card-media" style="height: 180px;">
                        <img class="card-image" src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80">
                        <div style="position: absolute; bottom: 12px; left: 12px; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.8); font-weight: 700; font-size: 20px;">Richmond, VIC</div>
                    </div>
                </div>
                <div class="property-card" style="cursor: pointer;" onclick="window.location.hash='#/search?query=Surry Hills'">
                    <div class="card-media" style="height: 180px;">
                        <img class="card-image" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80">
                        <div style="position: absolute; bottom: 12px; left: 12px; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.8); font-weight: 700; font-size: 20px;">Surry Hills, NSW</div>
                    </div>
                </div>
                <div class="property-card" style="cursor: pointer;" onclick="window.location.hash='#/search?query=New Farm'">
                    <div class="card-media" style="height: 180px;">
                        <img class="card-image" src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80">
                        <div style="position: absolute; bottom: 12px; left: 12px; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.8); font-weight: 700; font-size: 20px;">New Farm, QLD</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="home-section container" style="background-color: var(--bg-white); border-radius: var(--radius-md); padding: 40px; margin-bottom: 60px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-light);">
            <div style="display: flex; align-items: center; gap: 40px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 300px;">
                    <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 12px; color: var(--text-dark);">Need a Home Loan?</h3>
                    <p style="color: var(--text-muted); margin-bottom: 24px; font-size: 15px;">Compare rates from over 30 lenders with our smart calculators. Realestate Home Loans can help you find the right fit for your budget.</p>
                    <a href="#" class="btn-search" style="display: inline-flex; width: auto; padding: 12px 28px;">Compare Home Loans</a>
                </div>
                <div style="flex: 1; min-width: 300px; display: flex; justify-content: center;">
                    <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500&q=80" style="max-width: 100%; height: 200px; border-radius: var(--radius-md); object-fit: cover;">
                </div>
            </div>
        </section>
    `;

    // Setup interactive event listeners
    setTimeout(() => {
        let activeType = 'buy'; // default

        // Tab Selection
        const tabs = document.querySelectorAll('.search-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeType = tab.dataset.type;
                
                // Adjust max price drop down based on buy vs rent
                const maxPriceSelect = document.getElementById('search-max-price');
                if (maxPriceSelect) {
                    if (activeType === 'rent') {
                        maxPriceSelect.innerHTML = `
                            <option value="">Max Rent (Any)</option>
                            <option value="500">$500 pw</option>
                            <option value="800">$800 pw</option>
                            <option value="1200">$1,200 pw</option>
                            <option value="1500">$1,500 pw</option>
                            <option value="2000">$2,000 pw</option>
                        `;
                    } else {
                        maxPriceSelect.innerHTML = `
                            <option value="">Max Price (Any)</option>
                            <option value="800000">$800,000</option>
                            <option value="1200000">$1.2M</option>
                            <option value="1500000">$1.5M</option>
                            <option value="2000000">$2.0M</option>
                            <option value="2500000">$2.5M</option>
                            <option value="3000000">$3.0M</option>
                        `;
                    }
                }
            });
        });

        // Location suggestions
        const input = document.getElementById('search-location');
        const suggestions = document.getElementById('search-suggestions');
        
        input.addEventListener('focus', () => {
            suggestions.style.display = 'block';
        });

        // Hide suggestions on outside click
        document.addEventListener('click', (e) => {
            if (input && suggestions && !input.contains(e.target) && !suggestions.contains(e.target)) {
                suggestions.style.display = 'none';
            }
        });

        // Suggestion click
        const items = document.querySelectorAll('.suggestion-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.dataset.value;
                suggestions.style.display = 'none';
            });
        });

        // Search trigger
        const btnSearch = document.getElementById('btn-home-search');
        btnSearch.addEventListener('click', () => {
            const query = input.value.trim();
            const propType = document.getElementById('search-prop-type').value;
            const beds = document.getElementById('search-beds').value;
            const maxPrice = document.getElementById('search-max-price').value;
            
            let searchHash = `#/search?type=${activeType}`;
            if (query) searchHash += `&query=${encodeURIComponent(query)}`;
            if (propType) searchHash += `&propertyType=${encodeURIComponent(propType)}`;
            if (beds) searchHash += `&bedrooms=${beds}`;
            if (maxPrice) searchHash += `&maxPrice=${maxPrice}`;
            
            window.location.hash = searchHash;
        });

        // Search trigger on enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnSearch.click();
            }
        });

    }, 0);

    return html;
}
