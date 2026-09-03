// assets/js/components.js - Version complète avec gestion de langue

// ============================================================
// CHARGEMENT DES COMPOSANTS (NAVBAR & FOOTER)
// ============================================================
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
        if (element) {
            element.innerHTML = html;
            
            // Si c'est la navbar, réinitialiser la langue après chargement
            if (elementId === 'navbar-placeholder') {
                setTimeout(function() {
                    initNavbarLanguage();
                }, 50);
            }
        }
        return true;
    } catch (error) {
        console.error('Erreur chargement composant:', error);
        return false;
    }
}

// ============================================================
// CHARGEMENT DE TOUS LES COMPOSANTS
// ============================================================
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
    
    // Initialiser la langue après chargement des composants
    setTimeout(function() {
        initNavbarLanguage();
    }, 100);
}

// ============================================================
// GESTION DE LA LANGUE
// ============================================================
function setLanguage(lang) {
    // Sauvegarder dans localStorage
    localStorage.setItem('ogefrem_lang', lang);
    
    // Mettre à jour les boutons actifs dans la navbar
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Mettre à jour tous les éléments avec data-fr et data-en
    document.querySelectorAll('[data-fr][data-en]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.fr) {
            el.textContent = el.dataset.fr;
        } else if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });
    
    // Mettre à jour les placeholders des inputs
    document.querySelectorAll('input[data-fr-placeholder][data-en-placeholder]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.frPlaceholder) {
            el.placeholder = el.dataset.frPlaceholder;
        } else if (lang === 'en' && el.dataset.enPlaceholder) {
            el.placeholder = el.dataset.enPlaceholder;
        }
    });
    
    // Mettre à jour les placeholders des textarea
    document.querySelectorAll('textarea[data-fr-placeholder][data-en-placeholder]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.frPlaceholder) {
            el.placeholder = el.dataset.frPlaceholder;
        } else if (lang === 'en' && el.dataset.enPlaceholder) {
            el.placeholder = el.dataset.enPlaceholder;
        }
    });
    
    // Mettre à jour les dropdown items
    document.querySelectorAll('.dropdown-item[data-fr][data-en]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.fr) {
            el.textContent = el.dataset.fr;
        } else if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });
    
    // Mettre à jour les dropdown toggle
    document.querySelectorAll('.dropdown-toggle[data-fr][data-en]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.fr) {
            el.textContent = el.dataset.fr;
        } else if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });
    
    // Mettre à jour le footer
    document.querySelectorAll('.footer [data-fr][data-en]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.fr) {
            el.textContent = el.dataset.fr;
        } else if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });
    
    // ============================================================
    // DÉCLENCHER L'ÉVÉNEMENT languageChanged POUR TOUS LES SCRIPTS
    // ============================================================
    document.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { lang: lang } 
    }));
    
    console.log('🌐 Langue changée:', lang);
}

function initNavbarLanguage() {
    var currentLang = localStorage.getItem('ogefrem_lang') || 'fr';
    
    // Ajouter les écouteurs sur les boutons de langue
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        // Supprimer les anciens écouteurs pour éviter les doublons
        btn.removeEventListener('click', function() {});
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var lang = this.dataset.lang;
            setLanguage(lang);
        });
    });
    
    // Appliquer la langue actuelle
    setLanguage(currentLang);
}

// ============================================================
// SURVEILLANCE DES CHANGEMENTS DE LANGUE (COMPATIBILITÉ)
// ============================================================
// Écouter les événements pour les pages qui ne réagissent pas
document.addEventListener('languageChanged', function(e) {
    var lang = e.detail.lang;
    
    // Mettre à jour le footer (déjà fait dans setLanguage, mais pour sécurité)
    document.querySelectorAll('.footer [data-fr][data-en]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.fr) {
            el.textContent = el.dataset.fr;
        } else if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });
    
    // Mettre à jour les dropdown items (déjà fait dans setLanguage)
    document.querySelectorAll('.dropdown-item[data-fr][data-en]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.fr) {
            el.textContent = el.dataset.fr;
        } else if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });
    
    // Mettre à jour les dropdown toggle
    document.querySelectorAll('.dropdown-toggle[data-fr][data-en]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.fr) {
            el.textContent = el.dataset.fr;
        } else if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });
    
    // Mettre à jour les boutons de filtre
    document.querySelectorAll('.filter-active-btn[data-fr][data-en]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.fr) {
            el.textContent = el.dataset.fr;
        } else if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });
    
    // Mettre à jour les boutons "Toutes" / "All"
    document.querySelectorAll('.filter-btn[data-fr][data-en]').forEach(function(el) {
        if (lang === 'fr' && el.dataset.fr) {
            el.textContent = el.dataset.fr;
        } else if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });
});

// ============================================================
// SURVEILLANCE DE localStorage POUR DÉTECTER LES CHANGEMENTS
// ============================================================
// Permet de détecter les changements de langue depuis d'autres onglets
window.addEventListener('storage', function(e) {
    if (e.key === 'ogefrem_lang' && e.newValue) {
        console.log('🌐 Langue changée depuis un autre onglet:', e.newValue);
        setLanguage(e.newValue);
    }
});

// ============================================================
// AUTRES FONCTIONS
// ============================================================
function highlightActiveNavLink() {
    setTimeout(function() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
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
    setTimeout(function() {
        const toggleBtn = document.querySelector('.dark-mode-toggle');
        if (!toggleBtn) return;
        
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        toggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            toggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }, 100);
}

function fixLogoInServices() {
    const path = window.location.pathname;
    if (path.includes('/services/')) {
        const logos = document.querySelectorAll('.navbar-brand img, .footer-logo img');
        logos.forEach(function(logo) {
            const src = logo.getAttribute('src');
            if (src && src.startsWith('assets/')) {
                logo.setAttribute('src', '../' + src);
            }
        });
    }
}

// ============================================================
// INITIALISATION
// ============================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}

// Exposer la fonction setLanguage globalement pour une utilisation dans d'autres scripts
window.setLanguage = setLanguage;

console.log('✅ components.js chargé avec succès');