export function renderFooter() {
    return `
        <footer class="footer-container">
            <div class="container footer">
                <div>
                    <div class="footer-logo">
                        realestate<span>.com.au</span>
                    </div>
                    <p class="footer-about">
                        realestate.com.au is Australia's No.1 property site. Providing the most comprehensive listings, market trends, and tools to help you on your property journey.
                    </p>
                </div>
                <div>
                    <h4 class="footer-links-title">Real Estate</h4>
                    <ul class="footer-links-list">
                        <li><a href="#/search?type=buy" class="footer-link">Buy Property</a></li>
                        <li><a href="#/search?type=rent" class="footer-link">Rent Property</a></li>
                        <li><a href="#/search?type=sold" class="footer-link">Sold Properties</a></li>
                        <li><a href="#/" class="footer-link">Find an Agent</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer-links-title">Resources</h4>
                    <ul class="footer-links-list">
                        <li><a href="#/" class="footer-link">Home Loans</a></li>
                        <li><a href="#/" class="footer-link">News & Advice</a></li>
                        <li><a href="#/" class="footer-link">Suburb Profiles</a></li>
                        <li><a href="#/" class="footer-link">Auction Results</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer-links-title">Company</h4>
                    <ul class="footer-links-list">
                        <li><a href="#/" class="footer-link">About REA Group</a></li>
                        <li><a href="#/" class="footer-link">Careers</a></li>
                        <li><a href="#/" class="footer-link">Advertise with us</a></li>
                        <li><a href="#/" class="footer-link">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div class="container footer-bottom">
                <p>&copy; ${new Date().getFullYear()} REA Group Ltd. Developed for demonstration purposes.</p>
                <div class="footer-socials">
                    <a href="#" class="footer-social-icon"><i data-lucide="facebook"></i></a>
                    <a href="#" class="footer-social-icon"><i data-lucide="twitter"></i></a>
                    <a href="#" class="footer-social-icon"><i data-lucide="instagram"></i></a>
                    <a href="#" class="footer-social-icon"><i data-lucide="linkedin"></i></a>
                </div>
            </div>
        </footer>
    `;
}
