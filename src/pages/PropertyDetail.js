import { PROPERTIES } from '../data.js';
import { toggleSaveProperty, isPropertySaved } from '../state.js';

export function renderPropertyDetail(params) {
    const propertyId = Number(params.id);
    const property = PROPERTIES.find(p => p.id === propertyId);
    
    if (!property) {
        return `
            <div class="container" style="padding: 60px 20px; text-align: center;">
                <i data-lucide="alert-triangle" style="width: 48px; height: 48px; color: var(--primary); margin-bottom: 16px;"></i>
                <h2>Property Not Found</h2>
                <p>We couldn't find the property you are looking for.</p>
                <a href="#/" class="btn-back-home" style="margin-top: 20px;">Return Home</a>
            </div>
        `;
    }

    const isSaved = isPropertySaved(property.id);
    let isDescriptionExpanded = false;
    let lightboxOpen = false;
    let lightboxIndex = 0;

    // Default mortgage calculation inputs
    let calculatedPrincipal = property.type === 'rent' ? 0 : property.numericPrice;
    let mortgagePrice = calculatedPrincipal; 
    let mortgageDeposit = Math.round(mortgagePrice * 0.2); // 20% deposit default
    let mortgageRate = 5.8; // 5.8% rate default
    let mortgageTerm = 30; // 30 years default

    function calculateMonthlyMortgage() {
        const principal = mortgagePrice - mortgageDeposit;
        if (principal <= 0) return 0;
        
        const monthlyRate = (mortgageRate / 100) / 12;
        const totalMonths = mortgageTerm * 12;
        
        if (monthlyRate === 0) return (principal / totalMonths).toFixed(0);
        
        const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        return payment.toFixed(0);
    }

    function buildHtml() {
        const formattedPrice = property.price;
        const savedLabel = isSaved ? 'Saved' : 'Save';
        
        return `
            <div class="detail-page container">
                <div class="detail-breadcrumbs">
                    <a href="#/">Home</a> &gt; 
                    <a href="#/search?query=${property.state}">${property.state}</a> &gt; 
                    <a href="#/search?query=${property.suburb}">${property.suburb}</a> &gt; 
                    <span>${property.address.split(',')[0]}</span>
                </div>
                
                <div class="detail-gallery">
                    <div class="gallery-main" id="gallery-main-click">
                        <img src="${property.images[0]}" alt="${property.title}">
                    </div>
                    <div class="gallery-sidebar">
                        <div class="gallery-side-img" id="gallery-side-1">
                            <img src="${property.images[1] || property.images[0]}" alt="${property.title}">
                        </div>
                        <div class="gallery-side-img" id="gallery-side-2">
                            <img src="${property.images[2] || property.images[0]}" alt="${property.title}">
                            <button class="gallery-overlay-btn" id="btn-gallery-overlay">
                                <i data-lucide="image" style="width: 16px; height: 16px; display: inline; vertical-align: middle; margin-right: 4px;"></i>
                                View all ${property.images.length} photos
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="detail-main-layout">
                    <!-- Left Column: Details -->
                    <div>
                        <div class="detail-info-card">
                            <div class="detail-header-row">
                                <h2 class="detail-price">${formattedPrice}</h2>
                                <button class="btn-favorite-detail ${isSaved ? 'active' : ''}" id="btn-favorite-trigger">
                                    <i data-lucide="heart" style="width: 18px; height: 18px; fill: ${isSaved ? 'white' : 'transparent'};"></i>
                                    <span>${savedLabel}</span>
                                </button>
                            </div>
                            
                            <p class="detail-address">${property.address}</p>
                            
                            <div class="detail-specs">
                                ${property.bedrooms > 0 ? `
                                    <div class="card-spec-item">
                                        <i data-lucide="bed" style="width: 20px; height: 20px;"></i>
                                        <span>${property.bedrooms} Bed${property.bedrooms > 1 ? 's' : ''}</span>
                                    </div>
                                ` : ''}
                                ${property.bathrooms > 0 ? `
                                    <div class="card-spec-item">
                                        <i data-lucide="bath" style="width: 20px; height: 20px;"></i>
                                        <span>${property.bathrooms} Bath${property.bathrooms > 1 ? 's' : ''}</span>
                                    </div>
                                ` : ''}
                                ${property.carspaces > 0 ? `
                                    <div class="card-spec-item">
                                        <i data-lucide="car" style="width: 20px; height: 20px;"></i>
                                        <span>${property.carspaces} Car${property.carspaces > 1 ? 's' : ''}</span>
                                    </div>
                                ` : ''}
                                <div class="card-spec-item">
                                    <span>${property.propertyType}</span>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="detail-desc-title">Property Description</h3>
                                <p class="detail-desc-text" id="detail-desc-box">
                                    ${isDescriptionExpanded ? property.description : property.description.substring(0, 260) + '...'}
                                </p>
                                <button class="detail-desc-toggle" id="btn-desc-toggle">
                                    <span>${isDescriptionExpanded ? 'Read Less' : 'Read More'}</span>
                                    <i data-lucide="${isDescriptionExpanded ? 'chevron-up' : 'chevron-down'}"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Features Card -->
                        <div class="detail-info-card">
                            <h3 class="detail-desc-title">Property Features</h3>
                            <div class="detail-features-grid">
                                ${property.features.map(f => `
                                    <div class="detail-feature-item">
                                        <i data-lucide="check-circle-2"></i>
                                        <span>${f}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Suburb Trends (REA Branding details) -->
                        <div class="trends-card">
                            <h3 class="trends-title">Market Insights for ${property.suburb}</h3>
                            <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 16px;">
                                Based on Sales & rental data from the last 12 months.
                            </p>
                            <div class="trends-stat-row">
                                <span class="trends-label">Median ${property.medianPrice.type} Price</span>
                                <span class="trends-value">${property.medianPrice.median}</span>
                            </div>
                            <div class="trends-stat-row">
                                <span class="trends-label">Market Growth</span>
                                <span class="trends-value" style="color: #008450;">${property.medianPrice.growth}</span>
                            </div>
                        </div>

                        <!-- Mortgage Calculator (Buy properties only) -->
                        ${property.type !== 'rent' ? `
                            <div class="calc-card">
                                <h3 class="calc-title">Estimated Home Loan Repayment</h3>
                                <div class="calc-display">
                                    <div class="calc-amount" id="mortgage-result">$${Number(calculateMonthlyMortgage()).toLocaleString()}/mo</div>
                                    <div class="calc-amount-label">Estimated Monthly Payment</div>
                                </div>
                                <div class="calc-sliders">
                                    <div class="slider-group">
                                        <div class="slider-header">
                                            <span>Property Price</span>
                                            <span id="label-price">$${mortgagePrice.toLocaleString()}</span>
                                        </div>
                                        <input type="range" class="slider-input" id="slide-price" min="${Math.round(property.numericPrice * 0.7)}" max="${Math.round(property.numericPrice * 1.5)}" step="10000" value="${mortgagePrice}">
                                    </div>
                                    <div class="slider-group">
                                        <div class="slider-header">
                                            <span>Deposit (20% default)</span>
                                            <span id="label-deposit">$${mortgageDeposit.toLocaleString()}</span>
                                        </div>
                                        <input type="range" class="slider-input" id="slide-deposit" min="0" max="${Math.round(mortgagePrice * 0.8)}" step="5000" value="${mortgageDeposit}">
                                    </div>
                                    <div class="slider-group">
                                        <div class="slider-header">
                                            <span>Interest Rate</span>
                                            <span id="label-rate">${mortgageRate}%</span>
                                        </div>
                                        <input type="range" class="slider-input" id="slide-rate" min="1" max="12" step="0.1" value="${mortgageRate}">
                                    </div>
                                    <div class="slider-group">
                                        <div class="slider-header">
                                            <span>Loan Term</span>
                                            <span id="label-term">${mortgageTerm} years</span>
                                        </div>
                                        <input type="range" class="slider-input" id="slide-term" min="10" max="30" step="5" value="${mortgageTerm}">
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Right Column: Agent Form -->
                    <div class="agent-sidebar-sticky">
                        <div class="agent-card">
                            <div class="agent-info">
                                <img src="${property.agent.image}" alt="${property.agent.name}" class="agent-photo">
                                <div class="agent-details">
                                    <h4>${property.agent.name}</h4>
                                    <p>${property.agent.role}</p>
                                    <p style="font-weight: 600; color: var(--primary); margin-top: 4px;">${property.agent.agency}</p>
                                </div>
                            </div>
                            
                            <form class="agent-form" id="agent-contact-form">
                                <input type="text" class="agent-form-input" placeholder="Your Name" required>
                                <input type="email" class="agent-form-input" placeholder="Your Email Address" required>
                                <input type="tel" class="agent-form-input" placeholder="Your Phone Number" required>
                                <textarea class="agent-form-input agent-form-textarea" required>Hi, I am interested in ${property.address} and would like to arrange an inspection.</textarea>
                                <button type="submit" class="btn-agent-submit">Email Agent</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Lightbox Modal -->
            <div class="lightbox-modal" id="lightbox-modal">
                <div class="lightbox-content">
                    <span class="lightbox-close" id="lightbox-close">&times;</span>
                    <img class="lightbox-img" id="lightbox-img" src="${property.images[0]}">
                    
                    <span class="lightbox-nav prev" id="lightbox-prev">&#10094;</span>
                    <span class="lightbox-nav next" id="lightbox-next">&#10095;</span>
                </div>
            </div>
        `;
    }

    function setupEventListeners() {
        const appRoot = document.getElementById('app');
        
        // Favorite trigger
        const btnFav = document.getElementById('btn-favorite-trigger');
        if (btnFav) {
            btnFav.addEventListener('click', () => {
                const nowSaved = toggleSaveProperty(property.id);
                btnFav.classList.toggle('active', nowSaved);
                const span = btnFav.querySelector('span');
                const heartSvg = btnFav.querySelector('svg');
                
                span.textContent = nowSaved ? 'Saved' : 'Save';
                if (heartSvg) {
                    heartSvg.style.fill = nowSaved ? 'white' : 'transparent';
                }
            });
        }
        
        // Description expand/collapse
        const btnDesc = document.getElementById('btn-desc-toggle');
        const descBox = document.getElementById('detail-desc-box');
        if (btnDesc && descBox) {
            btnDesc.addEventListener('click', () => {
                isDescriptionExpanded = !isDescriptionExpanded;
                descBox.textContent = isDescriptionExpanded ? property.description : property.description.substring(0, 260) + '...';
                
                const span = btnDesc.querySelector('span');
                span.textContent = isDescriptionExpanded ? 'Read Less' : 'Read More';
                
                const icon = btnDesc.querySelector('svg');
                if (icon) {
                    icon.innerHTML = isDescriptionExpanded ? 
                        `<polyline points="18 15 12 9 6 15"></polyline>` : 
                        `<polyline points="6 9 12 15 18 9"></polyline>`;
                }
            });
        }

        // Mortgage slider dynamic update
        if (property.type !== 'rent') {
            const slidePrice = document.getElementById('slide-price');
            const slideDeposit = document.getElementById('slide-deposit');
            const slideRate = document.getElementById('slide-rate');
            const slideTerm = document.getElementById('slide-term');
            
            const labelPrice = document.getElementById('label-price');
            const labelDeposit = document.getElementById('label-deposit');
            const labelRate = document.getElementById('label-rate');
            const labelTerm = document.getElementById('label-term');
            const mortgageResult = document.getElementById('mortgage-result');

            const recalculate = () => {
                mortgagePrice = Number(slidePrice.value);
                mortgageDeposit = Number(slideDeposit.value);
                mortgageRate = Number(slideRate.value);
                mortgageTerm = Number(slideTerm.value);

                // Deposit cannot be higher than price
                if (mortgageDeposit > mortgagePrice * 0.9) {
                    mortgageDeposit = Math.round(mortgagePrice * 0.9);
                    slideDeposit.value = mortgageDeposit;
                }
                slideDeposit.max = Math.round(mortgagePrice * 0.9);

                labelPrice.textContent = `$${mortgagePrice.toLocaleString()}`;
                labelDeposit.textContent = `$${mortgageDeposit.toLocaleString()}`;
                labelRate.textContent = `${mortgageRate}%`;
                labelTerm.textContent = `${mortgageTerm} years`;
                
                mortgageResult.textContent = `$${Number(calculateMonthlyMortgage()).toLocaleString()}/mo`;
            };

            [slidePrice, slideDeposit, slideRate, slideTerm].forEach(slider => {
                if (slider) slider.addEventListener('input', recalculate);
            });
        }

        // Lightbox events
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        const openLightbox = (index) => {
            lightboxOpen = true;
            lightboxIndex = index;
            modalImg.src = property.images[lightboxIndex];
            modal.style.display = 'flex';
        };

        const closeLightbox = () => {
            lightboxOpen = false;
            modal.style.display = 'none';
        };

        const showPrev = () => {
            lightboxIndex = (lightboxIndex - 1 + property.images.length) % property.images.length;
            modalImg.src = property.images[lightboxIndex];
        };

        const showNext = () => {
            lightboxIndex = (lightboxIndex + 1) % property.images.length;
            modalImg.src = property.images[lightboxIndex];
        };

        document.getElementById('gallery-main-click')?.addEventListener('click', () => openLightbox(0));
        document.getElementById('gallery-side-1')?.addEventListener('click', () => openLightbox(1 % property.images.length));
        document.getElementById('gallery-side-2')?.addEventListener('click', () => openLightbox(2 % property.images.length));
        document.getElementById('btn-gallery-overlay')?.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(0);
        });

        closeBtn?.addEventListener('click', closeLightbox);
        prevBtn?.addEventListener('click', showPrev);
        nextBtn?.addEventListener('click', showNext);

        // Close lightbox on click outside the image
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) closeLightbox();
        });

        // Key bindings for Lightbox (Left / Right / Esc)
        document.addEventListener('keydown', (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'Escape') closeLightbox();
        });

        // Contact agent form submit
        const contactForm = document.getElementById('agent-contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert(`Thank you for your enquiry. Your message has been sent to ${property.agent.name}. They will contact you shortly.`);
                contactForm.reset();
            });
        }
    }

    setTimeout(setupEventListeners, 0);

    return buildHtml();
}
