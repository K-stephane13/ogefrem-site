// assets/js/actualites.js - VERSION MISE À JOUR
let currentPage = 1;
const itemsPerPage = 9;
let currentFilter = "all";
let actualitesData = [];

// Charger les actualités depuis AdminData
function loadActualitesData() {
    actualitesData = AdminData.getActualites();
    // Trier par date (du plus récent au plus ancien)
    actualitesData.sort((a, b) => {
        const dateA = new Date(a.date.split('-').join('-'));
        const dateB = new Date(b.date.split('-').join('-'));
        return dateB - dateA;
    });
    renderActualites();
}

function getLikes(postId) {
    return AdminData.getLikes(postId);
}

function isLikedByUser(postId) {
    return AdminData.isLikedByUser(postId);
}

function handleLike(postId, btnElement) {
    const result = AdminData.toggleLike(postId);
    const likeCountSpan = btnElement.querySelector('.like-count');
    if (likeCountSpan) {
        likeCountSpan.textContent = result.likes;
    }
    if (result.isLiked) {
        btnElement.classList.add('liked');
    } else {
        btnElement.classList.remove('liked');
    }
}

function getCategorieLabel(categorie) {
    const labels = {
        'evenement': ' Événement',
        'communique': ' Communiqué',
        'projet': ' Projet',
        'partenariat': ' Partenariat',
        'avis': ' Avis officiel'
    };
    return labels[categorie] || categorie;
}

function renderActualites() {
    let filtered = currentFilter === "all" 
        ? [...actualitesData] 
        : actualitesData.filter(a => a.categorie === currentFilter);
    
    filtered.sort((a, b) => {
        const dateA = new Date(a.date.split('-').join('-'));
        const dateB = new Date(b.date.split('-').join('-'));
        return dateB - dateA;
    });
    
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filtered.slice(start, end);
    
    const container = document.getElementById('actualitesGrid');
    if (!container) return;
    
    container.innerHTML = paginatedItems.map(post => {
        const currentLikes = getLikes(post.id);
        const imageCount = post.images?.length || 0;
        
        return `
            <div class="col-md-6 col-lg-4 actualite-post" data-categorie="${post.categorie}">
                <div class="actualite-post-card" data-id="${post.id}">
                    ${imageCount > 0 ? `
                        <div class="post-images ${imageCount > 1 ? 'has-carousel' : ''}">
                            <div class="image-carousel">
                                ${post.images.map((img, idx) => `
                                    <div class="carousel-slide ${idx === 0 ? 'active' : ''}">
                                        <img src="${img}" alt="${post.titre}" onerror="this.src='https://placehold.co/600x400/003399/white?text=OGEFREM'">
                                    </div>
                                `).join('')}
                            </div>
                            ${imageCount > 1 ? `
                                <button class="carousel-prev"><i class="fas fa-chevron-left"></i></button>
                                <button class="carousel-next"><i class="fas fa-chevron-right"></i></button>
                                <div class="carousel-dots">
                                    ${Array(imageCount).fill().map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    ` : `
                        <div class="post-images" style="background: linear-gradient(135deg, #003399, #0066CC); display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-newspaper" style="font-size: 3rem; color: white;"></i>
                        </div>
                    `}
                    
                    <div class="post-content">
                        <div class="post-header">
                            <span class="post-categorie ${post.categorie}">${getCategorieLabel(post.categorie)}</span>
                            <span class="post-date"><i class="far fa-calendar-alt"></i> ${new Date(post.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <h3 class="post-title">${post.titre}</h3>
                        <p class="post-description">${post.description.substring(0, 120)}${post.description.length > 120 ? '...' : ''}</p>
                        
                        <div class="post-actions">
                            <button class="like-btn ${isLikedByUser(post.id) ? 'liked' : ''}" data-id="${post.id}">
                                <i class="fas fa-heart"></i>
                                <span class="like-count">${currentLikes}</span>
                            </button>
                            
                            <div class="social-share">
                                ${post.facebookUrl ? `<a href="${post.facebookUrl}" target="_blank" class="social-icon facebook"><i class="fab fa-facebook-f"></i></a>` : ''}
                                ${post.instagramUrl ? `<a href="${post.instagramUrl}" target="_blank" class="social-icon instagram"><i class="fab fa-instagram"></i></a>` : ''}
                                ${post.twitterUrl ? `<a href="${post.twitterUrl}" target="_blank" class="social-icon twitter"><i class="fab fa-twitter"></i></a>` : ''}
                            </div>
                        </div>
                        
                        <button class="btn-read-more" onclick="openPostModal(${post.id})">
                            Lire la suite <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    initCarousels();
    initLikeButtons();
    renderPagination(totalPages);
}

function initLikeButtons() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.removeEventListener('click', handleLikeClick);
        btn.addEventListener('click', handleLikeClick);
    });
}

function handleLikeClick(e) {
    e.stopPropagation();
    const postId = parseInt(this.dataset.id);
    const result = AdminData.toggleLike(postId);
    const likeCountSpan = this.querySelector('.like-count');
    if (likeCountSpan) {
        likeCountSpan.textContent = result.likes;
    }
    if (result.isLiked) {
        this.classList.add('liked');
    } else {
        this.classList.remove('liked');
    }
}

function initCarousels() {
    document.querySelectorAll('.actualite-post-card .has-carousel').forEach(carouselContainer => {
        const container = carouselContainer.closest('.actualite-post-card');
        const slides = container.querySelectorAll('.carousel-slide');
        const prevBtn = container.querySelector('.carousel-prev');
        const nextBtn = container.querySelector('.carousel-next');
        const dots = container.querySelectorAll('.dot');
        
        if (!slides.length || slides.length <= 1) return;
        
        let currentIndex = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = slides.length - 1;
                showSlide(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = currentIndex + 1;
                if (newIndex >= slides.length) newIndex = 0;
                showSlide(newIndex);
            });
        }
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(i);
            });
        });
    });
}

function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let html = '';
    html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <button class="page-link" data-page="${currentPage - 1}">« Précédent</button>
            </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<li class="page-item ${currentPage === i ? 'active' : ''}">
                        <button class="page-link" data-page="${i}">${i}</button>
                    </li>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <button class="page-link" data-page="${currentPage + 1}">Suivant »</button>
            </li>`;
    
    paginationContainer.innerHTML = html;
    
    paginationContainer.querySelectorAll('.page-link[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.dataset.page);
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
                currentPage = page;
                renderActualites();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// Filtres
document.querySelectorAll('.filter-active-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-active-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        currentPage = 1;
        renderActualites();
    });
});

// Modal pour afficher l'article complet
window.openPostModal = function(postId) {
    const post = actualitesData.find(p => p.id === postId);
    if (!post) return;
    
    const currentLikes = getLikes(postId);
    const isLiked = isLikedByUser(postId);
    
    const modalHtml = `
        <div class="modal fade" id="postModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${post.titre}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${post.images && post.images.length > 0 ? `
                            <div class="modal-images">
                                ${post.images.map(img => `
                                    <img src="${img}" alt="${post.titre}" onerror="this.src='https://placehold.co/600x400/003399/white?text=OGEFREM'">
                                `).join('')}
                            </div>
                        ` : ''}
                        <div class="modal-info">
                            <span class="post-categorie ${post.categorie}">${getCategorieLabel(post.categorie)}</span>
                            <span class="post-date"><i class="far fa-calendar-alt"></i> ${new Date(post.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div class="modal-description">
                            ${post.description.split('\n').map(p => `<p>${p}</p>`).join('')}
                        </div>
                        <div class="modal-actions">
                            <button class="like-btn-modal ${isLiked ? 'liked' : ''}" data-id="${post.id}">
                                <i class="fas fa-heart"></i>
                                <span class="like-count">${currentLikes}</span>
                            </button>
                            <div class="social-share-modal">
                                ${post.facebookUrl ? `<a href="${post.facebookUrl}" target="_blank" class="social-icon facebook"><i class="fab fa-facebook-f"></i></a>` : ''}
                                ${post.instagramUrl ? `<a href="${post.instagramUrl}" target="_blank" class="social-icon instagram"><i class="fab fa-instagram"></i></a>` : ''}
                                ${post.twitterUrl ? `<a href="${post.twitterUrl}" target="_blank" class="social-icon twitter"><i class="fab fa-twitter"></i></a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const oldModal = document.getElementById('postModal');
    if (oldModal) oldModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const modal = new bootstrap.Modal(document.getElementById('postModal'));
    modal.show();
    
    const modalLikeBtn = document.querySelector('.like-btn-modal');
    if (modalLikeBtn) {
        modalLikeBtn.addEventListener('click', () => {
            const result = AdminData.toggleLike(post.id);
            modalLikeBtn.querySelector('.like-count').textContent = result.likes;
            if (result.isLiked) {
                modalLikeBtn.classList.add('liked');
            } else {
                modalLikeBtn.classList.remove('liked');
            }
            
            const cardLikeBtn = document.querySelector(`.like-btn[data-id="${post.id}"]`);
            if (cardLikeBtn) {
                cardLikeBtn.querySelector('.like-count').textContent = result.likes;
                if (result.isLiked) {
                    cardLikeBtn.classList.add('liked');
                } else {
                    cardLikeBtn.classList.remove('liked');
                }
            }
        });
    }
    
    document.getElementById('postModal').addEventListener('hidden.bs.modal', () => {
        document.getElementById('postModal').remove();
    });
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadActualitesData();
    AOS.refresh();
});