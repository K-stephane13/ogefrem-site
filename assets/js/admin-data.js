// assets/js/admin-data.js - Gestionnaire central avec les VRAIES données du site

const AdminData = {
    // ==================== ACTUALITÉS (20) ====================
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
    
    // ==================== LEADERS (4) ====================
    getLeaders: function() {
        const saved = localStorage.getItem('ogefrem_leaders');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, nom: "Directeur Général", titre: "Directeur Général", message: "Moderniser le fret congolais pour une meilleure compétitivité", photo: "assets/images/DG-MAYELE.jpeg", ordre: 1 },
            { id: 2, nom: "Directeur Général Adjoint", titre: "Directeur Général Adjoint", message: "L'innovation au service des chargeurs", photo: "assets/images/dga.jpg", ordre: 2 },
            { id: 3, nom: "Président du CA", titre: "Président du Conseil d'Administration", message: "Une gouvernance transparente et efficace", photo: "assets/images/PCA.png", ordre: 3 },
            { id: 4, nom: "Ministre des Transports", titre: "Ministre des Transports", message: "Partenariat stratégique avec l'OGEFREM", photo: "assets/images/MINISTRE.png", ordre: 4 }
        ];
    },
    
    // ==================== PARTENAIRES (5) ====================
    getPartenaires: function() {
        const saved = localStorage.getItem('ogefrem_partenaires');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, nom: "DGDA", description: "Direction Générale des Douanes", logo: "assets/images/partenaires/Logo-dgda.png", lien: "" },
            { id: 2, nom: "OCC", description: "Office Congolais de Contrôle", logo: "assets/images/partenaires/logo-occ.jpg", lien: "" },
            { id: 3, nom: "SEGUCE", description: "Guichet Unique", logo: "assets/images/partenaires/logo-seguce.png", lien: "" },
            { id: 4, nom: "Ministère des Transports", description: "Tutelle", logo: "assets/images/partenaires/logo-ministre.png", lien: "" },
            { id: 5, nom: "Fédération des Chargeurs", description: "Représentants des chargeurs", logo: "assets/images/partenaires/logo-conseil-chargeur.png", lien: "" }
        ];
    },
    
    // ==================== SERVICES (9) ====================
    getServices: function() {
        const saved = localStorage.getItem('ogefrem_services');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, titre: "Liste des mandataires OGEFREM", description: "Annuaire officiel des mandataires agréés avec contacts complets (téléphone, email, adresse)", icone: "fa-users", lien: "services/mandataires-liste.html" },
            { id: 2, titre: "Suivi des cargaisons", description: "Traçabilité en temps réel FERI/FERE de vos marchandises, de l'embarquement à la livraison", icone: "fa-map-marked-alt", lien: "services/suivi-cargaisons.html" },
            { id: 3, titre: "Opérateurs de transport", description: "Base des transporteurs agréés par l'OGEFREM, avec recherche par type et par ville", icone: "fa-truck", lien: "services/operateurs-transport.html" },
            { id: 4, titre: "Produits exportables", description: "Liste des marchandises exportables de la RDC et formalités d'exportation", icone: "fa-boxes", lien: "services/produits-exportables.html" },
            { id: 5, titre: "Mercuriales", description: "Prix de référence du fret actualisés mensuellement pour tous les itinéraires", icone: "fa-chart-line", lien: "services/mercuriales.html" },
            { id: 6, titre: "Demandes de transport", description: "Publiez un besoin de transport pour vos marchandises et recevez des offres", icone: "fa-file-signature", lien: "services/demandes-transport.html" },
            { id: 7, titre: "Offres de transport", description: "Consultez les annonces des transporteurs pour vos expéditions", icone: "fa-tags", lien: "services/offres-transport.html" },
            { id: 8, titre: "Paiement abonnement chargeur", description: "Module de paiement sécurisé en ligne (Mobile Money, Carte bancaire, Virement)", icone: "fa-credit-card", lien: "services/paiement-abonnement.html" },
            { id: 9, titre: "Horaires navires & avions", description: "Desservant la RDC - Ports de Matadi, Boma et aéroports de Kinshasa, Lubumbashi, Goma", icone: "fa-ship", lien: "services/horaires.html" }
        ];
    },
    
    // ==================== RÈGLEMENTATIONS (77) ====================
    getReglementations: function() {
        const saved = localStorage.getItem('ogefrem_reglementations');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return this.getDefaultReglementations();
    },
    
    getDefaultReglementations: function() {
        return [
            // AVIS AUX CHARGEURS (41)
            { id: 1, titre: "Formulaire d'identification abonnement chargeur (Version française)", categorie: "Avis aux chargeurs", date: "2023-01-01", pdf_url: "assets/pdfs/reglementation/Avis/Formulaire_abonnement_FR.pdf" },
            { id: 2, titre: "Formulaire d'identification abonnement chargeur (Version anglaise)", categorie: "Avis aux chargeurs", date: "2023-01-01", pdf_url: "assets/pdfs/reglementation/Avis/Formulaire_abonnement_EN.pdf" },
            { id: 3, titre: "Formulaire d'identification abonnement chargeur (Version chinoise)", categorie: "Avis aux chargeurs", date: "2023-01-01", pdf_url: "assets/pdfs/reglementation/Avis/Formulaire_abonnement_CN.pdf" },
            { id: 4, titre: "Avis du DG aux mandataires, chargeurs - Plateforme modernisée", categorie: "Avis aux chargeurs", date: "2025-12-22", pdf_url: "assets/pdfs/Avis du DG aux Mandataires, Chargeurs, Transporteurs, Transitaires, Agents Maritimes et Autres Intervenats concernat la mise en place de la plateforme FERI-FERE-AD modernisée.pdf" },
            { id: 5, titre: "Numéros de contacts points focaux", categorie: "Avis aux chargeurs", date: "2024-01-01", pdf_url: "assets/pdfs/Numéros de contacts des points focaux commis à la délivrance des cartes d'abonnement.pdf" },
            { id: 6, titre: "Avis aux Chargeurs DG/DFAC/SDAC/SIRCC/N° 005/MM/06/2025", categorie: "Avis aux chargeurs", date: "2025-08-11", pdf_url: "assets/pdfs/Avis aux Chargeurs DG-DFAC-SDAC-SIRCC-N° 005-MM-06-2025 du 11 août 2025.pdf" },
            { id: 7, titre: "Avis aux Chargeurs DG/DFAC/SDAC/SIRCC/N° 004/MM/06/2025", categorie: "Avis aux chargeurs", date: "2025-08-11", pdf_url: "assets/pdfs/Avis aux Chargeurs DG-DFAC-SDAC-SIRCC-N° 004-MM-06-2025 du 11 août 2025.pdf" },
            { id: 8, titre: "Avis aux Chargeurs et Transporteurs par voie de surface", categorie: "Avis aux chargeurs", date: "2025-02-18", pdf_url: "assets/pdfs/Avis aux Chargeurs et Transporteurs par voie de surface DG-DFAC-SDAC-SIRCC-N° 002-MM-02-2025 du 18 février 2025.pdf" },
            { id: 9, titre: "Avis aux Chargeurs DG/DFAC/SDAC/SIRCC/N° 003/MM/03/2025", categorie: "Avis aux chargeurs", date: "2025-04-02", pdf_url: "assets/pdfs/Avis aux Chargeurs DG-DFAC-SDAC-SIRCC-N° 003-MM-03-2025 du 02 avril 2025.pdf" },
            { id: 10, titre: "Avis aux Chargeurs DG/DFAC/SDAC/N°012/01/MM/12/2024", categorie: "Avis aux chargeurs", date: "2024-12-15", pdf_url: "assets/pdfs/Avis aux Chargeurs, Armateurs, Agents maritimes DG-DFAC-SDAC-N°012-01-MM-12-2024.pdf" },
            { id: 11, titre: "Avis aux Chargeurs DG/DFAC/SDAC/N°011/01/MM/12/2024", categorie: "Avis aux chargeurs", date: "2024-12-10", pdf_url: "assets/pdfs/Avis aux Chargeurs, Armateurs, Agents maritimes DG-DFAC-SDAC-N°011-01-MM-12-2024.pdf" },
            { id: 12, titre: "Avis aux Chargeurs DG/DFAC/SDAC/N°010/01/MM/12/2024", categorie: "Avis aux chargeurs", date: "2024-12-05", pdf_url: "assets/pdfs/Avis aux Chargeurs, Armateurs, Agents maritimes DG-DFAC-SDAC-N°010-01-MM-12-2024.pdf" },
            { id: 13, titre: "Avis aux Chargeurs DG/DFAC/SDAC/N°009/01/MM/12/2024", categorie: "Avis aux chargeurs", date: "2024-12-01", pdf_url: "assets/pdfs/Avis aux Chargeurs, Armateurs, Agents maritimes DG-DFAC-SDAC-N°009-01-MM-12-2024.pdf" },
            { id: 14, titre: "Avis aux Chargeurs - Rappel arrêté ministériel", categorie: "Avis aux chargeurs", date: "2023-12-29", pdf_url: "assets/pdfs/Avis aux Chargeurs DG-DFAC-SDAC-SIRCC-N°001-MM-12-2023 du 29 décembre 2023.pdf" },
            { id: 15, titre: "Avis aux Chargeurs - Nouveau format documents couverture fret", categorie: "Avis aux chargeurs", date: "2023-12-04", pdf_url: "assets/pdfs/Avis aux Chargeurs DG-DAJ-SDR-N°004-TN-12-2023 du 04 décembre 2023.pdf" },
            { id: 16, titre: "Avis aux Chargeurs - Libéralisation zones géographiques", categorie: "Avis aux chargeurs", date: "2023-02-28", pdf_url: "assets/pdfs/Avis aux Chargeurs sur la libéralisation des zones géographiques pour la souscription de la FERI-AD du 28 février 2023.pdf" },
            { id: 17, titre: "Avis aux Chargeurs - Réduction des frais FERI", categorie: "Avis aux chargeurs", date: "2023-02-28", pdf_url: "assets/pdfs/Avis aux Chargeurs sur la réduction des frais de la rubrique Emission de la FERI du 28 février 2023.pdf" },
            { id: 18, titre: "Avis aux chargeurs - Rappel respect arrêté ministériel", categorie: "Avis aux chargeurs", date: "2023-01-12", pdf_url: "assets/pdfs/Avis aux chargeurs sur le rappel du respect de l'arrêté ministériel n°010-CAB-VPM-MIN-TC-2019 du 22 janvier 2019.pdf" },
            { id: 19, titre: "Avis aux chargeurs - Complément d'informations FERI/AD", categorie: "Avis aux chargeurs", date: "2022-11-11", pdf_url: "assets/pdfs/Avis aux chargeurs sur le complément d'informations lors de la souscription à la FERI et à l'AD du 11 novembre 2022.pdf" },
            { id: 20, titre: "Avis aux chargeurs - Obligation prescriptions réglementaires", categorie: "Avis aux chargeurs", date: "2022-10-12", pdf_url: "assets/pdfs/Avis aux chargeurs sur l'Obligation d'observation des prescriptions réglementaires sur les documents de couverture de Fret du 12 octobre 2022.pdf" },
            { id: 21, titre: "Avis aux chargeurs - Contrat mandat AFRICA UNION CARGO", categorie: "Avis aux chargeurs", date: "2022-08-15", pdf_url: "assets/pdfs/Avis aux chargeurs relatif à la signature d'un nouveau contrat de Mandat Spécial entre l'OGEFREM et la Société AFRICA UNION CARGO NAMIBIA.pdf" },
            { id: 22, titre: "Avis aux chargeurs - Mandataire Tanzanie", categorie: "Avis aux chargeurs", date: "2022-07-20", pdf_url: "assets/pdfs/Avis aux chargeurs relatif à la désignation d'un nouveau mandataire pour la souscription de la FERI-AD pour les marchandises congolaises en transit et en provenance de la Tanzanie.pdf" },
            { id: 23, titre: "Avis aux chargeurs - Communiqué conjoint DGDA-OGEFREM", categorie: "Avis aux chargeurs", date: "2022-06-10", pdf_url: "assets/pdfs/Avis aux chargeurs relatif au communiqué conjoint DGDA-OGEFREM.pdf" },
            { id: 24, titre: "Avis aux chargeurs - Abonnement exercice 2021", categorie: "Avis aux chargeurs", date: "2021-01-15", pdf_url: "assets/pdfs/Avis aux chargeurs relatif à l'abonnement chargeurs exercice 2021.pdf" },
            { id: 25, titre: "Avis aux chargeurs - Protocole ARCA-DGDA", categorie: "Avis aux chargeurs", date: "2020-10-05", pdf_url: "assets/pdfs/Avis aux chargeurs d'octobre 2020 relatif au Protocole d'accord de collaboration entre l'ARCA et la DGDA.pdf" },
            { id: 26, titre: "Avis aux chargeurs - Création Comité National Facilitation", categorie: "Avis aux chargeurs", date: "2020-03-20", pdf_url: "assets/pdfs/Avis aux chargeurs, armateurs et agents maritimes de mars 2020 concernant création du Comité National des Facilitation.pdf" },
            { id: 27, titre: "Avis aux chargeurs - Souscription abonnement 2020", categorie: "Avis aux chargeurs", date: "2020-01-13", pdf_url: "assets/pdfs/Avis aux chargeurs sur la souscription à l'abonnement chargeur année 2020 du 13 janvier 2020.pdf" },
            { id: 28, titre: "Avis aux chargeurs - Partenariat AGENZIA GENOVESE", categorie: "Avis aux chargeurs", date: "2018-08-07", pdf_url: "assets/pdfs/Avis aux chargeurs relatif au partenariat OGEFREM-AGENZIA GENOVESE srl du 07 aout 2018.pdf" },
            { id: 29, titre: "Avis aux chargeurs - Partenariat JIANGSU GOLDEN COAST", categorie: "Avis aux chargeurs", date: "2018-08-07", pdf_url: "assets/pdfs/Avis aux chargeurs relatif au partenariat OGEFREM-JIANGSU GOLDEN COAST du 07 aout 2018.pdf" },
            { id: 30, titre: "Avis aux chargeurs - Partenariat AFRICAN UNION CARGO", categorie: "Avis aux chargeurs", date: "2018-08-01", pdf_url: "assets/pdfs/Avis aux chargeurs relatif au partenariat OGEFREM-AFRICAN UNION CARGO da aout 2018.pdf" },
            { id: 31, titre: "Avis aux chargeurs du 29 octobre 2018", categorie: "Avis aux chargeurs", date: "2018-10-29", pdf_url: "assets/pdfs/Avis aux chargeurs du 29 octobre 2018.pdf" },
            { id: 32, titre: "Avis aux chargeurs du 06 juin 2011", categorie: "Avis aux chargeurs", date: "2011-06-06", pdf_url: "assets/pdfs/Avis aux chargeurs, agents maritimes, armements, transporteurs et auxilliaires de transports, du 06 juin 2011.pdf" },
            { id: 33, titre: "Message du Ministère des Affaires étrangères FERI", categorie: "Avis aux chargeurs", date: "2019-05-01", pdf_url: "assets/pdfs/Message du Ministère des Affaires étrangères aux missions diplomatiques et consulaires de la RDCongo à l'étranger relatif à la FERI. Mai 2019.pdf" },
            { id: 34, titre: "Exécution instructions Chef de l'État FERI", categorie: "Avis aux chargeurs", date: "2019-05-06", pdf_url: "assets/pdfs/Exécution des instructions du Chef de l'Etat sur la FERI, FERE et AD du 06 mai 2019.pdf" },
            { id: 35, titre: "Interdiction importation viande porc", categorie: "Avis aux chargeurs", date: "2019-02-19", pdf_url: "assets/pdfs/Mesures d'interdiction de l'importation de la viande de porc en RDCongo, du 19 février 2019.pdf" },
            { id: 36, titre: "Note OCC fausses FERI", categorie: "Avis aux chargeurs", date: "2019-01-31", pdf_url: "assets/pdfs/Note adressée à l'OCC sur les fausses FERI du 31 janvier 2019.pdf" },
            { id: 37, titre: "Note OCC fausses FERI décembre 2018", categorie: "Avis aux chargeurs", date: "2018-12-10", pdf_url: "assets/pdfs/Note adressée à l'OCC sur les fausses FERI du 10 décembre 2018.pdf" },
            { id: 38, titre: "Instruction confidentialité mots de passe", categorie: "Avis aux chargeurs", date: "2025-02-01", pdf_url: "assets/pdfs/Instruction DG-DGIT-N° 002-MLS-02-2025 aux mandataires, concernant la confidentialité des mots de passe.pdf" },
            { id: 39, titre: "Mise au point faux site OGEFREM", categorie: "Avis aux chargeurs", date: "2025-01-27", pdf_url: "assets/pdfs/URGENT !!! - Mise au point concernant l'existence d'un faux site pour le compte de l'OGEFREM [www.ogefrem-feri-fere-da.org].pdf" },
            { id: 40, titre: "Instruction perception commission intervention", categorie: "Avis aux chargeurs", date: "2024-06-11", pdf_url: "assets/pdfs/Instruction DG-N° 002-06-2024 du 11 juin 2024 aux mandataires, concernant la perception de la commission d'intervention.pdf" },
            { id: 41, titre: "Avis de préqualification Port Sec Kasumbalesa", categorie: "Avis aux chargeurs", date: "2024-12-10", pdf_url: "assets/pdfs/Communiqué l'OGEFREM relatif à l'avis de préqualification sur le projet de concession du Port Sec de Kasumbalesa.pdf" },
            
            // ARRÊTÉS (4)
            { id: 42, titre: "Arrêté ministériel conditions d'abonnement chargeur", categorie: "Arrêtés", date: "2019-01-22", pdf_url: "assets/pdfs/Arrêté ministériel N°010/CAB/VPM/MIN/TC/2019 DU 22 JANVIER 2019 modifiant l'Arrêté départemental N°409-002-83 du 17 janvier 1983 fixant les conditions d'abonnement à l'OGEFREM.pdf" },
            { id: 43, titre: "Arrêté interministériel FERI-AD-FERE", categorie: "Arrêtés", date: "2019-01-22", pdf_url: "assets/pdfs/Arrêté interministériel Nº008-CAB-VPM-MIN-TC-2019, Nº002-CAB-MIN-ECONAT-JKN-2019, N°63-CAB-MIN.ETAT-COMEXT-2019 ET N°001-CAB-MIN-FINANCES-2019 DU 22 JANVIER 2019.pdf" },
            { id: 44, titre: "Arrêté ministériel modalités gestion fret multimodal", categorie: "Arrêtés", date: "2019-01-22", pdf_url: "assets/pdfs/Arrêté ministériel N°011/CAB/VPM/MIN/TC/2019 DU 22 JANVIER 2019 fixant les modalités de gestion du fret multimodal.pdf" },
            { id: 45, titre: "Arrêté interministériel taux commission fret multimodal", categorie: "Arrêtés", date: "2019-01-22", pdf_url: "assets/pdfs/Arrêté interministériel N°009-CAB-VPM-MIN-TC-2019, Nº003-CAB-MIN-ECONAT-JKN-2019, ET Nº002-CAB-MIN-FINANCES-2019 DU 22 JANVIER 2019.pdf" },
            
            // CIRCULAIRES (11)
            { id: 46, titre: "Mesures exécution libéralisation zones géographiques", categorie: "Circulaires", date: "2023-10-11", pdf_url: "assets/pdfs/Mesures d'exécution en rapport avec la Libéralisation des zones géographiques du 11-10-2023.pdf" },
            { id: 47, titre: "Rappel à l'ordre", categorie: "Circulaires", date: "2023-09-21", pdf_url: "assets/pdfs/Rappel à l'ordre du 21 septembre 2023.pdf" },
            { id: 48, titre: "Avis d'information", categorie: "Circulaires", date: "2023-08-16", pdf_url: "assets/pdfs/Avis d'information du 16 août 2023.pdf" },
            { id: 49, titre: "Circulaire aux transitaires et chargeurs", categorie: "Circulaires", date: "2022-04-21", pdf_url: "assets/pdfs/Circulaire adressée aux Transitaires, Agences en douane, Chargeurs, Mandataires FERI et aux Représentations OGEFREM du 21 avril 2022.pdf" },
            { id: 50, titre: "Circulaire aux mandataires FERI", categorie: "Circulaires", date: "2021-12-29", pdf_url: "assets/pdfs/Circulaire adressée aux mandataires FERI et aux Représentations OGEFREM du 29 décembre 2021.pdf" },
            { id: 51, titre: "Documents obligatoires FERI/FERE", categorie: "Circulaires", date: "2021-05-18", pdf_url: "assets/pdfs/Circulaire relative aux documents obligatoires à la souscription de la FERI, FERE et AD du 18-05-2021.pdf" },
            { id: 52, titre: "Notice to cargo shippers - Additional information", categorie: "Circulaires", date: "2018-11-07", pdf_url: "assets/pdfs/Notice to cargo shippers DG-N°007-ML-11-2018 Additional information on the management and issuance of FERI 7th November 2018.pdf" },
            { id: 53, titre: "Notice to cargo shippers - New rules", categorie: "Circulaires", date: "2018-10-29", pdf_url: "assets/pdfs/Notice to cargo shippers DG-N°006-ML-10-2018 The new rules governing the management and issuance of FERI 29th october 2018.pdf" },
            { id: 54, titre: "Circulaire souscription documents couverture fret", categorie: "Circulaires", date: "2018-08-01", pdf_url: "assets/pdfs/Circulaire relative à la souscription des documents de couverture de fret destiné aux Importateurs, Exportateurs, Transitaires, Agents maritimes et autres intervenants en matière de transport de août 2018.pdf" },
            { id: 55, titre: "Notice to cargo shippers - OGEFREM-AGENZIA GENOVESE", categorie: "Circulaires", date: "2018-07-20", pdf_url: "assets/pdfs/Notice to cargo shippers, ship owners, shipping agents DG-N°002-ML-07-2018 OGEFREM-AGENZIA GENOVESE partnership 20th jully 2018.pdf" },
            { id: 56, titre: "Note circulaire sur la FERI", categorie: "Circulaires", date: "2011-09-09", pdf_url: "assets/pdfs/Note circulaire sur la FERI, du 09-09-2011.pdf" },
            
            // GRILLES TARIFAIRES (6)
            { id: 57, titre: "Grille tarifaire commission intervention 2024", categorie: "Grilles tarifaires", date: "2024-06-11", pdf_url: "assets/pdfs/Décision N° 005 du 11 Juin 2024 portant Grille tarifaire de la commission d'intervention pour le fret maritime et de surface.pdf" },
            { id: 58, titre: "Mercuriale des taux de fret multimodal 2023", categorie: "Grilles tarifaires", date: "2023-01-01", pdf_url: "assets/pdfs/Mercuriale des taux de fret multimodal par continent et corridor 2023.pdf" },
            { id: 59, titre: "Modification grille tarifaire FERI 2023", categorie: "Grilles tarifaires", date: "2023-02-20", pdf_url: "assets/pdfs/Décision N° 004 du 20 février 2023 portant modification de la grille tarifaire FERI-AD-FERE.pdf" },
            { id: 60, titre: "Nouvelle grille tarifaire FERI 2021", categorie: "Grilles tarifaires", date: "2021-12-20", pdf_url: "assets/pdfs/Nouvelle grille tarifaire FERI-FERE et AD du 20 décembre 2021.pdf" },
            { id: 61, titre: "Grille tarifaire FERI avril 2021", categorie: "Grilles tarifaires", date: "2021-04-08", pdf_url: "assets/pdfs/Nouvelle grille tarifaire FERI, FERE et AD du 08 Avril 2021.pdf" },
            { id: 62, titre: "Grille tarifaire FERI octobre 2019", categorie: "Grilles tarifaires", date: "2019-10-28", pdf_url: "assets/pdfs/Grille tarifaire FERI, FERE et AD du 28 octobre 2019.pdf" },
            
            // AUTRES (15)
            { id: 63, titre: "Mot DG signature contrat Port Sec Kasumbalesa", categorie: "Autres", date: "2025-12-01", pdf_url: "assets/pdfs/Mot de Monsieur le Directeur Général de l'OGEFREM à l'occasion de la signature du contrat de concession du Port Sec de Kasumbalesa.pdf" },
            { id: 64, titre: "Appel d'offres Centre Hospitalier Kinshasa", categorie: "Autres", date: "2025-04-01", pdf_url: "assets/pdfs/URGENT !!! - Avis d'Appel d'Offres National (AAON).pdf" },
            { id: 65, titre: "Projet concession Port Sec Kasumbalesa", categorie: "Autres", date: "2024-12-11", pdf_url: "assets/pdfs/Projet de concession du Port Sec de Kasumbalesa (PSK).pdf" },
            { id: 66, titre: "Nouveau format documents traçabilité", categorie: "Autres", date: "2023-12-04", pdf_url: "assets/pdfs/Avis aux Chargeurs portant transmission du nouveau format des documents de traçabilité..pdf" },
            { id: 67, titre: "Appel d'offres acquisition matériels roulants", categorie: "Autres", date: "2024-07-11", pdf_url: "assets/pdfs/Avis d'Appel d'offres International sans pré-qualification.pdf" },
            { id: 68, titre: "Appel d'offres équipements informatiques", categorie: "Autres", date: "2023-04-12", pdf_url: "assets/pdfs/AVIS DAPPEL DOFFRE-INTERNATIONAL AOI-001-FMEIO-DG-NA-02-2023.pdf" },
            { id: 69, titre: "Instruction DG rappel non-respect contrat", categorie: "Autres", date: "2023-03-23", pdf_url: "assets/pdfs/Instruction DG 003-03-2023 du 23 mars 2023 portant Rappel de l'Instruction DG 001-01-2023 du 18 janvier 2023.pdf" },
            { id: 70, titre: "Cahier des charges offre service FERI", categorie: "Autres", date: "2023-01-15", pdf_url: "assets/pdfs/Cahier de charges relatifs à l'Offre de service pour l'émission des documents de couverture du fret congolais et autres droits dus à l'OGEFREM (Janvier 2023).pdf" },
            { id: 71, titre: "Libéralisation zones géographiques FERI", categorie: "Autres", date: "2023-02-28", pdf_url: "assets/pdfs/Libéralisation des zones géographique pour la souscription de la FERI-AD.pdf" },
            { id: 72, titre: "Souscription FERI Namibie Afrique du Sud", categorie: "Autres", date: "2022-10-01", pdf_url: "assets/pdfs/Souscription à la FERI dans les ports de la Namibie et de l'Afrique du sud.pdf" },
            { id: 73, titre: "Autorisations ministérielles dématérialisées GUICE", categorie: "Autres", date: "2021-09-15", pdf_url: "assets/pdfs/Autorisation et permis ministériels Import et Export – dématérialisés dans la plateforme du GUICE.pdf" },
            { id: 74, titre: "Communiqué conjoint OGEFREM-DGDA", categorie: "Autres", date: "2020-03-09", pdf_url: "assets/pdfs/Communiqué conjoint OGEFREM-DGDA du 09 mars 2020 sur la fin de la période moratoire relative à la souscription de la FERI, FERE et AD.pdf" },
            { id: 75, titre: "Création Comité National de Facilitation", categorie: "Autres", date: "2020-02-20", pdf_url: "assets/pdfs/Décision de la Direction Générale de l'OGEFREM portant création du Comité National de Facilitation.pdf" },
            { id: 76, titre: "Ordonnance création OGEFREM 1980", categorie: "Autres", date: "1980-11-12", pdf_url: "assets/pdfs/Ordonnance n°80-256 du 12 novembre 1980 portant création de l'OGEFREM.pdf" },
            { id: 77, titre: "Décret extension transport multimodal 2009", categorie: "Autres", date: "2009-12-03", pdf_url: "assets/pdfs/Décret n°09-63 du 03-12-2009 portant extension de l'OGEFREM au transport multimodal.pdf" }
        ];
    },
    
    // ==================== STATISTIQUES (4) ====================
    getStatistiques: function() {
        const saved = localStorage.getItem('ogefrem_statistiques');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            anneeCreation: 1980,
            ansExperience: 45,
            fretParAn: 500000,
            partenaires: 25
        };
    },
    
    getMessages: function() {
        const saved = localStorage.getItem('ogefrem_messages');
        return saved ? JSON.parse(saved) : [];
    },
    
    // ==================== SAUVEGARDE ====================
    saveActualites: function(data) { localStorage.setItem('ogefrem_actualites', JSON.stringify(data)); },
    saveLeaders: function(data) { localStorage.setItem('ogefrem_leaders', JSON.stringify(data)); },
    savePartenaires: function(data) { localStorage.setItem('ogefrem_partenaires', JSON.stringify(data)); },
    saveServices: function(data) { localStorage.setItem('ogefrem_services', JSON.stringify(data)); },
    saveReglementations: function(data) { localStorage.setItem('ogefrem_reglementations', JSON.stringify(data)); },
    saveStatistiques: function(data) { localStorage.setItem('ogefrem_statistiques', JSON.stringify(data)); },
    saveMessages: function(data) { localStorage.setItem('ogefrem_messages', JSON.stringify(data)); },
    
    // ==================== MESSAGES ====================
    saveMessage: function(messageData) {
        const messages = this.getMessages();
        const newMessage = { ...messageData, id: Date.now(), date: new Date().toLocaleString('fr-FR'), lu: false };
        messages.push(newMessage);
        localStorage.setItem('ogefrem_messages', JSON.stringify(messages));
        return true;
    },
    
    markMessageRead: function(messageId) {
        const messages = this.getMessages();
        const index = messages.findIndex(m => m.id === messageId);
        if (index !== -1) { messages[index].lu = true; this.saveMessages(messages); }
    },
    
    deleteMessage: function(messageId) {
        let messages = this.getMessages();
        messages = messages.filter(m => m.id !== messageId);
        this.saveMessages(messages);
    },
    
    // ==================== GESTION DES LIKES ====================
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
    
    // ==================== UTILITAIRES ====================
    exportData: function() {
        const data = {
            actualites: this.getActualites(),
            leaders: this.getLeaders(),
            partenaires: this.getPartenaires(),
            services: this.getServices(),
            reglementations: this.getReglementations(),
            statistiques: this.getStatistiques(),
            messages: this.getMessages()
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
    
    importData: function(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.actualites) this.saveActualites(data.actualites);
            if (data.leaders) this.saveLeaders(data.leaders);
            if (data.partenaires) this.savePartenaires(data.partenaires);
            if (data.services) this.saveServices(data.services);
            if (data.reglementations) this.saveReglementations(data.reglementations);
            if (data.statistiques) this.saveStatistiques(data.statistiques);
            return true;
        } catch(e) { return false; }
    },
    
    resetToDefault: function() {
        localStorage.removeItem('ogefrem_actualites');
        localStorage.removeItem('ogefrem_leaders');
        localStorage.removeItem('ogefrem_partenaires');
        localStorage.removeItem('ogefrem_services');
        localStorage.removeItem('ogefrem_reglementations');
        localStorage.removeItem('ogefrem_statistiques');
        localStorage.removeItem('ogefrem_messages');
        return true;
    }
};