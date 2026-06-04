// Données des règlementations avec chemins corrects
const documentsData = {
    "Avis aux chargeurs": [
        "Formulaire d’identification abonnement chargeur (Version française)",
        "Formulaire d’identification abonnement chargeur (Version anglaise / English Version)",
        "Formulaire d’identification abonnement chargeur (Version chinoise / 中文版)",
        "Formulaire d’identification abonnement chargeur (Version portugaise / Versão em português)",
        "Formulaire d’identification abonnement chargeur (Version swahili / Toleo la Kiswahili)",
        "Avis du DG de l’OGEFREM aux mandataires, chargeurs, transporteurs, transitaires, agents maritimes et autres intervenants du 22 décembre 2025",
        "Numéros de contacts des points focaux commis à la délivrance des cartes d’abonnement",
        "Avis aux Chargeurs DG/DFAC/SDAC/SIRCC/N° 005/MM/06/2025 du 11 août 2025",
        "Avis aux Chargeurs DG/DFAC/SDAC/SIRCC/N° 004/MM/06/2025 du 11 août 2025",
        "Avis aux Chargeurs et Transporteurs par voie de surface DG/DFAC/SDAC/SIRCC/N° 002/MM/02/2025 du 18 février 2025",
        "Avis aux Chargeurs DG/DFAC/SDAC/SIRCC/N° 003/MM/03/2025 du 02 avril 2025",
        "Avis aux Chargeurs et Transporteurs par voie de surface DG/DFAC/SDAC/N° 002/MM/02/2025 du 18 février 2025",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°012/01/MM/12/2024",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°011/01/MM/12/2024",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°010/01/MM/12/2024",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°009/01/MM/12/2024",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°008/01/MM/12/2024",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°007/01/MM/12/2024",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°006/01/MM/12/2024",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°005/01/MM/12/2024",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°004/01/MM/12/2024",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°003/01/MM/12/2024",
        "Avis aux Chargeurs, Armateurs, Agents maritimes DG/DFAC/SDAC/N°002/01/MM/12/2024",
        "Avis aux Chargeurs DG/DFAC/SDAC/SIRCC/N°001/MM/12/2023 du 29 décembre 2023 portant rappel du respect de l’arrêté ministériel N°010/CAB/VPM/MIN/TC/2019 du 22 Janvier 2019.",
        "Avis aux Chargeurs DG/DAJ/SDR/N°004/TN/12/2023 du 04 décembre 2023 portant transmission du nouveau format des documents de couverture de fret.",
        "Avis aux Chargeurs sur la libéralisation des zones géographiques pour la souscription de la FERI/AD du 28 février 2023",
        "Avis aux Chargeurs sur la réduction des frais de la rubrique “Emission de la FERI” du 28 février 2023",
        "Avis aux chargeurs sur le rappel du respect de l’arrêté ministériel n°010/CAB/VPM/MIN/TC/2019 du 22 janvier 2019 modifiant l’arrêté départemental n°409-002-83 du 17 janvier 1983 fixant les conditions d’abonnement à l’OGEFREM, du 12 janvier 2023",
        "Avis aux chargeurs sur le complément d’informations lors de la souscription à la FERI et à l’AD du 11 novembre 2022",
        "Avis aux chargeurs sur l’Obligation d’observation des prescriptions réglementaires sur les documents de couverture de Fret du 12 octobre 2022",
        "Avis aux chargeurs relatif à la signature d’un nouveau contrat de Mandat Spécial entre l’OGEFREM et la Société AFRICA UNION CARGO NAMIBIA (AUCN)",
        "Avis aux chargeurs relatif à la désignation d’un nouveau mandataire pour la souscription de la FERI/AD pour les marchandises congolaises en transit et en provenance de la Tanzanie",
        "Avis aux chargeurs relatif au communiqué conjoint DGDA-OGEFREM",
        "Avis aux chargeurs relatif à l’abonnement chargeurs exercice 2021",
        "Avis aux chargeurs d’octobre 2020  relatif au Protocole d’accord de collaboration entre l’Autorité de Régulation et de Contrôle des Assurances ( ARCA) et la Direction Générale des Douanes et Accises (DGDA)",
        "Avis aux chargeurs, armateurs et agents maritimes de mars 2020 concernant création du Comité National des Facilitation",
        "Avis aux chargeurs sur la souscription à l’abonnement chargeur année 2020 du 13 janvier 2020",
        "Avis aux chargeurs relatif au partenariat OGEFREM-AGENZIA GENOVESE srl du 07 aout 2018",
        "Avis aux chargeurs relatif au partenariat OGEFREM-JIANGSU GOLDEN COAST du 07 aout 2018",
        "Avis aux chargeurs relatif au partenariat OGEFREM-AFRICAN UNION CARGO da aout 2018",
        "Avis aux chargeurs du 29 octobre 2018",
        "Avis aux chargeurs, agents maritimes, armements, transporteurs et auxilliaires de transports, du 06 juin 2011"
    ],
    "Arrêtés": [
        "Arrêté Ministériel fixant les conditions d’abonnement chargeur à l’OGEFREM du 22 janvier 2019",
        "Arrêté interministériel portant souscription obligatoire de la FERI, AD et FERE du 22 janvier 2019",
        "Arrêté ministériel fixant modalités de gestion du fret multimodal du 22 janvier 2019",
        "Arrêté interministériel fixant le taux de la commission de chargement et déchargement du fret multimodal du 22 janvier 2019"
    ],
    "Circulaires": [
        "Mesures d’exécution en rapport avec la Libéralisation des zones géographiques du 11/10/2023",
        "Rappel à l’ordre du 21 septembre 2023",
        "Avis d’information du 16 août 2023",
        "Circulaire adressée aux Transitaires, Agences en douane, Chargeurs, Mandataires FERI et aux Représentations OGEFREM  du 21 avril 2022",
        "Circulaire adressée aux mandataires FERI et aux Représentations OGEFREM du 29 décembre 2021",
        "Circulaire relative aux documents obligatoires à la souscription de la FERI, FERE et AD du 18/05/2021",
        "Notice to cargo shippers DG/N°007/ML/11/2018 Additional information on the management and issuance of FERI  7th November 2018",
        "Notice to cargo shippers DG/N°006/ML/10/2018 The new rules governing the management and issuance of FERI 29th october 2018",
        "Circulaire relative à la souscription des documents de couverture de fret destiné aux Importateurs, Exportateurs, Transitaires, Agents maritimes et autres intervenants en matière de transport de août 2018",
        "Notice to cargo shippers, ship owners, shipping agents DG/N°002/ML/07/2018 OGEFREM-AGENZIA GENOVESE partnership 20th jully 2018",
        "Note circulaire sur la FERI, du 09/09/2011"
    ],
    "Grilles tarifaires": [
        "Décision N° 005 du 11 Juin 2024 portant “Grille tarifaire de la commission d’intervention pour le fret maritime et de surface”",
        "Mercuriale des taux de fret multimodal par continent et corridor 2023",
        "Décision N° 004 du 20 février 2023 portant modification de la grille tarifaire FERI-AD-FERE",
        "Nouvelle grille tarifaire FERI-FERE et AD du 20 décembre 2021",
        "Nouvelle grille tarifaire FERI, FERE et AD du 08 Avril 2021",
        "Grille tarifaire FERI, FERE et AD du 28 octobre 2019"
    ],
    "Autres": [
        "Instruction DG/DGIT/N° 002/MLS/02/2025 aux mandataires, concernant la confidentialité des mots de passe",
        "Mise au point concernant l’existence d’un faux site pour le compte de l’OGEFREM [www.ogefrem-feri-fere-da.org]",
        "Instruction DG/N° 002/06/2024 du 11 juin 2024 aux mandataires, concernant la perception de la commission d’intervention et enregistrement des transporteurs routiers",
        "Instruction DG 003-03-2023 du 23 mars 2023,  portant Rappel de l’Instruction DG 001-01-2023 du 18 janvier 2023,  relative au “Non-Respect” des termes substantiels du Contrat de Mandat Spécial",
        "Libéralisation des zones géographique pour la souscription de la FERI/AD",
        "Cahier de charges relatifs à l’Offre de service pour l’émission des documents de couverture du fret congolais et autres droits dus à l’OGEFREM (Janvier 2023)",
        "Souscription à la FERI dans les ports de la Namibie et de l’Afrique du sud",
        "Autorisation et permis ministériels Import et Export – dématérialisés dans la plateforme du GUICE",
        "Communiqué conjoint OGEFREM-DGDA du 09 mars 2020 sur la fin de la période moratoire relative à la souscription de la FERI, FERE et AD",
        "Décision de la Direction Générale de l’OGEFREM portant création du Comité National de Facilitation",
        "Message du Ministère des Affaires étrangères aux missions diplomatiques et consulaires de la RDCongo à l’étranger relatif à la FERI. Mai 2019",
        "Exécution des instructions du Chef de l’Etat sur la FERI, FERE et AD du 06 mai 2019.",
        "Mesures d’interdiction de l’importation de la viande de porc en RDCongo, du 19 février 2019",
        "Note adressée à l’OCC sur les fausses FERI du 31 janvier 2019",
        "Note adressée à l’OCC sur les fausses FERI du 10 décembre 2018"
    ]
};

// Fonction pour nettoyer le nom du fichier (remplace / par - uniquement)
function cleanFileName(fileName) {
    // Remplacer uniquement les / par -
    let clean = fileName.replace(/\//g, '-');
    return clean;
}

// Transformer en tableau plat avec catégories
let allDocuments = [];
let docId = 1;

for (const [categorie, documents] of Object.entries(documentsData)) {
    documents.forEach(doc => {
        // Garder le nom original avec tous les caractères, remplacer / par -
        const fileName = cleanFileName(doc);
        
        allDocuments.push({
            id: docId++,
            titre: doc,
            categorie: categorie,
            date: extraireDate(doc),
            resume: genererResume(doc, categorie),
            pdf_url: `assets/pdfs/reglementation/${categorie}/${fileName}.pdf`
        });
    });
}

function extraireDate(titre) {
    // Extraire la date du titre si présente
    const patterns = [
        /\b(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})\b/i,
        /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/,
        /\b(\d{4})\b/
    ];
    
    for (const pattern of patterns) {
        const match = titre.match(pattern);
        if (match) {
            if (match[1] && match[2] && match[3]) {
                return `${match[1]} ${match[2]} ${match[3]}`;
            }
            if (match[1] && match[2] && match[3] && match[1].length === 4) {
                return match[1];
            }
            if (match[1] && match[1].length === 4) {
                return match[1];
            }
        }
    }
    return "Date non spécifiée";
}

function genererResume(titre, categorie) {
    if (categorie === "Avis aux chargeurs") {
        return "Avis officiel de l'OGEFREM à destination des chargeurs concernant les procédures de fret.";
    } else if (categorie === "Arrêtés") {
        return "Arrêté ministériel ou interministériel fixant le cadre réglementaire du fret multimodal.";
    } else if (categorie === "Circulaires") {
        return "Note circulaire de l'OGEFREM pour l'information des opérateurs économiques.";
    } else if (categorie === "Grilles tarifaires") {
        return "Document officiel fixant les tarifs et barèmes applicables au fret multimodal.";
    } else {
        return "Document officiel de l'OGEFREM relatif à la réglementation du fret congolais.";
    }
}

function renderDocuments(documents) {
    const container = document.getElementById('reglementsContainer');
    const noResults = document.getElementById('noResults');
    
    if (!container) return;
    
    if (documents.length === 0) {
        container.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    if (noResults) noResults.style.display = 'none';
    
    container.innerHTML = documents.map(doc => {
        const categorieClass = doc.categorie.toLowerCase().replace(/ /g, '-').replace(/[éèê]/g, 'e');
        return `
            <div class="col-md-6 col-lg-4">
                <div class="document-card" data-id="${doc.id}">
                    <div class="doc-icon"><i class="fas fa-file-pdf"></i></div>
                    <span class="doc-badge ${categorieClass}">${doc.categorie}</span>
                    <h5>${doc.titre.substring(0, 80)}${doc.titre.length > 80 ? '...' : ''}</h5>
                    <p class="doc-date"><i class="far fa-calendar-alt"></i> ${doc.date}</p>
                    <p class="doc-resume">${doc.resume.substring(0, 100)}${doc.resume.length > 100 ? '...' : ''}</p>
                    <button class="btn btn-primary btn-sm view-pdf" data-id="${doc.id}" data-pdf="${doc.pdf_url}">
                        <i class="fas fa-eye"></i> Voir le document
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.view-pdf').forEach(btn => {
        btn.addEventListener('click', () => {
            const pdfUrl = btn.getAttribute('data-pdf');
            window.open(pdfUrl, '_blank');
        });
    });
}

// Filtres et recherche
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

if (searchInput) {
    searchInput.addEventListener('input', filterDocuments);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterDocuments();
    });
});

function filterDocuments() {
    let filtered = [...allDocuments];
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    if (activeFilter !== 'all') {
        filtered = filtered.filter(doc => doc.categorie === activeFilter);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(doc => 
            doc.titre.toLowerCase().includes(searchTerm) || 
            doc.resume.toLowerCase().includes(searchTerm) ||
            doc.categorie.toLowerCase().includes(searchTerm)
        );
    }
    
    renderDocuments(filtered);
}

// Initialisation
renderDocuments(allDocuments);