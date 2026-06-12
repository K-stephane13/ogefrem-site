<?php
// assets/php/send-mail.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// ==================== CONFIGURATION ====================
// EMAIL DE LA DIRECTION GÉNÉRALE - À MODIFIER AVEC LE VRAI EMAIL
$ADMIN_EMAIL = "direction@ogefrem.cd";
$ADMIN_NAME = "Direction Générale OGEFREM";

// ==================== FONCTIONS ====================
function sendEmail($to, $subject, $message, $from_email, $from_name) {
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . $from_name . " <" . $from_email . ">\r\n";
    $headers .= "Reply-To: " . $from_email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    return mail($to, $subject, $message, $headers);
}

function sendEmailSMTP($to, $subject, $message, $from_email, $from_name) {
    // Alternative avec SMTP (si mail() ne fonctionne pas)
    // Décommentez et configurez si nécessaire
    /*
    require_once 'PHPMailer/PHPMailer.php';
    require_once 'PHPMailer/SMTP.php';
    require_once 'PHPMailer/Exception.php';
    
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // ou votre serveur SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'votre-email@gmail.com';
    $mail->Password = 'votre-mot-de-passe';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    
    $mail->setFrom($from_email, $from_name);
    $mail->addAddress($to);
    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body = $message;
    
    return $mail->send();
    */
    return sendEmail($to, $subject, $message, $from_email, $from_name);
}

// ==================== TRAITEMENT ====================
$input = json_decode(file_get_contents('php://input'), true);
$type = $input['type'] ?? '';

if ($type === 'contact') {
    // ===== FORMULAIRE DE CONTACT (messagerie.html) =====
    $nom = htmlspecialchars($input['nom'] ?? '');
    $societe = htmlspecialchars($input['societe'] ?? '');
    $email = htmlspecialchars($input['email'] ?? '');
    $telephone = htmlspecialchars($input['telephone'] ?? '');
    $categorie = htmlspecialchars($input['categorie'] ?? '');
    $objet = htmlspecialchars($input['objet'] ?? '');
    $message_content = htmlspecialchars($input['message'] ?? '');
    
    // Validation
    if (empty($nom) || empty($email) || empty($message_content) || empty($categorie) || empty($objet)) {
        echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Veuillez entrer une adresse email valide']);
        exit;
    }
    
    // Construction du message HTML
    $subject = "[OGEFREM - Contact] " . $objet . " - " . $nom;
    $html_message = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='UTF-8'></head>
    <body style='font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;'>
        <div style='max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);'>
            <div style='background: linear-gradient(135deg, #003399, #0066CC); padding: 25px; text-align: center;'>
                <h2 style='color: #FFCC00; margin: 0;'>📬 NOUVEAU MESSAGE DE CONTACT</h2>
                <p style='color: white; margin: 10px 0 0;'>Formulaire de contact - Site OGEFREM</p>
            </div>
            <div style='padding: 25px;'>
                <p><strong>📅 Date :</strong> " . date('d/m/Y H:i:s') . "</p>
                <hr style='margin: 15px 0; border-color: #eee;'>
                <h3 style='color: #003399;'>👤 Informations de l'expéditeur</h3>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr><td style='padding: 8px 0;'><strong>Nom :</strong></td><td>" . $nom . "</td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Société :</strong></td><td>" . ($societe ?: '<em>Non renseigné</em>') . "</td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Email :</strong></td><td><a href='mailto:" . $email . "'>" . $email . "</a></td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Téléphone :</strong></td><td>" . ($telephone ?: '<em>Non renseigné</em>') . "</td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Catégorie :</strong></td><td>" . $categorie . "</td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Objet :</strong></td><td>" . $objet . "</td></tr>
                </table>
                <hr style='margin: 15px 0; border-color: #eee;'>
                <h3 style='color: #003399;'>✉️ Message</h3>
                <div style='background: #f8f9fa; padding: 15px; border-radius: 10px; border-left: 4px solid #FFCC00;'>
                    " . nl2br($message_content) . "
                </div>
                <hr style='margin: 15px 0; border-color: #eee;'>
                <p style='font-size: 12px; color: #666; text-align: center;'>Cet email a été envoyé depuis le formulaire de contact du site OGEFREM.</p>
            </div>
        </div>
    </body>
    </html>";
    
    // Email de confirmation pour l'utilisateur
    $user_subject = "[OGEFREM] Confirmation de réception de votre message";
    $user_message = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='UTF-8'></head>
    <body style='font-family: Arial, sans-serif; padding: 20px;'>
        <div style='max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 25px; border: 1px solid #ddd;'>
            <div style='text-align: center;'>
                <img src='https://www.ogefrem.cd/assets/images/ogefrem_logo2.png' alt='OGEFREM' style='height: 60px;'>
                <h2 style='color: #003399;'>Confirmation de réception</h2>
            </div>
            <p>Bonjour <strong>" . $nom . "</strong>,</p>
            <p>Nous accusons réception de votre message envoyé le " . date('d/m/Y à H:i') . ".</p>
            <p>Notre équipe vous répondra dans les meilleurs délais.</p>
            <hr style='margin: 20px 0;'>
            <p style='font-size: 12px; color: #666;'>OGEFREM - Office de Gestion du Fret Multimodal</p>
        </div>
    </body>
    </html>";
    
    // Envoi des emails
    $admin_sent = sendEmailSMTP($ADMIN_EMAIL, $subject, $html_message, $email, $nom);
    $user_sent = sendEmailSMTP($email, $user_subject, $user_message, $ADMIN_EMAIL, $ADMIN_NAME);
    
    if ($admin_sent) {
        echo json_encode([
            'success' => true, 
            'message' => '✅ Votre message a été envoyé avec succès à la Direction Générale. Vous recevrez une confirmation par email.'
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => '❌ Une erreur technique est survenue. Veuillez réessayer ou nous contacter par téléphone.'
        ]);
    }
    
} elseif ($type === 'demande_transport') {
    // ===== DEMANDE DE TRANSPORT (demandes-transport.html) =====
    $marchandises = htmlspecialchars($input['marchandises'] ?? '');
    $quantite = htmlspecialchars($input['quantite'] ?? '');
    $origine = htmlspecialchars($input['origine'] ?? '');
    $destination = htmlspecialchars($input['destination'] ?? '');
    $date_demande = htmlspecialchars($input['date'] ?? '');
    $complement = htmlspecialchars($input['complement'] ?? '');
    $nom = htmlspecialchars($input['nom'] ?? '');
    $email = htmlspecialchars($input['email'] ?? '');
    $telephone = htmlspecialchars($input['telephone'] ?? '');
    $societe = htmlspecialchars($input['societe'] ?? '');
    
    // Validation
    if (empty($marchandises) || empty($quantite) || empty($origine) || empty($destination) || empty($nom) || empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Veuillez entrer une adresse email valide']);
        exit;
    }
    
    // Construction du message HTML pour l'admin
    $subject = "[OGEFREM - Demande Transport] " . $marchandises . " - " . $origine . " → " . $destination;
    $html_message = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='UTF-8'></head>
    <body style='font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;'>
        <div style='max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);'>
            <div style='background: linear-gradient(135deg, #003399, #0066CC); padding: 25px; text-align: center;'>
                <h2 style='color: #FFCC00; margin: 0;'>🚚 NOUVELLE DEMANDE DE TRANSPORT</h2>
                <p style='color: white; margin: 10px 0 0;'>À VALIDER AVANT PUBLICATION</p>
            </div>
            <div style='padding: 25px;'>
                <p><strong>📅 Date de soumission :</strong> " . date('d/m/Y H:i:s') . "</p>
                <hr style='margin: 15px 0; border-color: #eee;'>
                
                <h3 style='color: #003399;'>📦 Détails de la cargaison</h3>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr><td style='padding: 8px 0;'><strong>Marchandises :</strong></td><td>" . $marchandises . "</td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Quantité (tonnes) :</strong></td><td>" . $quantite . " t</td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Origine :</strong></td><td>" . $origine . "</td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Destination :</strong></td><td>" . $destination . "</td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Date souhaitée :</strong></td><td>" . date('d/m/Y', strtotime($date_demande)) . "</td></tr>
                </table>
                
                <hr style='margin: 15px 0; border-color: #eee;'>
                <h3 style='color: #003399;'>👤 Informations du demandeur</h3>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr><td style='padding: 8px 0;'><strong>Nom :</strong></td><td>" . $nom . "</td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Société :</strong></td><td>" . ($societe ?: '<em>Non renseigné</em>') . "</td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Email :</strong></td><td><a href='mailto:" . $email . "'>" . $email . "</a></td></tr>
                    <tr><td style='padding: 8px 0;'><strong>Téléphone :</strong></td><td>" . ($telephone ?: '<em>Non renseigné</em>') . "</td></tr>
                </table>
                
                " . ($complement ? "
                <hr style='margin: 15px 0; border-color: #eee;'>
                <h3 style='color: #003399;'>📝 Informations complémentaires</h3>
                <div style='background: #f8f9fa; padding: 15px; border-radius: 10px;'>
                    " . nl2br($complement) . "
                </div>
                " : "") . "
                
                <hr style='margin: 15px 0; border-color: #eee;'>
                <div style='background: #fff3cd; padding: 15px; border-radius: 10px; border-left: 4px solid #ffc107;'>
                    <strong>⚠️ ACTION REQUISE :</strong>
                    <ul style='margin: 10px 0 0 20px;'>
                        <li>Vérifier les informations du demandeur</li>
                        <li>Valider la demande avant publication sur le site</li>
                        <li>Contacter le transporteur approprié</li>
                    </ul>
                </div>
            </div>
        </div>
    </body>
    </html>";
    
    // Email de confirmation pour l'utilisateur
    $user_subject = "[OGEFREM] Confirmation de votre demande de transport";
    $user_message = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='UTF-8'></head>
    <body style='font-family: Arial, sans-serif; padding: 20px;'>
        <div style='max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 25px; border: 1px solid #ddd;'>
            <div style='text-align: center;'>
                <img src='https://www.ogefrem.cd/assets/images/ogefrem_logo2.png' alt='OGEFREM' style='height: 60px;'>
                <h2 style='color: #003399;'>Confirmation de votre demande</h2>
            </div>
            <p>Bonjour <strong>" . $nom . "</strong>,</p>
            <p>Nous avons bien reçu votre demande de transport pour <strong>" . $marchandises . "</strong> (" . $quantite . " tonnes) de <strong>" . $origine . "</strong> vers <strong>" . $destination . "</strong>.</p>
            <p>Notre équipe va étudier votre demande et la publiera prochainement sur notre plateforme.</p>
            <p>Vous serez contacté par les transporteurs intéressés.</p>
            <hr style='margin: 20px 0;'>
            <p style='font-size: 12px; color: #666;'>OGEFREM - Office de Gestion du Fret Multimodal</p>
        </div>
    </body>
    </html>";
    
    // Envoi des emails
    $admin_sent = sendEmailSMTP($ADMIN_EMAIL, $subject, $html_message, $email, $nom);
    $user_sent = sendEmailSMTP($email, $user_subject, $user_message, $ADMIN_EMAIL, $ADMIN_NAME);
    
    if ($admin_sent) {
        echo json_encode([
            'success' => true, 
            'message' => '✅ Votre demande de transport a été envoyée avec succès. Vous recevrez une confirmation par email. Notre équipe validera votre demande avant publication.'
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => '❌ Une erreur technique est survenue. Veuillez réessayer ou nous contacter par téléphone.'
        ]);
    }
    
} else {
    echo json_encode(['success' => false, 'message' => 'Type de requête invalide']);
}
?>