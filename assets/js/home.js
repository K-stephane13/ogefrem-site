// assets/js/home.js - VERSION COMPLÈTE AVEC SLIDER

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================================
    // 1. SLIDER D'ACTUALITÉS
    // ============================================================
    let sliderData = [];
    let currentSlideIndex = 0;
    let sliderInterval = null;
    const SLIDER_INTERVAL = 5000;
    
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderProgress = document.getElementById('sliderProgress');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    
    function getCategorieBadge(categorie) {
        const labels = {
            'evenement': 'Actualité',
            'communique': 'Communiqué',
            'projet': 'Projet',
            'partenariat': 'Partenariat',
            'avis': 'Avis'
        };
        return labels[categorie] || categorie;
    }
    
    function getCategorieClass(categorie) {
        const classes = {
            'evenement': 'actualite',
            'communique': 'communique',
            'projet': 'projet',
            'partenariat': 'partenariat',
            'avis': 'avis'
        };
        return classes[categorie] || 'actualite';
    }
    
    function loadSliderNews() {
        if (!sliderTrack) return;
        
        fetch('assets/php/api/data.php?module=actualites', { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Erreur chargement actualités');
                return response.json();
            })
            .then(actualites => {
                if (!actualites || actualites.length === 0) {
                    sliderTrack.innerHTML = `
                        <div class="news-slide active">
                            <a href="actualites.html">
                                <span class="slide-badge">Info</span>
                                <span class="slide-title">Aucune actualité disponible</span>
                            </a>
                        </div>
                    `;
                    return;
                }
                
                // Trier par date décroissante et prendre les 10 dernières
                const sorted = [...actualites].sort((a, b) => new Date(b.date) - new Date(a.date));
                sliderData = sorted.slice(0, 10);
                
                if (sliderData.length === 0) {
                    sliderTrack.innerHTML = `
                        <div class="news-slide active">
                            <a href="actualites.html">
                                <span class="slide-badge">Info</span>
                                <span class="slide-title">Aucune actualité disponible</span>
                            </a>
                        </div>
                    `;
                    return;
                }
                
                // Générer les slides
                sliderTrack.innerHTML = sliderData.map((item, index) => {
                    const date = new Date(item.date + 'T00:00:00');
                    const formattedDate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
                    const badgeText = getCategorieBadge(item.categorie);
                    const badgeClass = getCategorieClass(item.categorie);
                    
                    return `
                        <div class="news-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <a href="actualites.html#post-${item.id}">
                                <span class="slide-badge ${badgeClass}">${badgeText}</span>
                                <span class="slide-title">${item.titre}</span>
                                <span class="slide-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                            </a>
                        </div>
                    `;
                }).join('');
                
                currentSlideIndex = 0;
                startSlider();
            })
            .catch(error => {
                console.error('Erreur slider:', error);
                sliderTrack.innerHTML = `
                    <div class="news-slide active">
                        <a href="actualites.html">
                            <span class="slide-badge">⚠️</span>
                            <span class="slide-title">Impossible de charger les actualités</span>
                        </a>
                    </div>
                `;
            });
    }
    
    function goToSlide(index) {
        const slides = sliderTrack.querySelectorAll('.news-slide');
        if (!slides.length || index === currentSlideIndex) return;
        
        slides.forEach(s => s.classList.remove('active'));
        
        const targetIndex = ((index % slides.length) + slides.length) % slides.length;
        slides[targetIndex].classList.add('active');
        currentSlideIndex = targetIndex;
        
        resetProgressBar();
    }
    
    function nextSlide() {
        goToSlide(currentSlideIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlideIndex - 1);
    }
    
    function startSlider() {
        stopSlider();
        resetProgressBar();
        sliderInterval = setInterval(() => {
            nextSlide();
            resetProgressBar();
        }, SLIDER_INTERVAL);
    }
    
    function stopSlider() {
        if (sliderInterval) {
            clearInterval(sliderInterval);
            sliderInterval = null;
        }
    }
    
    function resetProgressBar() {
        if (sliderProgress) {
            sliderProgress.style.transition = 'none';
            sliderProgress.style.width = '0%';
            // Forcer un reflow
            sliderProgress.offsetHeight;
            sliderProgress.style.transition = 'width 4.8s linear';
            sliderProgress.style.width = '100%';
        }
    }
    
    // Contrôles du slider
    if (sliderPrev) {
        sliderPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            prevSlide();
            startSlider();
        });
    }
    
    if (sliderNext) {
        sliderNext.addEventListener('click', function(e) {
            e.stopPropagation();
            nextSlide();
            startSlider();
        });
    }
    
    // Pause au survol
    const sliderSection = document.getElementById('newsSlider');
    if (sliderSection) {
        sliderSection.addEventListener('mouseenter', stopSlider);
        sliderSection.addEventListener('mouseleave', startSlider);
        // Pour mobile
        sliderSection.addEventListener('touchstart', stopSlider);
        sliderSection.addEventListener('touchend', startSlider);
    }
    
    // Charger les actualités pour le slider
    loadSliderNews();
    
    // ============================================================
    // 2. COMPTEURS ANIMÉS
    // ============================================================
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
    
    // ============================================================
    // 3. CHARGEMENT DES ACTUALITÉS POUR LA SECTION NEWS
    // ============================================================
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
                        'evenement': '📰 Actualité',
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
                                <button class="btn-actualite" onclick="window.location.href='actualites.html#post-${actu.id}'">
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