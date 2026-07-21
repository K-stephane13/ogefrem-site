// assets/js/admin-data.js - VERSION AVEC CONSEIL D'ADMINISTRATION
// Gère : Actualités, Demandes, Offres, Comité (DG + DGA), Conseil d'Administration (PCA + Tutelle + Admins)

const AdminData = {
    
    // ============================================================
    // 1. ACTUALITÉS - 14 ARTICLES RÉELS
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
            {
                id: 12,
                titre: "UCCA : Rideaux sur les travaux du Comité Directeur à Douala",
                date: "2026-07-09",
                categorie: "evenement",
                description: "Les travaux de la session ordinaire du Comité Directeur de l'Union des Conseils des Chargeurs Africains (UCCA) se sont officiellement achevés ce jeudi 9 juillet 2026 à Douala, en République du Cameroun, après deux jours d'intenses échanges consacrés aux enjeux du transport et de la logistique en Afrique.",
                images: ["assets/images/actualites/48.jpeg", "assets/images/actualites/49.jpeg", "assets/images/actualites/50.jpeg"],
                facebookUrl: "",
                instagramUrl: "",
                twitterUrl: "",
                likes: 441
            },
            {
                id: 14,
                titre: "OGEFREM : En marge des assises de l'UCCA, le DG Olivier Tshibola échange avec ses homologues africains",
                date: "2026-07-09",
                categorie: "partenariat",
                description: "Douala, 09 juillet 2026. Le Directeur Général de l'OGEFREM, M. Olivier Tshibola, a multiplié les rencontres de travail avec ses homologues africains, notamment ceux du Cameroun et de l'Angola, en marge de la clôture de la session ordinaire du Comité Directeur de l'Union des Conseils des Chargeurs Africains (UCCA).",
                images: ["assets/images/actualites/55.jpeg", "assets/images/actualites/56.jpeg", "assets/images/actualites/57.jpeg", "assets/images/actualites/58.jpeg"],
                facebookUrl: "",
                instagramUrl: "",
                twitterUrl: "",
                likes: 745
            },
            {
                id: 13,
                titre: "UCCA : Levée des rideaux sur les travaux de la session ordinaire du Comité Directeur",
                date: "2026-07-08",
                categorie: "evenement",
                description: "Douala, 08 juillet 2026. Ce mercredi 8 juillet 2026, la ville de Douala, capitale économique de la République du Cameroun, a accueilli l'ouverture des travaux de la session ordinaire du Comité Directeur de l'Union des Conseils des Chargeurs Africains (UCCA).",
                images: ["assets/images/actualites/51.jpeg", "assets/images/actualites/52.jpeg", "assets/images/actualites/53.jpeg", "assets/images/actualites/54.jpeg"],
                facebookUrl: "",
                instagramUrl: "",
                twitterUrl: "",
                likes: 432
            },
            {
                id: 1,
                titre: "OGEFREM : le Conseil d'administration fixe les grandes priorités de l'Office lors de sa première réunion ordinaire",
                date: "2026-06-26",
                categorie: "evenement",
                description: "Sous la présidence de l'honorable Amisi Makutano, le Conseil d'administration de l'OGEFREM a tenu, ce vendredi 26 juin 2026, sa première réunion ordinaire consacrée à l'examen des principaux dossiers relatifs à la gestion et au fonctionnement de l'établissement.",
                images: ["assets/images/actualites/1.jpeg", "assets/images/actualites/2.jpeg", "assets/images/actualites/3.jpeg", "assets/images/actualites/4.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1821GE3ptG/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DaGZXhAgicy/?img_index=9&igsh=aG5sdmxheTd6Mjlt",
                twitterUrl: "",
                likes: 975
            },
            {
                id: 2,
                titre: "L'OGEFREM présent aux assises de validation de la Feuille de Route « Quick Win » B-Ready",
                date: "2026-06-24",
                categorie: "evenement",
                description: "Le Directeur Général de l'Office de Gestion du Fret Multimodal (OGEFREM), Monsieur Olivier Tshibola Mukuma, a pris part mercredi 24 Juin 2026 à la réunion du Comité de Pilotage du Groupe Thématique Climat des Affaires.",
                images: ["assets/images/actualites/5.jpeg", "assets/images/actualites/6.jpeg", "assets/images/actualites/7.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1XWdFuJi3D/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DaAtxBOghH-/?igsh=MW9mODV1dTZyZTEydA==",
                twitterUrl: "",
                likes: 543
            },
            {
                id: 3,
                titre: "Ogefrem: Après les Directions du siège, le DG Olivier Tshibola Mukuma a échangé avec le banc syndical",
                date: "2026-06-23",
                categorie: "communique",
                description: "Dans le cadre des rencontres de prise de contact avec les différentes composantes de l'Ogefrem, le Directeur Général Me Olivier Tshibola Mukuma, assisté du Directeur Général Adjoint, Emmanuel Mayele Samba a invité ce mardi après midi les permanents syndicaux.",
                images: ["assets/images/actualites/8.jpeg", "assets/images/actualites/9.jpeg", "assets/images/actualites/10.jpeg", "assets/images/actualites/11.jpeg", "assets/images/actualites/12.jpeg", "assets/images/actualites/13.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1RPPML9Ah5/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DZqLe3ggjcj/?img_index=5&igsh=ZW8xdXB1MDN1MDU=",
                twitterUrl: "",
                likes: 671
            },
            {
                id: 4,
                titre: "OGEFREM : le Conseil d'administration ouvre un nouveau chapitre de gouvernance",
                date: "2026-06-16",
                categorie: "evenement",
                description: "La toute première réunion du Conseil d'administration de l'Office de gestion du fret multimodal (OGEFREM) s'est tenue ce mardi 16 juin, sous la présidence de son PCA, Adolphe Amisi Makutano, récemment reconduit dans ses fonctions par ordonnance présidentielle.",
                images: ["assets/images/actualites/14.jpeg", "assets/images/actualites/15.jpeg", "assets/images/actualites/16.jpeg", "assets/images/actualites/17.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/14fDe5oJPsN/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DZpysXfAlEb/?img_index=2&igsh=emUxam56amR0ZTli",
                twitterUrl: "",
                likes: 865
            },
            {
                id: 5,
                titre: "Ogefrem: Le DG Olivier Tshibola Mukuma préside sa première réunion de Directions opérationnelles de son office",
                date: "2026-06-15",
                categorie: "evenement",
                description: "C'est dans la salle de réunions située au 2e Niveau de l'immeuble abritant le siège de l'Ogefrem que cette première réunion a été présidée par Maître Olivier Tshibola Mukuma, Directeur Général de cet Établissement.",
                images: ["assets/images/actualites/18.jpeg", "assets/images/actualites/19.jpeg", "assets/images/actualites/20.jpeg", "assets/images/actualites/21.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1GNDNtnxmE/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DZprtfAgh-e/?igsh=MW9jYmRpZ2dqcGN4OQ==",
                twitterUrl: "",
                likes: 729
            },
            {
                id: 6,
                titre: "OGEFREM : RONDE DU NOUVEAU DG À TRAVERS DIRECTIONS ET SERVICES DE L'OFFICE",
                date: "2026-06-11",
                categorie: "communique",
                description: "Le nouveau Directeur de l'Ogefrem, Maître Olivier Tshibola Mukuma, a effectué le jeudi 11 juin 2026 la ronde de quelques Directions et services de cet établissement dans la ville de Kinshasa.",
                images: ["assets/images/actualites/24.jpeg", "assets/images/actualites/25.jpeg", "assets/images/actualites/26.jpeg", "assets/images/actualites/27.jpeg", "assets/images/actualites/28.jpeg", "assets/images/actualites/29.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1AJCrMJp1w/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DZpZB_0ggCy/?img_index=12&igsh=MWRjYzk3a3c0MmlxZQ==",
                twitterUrl: "",
                likes: 452
            },
            {
                id: 7,
                titre: "OGEFREM : OLIVIER TSHIBOLA MUKUMA PREND OFFICIELLEMENT SES FONCTIONS DE DIRECTEUR GÉNÉRAL",
                date: "2026-06-10",
                categorie: "evenement",
                description: "La cérémonie officielle de passation de pouvoir à l'Office de Gestion du Fret Multimodal (Ogefrem) s'est tenue le 10 juin 2026 à Kinshasa, dans la salle de réunion du 2e niveau de l'immeuble abritant l'Ogefrem.",
                images: ["assets/images/actualites/30.jpeg", "assets/images/actualites/31.jpeg", "assets/images/actualites/32.jpeg", "assets/images/actualites/33.jpeg", "assets/images/actualites/34.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/183zP2jzJE/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DZpLNCkgvlB/?img_index=4&igsh=MWhtd2picTF4MTBqcQ==",
                twitterUrl: "",
                likes: 943
            },
            {
                id: 8,
                titre: "UNE DÉLÉGATION D'EXPERTS DE L'OGEFREM ET DE LA CEPCOR SÉJOURNE EN ANGOLA",
                date: "2026-06-08",
                categorie: "partenariat",
                description: "C'est à Luanda, capitale de l'Angola que s'est tenu ce lundi 08 Juin 2026, une grande rencontre entre les experts et techniciens de l'Ogefrem et ceux de l'Agence Angolaise des Transports Terrestres (ANTT).",
                images: ["assets/images/actualites/35.jpeg", "assets/images/actualites/36.jpeg", "assets/images/actualites/37.jpeg", "assets/images/actualites/38.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1BBfMgMnDt/?mibextid=wwXIfr",
                instagramUrl: "",
                twitterUrl: "",
                likes: 245
            },
            {
                id: 9,
                titre: "Ogefrem: Visites de réconfort et d'inspection des structures de l'Office effectuées par le DG a.i. à Kinshasa",
                date: "2026-06-02",
                categorie: "communique",
                description: "Le Directeur Général intérimaire de l'Ogefrem, Emmanuel Mayele Samba a effectué plusieurs visites ce mardi 02 juin dans quelques structures de cet Établissement public dans la ville de Kinshasa.",
                images: ["assets/images/actualites/39.jpeg", "assets/images/actualites/40.jpeg", "assets/images/actualites/41.jpeg", "assets/images/actualites/42.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/18ecYgqx7R/?mibextid=wwXIfr",
                instagramUrl: "",
                twitterUrl: "",
                likes: 692
            },
            {
                id: 10,
                titre: "Ogefrem: vers la construction d'une académie du transport multimodal à Muanda",
                date: "2026-05-25",
                categorie: "projet",
                description: "C'est la province du Kongo central qui aura le privilège d'abriter cette institution, la première en RDC.",
                images: ["assets/images/actualites/22.jpeg", "assets/images/actualites/23.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1DhLXSoZgn/?mibextid=wwXIfr",
                instagramUrl: "",
                twitterUrl: "",
                likes: 534
            },
            {
                id: 11,
                titre: "OGEFREM : Le Conseil d'administration en mission d'itinérance au Kongo Central",
                date: "2026-05-18",
                categorie: "evenement",
                description: "Sous la vision du Président de la République, Félix Antoine Tshisekedi Tshilombo, et suivant les orientations de l'autorité de tutelle, Jean-Pierre Bemba Gombo, une équipe du Conseil d'administration de l'OGEFREM poursuit sa dynamique de proximité.",
                images: ["assets/images/actualites/43.jpeg", "assets/images/actualites/44.jpeg", "assets/images/actualites/45.jpeg", "assets/images/actualites/46.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1DEja6C34a/?mibextid=wwXIfr",
                instagramUrl: "",
                twitterUrl: "",
                likes: 832
            }
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
    // 4. COMITÉ DE GESTION (DG + DGA)
    // ============================================================
    getComite: function() {
        const saved = localStorage.getItem('ogefrem_comite');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, nom: "Directeur Général", titre: "Directeur Général", photo: "assets/images/DG.jpeg", message: "Moderniser le fret congolais pour une meilleure compétitivité" },
            { id: 2, nom: "Directeur Général Adjoint", titre: "Directeur Général Adjoint", photo: "assets/images/DG-MAYELE.jpeg", message: "L'innovation au service des chargeurs" }
        ];
    },
    saveComite: function(data) { localStorage.setItem('ogefrem_comite', JSON.stringify(data)); },
    
    // ============================================================
    // 5. CONSEIL D'ADMINISTRATION (PCA + Tutelle + 3 Admins)
    // ============================================================
    getConseil: function() {
        const saved = localStorage.getItem('ogefrem_conseil');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, nom: "Adolphe Amisi Makutano", titre: "Président du Conseil d'Administration", photo: "assets/images/PCA.png", message: "Une gouvernance transparente et efficace" },
            { id: 2, nom: "Anny Mombunza Libotolo", titre: "Représentante de la Tutelle", photo: "assets/images/tutelle.png", message: "Accompagner l'OGEFREM dans sa mission de service public" },
            { id: 3, nom: "Alengo Lohongo", titre: "Administrateur", photo: "assets/images/admin1.png", message: "Œuvrer pour une gouvernance exemplaire et transparente" },
            { id: 4, nom: "Irenge Mukabene", titre: "Administrateur", photo: "assets/images/admin2.png", message: "Promouvoir l'efficacité et la modernisation des services de l'OGEFREM" },
            { id: 5, nom: "Shafali Bihanze", titre: "Administrateur", photo: "assets/images/admin3.png", message: "Contribuer activement à la réalisation des objectifs stratégiques de l'OGEFREM" }
        ];
    },
    saveConseil: function(data) { localStorage.setItem('ogefrem_conseil', JSON.stringify(data)); },
    
    // ============================================================
    // 6. LIKES (pour les actualités)
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
    // 7. EXPORT / BACKUP / RESET
    // ============================================================
    exportData: function() {
        const data = {
            actualites: this.getActualites(),
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
        localStorage.removeItem('ogefrem_actualites');
        localStorage.removeItem('ogefrem_demandes');
        localStorage.removeItem('ogefrem_offres');
        localStorage.removeItem('ogefrem_comite');
        localStorage.removeItem('ogefrem_conseil');
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('post_like_') || key.startsWith('post_liked_')) {
                localStorage.removeItem(key);
            }
        });
        return true;
    }
};