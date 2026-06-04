// Composants navbar et footer avec correction des chemins pour le dossier services/
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error(`Erreur chargement ${componentPath}: ${response.status}`);
        let html = await response.text();
        
        // Si on est dans le dossier services/, corriger les chemins des images et liens
        const path = window.location.pathname;
        const isInServicesFolder = path.includes('/services/');
        
        if (isInServicesFolder) {
            // Corriger les chemins des images dans la navbar et footer
            html = html.replace(/src="assets\//g, 'src="../assets/');
            html = html.replace(/url\('assets\//g, 'url(\'../assets/');
            
            // Corriger les liens href dans la navbar et footer
            // Pour les liens vers index.html, presentation.html, etc. (hors dossier services)
            html = html.replace(/href="index.html"/g, 'href="../index.html"');
            html = html.replace(/href="actualites\.html"/g, 'href="../actualites.html"');
            html = html.replace(/href="presentation.html"/g, 'href="../presentation.html"');
            html = html.replace(/href="mandataires.html"/g, 'href="../mandataires.html"');
            html = html.replace(/href="reglementations.html"/g, 'href="../reglementations.html"');
            html = html.replace(/href="services.html"/g, 'href="../services.html"');
            html = html.replace(/href="messagerie.html"/g, 'href="../messagerie.html"');
            
            // Pour les liens vers les pages services (déjà dans services/)
            html = html.replace(/href="services\//g, 'href="');
        }
        
        const element = document.getElementById(elementId);
        if (element) element.innerHTML = html;
        return true;
    } catch (error) {
        console.error('Erreur:', error);
        return false;
    }
}

async function loadAllComponents() {
    const path = window.location.pathname;
    const isInServicesFolder = path.includes('/services/');
    const basePath = isInServicesFolder ? '../' : '';
    
    console.log('Dossier services détecté:', isInServicesFolder);
    
    await loadComponent('navbar-placeholder', basePath + 'components/navbar.html');
    await loadComponent('footer-placeholder', basePath + 'components/footer.html');
    
    highlightActiveNavLink();
    initDarkModeToggle();
    fixLogoInServices();
}

function highlightActiveNavLink() {
    setTimeout(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else if (currentPage === 'index.html' && href === 'index.html') {
                link.classList.add('active');
            } else if (currentPage === 'mercuriales.html' && href === 'services/mercuriales.html') {
                link.classList.add('active');
            }
        });
    }, 100);
}

function initDarkModeToggle() {
    setTimeout(() => {
        const toggleBtn = document.querySelector('.dark-mode-toggle');
        if (!toggleBtn) return;
        
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            toggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }, 100);
}

function fixLogoInServices() {
    // Correction supplémentaire pour les logos dans le dossier services/
    const path = window.location.pathname;
    if (path.includes('/services/')) {
        const logos = document.querySelectorAll('.navbar-brand img, .footer-logo img');
        logos.forEach(logo => {
            const src = logo.getAttribute('src');
            if (src && src.startsWith('assets/')) {
                logo.setAttribute('src', '../' + src);
            }
        });
    }
}

// Attendre que le DOM soit chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}