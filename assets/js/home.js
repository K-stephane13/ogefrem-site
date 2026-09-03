// assets/js/home.js - VERSION COMPLÈTE AVEC LEADERS BILINGUES

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================================
    // FONCTIONS UTILITAIRES BILINGUES
    // ============================================================
    function getCurrentLang() {
        return localStorage.getItem('ogefrem_lang') || 'fr';
    }
    
    // === FONCTION POUR OBTENIR LA VALEUR TRADUITE ===
    function getTranslatedValue(item, fieldFr, fieldEn) {
        const lang = getCurrentLang();
        if (lang === 'en' && item[fieldEn] && item[fieldEn].trim() !== '') {
            return item[fieldEn];
        }
        return item[fieldFr];
    }

    const categoryMap = {
        fr: {
            evenement: 'Actualité',
            communique: 'Communiqué',
            projet: 'Projet',
            partenariat: 'Partenariat',
            avis: 'Avis'
        },
        en: {
            evenement: 'News',
            communique: 'Press Release',
            projet: 'Project',
            partenariat: 'Partnership',
            avis: 'Notice'
        }
    };

    function getCategorieLabel(categorie, lang) {
        const map = categoryMap[lang] || categoryMap.fr;
        return map[categorie] || categorie;
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

    // ============================================================
    // 1. SLIDER D'ACTUALITÉS (BILINGUE)
    // ============================================================
    let sliderData = [];
    let currentSlideIndex = 0;
    let sliderInterval = null;
    const SLIDER_INTERVAL = 5000;
    
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderProgress = document.getElementById('sliderProgress');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    
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
                
                const lang = getCurrentLang();
                
                sliderTrack.innerHTML = sliderData.map((item, index) => {
                    const date = new Date(item.date + 'T00:00:00');
                    const formattedDate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
                    const badgeText = getCategorieLabel(item.categorie, lang);
                    const badgeClass = getCategorieClass(item.categorie);
                    const title = getTranslatedValue(item, 'titre', 'titre_en');
                    
                    return `
                        <div class="news-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <a href="actualites.html#post-${item.id}">
                                <span class="slide-badge ${badgeClass}">${badgeText}</span>
                                <span class="slide-title">${title}</span>
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

    // Réécouter les changements de langue pour le slider
    document.addEventListener('languageChanged', function() {
        loadSliderNews();
    });
    
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
    
    const sliderSection = document.getElementById('newsSlider');
    if (sliderSection) {
        sliderSection.addEventListener('mouseenter', stopSlider);
        sliderSection.addEventListener('mouseleave', startSlider);
        sliderSection.addEventListener('touchstart', stopSlider);
        sliderSection.addEventListener('touchend', startSlider);
    }
    
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
    function loadHomeNews() {
        const actualitesContainer = document.getElementById('actualites-container');
        if (!actualitesContainer) return;
        
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
                
                const lang = getCurrentLang();
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
                        fr: {
                            evenement: '📰 Actualité',
                            communique: '📢 Communiqué',
                            projet: '🏗️ Projet',
                            partenariat: '🤝 Partenariat',
                            avis: '⚠️ Avis officiel'
                        },
                        en: {
                            evenement: '📰 News',
                            communique: '📢 Press Release',
                            projet: '🏗️ Project',
                            partenariat: '🤝 Partnership',
                            avis: '⚠️ Official Notice'
                        }
                    };
                    return (labels[lang] || labels.fr)[categorie] || categorie;
                };
                
                actualitesContainer.innerHTML = recentActualites.map((actu, idx) => {
                    const title = getTranslatedValue(actu, 'titre', 'titre_en');
                    const description = getTranslatedValue(actu, 'description', 'description_en');
                    const typeLabel = getTypeLabel(actu.categorie);
                    const typeClass = getTypeClass(actu.categorie);
                    const readMore = lang === 'fr' ? 'Lire l\'article' : 'Read article';
                    
                    return `
                        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${(idx + 1) * 50}">
                            <div class="actualite-card ${typeClass}">
                                <div class="actualite-badge ${typeClass}">${typeLabel}</div>
                                <div class="actualite-date">
                                    <i class="far fa-calendar-alt"></i> ${new Date(actu.date).toLocaleDateString('fr-FR')}
                                </div>
                                <h3 class="actualite-titre">${title}</h3>
                                <p class="actualite-resume">${description.substring(0, 120)}${description.length > 120 ? '...' : ''}</p>
                                <div class="actualite-footer">
                                    <button class="btn-actualite" onclick="window.location.href='actualites.html#post-${actu.id}'">
                                        <i class="fas fa-newspaper"></i> ${readMore}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
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
    
    loadHomeNews();
    
    // ============================================================
    // 4. CHARGEMENT DES LEADERS (MINISTRE, COMITÉ, CONSEIL) - BILINGUE
    // ============================================================
    async function loadLeaders() {
        const container = document.getElementById('leadersContainer');
        if (!container) return;

        try {
            // Charger le comité
            const comiteResponse = await fetch('assets/php/api/data.php?module=comite', { cache: 'no-store' });
            let comite = [];
            if (comiteResponse.ok) {
                comite = await comiteResponse.json();
            }

            // Charger le conseil
            const conseilResponse = await fetch('assets/php/api/data.php?module=conseil', { cache: 'no-store' });
            let conseil = [];
            if (conseilResponse.ok) {
                conseil = await conseilResponse.json();
            }

            // Charger le ministre
            const ministreResponse = await fetch('assets/php/api/data.php?module=ministre', { cache: 'no-store' });
            let ministre = null;
            if (ministreResponse.ok) {
                ministre = await ministreResponse.json();
            }

            const dg = comite.find(m => m.titre === 'Directeur Général');
            const dga = comite.find(m => m.titre === 'Directeur Général Adjoint');
            const pca = conseil.find(m => m.titre === 'Président du Conseil d\'Administration');

            // Mettre à jour la photo du DG
            if (dg) {
                const dgPhoto = document.querySelector('#dgPhotoContainer img');
                if (dgPhoto) {
                    const hasPhoto = dg.has_photo === true || dg.has_photo === 1;
                    if (hasPhoto && dg.photo_url) {
                        dgPhoto.src = dg.photo_url;
                        dgPhoto.style.display = 'block';
                    } else {
                        dgPhoto.style.display = 'none';
                        let iconDiv = dgPhoto.parentElement.querySelector('.dg-icon-fallback');
                        if (!iconDiv) {
                            iconDiv = document.createElement('div');
                            iconDiv.className = 'dg-icon-fallback';
                            iconDiv.style.cssText = 'width:100%;height:100%;background:linear-gradient(135deg,#003399,#0066CC);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);font-size:5rem;';
                            iconDiv.innerHTML = '<i class="fas fa-user-circle"></i>';
                            dgPhoto.parentElement.appendChild(iconDiv);
                        }
                        iconDiv.style.display = 'flex';
                    }
                }

                const dgName = document.getElementById('dgName');
                if (dgName) dgName.textContent = dg.nom;

                const dgTitle = document.getElementById('dgTitle');
                if (dgTitle) dgTitle.textContent = dg.titre + ' de l\'OGEFREM';

                const dgSignature = document.getElementById('dgSignature');
                if (dgSignature) dgSignature.textContent = 'Le ' + dg.titre;
            }

            // === CONSTRUIRE LA LISTE DES LEADERS AVEC TRADUCTION ===
            const lang = getCurrentLang();
            
            const leaders = [
                ministre ? {
                    nom: ministre.nom || 'Ministre des Transports',
                    titre: ministre.titre || 'Ministre des Transports',
                    has_photo: ministre.has_photo === true || ministre.has_photo === 1,
                    photo_url: ministre.has_photo ? ministre.photo_url : null,
                    // === UTILISATION DE getTranslatedValue POUR LE MESSAGE ===
                    message: getTranslatedValue(ministre, 'message', 'message_en') || 'Partenariat stratégique avec l\'OGEFREM'
                } : {
                    nom: 'Ministre des Transports',
                    titre: 'Ministre des Transports',
                    has_photo: false,
                    photo_url: null,
                    message: 'Partenariat stratégique avec l\'OGEFREM'
                },
                pca ? {
                    nom: pca.nom,
                    titre: pca.titre,
                    has_photo: pca.has_photo === true || pca.has_photo === 1,
                    photo_url: pca.has_photo ? pca.photo_url : null,
                    message: getTranslatedValue(pca, 'message', 'message_en') || 'Une gouvernance transparente et efficace'
                } : {
                    nom: 'Président du CA',
                    titre: 'Président du Conseil d\'Administration',
                    has_photo: false,
                    photo_url: null,
                    message: 'Une gouvernance transparente et efficace'
                },
                dg ? {
                    nom: dg.nom,
                    titre: dg.titre,
                    has_photo: dg.has_photo === true || dg.has_photo === 1,
                    photo_url: dg.has_photo ? dg.photo_url : null,
                    message: getTranslatedValue(dg, 'message', 'message_en') || 'Moderniser le fret congolais pour une meilleure compétitivité'
                } : {
                    nom: 'Directeur Général',
                    titre: 'Directeur Général',
                    has_photo: false,
                    photo_url: null,
                    message: 'Moderniser le fret congolais pour une meilleure compétitivité'
                },
                dga ? {
                    nom: dga.nom,
                    titre: dga.titre,
                    has_photo: dga.has_photo === true || dga.has_photo === 1,
                    photo_url: dga.has_photo ? dga.photo_url : null,
                    message: getTranslatedValue(dga, 'message', 'message_en') || 'L\'innovation au service des chargeurs'
                } : {
                    nom: 'Directeur Général Adjoint',
                    titre: 'Directeur Général Adjoint',
                    has_photo: false,
                    photo_url: null,
                    message: 'L\'innovation au service des chargeurs'
                }
            ];

            container.innerHTML = leaders.map((leader, index) => {
                const hasPhoto = leader.has_photo === true || leader.has_photo === 1;
                const photoUrl = hasPhoto ? leader.photo_url : null;
                
                let iconClass = 'fa-user-circle';
                const titreLower = (leader.titre || '').toLowerCase();
                if (titreLower.includes('ministre')) iconClass = 'fa-user-tie';
                else if (titreLower.includes('président')) iconClass = 'fa-user-tie';
                else if (titreLower.includes('directeur général')) iconClass = 'fa-user-circle';
                
                let photoHTML = '';
                if (hasPhoto && photoUrl) {
                    photoHTML = `
                        <img src="${photoUrl}" alt="${leader.nom}" 
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div style="display:none;width:100%;height:100%;background:linear-gradient(135deg,#003399,#0066CC);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);font-size:4rem;">
                            <i class="fas ${iconClass}"></i>
                        </div>
                    `;
                } else {
                    photoHTML = `
                        <div style="width:100%;height:100%;background:linear-gradient(135deg,#003399,#0066CC);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);font-size:4rem;">
                            <i class="fas ${iconClass}"></i>
                        </div>
                    `;
                }

                return `
                    <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                        <div class="leader-card-large">
                            <div class="leader-photo-large">
                                ${photoHTML}
                            </div>
                            <h4>${leader.nom}</h4>
                            <p class="leader-title">${leader.titre}</p>
                            <p class="leader-message">"${leader.message || ''}"</p>
                        </div>
                    </div>
                `;
            }).join('');

        } catch (error) {
            console.error('Erreur chargement leaders:', error);
            // Fallback avec fallback bilingue
            const lang = getCurrentLang();
            const defaultMessages = lang === 'fr' 
                ? {
                    ministre: 'Partenariat stratégique avec l\'OGEFREM',
                    pca: 'Une gouvernance transparente et efficace',
                    dg: 'Moderniser le fret congolais pour une meilleure compétitivité',
                    dga: 'L\'innovation au service des chargeurs'
                }
                : {
                    ministre: 'Strategic partnership with OGEFREM',
                    pca: 'A transparent and effective governance',
                    dg: 'Modernize Congolese freight for better competitiveness',
                    dga: 'Innovation for shippers'
                };
            
            container.innerHTML = `
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="leader-card-large">
                        <div class="leader-photo-large">
                            <div style="width:100%;height:100%;background:linear-gradient(135deg,#003399,#0066CC);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);font-size:4rem;"><i class="fas fa-user-tie"></i></div>
                        </div>
                        <h4>Ministre des Transports</h4>
                        <p class="leader-title">Ministre des Transports</p>
                        <p class="leader-message">"${defaultMessages.ministre}"</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="leader-card-large">
                        <div class="leader-photo-large">
                            <div style="width:100%;height:100%;background:linear-gradient(135deg,#003399,#0066CC);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);font-size:4rem;"><i class="fas fa-user-tie"></i></div>
                        </div>
                        <h4>Président du CA</h4>
                        <p class="leader-title">Président du Conseil d'Administration</p>
                        <p class="leader-message">"${defaultMessages.pca}"</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="leader-card-large">
                        <div class="leader-photo-large">
                            <div style="width:100%;height:100%;background:linear-gradient(135deg,#003399,#0066CC);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);font-size:4rem;"><i class="fas fa-user-circle"></i></div>
                        </div>
                        <h4>Directeur Général</h4>
                        <p class="leader-title">Directeur Général</p>
                        <p class="leader-message">"${defaultMessages.dg}"</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
                    <div class="leader-card-large">
                        <div class="leader-photo-large">
                            <div style="width:100%;height:100%;background:linear-gradient(135deg,#003399,#0066CC);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);font-size:4rem;"><i class="fas fa-user-circle"></i></div>
                        </div>
                        <h4>Directeur Général Adjoint</h4>
                        <p class="leader-title">Directeur Général Adjoint</p>
                        <p class="leader-message">"${defaultMessages.dga}"</p>
                    </div>
                </div>
            `;
        }
    }

    // Charger les leaders
    loadLeaders();

    // ============================================================
    // 5. ÉCOUTER LES CHANGEMENTS DE LANGUE POUR LES LEADERS
    // ============================================================
    document.addEventListener('languageChanged', function(e) {
        console.log('Home - Langue changée en:', e.detail.lang);
        loadHomeNews();
        loadSliderNews();
        loadLeaders(); // Recharger les leaders avec la nouvelle langue
    });
    
    // ============================================================
    // 6. SURVEILLER AUSSI localStorage
    // ============================================================
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (key === 'ogefrem_lang') {
            console.log('Home - Langue changée via localStorage:', value);
            loadHomeNews();
            loadSliderNews();
            loadLeaders();
        }
    };
});