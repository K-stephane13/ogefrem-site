// assets/js/admin-data.js - VERSION AVEC SUPPORT BLOB

const AdminData = {
    // ============================================================
    // ACTUALITÉS - DEPUIS L'API
    // ============================================================
    getActualites: async function() {
        try {
            const response = await fetch('assets/php/api/data.php?module=actualites', {
                cache: 'no-store'
            });
            if (!response.ok) throw new Error('Erreur chargement actualités');
            return await response.json();
        } catch (error) {
            console.error('Erreur:', error);
            return [];
        }
    },
    
    // ============================================================
    // DEMANDES DE TRANSPORT
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
    // OFFRES DE TRANSPORT
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
    // COMITÉ DE GESTION (DG + DGA)
    // ============================================================
    getComite: function() {
        const saved = localStorage.getItem('ogefrem_comite');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, nom: "Olivier Tshibola Mukuma", titre: "Directeur Général", photo: "assets/images/DG.jpeg", message: "Moderniser le fret congolais pour une meilleure compétitivité" },
            { id: 2, nom: "Emmanuel Mayele Samba", titre: "Directeur Général Adjoint", photo: "assets/images/DG-MAYELE.jpeg", message: "L'innovation au service des chargeurs" }
        ];
    },
    saveComite: function(data) { localStorage.setItem('ogefrem_comite', JSON.stringify(data)); },
    
    // ============================================================
    // CONSEIL D'ADMINISTRATION
    // ============================================================
    getConseil: function() {
        const saved = localStorage.getItem('ogefrem_conseil');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, nom: "Adolphe Amisi Makutano", titre: "Président du Conseil d'Administration", photo: "assets/images/PCA.png", message: "Une gouvernance transparente et efficace" },
            { id: 0, nom: "Olivier Tshibola Mukuma", titre: "Directeur Général", photo: "assets/images/DG.jpeg", message: "Moderniser le fret congolais pour une meilleure compétitivité" },
            { id: 2, nom: "Anny Mombunza Libotolo", titre: "Représentante de la Tutelle", photo: "assets/images/tutelle.png", message: "Accompagner l'OGEFREM dans sa mission de service public" },
            { id: 3, nom: "Alengo Lohongo", titre: "Administrateur", photo: "assets/images/admin1.png", message: "Œuvrer pour une gouvernance exemplaire et transparente" },
            { id: 4, nom: "Irenge Mukabene", titre: "Administrateur", photo: "assets/images/admin2.png", message: "Promouvoir l'efficacité et la modernisation des services de l'OGEFREM" },
            { id: 5, nom: "Shafali Bihanze", titre: "Administrateur", photo: "assets/images/admin3.png", message: "Contribuer activement à la réalisation des objectifs stratégiques de l'OGEFREM" }
        ];
    },
    saveConseil: function(data) { localStorage.setItem('ogefrem_conseil', JSON.stringify(data)); },
    
    // ============================================================
    // LIKES
    // ============================================================
    getLikes: async function(postId) {
        try {
            const actualites = await this.getActualites();
            const actualite = actualites.find(a => a.id === postId);
            return actualite ? actualite.likes : 0;
        } catch (error) {
            return 0;
        }
    },
    saveLike: function(postId, likes) {
        console.log('Like sauvegardé via API pour post:', postId);
    },
    isLikedByUser: function(postId) { return localStorage.getItem(`post_liked_${postId}`) === 'true'; },
    toggleLike: function(postId) {
        const isLiked = this.isLikedByUser(postId);
        if (!isLiked) {
            localStorage.setItem(`post_liked_${postId}`, 'true');
        } else {
            localStorage.setItem(`post_liked_${postId}`, 'false');
        }
        return { isLiked: !isLiked };
    },
    
    // ============================================================
    // EXPORT / BACKUP / RESET
    // ============================================================
    exportData: function() {
        const data = {
            demandes: this.getDemandes(),
            offres: this.getOffres(),
            comite: this.getComite(),
            conseil: this.getConseil()
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
        localStorage.removeItem('ogefrem_demandes');
        localStorage.removeItem('ogefrem_offres');
        localStorage.removeItem('ogefrem_comite');
        localStorage.removeItem('ogefrem_conseil');
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('post_liked_')) {
                localStorage.removeItem(key);
            }
        });
        return true;
    }
};