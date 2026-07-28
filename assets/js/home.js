// assets/js/home.js - VERSION UNIQUEMENT API

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== COMPTEURS ANIMÉS =====
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 80;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    };
    
    const observerOptions = { threshold: 0.3, rootMargin: '0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
    
    // ===== CHARGEMENT DES ACTUALITÉS DEPUIS L'API =====
    const actualitesContainer = document.getElementById('actualites-container');
    if (actualitesContainer) {
        actualitesContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Chargement...</span>
                </div>
                <p class="mt-2 text-muted">Chargement des actualités...</p>
            </div>
        `;
        
        fetch('assets/php/api/data.php?module=actualites', { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Erreur chargement actualités');
                return response.json();
            })
            .then(actualites => {
                if (!actualites || actualites.length === 0) {
                    actualitesContainer.innerHTML = `
                        <div class="col-12 text-center">
                            <div class="alert alert-info">
                                <i class="fas fa-info-circle"></i> Aucune actualité disponible pour le moment.
                            </div>
                        </div>
                    `;
                    return;
                }
                
                const sortedActualites = [...actualites].sort((a, b) => {
                    const dateA = new Date(a.date.split('-').join('-'));
                    const dateB = new Date(b.date.split('-').join('-'));
                    return dateB - dateA;
                });
                
                const recentActualites = sortedActualites.slice(0, 6);
                
                const getTypeClass = (categorie) => {
                    const types = {
                        'evenement': 'info',
                        'communique': 'success',
                        'projet': 'primary',
                        'partenariat': 'warning',
                        'avis': 'danger'
                    };
                    return types[categorie] || 'info';
                };
                
                const getTypeLabel = (categorie) => {
                    const labels = {
                        'evenement': '📅 Événement',
                        'communique': '📢 Communiqué',
                        'projet': '🏗️ Projet',
                        'partenariat': '🤝 Partenariat',
                        'avis': '⚠️ Avis officiel'
                    };
                    return labels[categorie] || categorie;
                };
                
                actualitesContainer.innerHTML = recentActualites.map((actu, idx) => `
                    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${(idx + 1) * 50}">
                        <div class="actualite-card ${getTypeClass(actu.categorie)}">
                            <div class="actualite-badge ${getTypeClass(actu.categorie)}">${getTypeLabel(actu.categorie)}</div>
                            <div class="actualite-date">
                                <i class="far fa-calendar-alt"></i> ${new Date(actu.date).toLocaleDateString('fr-FR')}
                            </div>
                            <h3 class="actualite-titre">${actu.titre}</h3>
                            <p class="actualite-resume">${actu.description.substring(0, 120)}${actu.description.length > 120 ? '...' : ''}</p>
                            <div class="actualite-footer">
                                <button class="btn-actualite" onclick="window.openPostModal ? window.openPostModal(${actu.id}) : alert('Ouvrir actualité.');">
                                    <i class="fas fa-newspaper"></i> Lire l'article
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            })
            .catch(error => {
                console.error('Erreur:', error);
                actualitesContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-danger">
                            <i class="fas fa-exclamation-triangle"></i> Impossible de charger les actualités.
                        </div>
                    </div>
                `;
            });
    }
});