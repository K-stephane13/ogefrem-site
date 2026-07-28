<?php
require_once __DIR__ . '/config.php';

$module = $_GET['module'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST' && isset($_POST['_method'])) {
    $method = strtoupper($_POST['_method']);
}

$allowed = ['actualites', 'demandes', 'offres', 'comite', 'conseil'];
if (!in_array($module, $allowed, true)) {
    json_response(['success' => false, 'message' => 'Module invalide'], 400);
}

function get_table($module) {
    return [
        'actualites' => 'actualites',
        'demandes' => 'demandes_transport',
        'offres' => 'offres_transport',
        'comite' => 'comite_gestion',
        'conseil' => 'conseil_administration'
    ][$module];
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
            'size' => $files['size'][$i]
        ];
    }
    return $result;
}

function save_actualite_images(PDO $pdo, int $actualiteId, array $files): void {
    $allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $stmt = $pdo->prepare('INSERT INTO actualite_images(actualite_id, nom_fichier, type_mime, taille, ordre, donnees) VALUES (?, ?, ?, ?, ?, ?)');

    $orderStmt = $pdo->prepare('SELECT COALESCE(MAX(ordre), -1) + 1 FROM actualite_images WHERE actualite_id = ?');
    $orderStmt->execute([$actualiteId]);
    $order = (int)$orderStmt->fetchColumn();

    foreach ($files as $file) {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new RuntimeException('Échec du téléversement de l\'image : ' . $file['name']);
        }
        if ($file['size'] > 10 * 1024 * 1024) {
            throw new RuntimeException('Chaque image doit avoir une taille maximale de 10 Mo.');
        }

        $mime = $finfo->file($file['tmp_name']);
        if (!in_array($mime, $allowedMimes, true)) {
            throw new RuntimeException('Format d\'image non autorisé : ' . $file['name']);
        }

        $binary = file_get_contents($file['tmp_name']);
        if ($binary === false) {
            throw new RuntimeException('Impossible de lire l\'image : ' . $file['name']);
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

if ($method === 'GET') {
    if ($module === 'actualites') {
        $rows = $pdo->query('SELECT id, titre, date_publication, categorie, description, facebook_url, instagram_url, twitter_url, likes, created_at, updated_at FROM actualites ORDER BY date_publication DESC, id DESC')->fetchAll();
        $imgStmt = $pdo->prepare('SELECT id, nom_fichier, type_mime, taille, ordre FROM actualite_images WHERE actualite_id = ? ORDER BY ordre, id');

        $data = array_map(function($r) use ($imgStmt) {
            $imgStmt->execute([$r['id']]);
            $images = array_map(function($img) {
                return [
                    'id' => (int)$img['id'],
                    'nom' => $img['nom_fichier'],
                    'type' => $img['type_mime'],
                    'taille' => (int)$img['taille'],
                    'ordre' => (int)$img['ordre'],
                    'url' => 'assets/php/api/image.php?id=' . (int)$img['id']
                ];
            }, $imgStmt->fetchAll());

            return [
                'id' => (int)$r['id'],
                'titre' => $r['titre'],
                'date' => $r['date_publication'],
                'categorie' => $r['categorie'],
                'description' => $r['description'],
                'images' => $images,
                'facebookUrl' => $r['facebook_url'] ?? '',
                'instagramUrl' => $r['instagram_url'] ?? '',
                'twitterUrl' => $r['twitter_url'] ?? '',
                'likes' => (int)$r['likes'],
                'createdAt' => $r['created_at'],
                'updatedAt' => $r['updated_at']
            ];
        }, $rows);
        json_response($data);
    }

    if ($module === 'demandes') {
        $rows = $pdo->query('SELECT * FROM demandes_transport ORDER BY id DESC')->fetchAll();
        $data = array_map(function($r) {
            return [
                'id' => (int)$r['id'],
                'marchandises' => $r['marchandises'],
                'origine' => $r['origine'],
                'destination' => $r['destination'],
                'date' => $r['date_souhaitee'],
                'nom' => $r['nom'],
                'email' => $r['email'],
                'telephone' => $r['telephone'],
                'statut' => $r['statut'],
                'dateSoumission' => $r['date_soumission']
            ];
        }, $rows);
        json_response($data);
    }

    if ($module === 'offres') {
        json_response($pdo->query('SELECT * FROM offres_transport ORDER BY id DESC')->fetchAll());
    }

    if ($module === 'comite') {
        json_response($pdo->query('SELECT * FROM comite_gestion ORDER BY id ASC')->fetchAll());
    }

    if ($module === 'conseil') {
        json_response($pdo->query('SELECT * FROM conseil_administration ORDER BY id ASC')->fetchAll());
    }
}

// Gestion des likes
if ($module === 'actualites' && $_SERVER['REQUEST_METHOD'] === 'POST' && ($_GET['action'] ?? '') === 'like') {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $id = (int)($input['id'] ?? 0);
    if ($id <= 0) json_response(['success' => false, 'message' => 'Actualité invalide'], 400);

    $stmt = $pdo->prepare('UPDATE actualites SET likes = likes + 1 WHERE id = ?');
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) json_response(['success' => false, 'message' => 'Actualité introuvable'], 404);

    $stmt = $pdo->prepare('SELECT likes FROM actualites WHERE id = ?');
    $stmt->execute([$id]);
    json_response(['success' => true, 'likes' => (int)$stmt->fetchColumn()]);
}

require_auth();

$isMultipart = str_contains($_SERVER['CONTENT_TYPE'] ?? '', 'multipart/form-data');
$input = $isMultipart ? $_POST : (json_decode(file_get_contents('php://input'), true) ?: []);

// ===== GESTION DES ACTUALITÉS (avec images et likes) =====
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
        } else {
            if ($id <= 0) throw new RuntimeException('ID de l\'actualité invalide.');
            $stmt = $pdo->prepare('UPDATE actualites SET titre=?, date_publication=?, categorie=?, description=?, facebook_url=?, instagram_url=?, twitter_url=?, likes=? WHERE id=?');
            $stmt->execute([$titre, $date, $categorie, $description, $facebook, $instagram, $twitter, $likes, $id]);
            if ($replaceImages) {
                $pdo->prepare('DELETE FROM actualite_images WHERE actualite_id = ?')->execute([$id]);
            }
        }

        if ($files) save_actualite_images($pdo, $id, $files);
        $pdo->commit();
        add_log($pdo, $method === 'POST' ? 'CREATE' : 'UPDATE', 'actualites', $id, 'Actualité et images enregistrées dans MySQL');
        json_response(['success' => true, 'id' => $id]);
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        json_response(['success' => false, 'message' => $e->getMessage()], 422);
    }
}

// ===== GESTION DES POST (INSERTION) =====
if ($method === 'POST') {
    if ($module === 'demandes') {
        $stmt = $pdo->prepare('INSERT INTO demandes_transport(marchandises, origine, destination, date_souhaitee, nom, email, telephone, statut, date_soumission) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $input['marchandises'],
            $input['origine'],
            $input['destination'],
            $input['date'],
            $input['nom'],
            $input['email'] ?? '',
            $input['telephone'] ?? '',
            $input['statut'] ?? 'publiée',
            $input['dateSoumission'] ?? date('d/m/Y H:i')
        ]);
        $id = $pdo->lastInsertId();
        add_log($pdo, 'CREATE', $module, $id, json_encode($input, JSON_UNESCAPED_UNICODE));
        json_response(['success' => true, 'id' => $id]);
    }

    if ($module === 'offres') {
        $stmt = $pdo->prepare('INSERT INTO offres_transport(titre, type, origine, destination, capacite, tarif, contact, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $input['titre'],
            $input['type'],
            $input['origine'],
            $input['destination'],
            $input['capacite'] ?? '',
            $input['tarif'] ?? '',
            $input['contact'] ?? '',
            $input['description'] ?? ''
        ]);
        $id = $pdo->lastInsertId();
        add_log($pdo, 'CREATE', $module, $id, json_encode($input, JSON_UNESCAPED_UNICODE));
        json_response(['success' => true, 'id' => $id]);
    }

    if ($module === 'comite') {
        $stmt = $pdo->prepare('INSERT INTO comite_gestion(nom, titre, photo, message) VALUES (?, ?, ?, ?)');
        $stmt->execute([
            $input['nom'],
            $input['titre'],
            $input['photo'],
            $input['message'] ?? ''
        ]);
        $id = $pdo->lastInsertId();
        add_log($pdo, 'CREATE', $module, $id, json_encode($input, JSON_UNESCAPED_UNICODE));
        json_response(['success' => true, 'id' => $id]);
    }

    if ($module === 'conseil') {
        $stmt = $pdo->prepare('INSERT INTO conseil_administration(nom, titre, photo, message) VALUES (?, ?, ?, ?)');
        $stmt->execute([
            $input['nom'],
            $input['titre'],
            $input['photo'],
            $input['message'] ?? ''
        ]);
        $id = $pdo->lastInsertId();
        add_log($pdo, 'CREATE', $module, $id, json_encode($input, JSON_UNESCAPED_UNICODE));
        json_response(['success' => true, 'id' => $id]);
    }
}

// ===== GESTION DES PUT (MISE À JOUR) =====
if ($method === 'PUT') {
    $id = (int)($input['id'] ?? 0);
    if ($id <= 0) json_response(['success' => false, 'message' => 'ID invalide'], 400);

    if ($module === 'demandes') {
        $stmt = $pdo->prepare('UPDATE demandes_transport SET marchandises=?, origine=?, destination=?, date_souhaitee=?, nom=?, email=?, telephone=?, statut=?, date_soumission=? WHERE id=?');
        $stmt->execute([
            $input['marchandises'],
            $input['origine'],
            $input['destination'],
            $input['date'],
            $input['nom'],
            $input['email'] ?? '',
            $input['telephone'] ?? '',
            $input['statut'] ?? 'publiée',
            $input['dateSoumission'] ?? '',
            $id
        ]);
        add_log($pdo, 'UPDATE', $module, $id, json_encode($input, JSON_UNESCAPED_UNICODE));
        json_response(['success' => true]);
    }

    if ($module === 'offres') {
        $stmt = $pdo->prepare('UPDATE offres_transport SET titre=?, type=?, origine=?, destination=?, capacite=?, tarif=?, contact=?, description=? WHERE id=?');
        $stmt->execute([
            $input['titre'],
            $input['type'],
            $input['origine'],
            $input['destination'],
            $input['capacite'] ?? '',
            $input['tarif'] ?? '',
            $input['contact'] ?? '',
            $input['description'] ?? '',
            $id
        ]);
        add_log($pdo, 'UPDATE', $module, $id, json_encode($input, JSON_UNESCAPED_UNICODE));
        json_response(['success' => true]);
    }

    if ($module === 'comite') {
        $stmt = $pdo->prepare('UPDATE comite_gestion SET nom=?, titre=?, photo=?, message=? WHERE id=?');
        $stmt->execute([
            $input['nom'],
            $input['titre'],
            $input['photo'],
            $input['message'] ?? '',
            $id
        ]);
        add_log($pdo, 'UPDATE', $module, $id, json_encode($input, JSON_UNESCAPED_UNICODE));
        json_response(['success' => true]);
    }

    if ($module === 'conseil') {
        $stmt = $pdo->prepare('UPDATE conseil_administration SET nom=?, titre=?, photo=?, message=? WHERE id=?');
        $stmt->execute([
            $input['nom'],
            $input['titre'],
            $input['photo'],
            $input['message'] ?? '',
            $id
        ]);
        add_log($pdo, 'UPDATE', $module, $id, json_encode($input, JSON_UNESCAPED_UNICODE));
        json_response(['success' => true]);
    }
}

// ===== GESTION DES DELETE (SUPPRESSION) =====
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