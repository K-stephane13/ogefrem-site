// Initialisation globale
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Close alert banner
    const closeAlert = document.querySelector('.close-alert');
    if (closeAlert) {
        closeAlert.addEventListener('click', function() {
            const banner = document.querySelector('.alert-banner');
            if (banner) banner.style.display = 'none';
        });
    }
});