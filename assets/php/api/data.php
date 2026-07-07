<?php
require_once __DIR__ . '/config.php';

$module = $_GET['module'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

$allowed = ['actualites', 'demandes', 'offres', 'comite'];

if (!in_array($module, $allowed)) {
    json_response(['success' => false, 'message' => 'Module invalide'], 400);
}

function get_table($module) {
    return [
        'actualites' => 'actualites',
        'demandes' => 'demandes_transport',
        'offres' => 'offres_transport',
        'comite' => 'comite_gestion'
    ][$module];
}

if ($method === 'GET') {
    $table = get_table($module);

    if ($module === 'actualites') {
        $rows = $pdo->query("SELECT * FROM actualites ORDER BY date_publication DESC, id DESC")->fetchAll();
        $data = array_map(function($r) {
            return [
                'id' => (int)$r['id'],
                'titre' => $r['titre'],
                'date' => $r['date_publication'],
                'categorie' => $r['categorie'],
                'description' => $r['description'],
                'images' => json_decode($r['images'] ?: '[]', true),
                'facebookUrl' => $r['facebook_url'],
                'instagramUrl' => $r['instagram_url'],
                'twitterUrl' => $r['twitter_url'],
                'likes' => (int)$r['likes']
            ];
        }, $rows);
        json_response($data);
    }

    if ($module === 'demandes') {
        $rows = $pdo->query("SELECT * FROM demandes_transport ORDER BY id DESC")->fetchAll();
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
        json_response($pdo->query("SELECT * FROM offres_transport ORDER BY id DESC")->fetchAll());
    }

    if ($module === 'comite') {
        json_response($pdo->query("SELECT * FROM comite_gestion ORDER BY id ASC")->fetchAll());
    }
}

require_auth();

$input = json_decode(file_get_contents('php://input'), true);

if ($method === 'POST') {
    if ($module === 'actualites') {
        $stmt = $pdo->prepare("
            INSERT INTO actualites(titre, date_publication, categorie, description, images, facebook_url, instagram_url, twitter_url, likes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $input['titre'],
            $input['date'],
            $input['categorie'],
            $input['description'],
            json_encode($input['images'] ?? [], JSON_UNESCAPED_UNICODE),
            $input['facebookUrl'] ?? '',
            $input['instagramUrl'] ?? '',
            $input['twitterUrl'] ?? '',
            $input['likes'] ?? 0
        ]);
    }

    if ($module === 'demandes') {
        $stmt = $pdo->prepare("
            INSERT INTO demandes_transport(marchandises, origine, destination, date_souhaitee, nom, email, telephone, statut, date_soumission)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $input['marchandises'], $input['origine'], $input['destination'], $input['date'],
            $input['nom'], $input['email'] ?? '', $input['telephone'] ?? '',
            $input['statut'] ?? 'publiée', $input['dateSoumission'] ?? date('d/m/Y H:i')
        ]);
    }

    if ($module === 'offres') {
        $stmt = $pdo->prepare("
            INSERT INTO offres_transport(titre, type, origine, destination, capacite, tarif, contact, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $input['titre'], $input['type'], $input['origine'], $input['destination'],
            $input['capacite'] ?? '', $input['tarif'] ?? '', $input['contact'] ?? '', $input['description'] ?? ''
        ]);
    }

    if ($module === 'comite') {
        $stmt = $pdo->prepare("
            INSERT INTO comite_gestion(nom, titre, photo, message)
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([
            $input['nom'], $input['titre'], $input['photo'], $input['message'] ?? ''
        ]);
    }

    $id = $pdo->lastInsertId();
    add_log($pdo, 'CREATE', $module, $id, json_encode($input, JSON_UNESCAPED_UNICODE));
    json_response(['success' => true, 'id' => $id]);
}

if ($method === 'PUT') {
    $id = (int)($input['id'] ?? 0);

    if ($id <= 0) {
        json_response(['success' => false, 'message' => 'ID invalide'], 400);
    }

    if ($module === 'actualites') {
        $stmt = $pdo->prepare("
            UPDATE actualites SET titre=?, date_publication=?, categorie=?, description=?, images=?, facebook_url=?, instagram_url=?, twitter_url=?, likes=?
            WHERE id=?
        ");
        $stmt->execute([
            $input['titre'], $input['date'], $input['categorie'], $input['description'],
            json_encode($input['images'] ?? [], JSON_UNESCAPED_UNICODE),
            $input['facebookUrl'] ?? '', $input['instagramUrl'] ?? '', $input['twitterUrl'] ?? '',
            $input['likes'] ?? 0, $id
        ]);
    }

    if ($module === 'demandes') {
        $stmt = $pdo->prepare("
            UPDATE demandes_transport SET marchandises=?, origine=?, destination=?, date_souhaitee=?, nom=?, email=?, telephone=?, statut=?, date_soumission=?
            WHERE id=?
        ");
        $stmt->execute([
            $input['marchandises'], $input['origine'], $input['destination'], $input['date'],
            $input['nom'], $input['email'] ?? '', $input['telephone'] ?? '',
            $input['statut'] ?? 'publiée', $input['dateSoumission'] ?? '', $id
        ]);
    }

    if ($module === 'offres') {
        $stmt = $pdo->prepare("
            UPDATE offres_transport SET titre=?, type=?, origine=?, destination=?, capacite=?, tarif=?, contact=?, description=?
            WHERE id=?
        ");
        $stmt->execute([
            $input['titre'], $input['type'], $input['origine'], $input['destination'],
            $input['capacite'] ?? '', $input['tarif'] ?? '', $input['contact'] ?? '',
            $input['description'] ?? '', $id
        ]);
    }

    if ($module === 'comite') {
        $stmt = $pdo->prepare("
            UPDATE comite_gestion SET nom=?, titre=?, photo=?, message=?
            WHERE id=?
        ");
        $stmt->execute([
            $input['nom'], $input['titre'], $input['photo'], $input['message'] ?? '', $id
        ]);
    }

    add_log($pdo, 'UPDATE', $module, $id, json_encode($input, JSON_UNESCAPED_UNICODE));
    json_response(['success' => true]);
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    $table = get_table($module);

    $stmt = $pdo->prepare("DELETE FROM $table WHERE id=?");
    $stmt->execute([$id]);

    add_log($pdo, 'DELETE', $module, $id, 'Suppression');
    json_response(['success' => true]);
}

json_response(['success' => false, 'message' => 'Méthode non supportée'], 405);