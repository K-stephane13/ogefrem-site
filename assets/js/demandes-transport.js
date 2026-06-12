// assets/js/demandes-transport.js - Gestion des demandes de transport
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('demandeForm');
    const statusDiv = document.getElementById('demandeStatus');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Récupération des données
            const marchandises = document.getElementById('marchandises').value.trim();
            const quantite = document.getElementById('quantite').value.trim();
            const origine = document.getElementById('origine').value.trim();
            const destination = document.getElementById('destination').value.trim();
            const date = document.getElementById('date').value;
            const societe = document.getElementById('societe').value.trim();
            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const complement = document.getElementById('complement').value.trim();
            
            // Validation
            if (!marchandises || !quantite || !origine || !destination || !date || !nom || !email) {
                statusDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> Veuillez remplir tous les champs obligatoires.
                    </div>
                `;
                return;
            }
            
            if (quantite <= 0 || isNaN(quantite)) {
                statusDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> Veuillez entrer une quantité valide.
                    </div>
                `;
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                statusDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> Veuillez entrer une adresse email valide.
                    </div>
                `;
                return;
            }
            
            // Affichage du chargement
            statusDiv.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-spinner fa-pulse"></i> Envoi de votre demande en cours...
                </div>
            `;
            
            try {
                // Envoi au serveur PHP
                const response = await fetch('../assets/php/send-mail.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: 'demande_transport',
                        marchandises: marchandises,
                        quantite: quantite,
                        origine: origine,
                        destination: destination,
                        date: date,
                        societe: societe,
                        nom: nom,
                        email: email,
                        telephone: telephone,
                        complement: complement
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    statusDiv.innerHTML = `
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle"></i> 
                            ${result.message}
                        </div>
                    `;
                    form.reset();
                    
                    // Sauvegarde dans localStorage pour l'admin
                    const demandeData = {
                        marchandises: marchandises,
                        quantite: quantite,
                        origine: origine,
                        destination: destination,
                        date: date,
                        societe: societe,
                        nom: nom,
                        email: email,
                        telephone: telephone,
                        complement: complement,
                        dateSoumission: new Date().toLocaleString('fr-FR'),
                        statut: 'en_attente'
                    };
                    
                    let demandes = JSON.parse(localStorage.getItem('ogefrem_demandes_transport') || '[]');
                    demandes.unshift({ ...demandeData, id: Date.now() });
                    localStorage.setItem('ogefrem_demandes_transport', JSON.stringify(demandes.slice(0, 50)));
                    
                } else {
                    statusDiv.innerHTML = `
                        <div class="alert alert-danger">
                            <i class="fas fa-exclamation-circle"></i> 
                            ${result.message}
                        </div>
                    `;
                }
                
                setTimeout(() => {
                    if (statusDiv.innerHTML.includes('succès')) {
                        statusDiv.innerHTML = '';
                    }
                }, 8000);
                
            } catch (error) {
                console.error('Erreur:', error);
                statusDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> 
                        ❌ Erreur de connexion. Veuillez réessayer ou nous contacter au +243 81 641 85 65.
                    </div>
                `;
            }
        });
    }
});