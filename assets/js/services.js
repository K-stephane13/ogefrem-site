// Services data
const services = [
    { id: 1, icon: "fas fa-users", title: "Liste des mandataires OGEFREM", desc: "Annuaire officiel avec contacts", link: "#" },
    { id: 2, icon: "fas fa-map-marked-alt", title: "Suivi des cargaisons", desc: "Traçabilité en temps réel FERI/FERE", link: "#" },
    { id: 3, icon: "fas fa-truck", title: "Opérateurs de transport", desc: "Base des transporteurs agréés", link: "#" },
    { id: 4, icon: "fas fa-boxes", title: "Produits exportables", desc: "Liste des marchandises et formalités", link: "#" },
    { id: 5, icon: "fas fa-chart-line", title: "Mercuriales", desc: "Prix de référence du fret", link: "#" },
    { id: 6, icon: "fas fa-file-signature", title: "Demandes de transport", desc: "Publiez un besoin de transport", link: "#" },
    { id: 7, icon: "fas fa-tags", title: "Offres de transport", desc: "Annonces des transporteurs", link: "#" },
    { id: 8, icon: "fas fa-credit-card", title: "Paiement abonnement", desc: "Module de paiement sécurisé", link: "#" },
    { id: 9, icon: "fas fa-ship", title: "Horaires navires/avions", desc: "Desservant la RDC", link: "#" }
];

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('servicesContainer');
    if (container) {
        container.innerHTML = services.map(service => `
            <div class="col-md-4">
                <div class="service-card" onclick="window.location.href='${service.link}'">
                    <div class="service-icon"><i class="${service.icon}"></i></div>
                    <h4>${service.title}</h4>
                    <p>${service.desc}</p>
                </div>
            </div>
        `).join('');
    }
});