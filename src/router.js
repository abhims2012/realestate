import { renderHome } from './pages/Home.js';
import { renderSearch } from './pages/Search.js';
import { renderPropertyDetail } from './pages/PropertyDetail.js';
import { renderSaved } from './pages/Saved.js';

export function handleRoute() {
    const rawHash = window.location.hash || '#/';
    
    // Split hash path and query params
    const qIndex = rawHash.indexOf('?');
    const pathPart = qIndex !== -1 ? rawHash.substring(1, qIndex) : rawHash.substring(1);
    const queryPart = qIndex !== -1 ? rawHash.substring(qIndex + 1) : '';
    
    // Parse query params
    const queryParams = {};
    if (queryPart) {
        const urlParams = new URLSearchParams(queryPart);
        for (const [key, val] of urlParams.entries()) {
            queryParams[key] = val;
        }
    }
    
    // Match route
    let contentHtml = '';
    
    if (pathPart === '/' || pathPart === '') {
        contentHtml = renderHome();
    } else if (pathPart === '/search') {
        contentHtml = renderSearch(queryParams);
    } else if (pathPart.startsWith('/property/')) {
        const id = pathPart.split('/')[2];
        contentHtml = renderPropertyDetail({ id });
    } else if (pathPart === '/saved') {
        contentHtml = renderSaved();
    } else {
        contentHtml = `
            <div class="container" style="padding: 80px 20px; text-align: center;">
                <h2>404 Page Not Found</h2>
                <p>Sorry, the page you requested does not exist.</p>
                <a href="#/" class="btn-back-home" style="margin-top: 20px;">Return Home</a>
            </div>
        `;
    }
    
    return contentHtml;
}
