<?php
// assets/php/api/data.php - API REST OGEFREM (VERSION AVEC MINISTRE ET BLOB)

require_once __DIR__ . '/config.php';

$module = $_GET['module'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

writeLog("API: $method $module");

// Gestion du _method pour PUT/DELETE via POST
if ($method === 'POST' && isset($_POST['_method'])) {
    $method = strtoupper($_POST['_method']);
}

$allowed = ['actualites', 'demandes', 'offres', 'comite', 'conseil', 'ministre'];
if (!in_array($module, $allowed, true)) {
    json_response(['success' => false, 'message' => 'Module invalide'], 400);
}

function get_table($module) {
    $tables = [
        'actualites' => 'actualites',
        'demandes' => 'demandes_transport',
        'offres' => 'offres_transport',
        'comite' => 'comite_gestion',
        'conseil' => 'conseil_administration',
        'ministre' => 'ministre_transports'
    ];
    return $tables[$module] ?? null;
}

function normalize_uploaded_files($field) {
    if (!isset($_FILES[$field])) return [];
    
    $files = $_FILES[$field];
    $result = [];

    if (!is_array($files['name'])) {
        $files = [
            'name' => [$files['name']],
            'type' => [$files['type']],
            'tmp_name' => [$files['tmp_name']],
            'error' => [$files['error']],
            'size' => [$files['size']]
        ];
    }

    foreach ($files['name'] as $i => $name) {
        if ($files['error'][$i] === UPLOAD_ERR_NO_FILE) continue;
        $result[] = [
            'name' => $name,
            'tmp_name' => $files['tmp_name'][$i],
            'error' => $files['error'][$i],
            'size' => $files['size'][$i],
            'type' => $files['type'][$i] ?? 'unknown'
        ];
    }
    
    return $result;
}

// ============================================================
// GESTION DES IMAGES D'ACTUALITÉS
// ============================================================
function save_actualite_images($pdo, $actualiteId, $files) {
    $allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $stmt = $pdo->prepare('INSERT INTO actualite_images(actualite_id, nom_fichier, type_mime, taille, ordre, donnees) VALUES (?, ?, ?, ?, ?, ?)');

    $orderStmt = $pdo->prepare('SELECT COALESCE(MAX(ordre), -1) + 1 FROM actualite_images WHERE actualite_id = ?');
    $orderStmt->execute([$actualiteId]);
    $order = (int)$orderStmt->fetchColumn();

    foreach ($files as $file) {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new RuntimeException('Échec du téléversement: ' . $file['name']);
        }
        if ($file['size'] > 10 * 1024 * 1024) {
            throw new RuntimeException('Image trop volumineuse: ' . $file['name']);
        }

        $mime = $finfo->file($file['tmp_name']);
        if (!in_array($mime, $allowedMimes, true)) {
            throw new RuntimeException('Format non autorisé: ' . $file['name']);
        }

        $binary = file_get_contents($file['tmp_name']);
        if ($binary === false) {
            throw new RuntimeException('Impossible de lire l\'image: ' . $file['name']);
        }

        $stmt->bindValue(1, $actualiteId, PDO::PARAM_INT);
        $stmt->bindValue(2, basename($file['name']), PDO::PARAM_STR);
        $stmt->bindValue(3, $mime, PDO::PARAM_STR);
        $stmt->bindValue(4, $file['size'], PDO::PARAM_INT);
        $stmt->bindValue(5, $order++, PDO::PARAM_INT);
        $stmt->bindValue(6, $binary, PDO::PARAM_LOB);
        $stmt->execute();
    }
}

// ============================================================
// GESTION DES IMAGES POUR COMITE / CONSEIL (BLOB)
// ============================================================
function save_leader_image($pdo, $table, $id, $file) {
    $allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Échec du téléversement: ' . $file['name']);
    }
    if ($file['size'] > 10 * 1024 * 1024) {
        throw new RuntimeException('Image trop volumineuse: ' . $file['name']);
    }

    $mime = $finfo->file($file['tmp_name']);
    if (!in_array($mime, $allowedMimes, true)) {
        throw new RuntimeException('Format non autorisé: ' . $file['name']);
    }

    $binary = file_get_contents($file['tmp_name']);
    if ($binary === false) {
        throw new RuntimeException('Impossible de lire l\'image: ' . $file['name']);
    }

    $stmt = $pdo->prepare("UPDATE $table SET photo_data = ?, photo_type = ?, photo_nom = ? WHERE id = ?");
    $stmt->bindValue(1, $binary, PDO::PARAM_LOB);
    $stmt->bindValue(2, $mime, PDO::PARAM_STR);
    $stmt->bindValue(3, basename($file['name']), PDO::PARAM_STR);
    $stmt->bindValue(4, $id, PDO::PARAM_INT);
    $stmt->execute();
}

// ============================================================
// GESTION DES IMAGES POUR MINISTRE (BLOB)
// ============================================================
function save_ministre_image($pdo, $id, $file) {
    $allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Échec du téléversement: ' . $file['name']);
    }
    if ($file['size'] > 10 * 1024 * 1024) {
        throw new RuntimeException('Image trop volumineuse: ' . $file['name']);
    }

    $mime = $finfo->file($file['tmp_name']);
    if (!in_array($mime, $allowedMimes, true)) {
        throw new RuntimeException('Format non autorisé: ' . $file['name']);
    }

    $binary = file_get_contents($file['tmp_name']);
    if ($binary === false) {
        throw new RuntimeException('Impossible de lire l\'image: ' . $file['name']);
    }

    $stmt = $pdo->prepare("UPDATE ministre_transports SET photo_data = ?, photo_type = ?, photo_nom = ? WHERE id = ?");
    $stmt->bindValue(1, $binary, PDO::PARAM_LOB);
    $stmt->bindValue(2, $mime, PDO::PARAM_STR);
    $stmt->bindValue(3, basename($file['name']), PDO::PARAM_STR);
    $stmt->bindValue(4, $id, PDO::PARAM_INT);
    $stmt->execute();
}

// ============================================================
// GET - RÉCUPÉRATION DES DONNÉES
// ============================================================
if ($method === 'GET') {
    // ============================================================
    // ACTUALITÉS
    // ============================================================
    if ($module === 'actualites') {
        try {
            $rows = $pdo->query('SELECT id, titre, date_publication, categorie, description, facebook_url, instagram_url, twitter_url, likes, created_at, updated_at FROM actualites ORDER BY date_publication DESC, id DESC')->fetchAll();
            
            $imgStmt = $pdo->prepare('SELECT id, nom_fichier, type_mime, taille, ordre FROM actualite_images WHERE actualite_id = ? ORDER BY ordre, id');

            $data = array_map(function($r) use ($imgStmt) {
                $imgStmt->execute([$r['id']]);
                $images = $imgStmt->fetchAll();
                
                return [
                    'id' => (int)$r['id'],
                    'titre' => $r['titre'],
                    'date' => $r['date_publication'],
                    'categorie' => $r['categorie'],
                    'description' => $r['description'],
                    'images' => array_map(function($img) {
                        return [
                            'id' => (int)$img['id'],
                            'nom' => $img['nom_fichier'],
                            'type' => $img['type_mime'],
                            'taille' => (int)$img['taille'],
                            'ordre' => (int)$img['ordre'],
                            'url' => 'assets/php/api/image.php?id=' . (int)$img['id']
                        ];
                    }, $images),
                    'facebookUrl' => $r['facebook_url'] ?? '',
                    'instagramUrl' => $r['instagram_url'] ?? '',
                    'twitterUrl' => $r['twitter_url'] ?? '',
                    'likes' => (int)$r['likes'],
                    'createdAt' => $r['created_at'],
                    'updatedAt' => $r['updated_at']
                ];
            }, $rows);
            
            json_response($data);
        } catch (PDOException $e) {
            writeLog('Erreur GET actualites: ' . $e->getMessage(), null, 'ERROR');
            json_response(['success' => false, 'message' => 'Erreur base de données'], 500);
        }
    }

    // ============================================================
    // COMITÉ - AVEC IMAGES BLOB
    // ============================================================
    if ($module === 'comite') {
        try {
            $rows = $pdo->query('SELECT id, nom, titre, message, photo_data IS NOT NULL as has_photo, photo_type, photo_nom FROM comite_gestion ORDER BY id ASC')->fetchAll();
            
            $data = array_map(function($r) {
                return [
                    'id' => (int)$r['id'],
                    'nom' => $r['nom'],
                    'titre' => $r['titre'],
                    'message' => $r['message'],
                    'has_photo' => (bool)$r['has_photo'],
                    'photo_type' => $r['photo_type'],
                    'photo_nom' => $r['photo_nom'],
                    'photo_url' => $r['has_photo'] ? 'assets/php/api/leader-image.php?table=comite_gestion&id=' . $r['id'] : null
                ];
            }, $rows);
            
            writeLog('Comité GET - Nombre de lignes: ' . count($data));
            json_response($data);
        } catch (PDOException $e) {
            writeLog('Erreur GET comite: ' . $e->getMessage(), null, 'ERROR');
            json_response(['success' => false, 'message' => 'Erreur base de données'], 500);
        }
    }

    // ============================================================
    // CONSEIL - AVEC IMAGES BLOB
    // ============================================================
    if ($module === 'conseil') {
        try {
            $rows = $pdo->query('SELECT id, nom, titre, message, photo_data IS NOT NULL as has_photo, photo_type, photo_nom FROM conseil_administration ORDER BY id ASC')->fetchAll();
            
            $data = array_map(function($r) {
                return [
                    'id' => (int)$r['id'],
                    'nom' => $r['nom'],
                    'titre' => $r['titre'],
                    'message' => $r['message'],
                    'has_photo' => (bool)$r['has_photo'],
                    'photo_type' => $r['photo_type'],
                    'photo_nom' => $r['photo_nom'],
                    'photo_url' => $r['has_photo'] ? 'assets/php/api/leader-image.php?table=conseil_administration&id=' . $r['id'] : null
                ];
            }, $rows);
            
            writeLog('Conseil GET - Nombre de lignes: ' . count($data));
            json_response($data);
        } catch (PDOException $e) {
            writeLog('Erreur GET conseil: ' . $e->getMessage(), null, 'ERROR');
            json_response(['success' => false, 'message' => 'Erreur base de données'], 500);
        }
    }

    // ============================================================
    // MINISTRE - AVEC IMAGES BLOB
    // ============================================================
    if ($module === 'ministre') {
        try {
            $stmt = $pdo->prepare('SELECT id, nom, titre, message, photo_data IS NOT NULL as has_photo, photo_type, photo_nom, updated_at FROM ministre_transports WHERE id = 1 LIMIT 1');
            $stmt->execute();
            $row = $stmt->fetch();
            
            if ($row) {
                $data = [
                    'id' => (int)$row['id'],
                    'nom' => $row['nom'],
                    'titre' => $row['titre'],
                    'message' => $row['message'],
                    'has_photo' => (bool)$row['has_photo'],
                    'photo_type' => $row['photo_type'],
                    'photo_nom' => $row['photo_nom'],
                    'photo_url' => $row['has_photo'] ? 'assets/php/api/leader-image.php?table=ministre_transports&id=' . $row['id'] : null,
                    'updated_at' => $row['updated_at']
                ];
                json_response($data);
            } else {
                // Créer l'entrée par défaut si elle n'existe pas
                $stmt = $pdo->prepare('INSERT INTO ministre_transports (id, nom, titre, message) VALUES (1, "Ministre des Transports", "Ministre des Transports", "Partenariat stratégique avec l\'OGEFREM")');
                $stmt->execute();
                json_response([
                    'id' => 1,
                    'nom' => 'Ministre des Transports',
                    'titre' => 'Ministre des Transports',
                    'message' => 'Partenariat stratégique avec l\'OGEFREM',
                    'has_photo' => false,
                    'photo_type' => null,
                    'photo_nom' => null,
                    'photo_url' => null,
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
            }
        } catch (PDOException $e) {
            writeLog('Erreur GET ministre: ' . $e->getMessage(), null, 'ERROR');
            json_response(['success' => false, 'message' => 'Erreur base de données'], 500);
        }
    }

    if ($module === 'demandes') {
        json_response($pdo->query('SELECT * FROM demandes_transport ORDER BY id DESC')->fetchAll());
    }

    if ($module === 'offres') {
        json_response($pdo->query('SELECT * FROM offres_transport ORDER BY id DESC')->fetchAll());
    }
}

// ============================================================
// LIKES
// ============================================================
if ($module === 'actualites' && $_SERVER['REQUEST_METHOD'] === 'POST' && ($_GET['action'] ?? '') === 'like') {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $id = (int)($input['id'] ?? 0);
    
    if ($id <= 0) {
        json_response(['success' => false, 'message' => 'Actualité invalide'], 400);
    }
    
    $userIdentifier = $_SERVER['REMOTE_ADDR'] ?? '';
    if (isset($_SERVER['HTTP_USER_AGENT'])) {
        $userIdentifier .= '|' . $_SERVER['HTTP_USER_AGENT'];
    }
    $userIdentifier = hash('sha256', $userIdentifier);
    
    try {
        $checkStmt = $pdo->prepare('SELECT id FROM likes WHERE actualite_id = ? AND user_identifier = ?');
        $checkStmt->execute([$id, $userIdentifier]);
        $existing = $checkStmt->fetch();
        
        if ($existing) {
            // Supprimer le like
            $deleteStmt = $pdo->prepare('DELETE FROM likes WHERE actualite_id = ? AND user_identifier = ?');
            $deleteStmt->execute([$id, $userIdentifier]);
            
            $updateStmt = $pdo->prepare('UPDATE actualites SET likes = likes - 1 WHERE id = ?');
            $updateStmt->execute([$id]);
            
            $stmt = $pdo->prepare('SELECT likes FROM actualites WHERE id = ?');
            $stmt->execute([$id]);
            $newLikes = (int)$stmt->fetchColumn();
            
            json_response([
                'success' => false, 
                'message' => 'Like retiré', 
                'already_liked' => true,
                'likes' => $newLikes
            ]);
        }
        
        // Ajouter le like
        $insertStmt = $pdo->prepare('INSERT INTO likes(actualite_id, user_identifier) VALUES (?, ?)');
        $insertStmt->execute([$id, $userIdentifier]);
        
        $updateStmt = $pdo->prepare('UPDATE actualites SET likes = likes + 1 WHERE id = ?');
        $updateStmt->execute([$id]);
        
        $stmt = $pdo->prepare('SELECT likes FROM actualites WHERE id = ?');
        $stmt->execute([$id]);
        $newLikes = (int)$stmt->fetchColumn();
        
        json_response(['success' => true, 'likes' => $newLikes]);
    } catch (PDOException $e) {
        writeLog('Erreur like: ' . $e->getMessage(), null, 'ERROR');
        json_response(['success' => false, 'message' => 'Erreur serveur'], 500);
    }
}

// ============================================================
// POST / PUT / DELETE - AUTHENTIFICATION REQUISE
// ============================================================
require_auth();

$isMultipart = strpos($_SERVER['CONTENT_TYPE'] ?? '', 'multipart/form-data') !== false;
$input = $isMultipart ? $_POST : (json_decode(file_get_contents('php://input'), true) ?: []);

// ============================================================
// ACTUALITÉS - POST / PUT
// ============================================================
if ($module === 'actualites' && in_array($method, ['POST', 'PUT'], true)) {
    $id = (int)($input['id'] ?? 0);
    $titre = trim($input['titre'] ?? '');
    $date = trim($input['date'] ?? '');
    $categorie = trim($input['categorie'] ?? '');
    $description = trim($input['description'] ?? '');
    $facebook = trim($input['facebookUrl'] ?? '');
    $instagram = trim($input['instagramUrl'] ?? '');
    $twitter = trim($input['twitterUrl'] ?? '');
    $likes = (int)($input['likes'] ?? 0);
    $replaceImages = ($input['replaceImages'] ?? '0') === '1';
    $files = normalize_uploaded_files('images');

    if ($titre === '' || $date === '' || $categorie === '' || $description === '') {
        json_response(['success' => false, 'message' => 'Titre, date, catégorie et description sont obligatoires.'], 422);
    }

    try {
        $pdo->beginTransaction();

        if ($method === 'POST') {
            $stmt = $pdo->prepare('INSERT INTO actualites(titre, date_publication, categorie, description, facebook_url, instagram_url, twitter_url, likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([$titre, $date, $categorie, $description, $facebook, $instagram, $twitter, $likes]);
            $id = (int)$pdo->lastInsertId();
            
            if (!$id) {
                throw new RuntimeException('Échec de l\'insertion');
            }
        } else {
            if ($id <= 0) {
                throw new RuntimeException('ID invalide');
            }
            
            $stmt = $pdo->prepare('UPDATE actualites SET titre=?, date_publication=?, categorie=?, description=?, facebook_url=?, instagram_url=?, twitter_url=?, likes=? WHERE id=?');
            $stmt->execute([$titre, $date, $categorie, $description, $facebook, $instagram, $twitter, $likes, $id]);

            if ($replaceImages) {
                $pdo->prepare('DELETE FROM actualite_images WHERE actualite_id = ?')->execute([$id]);
            }
        }

        if ($files) {
            save_actualite_images($pdo, $id, $files);
        }

        $pdo->commit();
        add_log($pdo, $method === 'POST' ? 'CREATE' : 'UPDATE', 'actualites', $id, 'Actualité enregistrée');
        json_response(['success' => true, 'id' => $id]);

    } catch (Throwable $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        writeLog('Erreur actualite: ' . $e->getMessage(), null, 'ERROR');
        json_response(['success' => false, 'message' => $e->getMessage()], 422);
    }
}

// ============================================================
// COMITE - POST / PUT (AVEC IMAGE BLOB)
// ============================================================
if ($module === 'comite' && in_array($method, ['POST', 'PUT'], true)) {
    $id = (int)($input['id'] ?? 0);
    $nom = trim($input['nom'] ?? '');
    $titre = trim($input['titre'] ?? '');
    $message = trim($input['message'] ?? '');
    $files = normalize_uploaded_files('photo');
    
    if ($nom === '' || $titre === '') {
        json_response(['success' => false, 'message' => 'Nom et titre sont obligatoires.'], 422);
    }
    
    try {
        if ($method === 'POST') {
            // Création
            $stmt = $pdo->prepare('INSERT INTO comite_gestion(nom, titre, message) VALUES (?, ?, ?)');
            $stmt->execute([$nom, $titre, $message]);
            $id = $pdo->lastInsertId();
            
            // Si une image est fournie
            if (!empty($files)) {
                save_leader_image($pdo, 'comite_gestion', $id, $files[0]);
            }
            
            add_log($pdo, 'CREATE', 'comite', $id, 'Membre comité ajouté');
            json_response(['success' => true, 'id' => $id]);
        } else {
            // Modification
            if ($id <= 0) {
                json_response(['success' => false, 'message' => 'ID invalide'], 400);
            }
            
            // Mettre à jour les champs texte
            $stmt = $pdo->prepare('UPDATE comite_gestion SET nom=?, titre=?, message=? WHERE id=?');
            $stmt->execute([$nom, $titre, $message, $id]);
            
            // Si une nouvelle image est fournie, remplacer
            if (!empty($files)) {
                save_leader_image($pdo, 'comite_gestion', $id, $files[0]);
            }
            
            add_log($pdo, 'UPDATE', 'comite', $id, 'Membre comité mis à jour');
            json_response(['success' => true]);
        }
    } catch (PDOException $e) {
        writeLog('Erreur comite: ' . $e->getMessage(), null, 'ERROR');
        json_response(['success' => false, 'message' => 'Erreur base de données: ' . $e->getMessage()], 500);
    }
}

// ============================================================
// CONSEIL - POST / PUT (AVEC IMAGE BLOB)
// ============================================================
if ($module === 'conseil' && in_array($method, ['POST', 'PUT'], true)) {
    $id = (int)($input['id'] ?? 0);
    $nom = trim($input['nom'] ?? '');
    $titre = trim($input['titre'] ?? '');
    $message = trim($input['message'] ?? '');
    $files = normalize_uploaded_files('photo');
    
    if ($nom === '' || $titre === '') {
        json_response(['success' => false, 'message' => 'Nom et titre sont obligatoires.'], 422);
    }
    
    try {
        if ($method === 'POST') {
            // Création
            $stmt = $pdo->prepare('INSERT INTO conseil_administration(nom, titre, message) VALUES (?, ?, ?)');
            $stmt->execute([$nom, $titre, $message]);
            $id = $pdo->lastInsertId();
            
            // Si une image est fournie
            if (!empty($files)) {
                save_leader_image($pdo, 'conseil_administration', $id, $files[0]);
            }
            
            add_log($pdo, 'CREATE', 'conseil', $id, 'Membre CA ajouté');
            json_response(['success' => true, 'id' => $id]);
        } else {
            // Modification
            if ($id <= 0) {
                json_response(['success' => false, 'message' => 'ID invalide'], 400);
            }
            
            // Mettre à jour les champs texte
            $stmt = $pdo->prepare('UPDATE conseil_administration SET nom=?, titre=?, message=? WHERE id=?');
            $stmt->execute([$nom, $titre, $message, $id]);
            
            // Si une nouvelle image est fournie, remplacer
            if (!empty($files)) {
                save_leader_image($pdo, 'conseil_administration', $id, $files[0]);
            }
            
            add_log($pdo, 'UPDATE', 'conseil', $id, 'Membre CA mis à jour');
            json_response(['success' => true]);
        }
    } catch (PDOException $e) {
        writeLog('Erreur conseil: ' . $e->getMessage(), null, 'ERROR');
        json_response(['success' => false, 'message' => 'Erreur base de données: ' . $e->getMessage()], 500);
    }
}

// ============================================================
// MINISTRE - POST / PUT (AVEC IMAGE BLOB) - Réservé SUPER ADMIN
// ============================================================
if ($module === 'ministre' && in_array($method, ['POST', 'PUT'], true)) {
    // Seul le SUPER_ADMIN peut modifier le ministre
    require_super_admin();
    
    $id = (int)($input['id'] ?? 1);
    $nom = trim($input['nom'] ?? '');
    $titre = trim($input['titre'] ?? '');
    $message = trim($input['message'] ?? '');
    $files = normalize_uploaded_files('photo');
    
    if ($nom === '' || $titre === '') {
        json_response(['success' => false, 'message' => 'Nom et titre sont obligatoires.'], 422);
    }
    
    try {
        // Vérifier si l'entrée existe
        $checkStmt = $pdo->prepare('SELECT id FROM ministre_transports WHERE id = ?');
        $checkStmt->execute([$id]);
        $exists = $checkStmt->fetch();
        
        if (!$exists) {
            $stmt = $pdo->prepare('INSERT INTO ministre_transports (id, nom, titre, message) VALUES (?, ?, ?, ?)');
            $stmt->execute([$id, $nom, $titre, $message]);
        } else {
            $stmt = $pdo->prepare('UPDATE ministre_transports SET nom=?, titre=?, message=? WHERE id=?');
            $stmt->execute([$nom, $titre, $message, $id]);
        }
        
        // Si une nouvelle image est fournie
        if (!empty($files)) {
            save_ministre_image($pdo, $id, $files[0]);
        }
        
        add_log($pdo, $method === 'POST' ? 'CREATE' : 'UPDATE', 'ministre', $id, 'Ministre mis à jour');
        json_response(['success' => true]);
    } catch (PDOException $e) {
        writeLog('Erreur ministre: ' . $e->getMessage(), null, 'ERROR');
        json_response(['success' => false, 'message' => 'Erreur base de données: ' . $e->getMessage()], 500);
    }
}

// ============================================================
// AUTRES MODULES - POST
// ============================================================
if ($method === 'POST') {
    if ($module === 'demandes') {
        $stmt = $pdo->prepare('INSERT INTO demandes_transport(marchandises, origine, destination, date_souhaitee, nom, email, telephone, statut, date_soumission) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $input['marchandises'] ?? '',
            $input['origine'] ?? '',
            $input['destination'] ?? '',
            $input['date'] ?? '',
            $input['nom'] ?? '',
            $input['email'] ?? '',
            $input['telephone'] ?? '',
            $input['statut'] ?? 'publiée',
            $input['dateSoumission'] ?? date('d/m/Y H:i')
        ]);
        $id = $pdo->lastInsertId();
        add_log($pdo, 'CREATE', $module, $id, 'Demande créée');
        json_response(['success' => true, 'id' => $id]);
    }

    if ($module === 'offres') {
        $stmt = $pdo->prepare('INSERT INTO offres_transport(titre, type, origine, destination, capacite, tarif, contact, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $input['titre'] ?? '',
            $input['type'] ?? '',
            $input['origine'] ?? '',
            $input['destination'] ?? '',
            $input['capacite'] ?? '',
            $input['tarif'] ?? '',
            $input['contact'] ?? '',
            $input['description'] ?? ''
        ]);
        $id = $pdo->lastInsertId();
        add_log($pdo, 'CREATE', $module, $id, 'Offre créée');
        json_response(['success' => true, 'id' => $id]);
    }
}

// ============================================================
// PUT - AUTRES MODULES
// ============================================================
if ($method === 'PUT') {
    $id = (int)($input['id'] ?? 0);
    if ($id <= 0) json_response(['success' => false, 'message' => 'ID invalide'], 400);

    if ($module === 'demandes') {
        $stmt = $pdo->prepare('UPDATE demandes_transport SET marchandises=?, origine=?, destination=?, date_souhaitee=?, nom=?, email=?, telephone=?, statut=?, date_soumission=? WHERE id=?');
        $stmt->execute([
            $input['marchandises'] ?? '',
            $input['origine'] ?? '',
            $input['destination'] ?? '',
            $input['date'] ?? '',
            $input['nom'] ?? '',
            $input['email'] ?? '',
            $input['telephone'] ?? '',
            $input['statut'] ?? 'publiée',
            $input['dateSoumission'] ?? '',
            $id
        ]);
        add_log($pdo, 'UPDATE', $module, $id, 'Demande mise à jour');
        json_response(['success' => true]);
    }

    if ($module === 'offres') {
        $stmt = $pdo->prepare('UPDATE offres_transport SET titre=?, type=?, origine=?, destination=?, capacite=?, tarif=?, contact=?, description=? WHERE id=?');
        $stmt->execute([
            $input['titre'] ?? '',
            $input['type'] ?? '',
            $input['origine'] ?? '',
            $input['destination'] ?? '',
            $input['capacite'] ?? '',
            $input['tarif'] ?? '',
            $input['contact'] ?? '',
            $input['description'] ?? '',
            $id
        ]);
        add_log($pdo, 'UPDATE', $module, $id, 'Offre mise à jour');
        json_response(['success' => true]);
    }
}

// ============================================================
// DELETE
// ============================================================
if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) json_response(['success' => false, 'message' => 'ID invalide'], 400);
    $table = get_table($module);
    $stmt = $pdo->prepare("DELETE FROM $table WHERE id=?");
    $stmt->execute([$id]);
    add_log($pdo, 'DELETE', $module, $id, 'Suppression');
    json_response(['success' => true]);
}

json_response(['success' => false, 'message' => 'Méthode non supportée'], 405);
?>