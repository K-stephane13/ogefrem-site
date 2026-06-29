// assets/js/admin-data.js - VERSION SIMPLIFIÉE
// Gère UNIQUEMENT : Actualités, Demandes, Offres, Comité (photos)

const AdminData = {
    
    // ============================================================
    // 1. ACTUALITÉS
    // ============================================================
    getActualites: function() {
        const saved = localStorage.getItem('ogefrem_actualites');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return this.getDefaultActualites();
    },
    
    getDefaultActualites: function() {
        return [
            { id: 1, titre: "Signature du contrat de concession du Port Sec de Kasumbalesa", date: "2025-12-01", categorie: "evenement", description: "L'OGEFREM a signé un contrat de partenariat public-privé avec le Consortium YELLOWSTONE pour le financement, la construction, l'exploitation et la maintenance du Port Sec de Kasumbalesa. Un investissement total de 599,874 millions USD.", images: ["assets/images/actualites/11.jpg", "assets/images/actualites/12.jpg", "assets/images/actualites/10.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/1", instagramUrl: "https://instagram.com/ogefrem/post/1", twitterUrl: "https://twitter.com/ogefrem/post/1", likes: 245 },
            { id: 2, titre: "Mise en service de la plateforme modernisée FERI-FERE-AD", date: "2025-12-22", categorie: "communique", description: "La Direction Générale de l'OGEFREM porte à la connaissance de tous les partenaires la mise en service de la plateforme multimodale modernisée à partir du 01 janvier 2026.", images: ["assets/images/actualites/10.jpg", "assets/images/actualites/12.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/2", instagramUrl: "https://instagram.com/ogefrem/post/2", twitterUrl: "https://twitter.com/ogefrem/post/2", likes: 189 },
            { id: 3, titre: "Lancement de l'Observatoire National des Transports", date: "2025-11-15", categorie: "projet", description: "L'OGEFREM lance officiellement l'Observatoire National des Transports, une plateforme de collecte et d'analyse des données statistiques du secteur.", images: ["assets/images/actualites/11.jpg", "assets/images/actualites/12.jpg", "assets/images/actualites/13.jpg", "assets/images/actualites/15.png"], facebookUrl: "https://facebook.com/ogefrem/post/3", instagramUrl: "https://instagram.com/ogefrem/post/3", twitterUrl: "https://twitter.com/ogefrem/post/3", likes: 312 },
            { id: 4, titre: "Partenariat avec l'Agence Maritime Internationale du Congo", date: "2025-10-05", categorie: "partenariat", description: "L'OGEFREM a signé un accord de partenariat stratégique avec l'Agence Maritime Internationale du Congo (AMICONGO) pour faciliter les opérations de dédouanement et de transit au port de Matadi.", images: ["assets/images/actualites/14.jpg", "assets/images/actualites/12.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/4", instagramUrl: null, twitterUrl: "https://twitter.com/ogefrem/post/4", likes: 98 },
            { id: 5, titre: "Appel d'offres pour l'acquisition de véhicules SUV 4x4", date: "2025-09-20", categorie: "avis", description: "L'OGEFREM lance un appel d'offres international pour l'acquisition de 18 véhicules SUV 4x4 de 7 places, 4 véhicules de 9 à 10 places, 4 véhicules de 13 à 14 places, 3 pick-up double cabine, 1 minibus et 1 ambulance.", images: ["assets/images/actualites/1.jpg"], facebookUrl: null, instagramUrl: "https://instagram.com/ogefrem/post/5", twitterUrl: "https://twitter.com/ogefrem/post/5", likes: 67 },
            { id: 6, titre: "Formation des mandataires FERI/FERE à Kinshasa", date: "2025-08-10", categorie: "evenement", description: "L'OGEFREM a organisé une session de formation à l'intention des mandataires agréés sur les nouvelles fonctionnalités de la plateforme FERI/FERE.", images: ["assets/images/actualites/14.jpg", "assets/images/actualites/15.png", "assets/images/actualites/13.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/6", instagramUrl: "https://instagram.com/ogefrem/post/6", twitterUrl: null, likes: 156 },
            { id: 7, titre: "Mise en garde contre un faux site OGEFREM", date: "2025-01-27", categorie: "avis", description: "Un site pirate www.ogefrem-feri-fere-da.org diffuse des informations frauduleuses. L'OGEFREM décline toute responsabilité.", images: ["assets/images/actualites/11.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/7", instagramUrl: "https://instagram.com/ogefrem/post/7", twitterUrl: "https://twitter.com/ogefrem/post/7", likes: 423 },
            { id: 8, titre: "Inauguration du nouveau siège de l'OGEFREM à Lubumbashi", date: "2025-07-15", categorie: "evenement", description: "Le Directeur Général de l'OGEFREM a inauguré le nouveau siège provincial de l'OGEFREM à Lubumbashi.", images: ["assets/images/actualites/11.jpg", "assets/images/actualites/12.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/8", instagramUrl: null, twitterUrl: null, likes: 203 },
            { id: 9, titre: "Journée portes ouvertes à l'OGEFREM", date: "2025-06-20", categorie: "evenement", description: "L'OGEFREM a organisé une journée portes ouvertes pour présenter ses missions et services aux opérateurs économiques.", images: ["assets/images/actualites/13.jpg", "assets/images/actualites/12.jpg", "assets/images/actualites/10.jpg", "assets/images/actualites/14.jpg", "assets/images/actualites/15.png"], facebookUrl: "https://facebook.com/ogefrem/post/9", instagramUrl: "https://instagram.com/ogefrem/post/9", twitterUrl: "https://twitter.com/ogefrem/post/9", likes: 178 },
            { id: 10, titre: "Nouveau guide des procédures d'exportation", date: "2025-05-05", categorie: "communique", description: "L'OGEFREM publie un nouveau guide des procédures d'exportation à destination des chargeurs.", images: ["assets/images/actualites/11.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/10", instagramUrl: "https://instagram.com/ogefrem/post/10", twitterUrl: null, likes: 92 },
            { id: 11, titre: "Participation au Salon International du Transport de Kinshasa", date: "2025-04-18", categorie: "evenement", description: "L'OGEFREM a participé au Salon International du Transport de Kinshasa (SITRANS).", images: ["assets/images/actualites/11.jpg", "assets/images/actualites/12.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/11", instagramUrl: null, twitterUrl: "https://twitter.com/ogefrem/post/11", likes: 134 },
            { id: 12, titre: "Projet de construction du Centre Hospitalier de Kinshasa", date: "2025-04-01", categorie: "projet", description: "L'OGEFREM lance un appel d'offres pour les travaux de construction du Centre Hospitalier de Kinshasa.", images: ["assets/images/actualites/11.jpg", "assets/images/actualites/12.jpg", "assets/images/actualites/13.jpg"], facebookUrl: null, instagramUrl: "https://instagram.com/ogefrem/post/12", twitterUrl: "https://twitter.com/ogefrem/post/12", likes: 76 },
            { id: 13, titre: "Signature d'un accord avec la DGDA", date: "2025-03-10", categorie: "partenariat", description: "L'OGEFREM et la Direction Générale des Douanes et Accises (DGDA) ont signé un accord de coopération.", images: ["assets/images/actualites/11.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/13", instagramUrl: "https://instagram.com/ogefrem/post/13", twitterUrl: "https://twitter.com/ogefrem/post/13", likes: 215 },
            { id: 14, titre: "Formation des transitaires à Goma", date: "2025-02-25", categorie: "evenement", description: "Une session de formation a été organisée à Goma à l'intention des transitaires du Nord-Kivu.", images: ["assets/images/actualites/13.jpg", "assets/images/actualites/12.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/14", instagramUrl: null, twitterUrl: null, likes: 108 },
            { id: 15, titre: "Préqualification pour le Port Sec de Kasumbalesa", date: "2025-01-15", categorie: "avis", description: "L'OGEFREM prolonge la date limite de soumission des dossiers de préqualification.", images: ["assets/images/actualites/15.png"], facebookUrl: "https://facebook.com/ogefrem/post/15", instagramUrl: "https://instagram.com/ogefrem/post/15", twitterUrl: "https://twitter.com/ogefrem/post/15", likes: 54 },
            { id: 16, titre: "Bilan annuel 2024 de l'OGEFREM", date: "2025-01-10", categorie: "communique", description: "L'OGEFREM publie son bilan annuel pour l'année 2024.", images: ["assets/images/actualites/13.jpg", "assets/images/actualites/10.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/16", instagramUrl: null, twitterUrl: "https://twitter.com/ogefrem/post/16", likes: 87 },
            { id: 17, titre: "Visite du Directeur Général au port de Matadi", date: "2024-12-12", categorie: "evenement", description: "Le Directeur Général de l'OGEFREM a effectué une visite de terrain au port de Matadi.", images: ["assets/images/actualites/11.jpg", "assets/images/actualites/12.jpg", "assets/images/actualites/13.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/17", instagramUrl: "https://instagram.com/ogefrem/post/17", twitterUrl: null, likes: 142 },
            { id: 18, titre: "Lancement de la campagne d'abonnement 2025", date: "2024-11-01", categorie: "avis", description: "L'OGEFREM lance la campagne d'abonnement chargeur pour l'année 2025.", images: ["assets/images/actualites/11.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/18", instagramUrl: "https://instagram.com/ogefrem/post/18", twitterUrl: "https://twitter.com/ogefrem/post/18", likes: 63 },
            { id: 19, titre: "Partenariat avec l'Office Congolais de Contrôle", date: "2024-10-15", categorie: "partenariat", description: "L'OGEFREM et l'Office Congolais de Contrôle (OCC) renforcent leur coopération.", images: ["assets/images/actualites/14.jpg", "assets/images/actualites/12.jpg"], facebookUrl: null, instagramUrl: "https://instagram.com/ogefrem/post/19", twitterUrl: "https://twitter.com/ogefrem/post/19", likes: 95 },
            { id: 20, titre: "Séminaire sur la sécurité du fret multimodal", date: "2024-09-05", categorie: "evenement", description: "L'OGEFREM a organisé un séminaire sur la sécurité du fret multimodal à Kinshasa.", images: ["assets/images/actualites/13.jpg", "assets/images/actualites/15.png", "assets/images/actualites/12.jpg", "assets/images/actualites/14.jpg"], facebookUrl: "https://facebook.com/ogefrem/post/20", instagramUrl: "https://instagram.com/ogefrem/post/20", twitterUrl: "https://twitter.com/ogefrem/post/20", likes: 211 }
        ];
    },
    saveActualites: function(data) { localStorage.setItem('ogefrem_actualites', JSON.stringify(data)); },
    
    // ============================================================
    // 2. DEMANDES DE TRANSPORT
    // ============================================================
    getDemandes: function() {
        const saved = localStorage.getItem('ogefrem_demandes');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, marchandises: "500t de cuivre", origine: "Lubumbashi", destination: "Kinshasa", date: "2025-06-15", nom: "Entreprise A", email: "contact@a.com", telephone: "+243 999 999 999", statut: "publiée", dateSoumission: "2025-06-01" },
            { id: 2, marchandises: "200t de café", origine: "Bukavu", destination: "Matadi", date: "2025-06-30", nom: "Entreprise B", email: "contact@b.com", telephone: "+243 888 888 888", statut: "publiée", dateSoumission: "2025-06-05" },
            { id: 3, marchandises: "1000t de bois", origine: "Kisangani", destination: "Boma", date: "2025-07-10", nom: "Entreprise C", email: "contact@c.com", telephone: "+243 777 777 777", statut: "publiée", dateSoumission: "2025-06-10" }
        ];
    },
    saveDemandes: function(data) { localStorage.setItem('ogefrem_demandes', JSON.stringify(data)); },
    deleteDemande: function(id) {
        let demandes = this.getDemandes();
        demandes = demandes.filter(d => d.id !== id);
        this.saveDemandes(demandes);
    },
    
    // ============================================================
    // 3. OFFRES DE TRANSPORT
    // ============================================================
    getOffres: function() {
        const saved = localStorage.getItem('ogefrem_offres');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, titre: "TRANS LOGISTIC SARL", type: "Routier", origine: "Kinshasa", destination: "Matadi", capacite: "100 tonnes", tarif: "XX USD/tonne", contact: "+243 XXX XXX XXX", description: "Transport routier régulier entre Kinshasa et Matadi." },
            { id: 2, titre: "MAERSK RDC", type: "Maritime", origine: "Matadi", destination: "Europe", capacite: "Conteneurs 20'/40'", tarif: "XX USD/conteneur", contact: "+243 XXX XXX XXX", description: "Lignes maritimes régulières vers l'Europe." },
            { id: 3, titre: "DHL Global", type: "Aérien", origine: "Kinshasa", destination: "Dubai", capacite: "50 tonnes/semaine", tarif: "XX USD/kg", contact: "+243 XXX XXX XXX", description: "Transport aérien express vers le Moyen-Orient." }
        ];
    },
    saveOffres: function(data) { localStorage.setItem('ogefrem_offres', JSON.stringify(data)); },
    deleteOffre: function(id) {
        let offres = this.getOffres();
        offres = offres.filter(o => o.id !== id);
        this.saveOffres(offres);
    },
    
    // ============================================================
    // 4. COMITÉ DE GESTION (PHOTOS SEULEMENT)
    // ============================================================
    getComite: function() {
        const saved = localStorage.getItem('ogefrem_comite');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, nom: "Ministre des Transports", titre: "Ministre des Transports", photo: "assets/images/MINISTRE.png", message: "Partenariat stratégique avec l'OGEFREM" },
            { id: 2, nom: "Président du CA", titre: "Président du Conseil d'Administration", photo: "assets/images/PCA.png", message: "Une gouvernance transparente et efficace" },
            { id: 3, nom: "Directeur Général", titre: "Directeur Général", photo: "assets/images/DG.jpeg", message: "Moderniser le fret congolais pour une meilleure compétitivité" },
            { id: 4, nom: "Directeur Général Adjoint", titre: "Directeur Général Adjoint", photo: "assets/images/DG-MAYELE.jpeg", message: "L'innovation au service des chargeurs" }
        ];
    },
    saveComite: function(data) { localStorage.setItem('ogefrem_comite', JSON.stringify(data)); },
    
    // ============================================================
    // 5. LIKES (pour les actualités)
    // ============================================================
    getLikes: function(postId) {
        const saved = localStorage.getItem(`post_like_${postId}`);
        if (saved !== null) return parseInt(saved);
        const actualite = this.getActualites().find(a => a.id === postId);
        return actualite ? actualite.likes : 0;
    },
    saveLike: function(postId, likes) {
        localStorage.setItem(`post_like_${postId}`, likes);
        const actualites = this.getActualites();
        const index = actualites.findIndex(a => a.id === postId);
        if (index !== -1) { actualites[index].likes = likes; this.saveActualites(actualites); }
    },
    isLikedByUser: function(postId) { return localStorage.getItem(`post_liked_${postId}`) === 'true'; },
    toggleLike: function(postId) {
        let currentLikes = this.getLikes(postId);
        const isLiked = this.isLikedByUser(postId);
        if (!isLiked) { currentLikes++; localStorage.setItem(`post_liked_${postId}`, 'true'); }
        else { currentLikes--; localStorage.setItem(`post_liked_${postId}`, 'false'); }
        this.saveLike(postId, currentLikes);
        return { likes: currentLikes, isLiked: !isLiked };
    },
    
    // ============================================================
    // 6. EXPORT / BACKUP / RESET
    // ============================================================
    exportData: function() {
        const data = {
            actualites: this.getActualites(),
            demandes: this.getDemandes(),
            offres: this.getOffres(),
            comite: this.getComite()
        };
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ogefrem_backup.json';
        a.click();
        URL.revokeObjectURL(url);
    },
    
    resetToDefault: function() {
        localStorage.removeItem('ogefrem_actualites');
        localStorage.removeItem('ogefrem_demandes');
        localStorage.removeItem('ogefrem_offres');
        localStorage.removeItem('ogefrem_comite');
        // Supprimer aussi les likes
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('post_like_') || key.startsWith('post_liked_')) {
                localStorage.removeItem(key);
            }
        });
        return true;
    }
};