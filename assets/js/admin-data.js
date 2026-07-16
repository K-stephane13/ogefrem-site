// assets/js/admin-data.js - VERSION SIMPLIFIÉE AVEC LES 14 NOUVELLES ACTUALITÉS
// Gère UNIQUEMENT : Actualités, Demandes, Offres, Comité (photos)

const AdminData = {
    
    // ============================================================
    // 1. ACTUALITÉS - 14 ARTICLES RÉELS (du plus récent au plus ancien)
    // ============================================================
    getActualites: function() {
        const saved = localStorage.getItem('ogefrem_actualites');
        if (saved && JSON.parse(saved).length > 0) {
            return JSON.parse(saved);
        }
        return this.getDefaultActualites();
    },
    
    getDefaultActualites: function() {
        // Classées du plus récent au plus ancien
        return [
            // 1. 09 JUILLET 2026 - Clôture des travaux du Comité Directeur de l'UCCA
            // IMAGES : 48.jpeg,49.jpeg,50.jpeg
            {
                id: 12,
                titre: "UCCA : Rideaux sur les travaux du Comité Directeur à Douala",
                date: "2026-07-09",
                categorie: "evenement",
                description: "Les travaux de la session ordinaire du Comité Directeur de l'Union des Conseils des Chargeurs Africains (UCCA) se sont officiellement achevés ce jeudi 9 juillet 2026 à Douala, en République du Cameroun, après deux jours d'intenses échanges consacrés aux enjeux du transport et de la logistique en Afrique.\n\nDans son discours de clôture, le Président en exercice de l'UCCA, M. Candide Koumou Goulas, a salué la participation active des délégations présentes et a, une fois de plus, félicité les Directeurs généraux récemment nommés à la tête de leurs Conseils des Chargeurs respectifs.\n\nLe Président de l'UCCA a souligné le caractère stratégique de cette session, organisée dans un contexte mondial marqué par les perturbations du commerce maritime international, lesquelles entraînent une hausse des coûts du fret et ont un impact direct sur le prix des biens de consommation.\n\n« Nous avons pris des engagements importants et formulé des recommandations pertinentes. Il nous appartient désormais de veiller à leur mise en œuvre effective », a-t-il déclaré, tout en réaffirmant sa confiance envers le Secrétariat général de l'organisation.\n\nM. Candide Koumou Goulas a également adressé ses remerciements au Conseil National des Chargeurs du Cameroun (CNCC), hôte de cette rencontre, pour son engagement constant en faveur du renforcement de la coopération entre les Conseils des Chargeurs africains.\n\nIl a, par ailleurs, salué l'arrivée de nouveaux membres au sein de l'UCCA, estimant que cette dynamique contribue à consolider davantage l'unité et la solidarité entre les institutions africaines chargées de la promotion et de la défense des intérêts des chargeurs.\n\nAvant la clôture officielle des travaux, le Secrétariat technique a procédé à la lecture du rapport final, des résolutions, des recommandations et des motions adoptées au cours de cette session.\n\nLa session ordinaire du Comité Directeur de l'UCCA s'est ainsi achevée sur une note de satisfaction générale, avec un engagement renouvelé des États membres à œuvrer pour une meilleure compétitivité logistique et un développement harmonieux du commerce africain.",
                images: ["assets/images/actualites/48.jpeg", "assets/images/actualites/49.jpeg", "assets/images/actualites/50.jpeg"],
                facebookUrl: "",
                instagramUrl: "",
                twitterUrl: "",
                likes: 441
            },
            
            // 2. 09 JUILLET 2026 - Le DG Olivier Tshibola échange avec ses homologues africains
            // IMAGES : 55.jpeg,56.jpeg,57.jpeg,58.jpeg
            {
                id: 14,
                titre: "OGEFREM : En marge des assises de l'UCCA, le DG Olivier Tshibola échange avec ses homologues africains",
                date: "2026-07-09",
                categorie: "partenariat",
                description: "Douala, 09 juillet 2026.\n\nLe Directeur Général de l'OGEFREM, M. Olivier Tshibola, a multiplié les rencontres de travail avec ses homologues africains, notamment ceux du Cameroun et de l'Angola, en marge de la clôture de la session ordinaire du Comité Directeur de l'Union des Conseils des Chargeurs Africains (UCCA).\n\nAu cours de son entretien avec le Directeur Général du Conseil National des Chargeurs du Cameroun (CNCC), M. Auguste Mbappé, également Trésorier de l'UCCA, les discussions ont porté sur plusieurs sujets d'intérêt commun, notamment l'ouverture d'une représentation de l'OGEFREM à Douala, le développement des plateformes logistiques ainsi que le renforcement des mécanismes de facilitation et de traçabilité du fret.\n\nCes initiatives visent à renforcer la facilitation du commerce, à améliorer la fluidité des échanges et à offrir de meilleurs services aux chargeurs d'Afrique centrale en particulier et du continent africain en général.\n\nÀ cette occasion, M. Auguste Mbappé a adressé ses sincères félicitations à M. Olivier Tshibola pour sa nomination à la tête de l'OGEFREM, saluant la confiance placée en lui par le Président de la République démocratique du Congo, Son Excellence Félix Antoine Tshisekedi Tshilombo.\n\nLe Directeur Général du CNCC a également accueilli favorablement le projet de l'OGEFREM d'ouvrir une représentation permanente au Cameroun, pays qui abrite le siège de l'UCCA, tout en réaffirmant son entière disponibilité à accompagner cette initiative. Il a en outre plaidé pour le renforcement d'une collaboration franche, dynamique et durable entre les deux Conseils des Chargeurs.\n\nAprès sa rencontre avec son homologue camerounais, le Directeur Général de l'OGEFREM a tenu une importante séance de travail avec M. Mateus Simão, administrateur de l'ARCCLA, représentant le Directeur Général de cette institution, M. Catarino Fontes.\n\nLes échanges ont porté sur le renforcement de la coopération transfrontalière entre la RDC et l'Angola, avec un accent particulier sur la modernisation du Corridor de Lobito, l'amélioration des infrastructures ferroviaires, la réduction des délais de transport des marchandises ainsi que le renforcement de la compétitivité logistique.\n\nLes deux parties ont également évoqué le mémorandum d'entente relatif au suivi élargi du fret et confirmé l'aboutissement des négociations en vue de la signature prochaine d'un accord de collaboration à Luanda.\n\nM. Mateus Simão a exprimé son intérêt pour l'expérience de l'OGEFREM dans la gestion du fret terrestre et aérien. En réponse, le Directeur Général de l'OGEFREM a marqué son accord pour la mise en œuvre d'un programme d'échange d'expériences entre les experts des deux institutions dès la signature de l'accord.\n\nCette rencontre s'est achevée par une photo de famille, symbole de fraternité, de dialogue et de coopération entre les deux institutions.",
                images: ["assets/images/actualites/55.jpeg", "assets/images/actualites/56.jpeg", "assets/images/actualites/57.jpeg", "assets/images/actualites/58.jpeg"],
                facebookUrl: "",
                instagramUrl: "",
                twitterUrl: "",
                likes: 745
            },
            
            // 3. 08 JUILLET 2026 - Ouverture de la session ordinaire du Comité Directeur de l'UCCA
            // IMAGES : 51.jpeg,52.jpeg,53.jpeg,54.jpeg
            {
                id: 13,
                titre: "UCCA : Levée des rideaux sur les travaux de la session ordinaire du Comité Directeur",
                date: "2026-07-08",
                categorie: "evenement",
                description: "Douala, 08 juillet 2026.\n\nCe mercredi 8 juillet 2026, la ville de Douala, capitale économique de la République du Cameroun, a accueilli l'ouverture des travaux de la session ordinaire du Comité Directeur de l'Union des Conseils des Chargeurs Africains (UCCA).\n\nCette rencontre, qui réunit les responsables des Conseils des Chargeurs du continent, examine sept points inscrits à l'ordre du jour, ainsi que plusieurs communications présentées par les Directeurs généraux des institutions membres.\n\nIntervenant à cette occasion, le Directeur Général de l'OGEFREM, Monsieur Olivier Tshibola Mukuma, est revenu sur le projet d'organisation à Kinshasa d'un forum international consacré à l'impact des taux de fret, des coûts et délais de passage portuaire ainsi que des surcharges sur le commerce international en Afrique.\n\nTenant compte de la récente restructuration des organes dirigeants de l'OGEFREM, il a sollicité le report de cette importante activité afin de permettre une meilleure préparation en concertation avec les autorités de tutelle.\n\nLe Directeur Général a, par ailleurs, réaffirmé l'engagement de l'OGEFREM à œuvrer, suivant la vision de Son Excellence Monsieur le Président de la République Félix Antoine Tshisekedi Tshilombo, mise en œuvre par le Ministre de Tutelle, Son Excellence le Vice-Premier Ministre Jean-Pierre Bemba, au renforcement de la collaboration entre les Conseils des Chargeurs africains, dans le but de promouvoir le commerce intra-africain, d'améliorer la compétitivité logistique du continent et de contribuer à l'intégration économique de l'Afrique.",
                images: ["assets/images/actualites/51.jpeg", "assets/images/actualites/52.jpeg", "assets/images/actualites/53.jpeg", "assets/images/actualites/54.jpeg"],
                facebookUrl: "",
                instagramUrl: "",
                twitterUrl: "",
                likes: 432
            },
            
            // 4. 26 JUIN 2026 - Conseil d'administration fixe les grandes priorités
            // IMAGES : 1.jpeg,2.jpeg,3.jpeg,4.jpeg
            {
                id: 1,
                titre: "OGEFREM : le Conseil d'administration fixe les grandes priorités de l'Office lors de sa première réunion ordinaire",
                date: "2026-06-26",
                categorie: "evenement",
                description: "Sous la présidence de l'honorable Amisi Makutano, le Conseil d'administration de l'OGEFREM a tenu, ce vendredi 26 juin 2026, sa première réunion ordinaire consacrée à l'examen des principaux dossiers relatifs à la gestion et au fonctionnement de l'établissement.\n\nAu menu des échanges figuraient notamment la communication du président du Conseil d'administration, la présentation de l'état des lieux de la Direction générale, l'évaluation de la mise en œuvre des résolutions antérieures, le niveau d'exécution du budget 2026, le rapport d'évolution de la plateforme SYGREM, la révision du cadre organique ainsi que l'examen des dossiers disciplinaires.\n\nÀ cette occasion, les différents responsables des directions concernées ont été entendus afin d'apporter des éclaircissements sur les questions soulevées par les administrateurs.\n\nLes débats ont permis de dresser un diagnostic de la situation actuelle de l'Office et d'identifier les actions prioritaires à engager pour améliorer ses performances.\n\nÀ l'issue des travaux, le Conseil d'administration a adopté plusieurs résolutions qui seront transmises à l'autorité de tutelle pour les suites requises, avant leur exécution par la Direction générale, dans le strict respect des dispositions légales et réglementaires en vigueur.\n\nCommunication / Conseil d'administration / OGEFREM",
                images: ["assets/images/actualites/1.jpeg", "assets/images/actualites/2.jpeg", "assets/images/actualites/3.jpeg", "assets/images/actualites/4.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1821GE3ptG/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DaGZXhAgicy/?img_index=9&igsh=aG5sdmxheTd6Mjlt",
                twitterUrl: "",
                likes: 975
            },
            
            // 5. 24 JUIN 2026 - OGEFREM présent aux assises B-Ready
            // IMAGES : 5.jpeg,6.jpeg,7.jpeg
            {
                id: 2,
                titre: "L'OGEFREM présent aux assises de validation de la Feuille de Route « Quick Win » B-Ready",
                date: "2026-06-24",
                categorie: "evenement",
                description: "Le Directeur Général de l'Office de Gestion du Fret Multimodal (OGEFREM), Monsieur Olivier Tshibola Mukuma, a pris part mercredi 24 Juin 2026 à la réunion du Comité de Pilotage du Groupe Thématique Climat des Affaires, Partenariat Public-Privé, Promotion des Investissements et de l'Emploi.\n\nCes assises de portée nationale ont eu lieu à l'Hôtel Rotana sous la présidence du Ministre d'État, Ministre du Plan et de la Coordination de l'Aide au Développement.\n\nElles avaient pour objectif la validation des propositions de mesures urgentes liées au projet B-Ready. Il s'agit d'un programme qui vise à moderniser l'environnement des affaires en RDC à travers des réformes devant entrer en vigueur avant septembre de l'année en cours.\n\nLes participants ont examiné l'évaluation de la Banque Mondiale qui attribue à la RDC un score de 63,61% pour son cadre réglementaire, mais seulement 26,50% pour la qualité de son service public et 46,97% pour son efficacité opérationnelle.\n\nLes conclusions des experts indiquent que le problème majeur réside dans l'application du cadre réglementaire par le service public.\n\nÀ l'issue des échanges entre les différents intervenants et experts sectoriels, la Feuille de Route « Quick Win » a été officiellement adoptée.\n\nLa rencontre s'est clôturée par le mot du Ministre d'État, Ministre du Plan, Guylain Nyembo fixant le cap sur l'échéance de septembre 2026.\n\nPRESSE OGEFREM",
                images: ["assets/images/actualites/5.jpeg", "assets/images/actualites/6.jpeg", "assets/images/actualites/7.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1XWdFuJi3D/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DaAtxBOghH-/?igsh=MW9mODV1dTZyZTEydA==",
                twitterUrl: "",
                likes: 543
            },
            
            // 6. 23 JUIN 2026 - DG échange avec le banc syndical
            // IMAGES : 8.jpeg,9.jpeg,10.jpeg,11.jpeg,12.jpeg,13.jpeg
            {
                id: 3,
                titre: "Ogefrem: Après les Directions du siège, le DG Olivier Tshibola Mukuma a échangé avec le banc syndical",
                date: "2026-06-23",
                categorie: "communique",
                description: "Dans le cadre des rencontres de prise de contact avec les différentes composantes de l'Ogefrem, le Directeur Général Me Olivier Tshibola Mukuma, assisté du Directeur Général Adjoint, Emmanuel Mayele Samba a invité ce mardi après midi les permanents syndicaux avec en tête le Président de la Délégation syndicale nationale, Monsieur Kisimba Ngoy. La rencontre a eu lieu de 15h à 16h30 dans la salle de réunions du deuxième étage de l'immeuble ogefrem.\n\nAprès la présentation de son parcours, le DG a exprimé le voeu de voir le dialogue social franc et permanent s'établir entre le banc syndical et le banc patronal qu'il représente. Pour le numéro de l'Ogefrem qui se dit être à l'écoute de tous, \"le dialogue social est le pont qui relie les divergences et construit des solutions aux différents défis de l'Ogefrem\". Ce, avant de préciser que la réussite est une affaire de tous et qu'il reste ouvert à tout échange constructif de la part du partenaire banc syndical.\n\nPour sa part, la délégation syndicale nationale a apprécié l'initiative du DG nouvellement nommé et a promis son accompagnement inconditionnel pour la réussite de son mandat. Elle a promis le moment venu de présenter son cahier des charges complet.\n\nToutefois quelques préoccupations liées aux affectations des cadres et agents venus des provinces occupées, la situation des intérims interminables et celle des agents appelés \"dispo DRH\" et tant d'autres ont été sommairement évoquées à l'attention du DG Olivier Tshibola Mukuma.\n\nCe dernier a promis des rencontres spécifiques pour examiner ensemble les préoccupations des uns et des autres au regard de la convention collective et autres textes réglementaires.\n\nSur place, il a trouvé une solution rapide au problème de mobilier qui se posait avec acuité dans le bureau de la délégation syndicale depuis plusieurs années.\n\nPresse ogefrem",
                images: ["assets/images/actualites/8.jpeg", "assets/images/actualites/9.jpeg", "assets/images/actualites/10.jpeg", "assets/images/actualites/11.jpeg", "assets/images/actualites/12.jpeg", "assets/images/actualites/13.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1RPPML9Ah5/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DZqLe3ggjcj/?img_index=5&igsh=ZW8xdXB1MDN1MDU=",
                twitterUrl: "",
                likes: 671
            },
            
            // 7. 16 JUIN 2026 - Conseil d'administration ouvre un nouveau chapitre
            // IMAGES : 14.jpeg,15.jpeg,16.jpeg,17.jpeg
            {
                id: 4,
                titre: "OGEFREM : le Conseil d'administration ouvre un nouveau chapitre de gouvernance",
                date: "2026-06-16",
                categorie: "evenement",
                description: "La toute première réunion du Conseil d'administration de l'Office de gestion du fret multimodal (OGEFREM) s'est tenue ce mardi 16 juin, sous la présidence de son PCA, Adolphe Amisi Makutano, récemment reconduit dans ses fonctions par ordonnance présidentielle.\n\nCette session inaugurale a été consacrée à la communication du Président du Conseil d'administration, à la présentation des administrateurs, à la validation de leurs mandats, ainsi qu'à l'examen et à l'adoption du projet de règlement d'ordre intérieur.\n\nOnt pris part à cette réunion Alengo Lohongo, Irenge Mukabene et Shafali Bihanze, administrateurs, Mombunza Libotolo, représentante de la tutelle, Olivier Tshibola Mukuma, Directeur général, ainsi que Nsimbi Utshudi, Secrétaire du Conseil.\n\nÀ l'issue de cette première réunion, Adolphe Amisi Makutano, Président du Conseil d'administration, et Olivier Tshibola Mukuma, membre du Conseil d'administration et Directeur général, ont souligné que les travaux se sont déroulés dans un climat serein, convivial et empreint d'un esprit de collaboration, traduisant la volonté commune de relever les défis qui attendent l'établissement.\n\nIl convient de noter que le Conseil d'administration et la Direction générale sont désormais pleinement à pied d'œuvre pour assurer la bonne gouvernance et le rayonnement de l'OGEFREM, après leur installation officielle.\n\nCommunication / Conseil d'administration OGEFREM",
                images: ["assets/images/actualites/14.jpeg", "assets/images/actualites/15.jpeg", "assets/images/actualites/16.jpeg", "assets/images/actualites/17.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/14fDe5oJPsN/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DZpysXfAlEb/?img_index=2&igsh=emUxam56amR0ZTli",
                twitterUrl: "",
                likes: 865
            },
            
            // 8. 15 JUIN 2026 - DG préside sa première réunion de Directions opérationnelles
            // IMAGES : 18.jpeg,19.jpeg,20.jpeg,21.jpeg
            {
                id: 5,
                titre: "Ogefrem: Le DG Olivier Tshibola Mukuma préside sa première réunion de Directions opérationnelles de son office",
                date: "2026-06-15",
                categorie: "evenement",
                description: "C'est dans la salle de réunions située au 2e Niveau de l'immeuble abritant le siège de l'Ogefrem que cette première réunion a été présidée par Maître Olivier Tshibola Mukuma, Directeur Général de cet Établissement, en présence du Directeur Général Adjoint, Emmanuel Mayele Samba. Y ont également pris part le Président de la délégation syndicale nationale Monsieur Kisimba et les Directeurs chargés de missions.\n\nPendant 4 heures, le patron de l'Ogefrem a écouté les exposés de 15 Directions du siège et une Entité, la DPKIN. Lesquels exposés ont porté sur les missions de chaque Direction, les défis et contraintes et les pistes de solution aux différents problèmes de fonctionnement épinglés.\n\nParmi ces Directions, on peut citer la DGFAC, la DFM, la DTFM, la DGIT, la DANTIC, la DOCG, la DAI, la DII, la DFIN, la DRH, la DRPC, la DSAERM, la DEP, la DAJ, la DSG et la DPKIN.\n\nAprès l'audition de différents exposés, le Directeur Général a salué l'engagement de ses collaborateurs et la célérité dans la production des exposés de fond et les pistes de solutions proposées. Maître Olivier Tshibola Mukuma a levé l'option d'avoir un planning pour des réunions spécifiques, sectorielles avec chaque Direction en vue de pénétrer en profondeur tous les sujets abordés en termes de goulots d'étranglement. Il en avant propos, dit sa volonté de travailler avec tout le monde et d'être à l'écoute de tous.\n\nL'itinérance dans les Entités décentralisées de l'Office en Provinces et ses Représentations à l'étranger pour le même exercice a été annoncée par le Directeur Général Olivier Tshibola Mukuma dans les prochains deux mois.\n\nPRESSE OGEFREM",
                images: ["assets/images/actualites/18.jpeg", "assets/images/actualites/19.jpeg", "assets/images/actualites/20.jpeg", "assets/images/actualites/21.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1GNDNtnxmE/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DZprtfAgh-e/?igsh=MW9jYmRpZ2dqcGN4OQ==",
                twitterUrl: "",
                likes: 729
            },
            
            // 9. 11 JUIN 2026 - Ronde du nouveau DG
            // IMAGES : 24.jpeg,25.jpeg,26.jpeg,27.jpeg,28.jpeg,29.jpeg
            {
                id: 6,
                titre: "OGEFREM : RONDE DU NOUVEAU DG À TRAVERS DIRECTIONS ET SERVICES DE L'OFFICE",
                date: "2026-06-11",
                categorie: "communique",
                description: "Le nouveau Directeur de l'Ogefrem, Maître Olivier Tshibola Mukuma, a effectué le jeudi 11 juin 2026 la ronde de quelques Directions et services de cet établissement dans la ville de Kinshasa.\n\nAprès les entretiens avec les Directeurs chefs de missions au 7e niveau de l'immeuble Boutour et la visite du centre hospitalier de l'Ogefrem, CEMOG en sigle, il s'est rendu tour à tour à la DPKIN, à la DEP et à la DSAERM. Directions et services dont les bureaux sont en dehors de l'immeuble abritant la Direction Générale. Ici, le même jeudi, il a visité les bureaux de la DRPC et de la DANTIC.\n\nPartout où il est passé, il s'est mis à l'écoute des cadres et agents sur le fonctionnement de l'office, ses défis et ses attentes. Il a promis des réunions sectorielles pour approfondir les réflexions sur les pistes de solutions aux différents problèmes.\n\nCette ronde de Directions et services intervient 24h après sa prise de fonction et se poursuivra suivant l'agenda tracé.",
                images: ["assets/images/actualites/24.jpeg", "assets/images/actualites/25.jpeg", "assets/images/actualites/26.jpeg", "assets/images/actualites/27.jpeg", "assets/images/actualites/28.jpeg", "assets/images/actualites/29.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1AJCrMJp1w/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DZpZB_0ggCy/?img_index=12&igsh=MWRjYzk3a3c0MmlxZQ==",
                twitterUrl: "",
                likes: 452
            },
            
            // 10. 10 JUIN 2026 - Passation de pouvoir DG
            // IMAGES : 30.jpeg,31.jpeg,32.jpeg,33.jpeg,34.jpeg
            {
                id: 7,
                titre: "OGEFREM : OLIVIER TSHIBOLA MUKUMA PREND OFFICIELLEMENT SES FONCTIONS DE DIRECTEUR GÉNÉRAL",
                date: "2026-06-10",
                categorie: "evenement",
                description: "La cérémonie officielle de passation de pouvoir à l'Office de Gestion du Fret Multimodal (Ogefrem) s'est tenue le 10 juin 2026 à Kinshasa, dans la salle de réunion du 2e niveau de l'immeuble abritant l'Ogefrem. Elle a été présidée par le Secrétaire Général aux Transports, Nke Sana Moko Pierrot, représentant le Vice-Premier Ministre, Ministre des Transports, Voies de Communication et Désenclavement, du Président du Conseil d'administration Amisi Makutano Adolphe, des administrateurs membres du conseil, ainsi que des directeurs, cadres et agents de l'Ogefrem.\n\nLe Directeur Général par intérim sortant, Emmanuel Mayele Samba, a dressé un bilan de ses quatre années à la tête de l'institution. Il a salué la collaboration efficace avec l'ensemble du personnel, qui a permis d'atteindre des résultats satisfaisants malgré l'immensité des défis rencontrés.\n\nLors de son discours inaugural, le Directeur Général entrant, M. Olivier Tshibola Mukuma a exprimé son engagement à diriger l'Ogefrem avec intégrité, respect et une gestion axée sur les résultats. Il a insisté sur l'importance de l'ouverture et de la cohésion au sein de l'équipe, afin de relever ensemble les défis futurs et renforcer la performance de l'organisation.\n\nCette nomination marque une étape clé dans le rayonnement de l'Ogefrem, promettant une nouvelle dynamique sous la direction du Directeur Général Olivier Tshibola Mukuma.",
                images: ["assets/images/actualites/30.jpeg", "assets/images/actualites/31.jpeg", "assets/images/actualites/32.jpeg", "assets/images/actualites/33.jpeg", "assets/images/actualites/34.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/183zP2jzJE/?mibextid=wwXIfr",
                instagramUrl: "https://www.instagram.com/p/DZpLNCkgvlB/?img_index=4&igsh=MWhtd2picTF4MTBqcQ==",
                twitterUrl: "",
                likes: 943
            },
            
            // 11. 08 JUIN 2026 - Délégation OGEFREM en Angola
            // IMAGES : 35.jpeg,36.jpeg,37.jpeg,38.jpeg
            {
                id: 8,
                titre: "UNE DÉLÉGATION D'EXPERTS DE L'OGEFREM ET DE LA CEPCOR SÉJOURNE EN ANGOLA",
                date: "2026-06-08",
                categorie: "partenariat",
                description: "C'est à Luanda, capitale de l'Angola que s'est tenu ce lundi 08 Juin 2026, une grande rencontre entre les experts et techniciens de l'Ogefrem et ceux de l'Agence Angolaise des Transports Terrestres (ANTT).\n\nL'objectif principal de ladite rencontre était d'harmoniser les vues sur les textes préalablement préparés et devant aboutir à la signature d'un accord de collaboration entre L'Ogefrem et l'ANTT, afin d'assurer un suivi plus élargi des Frets qui entrent sur le sol Congolais par l'Angola, comme on le sait tous, il s'agit d'un gros volume des Importations et Exportations qui transitent par le Corridor reliant la RDC à l'Angola.\n\nLes deux parties ont travaillé minutieusement sur tous les aspects relatifs à la mise en application de cet accord. Entre autres : Les aspects techniques, opérationnels, la consolidation de la version finale dudit accord, la définition relative aux responsabilités de chaque partie ainsi que l'implémentation de cet accord.\n\nParmi les recommandations formulées au cours de ces assises par la partie Angolaise à la RDC par l'ogefrem, nous pouvons citer notamment le Partage des informations digitalisées relatives aux mouvements des transports de deux côtés. À savoir : l'enregistrement des véhicules, l'identité des conducteurs et les types des marchandises transportées vers la RDC via l'Angola.\n\nLa partie Angolaise s'engage de son côté à identifier les camionneurs de l'Angola vers la RDC, les documents en leur possession et autres.\n\nUne autre recommandation évoquée était la tenue périodique des sessions de travail pour uniformiser toutes ces données ; surtout celles relatives aux échanges des informations techniques qui sont très importantes et celles relatives à l'identité des intervenants dans la chaîne des transports dans le cadre de cet accord.\n\nChaque partie informera à l'autre les types des véhicules qui rentrent et qui sortent de part et d'autre.\n\nLe tout, est dans le souci de répondre aux assignations fixées par la hiérarchie de l'ogefrem notamment ; assurer une large couverture de Frets en importations et exportations par nos instruments de traçabilité à savoir la Fiche Électronique des Renseignements à l'importation FERI et à l'exportation FERE ainsi que l'attestation Régionale de suivi des Cargaisons.\n\nLe critère qui a valu à la mise en accord de cette entente étant le volume très important des Frets qui passent par le Corridor RDC Angola, et ce, dans le souci de maximiser les recettes de l'ogefrem et contribuer significativement dans le trésor public.\n\nNotons que la Délégation d'experts de l'Ogefrem était conduite par Monsieur Lutundula Okadi, l'assistant Principal de Monsieur le Directeur Général.\n\nPRESSE OGEFREM.",
                images: ["assets/images/actualites/35.jpeg", "assets/images/actualites/36.jpeg", "assets/images/actualites/37.jpeg", "assets/images/actualites/38.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1BBfMgMnDt/?mibextid=wwXIfr",
                instagramUrl: "",
                twitterUrl: "",
                likes: 245
            },
            
            // 12. 02 JUIN 2026 - Visites de réconfort DG a.i.
            // IMAGES : 39.jpeg,40.jpeg,41.jpeg,42.jpeg
            {
                id: 9,
                titre: "Ogefrem: Visites de réconfort et d'inspection des structures de l'Office effectuées par le DG a.i. à Kinshasa",
                date: "2026-06-02",
                categorie: "communique",
                description: "Le Directeur Général intérimaire de l'Ogefrem, Emmanuel Mayele Samba a effectué plusieurs visites ce mardi 02 juin dans quelques structures de cet Établissement public dans la ville de Kinshasa.\n\nD'abord à la DPKIN et à la DEP, deux structures de l'Office qui fonctionnent dans le même bâtiment. Lequel bâtiment a connu un incendie à son Rez-de-chaussée il y a 48h. Il était du devoir du numéro de l'Office de se rendre compte de l'état psychologique du personnel et d'apporter réconfort. Les agents et cadres n'ont pas voulu rater l'occasion de soulever quelques préoccupations professionnelles qui ont retenu l'attention de l'Autorité qui a donné instruction aux services compétents d'y apporter solution à court, à moyen et à long terme.\n\nEnsuite, il s'est rendu au 7e niveau de l'immeuble Boutour, aile gauche, où se trouvent les Directeurs chefs de missions. Il s'est réjoui de les trouver à leurs postes avant de les exhorter à toujours donner le meilleur d'eux-mêmes pour l'Office.\n\nEnfin, c'est par le Centre Médical de l'Ogefrem, CEMOG, qu'il a fini sa visite. Il a suivi les explications du médecin Directeur sur le fonctionnement de ce centre médical et ses défis. Les instructions ont été données pour des solutions idoines.\n\nL'occasion faisant le larron, il a fait également une autre visite éclair dans les installations voisines du CPCOR, cette structure rattachée au ministère de tutelle et qui s'occupe de projets des corridors dans la Région de l'Afrique centrale.\n\nDRPC / SERCOM",
                images: ["assets/images/actualites/39.jpeg", "assets/images/actualites/40.jpeg", "assets/images/actualites/41.jpeg", "assets/images/actualites/42.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/18ecYgqx7R/?mibextid=wwXIfr",
                instagramUrl: "",
                twitterUrl: "",
                likes: 692
            },
            
            // 13. 25 MAI 2026 - Construction académie du transport multimodal à Muanda
            // IMAGES : 22.jpeg,23.jpeg
            {
                id: 10,
                titre: "Ogefrem: vers la construction d'une académie du transport multimodal à Muanda",
                date: "2026-05-25",
                categorie: "projet",
                description: "C'est la province du Kongo central qui aura le privilège d'abriter cette institution, la première en RDC.\n\nEn effet, en marge de sa mission d'itinérance dans la Direction Provinciale Ouest (DPO), le Directeur Général intérimaire Emmanuel Mayele Samba a présidé ce lundi 25 mai à Muanda la cérémonie relative à la pose de la première pierre sur le Site où sera construite cette Académie du Transport Multimodal.\n\nDeux prises de parole ont marqué cet événement. À savoir le mot de Madame Dikitele, Directrice de la DPO. Elle a circonscrit l'événement et remercié toutes les autorités politico-administratives pour leur accompagnement.\n\nEnsuite est venue la pose de la première pierre par le DG Mayele, en présence de Madame Amina Panda, AT de Muanda. Suivie de la prise de parole du DG. Il a de prime abord rendu hommages au Chef de l'État, à Madame la Première Ministre J. Suminua, au VPM JP Bemba, Autorité de tutelle de l'ogefrem, pour leur accompagnement sans faille dans la concrétisation des projets de l'ogefrem dans cette partie du pays. Lesquels projets viennent en appui aux infrastructures modernes du Port en Eaux Profondes de Banana.\n\nCellule de communication Ogefrem",
                images: ["assets/images/actualites/22.jpeg", "assets/images/actualites/23.jpeg"],
                facebookUrl: "https://www.facebook.com/share/p/1DhLXSoZgn/?mibextid=wwXIfr",
                instagramUrl: "",
                twitterUrl: "",
                likes: 534
            },
            
            // 14. 18 MAI 2026 - Conseil d'administration en mission au Kongo Central
            // IMAGES : 43.jpeg,44.jpeg,45.jpeg,46.jpeg
            {
                id: 11,
                titre: "OGEFREM : Le Conseil d'administration en mission d'itinérance au Kongo Central",
                date: "2026-05-18",
                categorie: "evenement",
                description: "Sous la vision du Président de la République, Félix Antoine Tshisekedi Tshilombo, et suivant les orientations de l'autorité de tutelle, Jean-Pierre Bemba Gombo, matérialisées par le Conseil d'administration de l'Office de Gestion du Fret Multimodal (OGEFREM), sous l'égide de son Président du Conseil d'administration (PCA), l'honorable Amisi Makutano, une équipe composée de la représentante de la tutelle, Anny Mombunza Libotolo, de l'administrateur Ngala Mulumu Mubengayi, de plusieurs directeurs, notamment Mami Mami de la DRH et Matuku de la DOCG, ainsi que de plusieurs cadres et agents, poursuit sa dynamique de proximité et de suivi des activités sur le terrain.\n\nLa grande équipe du Conseil d'administration de l'OGEFREM est arrivée le lundi 18 mai à Moanda dans le cadre d'une mission de prospection et du lancement de plusieurs projets liés aux terrains acquis par l'Office, sur lesquels seront érigées des infrastructures de facilitation destinées aux chargeurs, notamment des aires de stationnement et un port sec visant à faciliter leurs activités dans le Kongo Central.\n\nEn cours de route, la délégation du Conseil d'administration conduite par son PCA, l'honorable Amisi Makutano, a été chaleureusement accueillie par Madame Claire Dikitele Bwisi, Directrice Provinciale Ouest (DPO), accompagnée de plusieurs cadres et agents de cette institution.\n\nArrivée à Kenge, la délégation conduite par le PCA Amisi Makutano, accompagnée de la Direction provinciale de l'OGEFREM Kongo Central, s'est rendue directement sur le terrain de 10 hectares acquis par l'Office, situé à Kenge, à environ 35 kilomètres de Matadi.\n\nAprès une inspection approfondie du site, plusieurs orientations ont été données par la délégation afin d'assurer une gestion optimale et une meilleure exploitation de cet espace stratégique.\n\nIl convient de signaler que cette mission d'itinérance a débuté à Moanda et se poursuivra à Boma, Matadi et Lufu, avec pour objectif de s'assurer de la mise en application des décisions et orientations prises par le Conseil d'administration et exécutées par la Direction générale, dans l'intérêt du développement et du bon fonctionnement de l'Office.\n\nCette tournée témoigne de la volonté du Conseil d'administration de l'OGEFREM de renforcer le suivi de proximité, d'améliorer les conditions de travail et de s'assurer du bon fonctionnement des services.\n\nCommunication / Conseil d'administration OGEFREM",
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