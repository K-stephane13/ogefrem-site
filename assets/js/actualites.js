// assets/js/actualites.js - VERSION BILINGUE COMPLÈTE

let currentPage = 1;
const itemsPerPage = 9;
let currentFilter = 'all';
let actualitesData = [];
const ACTUALITES_API = 'assets/php/api/data.php?module=actualites';

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

// ============================================================
// CATÉGORIES BILINGUES
// ============================================================
const categoryMap = {
    fr: {
        evenement: 'Actualité',
        communique: 'Communiqué',
        projet: 'Projet',
        partenariat: 'Partenariat',
        avis: 'Avis officiel'
    },
    en: {
        evenement: 'News',
        communique: 'Press Release',
        projet: 'Project',
        partenariat: 'Partnership',
        avis: 'Official Notice'
    }
};

function getCategorieLabel(categorie, lang) {
    const map = categoryMap[lang] || categoryMap.fr;
    return map[categorie] || categorie;
}

// ============================================================
// RÉCUPÉRATION DE LA LANGUE ACTUELLE
// ============================================================
function getCurrentLang() {
    return localStorage.getItem('ogefrem_lang') || 'fr';
}

// ============================================================
// FONCTION POUR OBTENIR LA VALEUR TRADUITE
// ============================================================
function getTranslatedValue(item, fieldFr, fieldEn) {
    const lang = getCurrentLang();
    if (lang === 'en' && item[fieldEn]) {
        return item[fieldEn];
    }
    return item[fieldFr];
}

function imageUrl(image) {
    return image?.url || '';
}

// ============================================================
// LIKES AVEC PERSISTANCE
// ============================================================
async function registerLike(postId, button) {
    if (button.disabled) return;
    button.disabled = true;
    
    try {
        const response = await fetch(`${ACTUALITES_API}&action=like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: postId })
        });
        const result = await response.json();
        
        if (!response.ok) {
            if (result.already_liked) {
                localStorage.setItem(`post_liked_${postId}`, 'true');
                button.classList.add('liked');
                const countSpan = button.querySelector('.like-count');
                if (countSpan) {
                    const currentCount = parseInt(countSpan.textContent) || 0;
                    countSpan.textContent = currentCount;
                }
                showToast('Vous avez déjà liké cette actualité', 'info');
                return;
            }
            throw new Error(result.message || 'Impossible d\'enregistrer le like.');
        }
        
        localStorage.setItem(`post_liked_${postId}`, 'true');
        
        const post = actualitesData.find(p => Number(p.id) === Number(postId));
        if (post) post.likes = result.likes;
        
        document.querySelectorAll(`[data-id="${postId}"] .like-count, .like-btn-modal[data-id="${postId}"] .like-count`)
            .forEach(span => span.textContent = result.likes);
        button.classList.add('liked');
        
    } catch (error) {
        console.error(error);
        showToast(error.message, 'error');
    } finally {
        button.disabled = false;
    }
}

function initLikeButtons() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        const postId = Number(btn.dataset.id);
        if (localStorage.getItem(`post_liked_${postId}`) === 'true') {
            btn.classList.add('liked');
        }
        btn.addEventListener('click', e => {
            e.stopPropagation();
            registerLike(postId, btn);
        });
    });
}

// ============================================================
// CHARGEMENT DES ACTUALITÉS
// ============================================================
async function loadActualitesData() {
    const container = document.getElementById('actualitesGrid');
    if (!container) return;
    
    container.innerHTML = `
        <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Chargement...</span>
            </div>
            <p class="mt-2 text-muted">Chargement des actualités...</p>
        </div>
    `;
    
    try {
        const response = await fetch(ACTUALITES_API, { cache: 'no-store' });
        if (!response.ok) throw new Error('Impossible de charger les actualités.');
        actualitesData = await response.json();
        
        if (!actualitesData || actualitesData.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> Aucune actualité disponible pour le moment.
                    </div>
                </div>
            `;
            renderPagination(0);
            return;
        }
        
        actualitesData.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderActualites();
    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i> ${escapeHtml(error.message)}
                </div>
            </div>
        `;
    }
}

// ============================================================
// AFFICHAGE DES ACTUALITÉS (BILINGUE)
// ============================================================
function renderActualites() {
    const lang = getCurrentLang();
    
    let filtered = currentFilter === 'all'
        ? [...actualitesData]
        : actualitesData.filter(a => a.categorie === currentFilter);

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (totalPages > 0 && currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filtered.slice(start, start + itemsPerPage);
    const container = document.getElementById('actualitesGrid');
    if (!container) return;

    if (!paginatedItems.length) {
        container.innerHTML = '<div class="col-12"><div class="alert alert-info">Aucune actualité disponible.</div></div>';
        renderPagination(0);
        return;
    }

    container.innerHTML = paginatedItems.map(post => {
        // === UTILISATION DE getTranslatedValue POUR CHAQUE CHAMP ===
        const title = getTranslatedValue(post, 'titre', 'titre_en');
        const description = getTranslatedValue(post, 'description', 'description_en');
        const category = getCategorieLabel(post.categorie, lang);
        
        const images = Array.isArray(post.images) ? post.images : [];
        const imageCount = images.length;
        const isLiked = localStorage.getItem(`post_liked_${post.id}`) === 'true';
        
        return `
            <div class="col-md-6 col-lg-4 actualite-post" data-categorie="${escapeHtml(post.categorie)}">
                <div class="actualite-post-card" data-id="${post.id}">
                    ${imageCount > 0 ? `
                        <div class="post-images ${imageCount > 1 ? 'has-carousel' : ''}">
                            <div class="image-carousel">
                                ${images.map((img, idx) => `
                                    <div class="carousel-slide ${idx === 0 ? 'active' : ''}">
                                        <img src="${escapeHtml(imageUrl(img))}" alt="${escapeHtml(title)}">
                                    </div>
                                `).join('')}
                            </div>
                            ${imageCount > 1 ? `
                                <button class="carousel-prev" type="button"><i class="fas fa-chevron-left"></i></button>
                                <button class="carousel-next" type="button"><i class="fas fa-chevron-right"></i></button>
                                <div class="carousel-dots">
                                    ${images.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
                                </div>` : ''}
                        </div>` : `
                        <div class="post-images" style="background:linear-gradient(135deg,#003399,#0066CC);display:flex;align-items:center;justify-content:center;">
                            <i class="fas fa-newspaper" style="font-size:3rem;color:white;"></i>
                        </div>`}

                    <div class="post-content">
                        <div class="post-header">
                            <span class="post-categorie ${escapeHtml(post.categorie)}">${escapeHtml(category)}</span>
                            <span class="post-date"><i class="far fa-calendar-alt"></i> ${new Date(post.date + 'T00:00:00').toLocaleDateString('fr-FR')}</span>
                        </div>
                        <h3 class="post-title">${escapeHtml(title)}</h3>
                        <p class="post-description">${escapeHtml(description.substring(0, 120))}${description.length > 120 ? '...' : ''}</p>
                        <div class="post-actions">
                            <button class="like-btn ${isLiked ? 'liked' : ''}" type="button" data-id="${post.id}">
                                <i class="fas fa-heart"></i>
                                <span class="like-count">${Number(post.likes) || 0}</span>
                            </button>
                            <div class="social-share">
                                ${post.facebookUrl ? `<a href="${escapeHtml(post.facebookUrl)}" target="_blank" rel="noopener" class="social-icon facebook"><i class="fab fa-facebook-f"></i></a>` : ''}
                                ${post.instagramUrl ? `<a href="${escapeHtml(post.instagramUrl)}" target="_blank" rel="noopener" class="social-icon instagram"><i class="fab fa-instagram"></i></a>` : ''}
                                ${post.twitterUrl ? `<a href="${escapeHtml(post.twitterUrl)}" target="_blank" rel="noopener" class="social-icon twitter"><i class="fab fa-twitter"></i></a>` : ''}
                            </div>
                        </div>
                        <button class="btn-read-more" type="button" onclick="openPostModal(${post.id})">
                            ${lang === 'fr' ? 'Lire la suite' : 'Read more'} <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>`;
    }).join('');

    initCarousels();
    initLikeButtons();
    renderPagination(totalPages);
}

// ============================================================
// CARROUSEL
// ============================================================
function initCarousels() {
    document.querySelectorAll('.actualite-post-card .has-carousel').forEach(carouselContainer => {
        const card = carouselContainer.closest('.actualite-post-card');
        const slides = card.querySelectorAll('.carousel-slide');
        const dots = card.querySelectorAll('.dot');
        let currentIndex = 0;

        const showSlide = index => {
            slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            currentIndex = index;
        };

        card.querySelector('.carousel-prev')?.addEventListener('click', e => {
            e.stopPropagation();
            showSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
        });
        card.querySelector('.carousel-next')?.addEventListener('click', e => {
            e.stopPropagation();
            showSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
        });
        dots.forEach((dot, i) => dot.addEventListener('click', e => {
            e.stopPropagation();
            showSlide(i);
        }));
    });
}

// ============================================================
// PAGINATION
// ============================================================
function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    const lang = getCurrentLang();
    const prevText = lang === 'fr' ? '« Précédent' : '« Previous';
    const nextText = lang === 'fr' ? 'Suivant »' : 'Next »';

    let html = `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><button class="page-link" data-page="${currentPage - 1}">${prevText}</button></li>`;
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<li class="page-item ${currentPage === i ? 'active' : ''}"><button class="page-link" data-page="${i}">${i}</button></li>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }
    html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><button class="page-link" data-page="${currentPage + 1}">${nextText}</button></li>`;
    paginationContainer.innerHTML = html;

    paginationContainer.querySelectorAll('.page-link[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = Number(btn.dataset.page);
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderActualites();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// ============================================================
// FILTRES
// ============================================================
document.querySelectorAll('.filter-active-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-active-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        currentPage = 1;
        renderActualites();
    });
});

// ============================================================
// MODAL (BILINGUE)
// ============================================================
window.openPostModal = function(postId) {
    const lang = getCurrentLang();
    const post = actualitesData.find(p => Number(p.id) === Number(postId));
    if (!post) return;
    
    // === UTILISATION DE getTranslatedValue ===
    const title = getTranslatedValue(post, 'titre', 'titre_en');
    const description = getTranslatedValue(post, 'description', 'description_en');
    const category = getCategorieLabel(post.categorie, lang);
    const images = Array.isArray(post.images) ? post.images : [];
    const isLiked = localStorage.getItem(`post_liked_${post.id}`) === 'true';

    document.getElementById('postModal')?.remove();
    document.body.insertAdjacentHTML('beforeend', `
        <div class="modal fade" id="postModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${escapeHtml(title)}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${images.length ? `<div class="modal-images">${images.map(img => `<img src="${escapeHtml(imageUrl(img))}" alt="${escapeHtml(title)}">`).join('')}</div>` : ''}
                    <div class="modal-info">
                        <span class="post-categorie ${escapeHtml(post.categorie)}">${escapeHtml(category)}</span>
                        <span class="post-date"><i class="far fa-calendar-alt"></i> ${new Date(post.date + 'T00:00:00').toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div class="modal-description">${description.split(/\r?\n/).filter(Boolean).map(p => `<p>${escapeHtml(p)}</p>`).join('')}</div>
                    <div class="modal-actions">
                        <button class="like-btn-modal ${isLiked ? 'liked' : ''}" type="button" data-id="${post.id}">
                            <i class="fas fa-heart"></i> <span class="like-count">${Number(post.likes) || 0}</span>
                        </button>
                        <div class="social-share-modal">
                            ${post.facebookUrl ? `<a href="${escapeHtml(post.facebookUrl)}" target="_blank" rel="noopener" class="social-icon facebook"><i class="fab fa-facebook-f"></i></a>` : ''}
                            ${post.instagramUrl ? `<a href="${escapeHtml(post.instagramUrl)}" target="_blank" rel="noopener" class="social-icon instagram"><i class="fab fa-instagram"></i></a>` : ''}
                            ${post.twitterUrl ? `<a href="${escapeHtml(post.twitterUrl)}" target="_blank" rel="noopener" class="social-icon twitter"><i class="fab fa-twitter"></i></a>` : ''}
                        </div>
                    </div>
                </div>
            </div></div>
        </div>`);

    const modalElement = document.getElementById('postModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
    const likeButton = modalElement.querySelector('.like-btn-modal');
    likeButton.addEventListener('click', () => registerLike(post.id, likeButton));
    
    modalElement.addEventListener('hidden.bs.modal', () => modalElement.remove());
};

// ============================================================
// TOAST
// ============================================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) {
        const div = document.createElement('div');
        div.id = 'toast';
        div.className = 'toast-notification';
        document.body.appendChild(div);
    }
    const toastEl = document.getElementById('toast');
    toastEl.textContent = message;
    toastEl.className = `toast-notification toast-${type}`;
    toastEl.style.display = 'block';
    clearTimeout(toastEl._timeout);
    toastEl._timeout = setTimeout(() => { toastEl.style.display = 'none'; }, 3500);
}

// ============================================================
// INITIALISATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    loadActualitesData();
    if (window.AOS) AOS.refresh();
    
    // === ÉCOUTER LES CHANGEMENTS DE LANGUE ===
    document.addEventListener('languageChanged', function(e) {
        console.log('Langue changée en:', e.detail.lang);
        // Recharger les actualités avec la nouvelle langue
        renderActualites();
    });
    
    // === SURVEILLER AUSSI localStorage DIRECTEMENT ===
    // Pour détecter les changements de langue depuis d'autres scripts
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (key === 'ogefrem_lang') {
            console.log('Langue changée via localStorage:', value);
            renderActualites();
        }
    };
    
    // Gestion des ancres #post-xxx
    if (window.location.hash.startsWith('#post-')) {
        const postId = parseInt(window.location.hash.replace('#post-', ''));
        if (postId) {
            setTimeout(() => {
                const post = actualitesData.find(p => p.id === postId);
                if (post) openPostModal(postId);
            }, 1000);
        }
    }
});