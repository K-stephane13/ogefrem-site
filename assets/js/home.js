// assets/js/home.js - VERSION CORRIGÉE AVEC ORDRE: MINISTRE, PCA, DG, DGA
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
    
    // ===== CHARGEMENT DES STATISTIQUES DEPUIS ADMIN =====
    const stats = AdminData.getStatistiques();
    const statElements = document.querySelectorAll('.stat-number');
    if (statElements.length >= 4) {
        statElements[0].setAttribute('data-target', stats.anneeCreation);
        statElements[1].setAttribute('data-target', stats.ansExperience);
        statElements[2].setAttribute('data-target', stats.fretParAn);
        statElements[3].setAttribute('data-target', stats.partenaires);
    }
    
    // ===== CHARGEMENT DES SERVICES =====
    const servicesPreview = document.getElementById('servicesPreview');
    if (servicesPreview) {
        const services = AdminData.getServices();
        const servicesToShow = services.slice(0, 6);
        
        servicesPreview.innerHTML = servicesToShow.map(service => `
            <div class="col-md-4 col-sm-6">
                <a href="${service.lien}" class="service-mini-card">
                    <div class="service-mini-icon"><i class="fas ${service.icone}"></i></div>
                    <h4>${service.titre}</h4>
                    <p>${service.description.substring(0, 60)}${service.description.length > 60 ? '...' : ''}</p>
                </a>
            </div>
        `).join('');
    }
    
    // ===== CHARGEMENT DES LEADERS - ORDRE FORCÉ: MINISTRE, PCA, DG, DGA =====
    const leaders = AdminData.getLeaders();
    const leadersContainer = document.querySelector('.leaders-section .row');
    if (leadersContainer && leaders.length > 0) {
        // Définir l'ordre souhaité: Ministre, PCA, DG, DGA
        const ordreSouhaite = [
            { nom: "Ministre des Transports", titre: "Ministre des Transports" },
            { nom: "Président du CA", titre: "Président du Conseil d'Administration" },
            { nom: "Directeur Général", titre: "Directeur Général" },
            { nom: "Directeur Général Adjoint", titre: "Directeur Général Adjoint" }
        ];
        
        // Reconstruire le tableau dans l'ordre souhaité
        const leadersOrdonnes = [];
        for (const ordre of ordreSouhaite) {
            const leader = leaders.find(l => l.titre === ordre.titre);
            if (leader) {
                leadersOrdonnes.push(leader);
            }
        }
        
        // Ajouter les leaders qui ne sont pas dans l'ordre (au cas où)
        for (const leader of leaders) {
            if (!leadersOrdonnes.find(l => l.id === leader.id)) {
                leadersOrdonnes.push(leader);
            }
        }
        
        leadersContainer.innerHTML = leadersOrdonnes.map((leader, index) => `
            <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                <div class="leader-card-large">
                    <div class="leader-photo-large">
                        <img src="${leader.photo || 'https://placehold.co/300x300/003399/white?text=' + leader.nom.charAt(0)}" alt="${leader.nom}" onerror="this.src='https://placehold.co/300x300/003399/white?text=${leader.nom.charAt(0)}'">
                    </div>
                    <h4>${leader.nom}</h4>
                    <p class="leader-title">${leader.titre}</p>
                    <p class="leader-message">"${leader.message}"</p>
                </div>
            </div>
        `).join('');
    }
    
    // ===== CHARGEMENT DES PARTENAIRES =====
    const partenaires = AdminData.getPartenaires();
    const partnersGrid = document.querySelector('.partners-grid');
    if (partnersGrid && partenaires.length > 0) {
        partnersGrid.innerHTML = partenaires.map(partenaire => `
            <div class="partner-item">
                <div class="partner-logo">
                    <img src="${partenaire.logo}" alt="${partenaire.nom}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <span class="partner-fallback">${partenaire.nom}</span>
                </div>
                <span class="partner-name">${partenaire.nom}</span>
                <small>${partenaire.description || ''}</small>
            </div>
        `).join('');
    }
    
    // ===== CHARGEMENT DES ACTUALITÉS =====
    const actualitesContainer = document.getElementById('actualites-container');
    if (actualitesContainer) {
        const actualites = AdminData.getActualites();
        
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
        
        const html = recentActualites.map((actu, idx) => `
            <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${(idx + 1) * 50}">
                <div class="actualite-card ${getTypeClass(actu.categorie)}">
                    <div class="actualite-badge ${getTypeClass(actu.categorie)}">${getTypeLabel(actu.categorie)}</div>
                    <div class="actualite-date">
                        <i class="far fa-calendar-alt"></i> ${new Date(actu.date).toLocaleDateString('fr-FR')}
                    </div>
                    <h3 class="actualite-titre">${actu.titre}</h3>
                    <p class="actualite-resume">${actu.description.substring(0, 120)}${actu.description.length > 120 ? '...' : ''}</p>
                    <div class="actualite-footer">
                        <button class="btn-actualite" onclick="window.openPostModal ? window.openPostModal(${actu.id}) : alert('Ouvrir article complet')">
                            <i class="fas fa-newspaper"></i> Lire l'article
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        actualitesContainer.innerHTML = html;
    }
    
    // ===== MISE À JOUR DU MOT DU DG =====
    const leadersList = AdminData.getLeaders();
    const dg = leadersList.find(l => l.titre === "Directeur Général" || l.id === 1);
    if (dg) {
        const dgNameElement = document.querySelector('.dg-signature h4');
        const dgTitleElement = document.querySelector('.dg-signature p');
        const dgMessageElements = document.querySelectorAll('.mot-dg-content-large p');
        
        if (dgNameElement) dgNameElement.textContent = dg.nom;
        if (dgTitleElement) dgTitleElement.textContent = dg.titre;
        
        if (dgMessageElements.length >= 3 && dg.message) {
            const messages = dg.message.split('\n\n');
            dgMessageElements.forEach((el, idx) => {
                if (messages[idx]) {
                    el.textContent = messages[idx];
                }
            });
        }
    }
});