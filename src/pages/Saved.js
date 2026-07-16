import { PROPERTIES } from '../data.js';
import { getSavedPropertyIds, toggleSaveProperty } from '../state.js';

export function renderSaved() {
    
    function getSavedProperties() {
        const savedIds = getSavedPropertyIds();
        return PROPERTIES.filter(p => savedIds.includes(p.id));
    }

    function buildHtml() {
        const savedList = getSavedProperties();
        
        return `
            <div class="saved-page container">
                <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 24px; color: var(--text-dark);">
                    Saved Properties
                </h2>
                
                <div class="cards-grid" id="saved-grid-container">
                    ${renderSavedGrid(savedList)}
                </div>
            </div>
        `;
    }

    function renderSavedGrid(savedList) {
        if (savedList.length === 0) {
            return `
                <div class="empty-state" style="grid-column: 1 / -1; width: 100%;">
                    <i data-lucide="heart" style="width: 48px; height: 48px; color: var(--text-muted); stroke-dasharray: 4; fill: none;"></i>
                    <h3>You haven't saved any properties yet</h3>
                    <p>When searching for homes, click the heart icon to save listings you like.</p>
                    <a href="#/" class="btn-back-home" style="margin-top: 16px;">Search Properties</a>
                </div>
            `;
        }

        return savedList.map(p => `
            <div class="property-card" data-id="${p.id}">
                <div class="card-media">
                    <img class="card-image" src="${p.images[0]}" alt="${p.title}">
                    <div class="card-badge ${p.type}">${p.type}</div>
                    <button class="btn-favorite-card active" data-id="${p.id}">
                        <i data-lucide="heart" style="width: 20px; height: 20px; fill: #e4002b;"></i>
                    </button>
                </div>
                
                <div class="card-content">
                    <div class="card-price">${p.price}</div>
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
                    
                    <div class="card-footer">
                        <span style="font-size: 11px; font-weight: 600; color: var(--primary); text-transform: uppercase;">
                            ${p.agent.agency}
                        </span>
                        <a href="#/property/${p.id}" class="btn-search" style="font-size: 12px; padding: 5px 12px; border-radius: var(--radius-sm);">View Listing</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        const gridContainer = document.getElementById('saved-grid-container');
        if (!gridContainer) return;

        gridContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-favorite-card');
            if (!btn) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const propId = Number(btn.dataset.id);
            toggleSaveProperty(propId);
            
            // Re-render the saved properties grid immediately to remove unsaved item
            const updatedList = getSavedProperties();
            gridContainer.innerHTML = renderSavedGrid(updatedList);
            
            if (window.lucide) window.lucide.createIcons();
        });
    }

    setTimeout(setupEventListeners, 0);

    return buildHtml();
}
export default renderSaved;
