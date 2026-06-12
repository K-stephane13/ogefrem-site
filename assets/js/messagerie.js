// assets/js/messagerie.js - VERSION AVEC ENVOI EMAIL
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const fileInput = document.getElementById('fichier');
    const fileWarning = document.getElementById('fileSizeWarning');
    
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const maxSize = 5 * 1024 * 1024;
            if (this.files[0] && this.files[0].size > maxSize) {
                fileWarning.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Le fichier dépasse 5 Mo';
                fileWarning.style.color = '#dc3545';
                this.value = '';
            } else {
                fileWarning.innerHTML = '';
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const nom = document.getElementById('nom').value.trim();
            const societe = document.getElementById('societe').value.trim();
            const email = document.getElementById('email').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const categorie = document.getElementById('categorie').value;
            const objet = document.getElementById('objet').value;
            const message = document.getElementById('message').value.trim();
            
            if (!nom || !email || !categorie || !objet || !message) {
                document.getElementById('formStatus').innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> Veuillez remplir tous les champs obligatoires.
                    </div>
                `;
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                document.getElementById('formStatus').innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> Veuillez entrer une adresse email valide.
                    </div>
                `;
                return;
            }
            
            const statusDiv = document.getElementById('formStatus');
            statusDiv.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-spinner fa-pulse"></i> Envoi en cours...
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
                        type: 'contact',
                        nom: nom,
                        societe: societe,
                        email: email,
                        telephone: telephone,
                        categorie: categorie,
                        objet: objet,
                        message: message
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
                    
                    // Sauvegarde aussi dans localStorage pour l'admin
                    if (typeof AdminData !== 'undefined' && AdminData.saveMessage) {
                        AdminData.saveMessage({
                            nom: nom,
                            societe: societe,
                            email: email,
                            telephone: telephone,
                            categorie: categorie,
                            objet: objet,
                            message: message
                        });
                    }
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
                }, 5000);
                
            } catch (error) {
                console.error('Erreur:', error);
                statusDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> 
                        ❌ Erreur de connexion. Veuillez réessayer ou nous contacter par téléphone.
                    </div>
                `;
            }
        });
    }
    
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'admin/';
        });
    }
});