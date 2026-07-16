import { PROPERTIES } from '../data.js';
import { toggleSaveProperty, isPropertySaved } from '../state.js';

export function renderSearch(params) {
    // Initial filter values from URL params
    let type = params.type || 'buy';
    let query = params.query || '';
    let propertyType = params.propertyType || '';
    let bedrooms = params.bedrooms || '';
    let maxPrice = params.maxPrice || '';
    
    let mapOpen = false;
    let cardImageIndexes = {}; // tracks active image index for each card

    function getFilteredProperties() {
        return PROPERTIES.filter(p => {
            // Filter by buy/rent/sold
            if (p.type !== type) return false;
            
            // Filter by search query (suburb, postcode, state)
            if (query) {
                const q = query.toLowerCase();
                const matchesSuburb = p.suburb.toLowerCase().includes(q);
                const matchesPostcode = p.postcode.includes(q);
                const matchesState = p.state.toLowerCase().includes(q);
                const matchesAddress = p.address.toLowerCase().includes(q);
                if (!matchesSuburb && !matchesPostcode && !matchesState && !matchesAddress) return false;
            }
            
            // Filter by property type
            if (propertyType && p.propertyType !== propertyType) return false;
            
            // Filter by bedrooms
            if (bedrooms && p.bedrooms < Number(bedrooms)) return false;
            
            // Filter by max price
            if (maxPrice) {
                if (p.numericPrice > Number(maxPrice)) return false;
            }
            
            return true;
        });
    }

    function buildHtml() {
        const filtered = getFilteredProperties();
        
        return `
            <div class="search-page container">
                <div class="search-header-panel">
                    <div class="search-bar-inline">
                        <div class="search-input-wrapper" style="flex-grow: 1;">
                            <i data-lucide="map-pin"></i>
                            <input type="text" class="search-input" id="search-bar-input" value="${query}" placeholder="Search suburb, postcode or region...">
                        </div>
                        <button class="btn-search" id="btn-search-update">
                            <i data-lucide="search"></i>
                            <span>Update</span>
                        </button>
                    </div>
                    
                    <div class="search-filters-expanded">
                        <div class="filter-group">
                            <label class="filter-label">Listing:</label>
                            <select class="filter-select" id="filter-type" style="min-width: 100px;">
                                <option value="buy" ${type === 'buy' ? 'selected' : ''}>Buy</option>
                                <option value="rent" ${type === 'rent' ? 'selected' : ''}>Rent</option>
                                <option value="sold" ${type === 'sold' ? 'selected' : ''}>Sold</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label class="filter-label">Type:</label>
                            <select class="filter-select" id="filter-prop-type">
                                <option value="">All Types</option>
                                <option value="House" ${propertyType === 'House' ? 'selected' : ''}>House</option>
                                <option value="Apartment" ${propertyType === 'Apartment' ? 'selected' : ''}>Apartment</option>
                                <option value="Townhouse" ${propertyType === 'Townhouse' ? 'selected' : ''}>Townhouse</option>
                                <option value="Land" ${propertyType === 'Land' ? 'selected' : ''}>Land</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label class="filter-label">Beds:</label>
                            <select class="filter-select" id="filter-beds" style="min-width: 100px;">
                                <option value="">Any</option>
                                <option value="1" ${bedrooms === '1' ? 'selected' : ''}>1+</option>
                                <option value="2" ${bedrooms === '2' ? 'selected' : ''}>2+</option>
                                <option value="3" ${bedrooms === '3' ? 'selected' : ''}>3+</option>
                                <option value="4" ${bedrooms === '4' ? 'selected' : ''}>4+</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label class="filter-label">Max Price:</label>
                            <select class="filter-select" id="filter-max-price">
                                <option value="">Any</option>
                                ${type === 'rent' ? `
                                    <option value="500" ${maxPrice === '500' ? 'selected' : ''}>$500 pw</option>
                                    <option value="800" ${maxPrice === '800' ? 'selected' : ''}>$800 pw</option>
                                    <option value="1200" ${maxPrice === '1200' ? 'selected' : ''}>$1,200 pw</option>
                                    <option value="1500" ${maxPrice === '1500' ? 'selected' : ''}>$1,500 pw</option>
                                    <option value="2000" ${maxPrice === '2000' ? 'selected' : ''}>$2,000 pw</option>
                                ` : `
                                    <option value="800000" ${maxPrice === '800000' ? 'selected' : ''}>$800,000</option>
                                    <option value="1200000" ${maxPrice === '1200000' ? 'selected' : ''}>$1.2M</option>
                                    <option value="1500000" ${maxPrice === '1500000' ? 'selected' : ''}>$1.5M</option>
                                    <option value="2000000" ${maxPrice === '2000000' ? 'selected' : ''}>$2.0M</option>
                                    <option value="2500000" ${maxPrice === '2500000' ? 'selected' : ''}>$2.5M</option>
                                    <option value="3000000" ${maxPrice === '3000000' ? 'selected' : ''}>$3.0M</option>
                                `}
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="results-info-row">
                    <div class="results-count">
                        Found ${filtered.length} matching properties ${query ? `in "${query}"` : ''}
                    </div>
                    <button class="btn-map-toggle" id="btn-toggle-map">
                        <i data-lucide="map"></i>
                        <span>${mapOpen ? 'Hide Map' : 'Show Map'}</span>
                    </button>
                </div>
                
                <div class="search-results-layout ${mapOpen ? 'with-map' : ''}" id="results-layout">
                    <div class="results-list-container" id="cards-container">
                        ${renderCardsList(filtered)}
                    </div>
                    
                    <div class="map-container-mock" id="map-pane" style="display: ${mapOpen ? 'block' : 'none'};">
                        ${renderMapMock(filtered)}
                    </div>
                </div>
            </div>
        `;
    }

    function renderCardsList(properties) {
        if (properties.length === 0) {
            return `
                <div class="empty-state">
                    <i data-lucide="search-slash"></i>
                    <h3>No properties match your criteria</h3>
                    <p>Try broadening your location search, adjusting your bedroom count, or increasing your price filter.</p>
                </div>
            `;
        }
        
        return properties.map(p => {
            const isSaved = isPropertySaved(p.id);
            const activeIndex = cardImageIndexes[p.id] || 0;
            const currentImg = p.images[activeIndex];
            
            return `
                <div class="property-card" data-id="${p.id}" style="flex-direction: row; min-height: 200px; display: flex; flex-wrap: wrap;">
                    <div class="card-media" style="width: 280px; height: 100%; min-height: 200px; position: relative;">
                        <img class="card-image" src="${currentImg}" style="height: 100%; width: 100%; object-fit: cover;">
                        <div class="card-badge ${p.type}">${p.type}</div>
                        
                        <button class="btn-favorite-card ${isSaved ? 'active' : ''}" data-id="${p.id}">
                            <i data-lucide="heart" style="width: 20px; height: 20px; fill: ${isSaved ? '#e4002b' : 'transparent'};"></i>
                        </button>
                        
                        ${p.images.length > 1 ? `
                            <button class="card-media-nav prev" data-id="${p.id}">
                                <i data-lucide="chevron-left" style="width: 18px; height: 18px;"></i>
                            </button>
                            <button class="card-media-nav next" data-id="${p.id}">
                                <i data-lucide="chevron-right" style="width: 18px; height: 18px;"></i>
                            </button>
                        ` : ''}
                    </div>
                    
                    <div class="card-content" style="flex: 1; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                                <div class="card-price">${p.price}</div>
                            </div>
                            <div class="card-address"><a href="#/property/${p.id}">${p.address}</a></div>
                            
                            <div class="card-specs">
                                ${p.bedrooms > 0 ? `
                                    <div class="card-spec-item">
                                        <i data-lucide="bed"></i>
                                        <span>${p.bedrooms}</span>
                                    </div>
                                ` : ''}
                                ${p.bathrooms > 0 ? `
                                    <div class="card-spec-item">
                                        <i data-lucide="bath"></i>
                                        <span>${p.bathrooms}</span>
                                    </div>
                                ` : ''}
                                ${p.carspaces > 0 ? `
                                    <div class="card-spec-item">
                                        <i data-lucide="car"></i>
                                        <span>${p.carspaces}</span>
                                    </div>
                                ` : ''}
                                <div class="card-spec-item">
                                    <span>${p.propertyType}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-footer">
                            <div class="card-agent-profile">
                                <img class="card-agent-photo" src="${p.agent.image}" alt="${p.agent.name}">
                                <div style="display: flex; flex-direction: column;">
                                    <span class="card-agent-name">${p.agent.name}</span>
                                    <span style="font-size: 10px; color: var(--text-muted);">${p.agent.agency}</span>
                                </div>
                            </div>
                            <a href="#/property/${p.id}" class="btn-search" style="font-size: 13px; padding: 6px 16px; border-radius: var(--radius-sm);">View Details</a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderMapMock(properties) {
        // Render a simulated styled map using responsive SVG
        return `
            <div class="map-container-mock">
                <svg class="map-svg-mock" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Map background simulation -->
                    <rect width="100%" height="100%" fill="#e5e3df"/>
                    <!-- Road pathways -->
                    <path d="M 0 30 Q 30 25 50 30 T 100 30" fill="none" stroke="#fff" stroke-width="3"/>
                    <path d="M 0 60 Q 40 65 60 60 T 100 65" fill="none" stroke="#fff" stroke-width="3"/>
                    <path d="M 30 0 Q 35 40 30 70 T 35 100" fill="none" stroke="#fff" stroke-width="3"/>
                    <path d="M 70 0 Q 65 30 70 60 T 65 100" fill="none" stroke="#fff" stroke-width="3"/>
                    
                    <!-- Parks & River Simulation -->
                    <rect x="5" y="5" width="20" height="20" rx="3" fill="#cbe4ca"/>
                    <path d="M 0 90 Q 30 85 50 92 T 100 88" fill="none" stroke="#b5d3e7" stroke-width="6"/>
                    
                    <!-- Interactive price markers -->
                    ${properties.map(p => {
                        const markerPrice = p.type === 'rent' ? p.price : (p.numericPrice >= 1000000 ? `$${(p.numericPrice/1000000).toFixed(1)}M` : `$${p.numericPrice/1000}k`);
                        return `
                            <g class="map-pin" data-id="${p.id}" transform="translate(${p.coordinates.x}, ${p.coordinates.y})">
                                <circle cx="0" cy="0" r="16" fill="rgba(228, 0, 43, 0.2)"/>
                                <circle cx="0" cy="0" r="4" fill="var(--primary)"/>
                                <rect x="-24" y="-28" width="48" height="18" rx="4" fill="var(--primary)" stroke="white" stroke-width="1.5" class="map-pin-box"/>
                                <text x="0" y="-16" font-family="'Outfit', sans-serif" font-size="6.5" font-weight="800" fill="white" text-anchor="middle">${markerPrice}</text>
                            </g>
                        `;
                    }).join('')}
                </svg>
            </div>
        `;
    }

    function setupEventListeners() {
        const appRoot = document.getElementById('app');
        
        // Listeners for dynamic filters updating in real-time
        const updateFilters = () => {
            query = document.getElementById('search-bar-input').value.trim();
            type = document.getElementById('filter-type').value;
            propertyType = document.getElementById('filter-prop-type').value;
            bedrooms = document.getElementById('filter-beds').value;
            maxPrice = document.getElementById('filter-max-price').value;
            
            // Re-render components without full page refresh
            const container = document.getElementById('cards-container');
            const mapContainer = document.getElementById('map-pane');
            const filtered = getFilteredProperties();
            
            if (container) container.innerHTML = renderCardsList(filtered);
            if (mapContainer) mapContainer.innerHTML = renderMapMock(filtered);
            
            // Recreate icons and attach handlers
            if (window.lucide) window.lucide.createIcons();
            attachInteractionHandlers();
        };

        // Attach listeners to controls
        const filterControls = ['filter-type', 'filter-prop-type', 'filter-beds', 'filter-max-price'];
        filterControls.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', (e) => {
                // Adjust max price option list dynamically when buy/rent toggles
                if (id === 'filter-type') {
                    const priceSel = document.getElementById('filter-max-price');
                    const val = e.target.value;
                    if (val === 'rent') {
                        priceSel.innerHTML = `
                            <option value="">Any</option>
                            <option value="500">$500 pw</option>
                            <option value="800">$800 pw</option>
                            <option value="1200">$1,200 pw</option>
                            <option value="1500">$1,500 pw</option>
                        `;
                    } else {
                        priceSel.innerHTML = `
                            <option value="">Any</option>
                            <option value="800000">$800,000</option>
                            <option value="1200000">$1.2M</option>
                            <option value="1500000">$1.5M</option>
                            <option value="2000000">$2.0M</option>
                            <option value="2500000">$2.5M</option>
                            <option value="3000000">$3.0M</option>
                        `;
                    }
                }
                updateFilters();
            });
        });

        const btnUpdate = document.getElementById('btn-search-update');
        if (btnUpdate) btnUpdate.addEventListener('click', updateFilters);
        
        const barInput = document.getElementById('search-bar-input');
        if (barInput) barInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') updateFilters();
        });

        // Map toggle
        const btnToggleMap = document.getElementById('btn-toggle-map');
        if (btnToggleMap) {
            btnToggleMap.addEventListener('click', () => {
                mapOpen = !mapOpen;
                const layout = document.getElementById('results-layout');
                const mapPane = document.getElementById('map-pane');
                const toggleSpan = btnToggleMap.querySelector('span');
                
                if (mapOpen) {
                    layout.classList.add('with-map');
                    mapPane.style.display = 'block';
                    toggleSpan.textContent = 'Hide Map';
                } else {
                    layout.classList.remove('with-map');
                    mapPane.style.display = 'none';
                    toggleSpan.textContent = 'Show Map';
                }
            });
        }

        function attachInteractionHandlers() {
            // Heart favorite click handler
            const heartBtns = document.querySelectorAll('.btn-favorite-card');
            heartBtns.forEach(btn => {
                btn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const propId = Number(btn.dataset.id);
                    const nowSaved = toggleSaveProperty(propId);
                    
                    // Toggle active classes
                    btn.classList.toggle('active', nowSaved);
                    const heartSvg = btn.querySelector('svg');
                    if (heartSvg) {
                        heartSvg.style.fill = nowSaved ? '#e4002b' : 'transparent';
                    }
                };
            });

            // Card image navigation click handler
            const mediaNavs = document.querySelectorAll('.card-media-nav');
            mediaNavs.forEach(nav => {
                nav.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const propId = Number(nav.dataset.id);
                    const p = PROPERTIES.find(item => item.id === propId);
                    if (!p) return;
                    
                    let activeIndex = cardImageIndexes[propId] || 0;
                    if (nav.classList.contains('prev')) {
                        activeIndex = (activeIndex - 1 + p.images.length) % p.images.length;
                    } else {
                        activeIndex = (activeIndex + 1) % p.images.length;
                    }
                    cardImageIndexes[propId] = activeIndex;
                    
                    // Find card image and replace src
                    const cardEl = document.querySelector(`.property-card[data-id="${propId}"]`);
                    const imgEl = cardEl.querySelector('.card-image');
                    if (imgEl) {
                        imgEl.src = p.images[activeIndex];
                    }
                };
            });

            // Map Pins Hover/Click linking to Card highlighting
            const mapPins = document.querySelectorAll('.map-pin');
            mapPins.forEach(pin => {
                const propId = pin.dataset.id;
                
                pin.addEventListener('mouseenter', () => {
                    const card = document.querySelector(`.property-card[data-id="${propId}"]`);
                    if (card) {
                        card.style.borderColor = 'var(--primary)';
                        card.style.boxShadow = 'var(--shadow-lg)';
                    }
                });
                
                pin.addEventListener('mouseleave', () => {
                    const card = document.querySelector(`.property-card[data-id="${propId}"]`);
                    if (card) {
                        card.style.borderColor = '';
                        card.style.boxShadow = '';
                    }
                });
                
                pin.addEventListener('click', () => {
                    const card = document.querySelector(`.property-card[data-id="${propId}"]`);
                    if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            });
        }

        // Run initial bindings
        attachInteractionHandlers();
    }

    // Call setup triggers shortly after string layout inserts
    setTimeout(setupEventListeners, 0);

    return buildHtml();
}
