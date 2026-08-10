<?php
// assets/php/api/users.php
require_once __DIR__ . '/config.php';
require_super_admin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $users = $pdo->query("SELECT id, nom, username, role, actif, created_at FROM users ORDER BY id DESC")->fetchAll();
    json_response(['success' => true, 'users' => $users]);
}

$data = json_decode(file_get_contents('php://input'), true);

// ============================================================
// ACTION : CHANGEMENT DE MOT DE PASSE / IDENTIFIANT
// ============================================================
if ($method === 'POST' && ($_GET['action'] ?? '') === 'change_password') {
    $username = $data['username'] ?? '';
    $newUsername = $data['new_username'] ?? '';
    $currentPassword = $data['current_password'] ?? '';
    $newPassword = $data['new_password'] ?? null;
    
    if (empty($username) || empty($currentPassword)) {
        json_response(['success' => false, 'message' => 'Identifiant et mot de passe actuel requis'], 400);
    }
    
    if (empty($newUsername)) {
        json_response(['success' => false, 'message' => 'Le nouvel identifiant ne peut pas être vide'], 400);
    }
    
    // Vérifier l'utilisateur
    $stmt = $pdo->prepare("SELECT id, username, password_hash FROM users WHERE username = ? AND actif = 1 LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($currentPassword, $user['password_hash'])) {
        json_response(['success' => false, 'message' => 'Identifiant ou mot de passe actuel incorrect'], 401);
    }
    
    // Vérifier si le nouvel identifiant n'est pas déjà pris (si différent)
    if ($newUsername !== $username) {
        $checkStmt = $pdo->prepare("SELECT id FROM users WHERE username = ? AND id != ? LIMIT 1");
        $checkStmt->execute([$newUsername, $user['id']]);
        if ($checkStmt->fetch()) {
            json_response(['success' => false, 'message' => 'Cet identifiant est déjà utilisé par un autre utilisateur'], 400);
        }
    }
    
    // Construire la requête de mise à jour
    $updates = [];
    $params = [];
    
    // Mettre à jour l'identifiant
    $updates[] = "username = ?";
    $params[] = $newUsername;
    
    // Mettre à jour le mot de passe si fourni
    if (!empty($newPassword)) {
        if (strlen($newPassword) < 4) {
            json_response(['success' => false, 'message' => 'Le nouveau mot de passe doit contenir au moins 4 caractères'], 400);
        }
        $updates[] = "password_hash = ?";
        $params[] = password_hash($newPassword, PASSWORD_DEFAULT);
    }
    
    $params[] = $user['id'];
    $sql = "UPDATE users SET " . implode(", ", $updates) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    add_log($pdo, 'CHANGE_PASSWORD', 'users', $user['id'], "Utilisateur {$username} a changé ses identifiants");
    
    json_response([
        'success' => true, 
        'message' => 'Identifiants mis à jour avec succès',
        'new_username' => $newUsername !== $username
    ]);
}

// ============================================================
// ACTION : RÉINITIALISATION DU MOT DE PASSE PAR SUPER ADMIN
// ============================================================
if ($method === 'POST' && ($_GET['action'] ?? '') === 'reset_password') {
    $id = (int)($data['id'] ?? 0);
    
    if ($id <= 0) {
        json_response(['success' => false, 'message' => 'ID utilisateur invalide'], 400);
    }
    
    // Vérifier que l'utilisateur existe
    $stmt = $pdo->prepare("SELECT id, username FROM users WHERE id = ? AND actif = 1 LIMIT 1");
    $stmt->execute([$id]);
    $user = $stmt->fetch();
    
    if (!$user) {
        json_response(['success' => false, 'message' => 'Utilisateur non trouvé ou désactivé'], 404);
    }
    
    // Générer un mot de passe temporaire (8 caractères alphanumériques)
    $newPassword = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 8);
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE id = ?");
    $stmt->execute([$hashedPassword, $id]);
    
    add_log($pdo, 'RESET_PASSWORD', 'users', $id, "Mot de passe réinitialisé pour l'utilisateur {$user['username']} par Super Admin");
    
    json_response([
        'success' => true,
        'message' => 'Mot de passe réinitialisé avec succès',
        'new_password' => $newPassword
    ]);
}

// ============================================================
// CRÉATION D'UN NOUVEL UTILISATEUR
// ============================================================
if ($method === 'POST' && !isset($_GET['action'])) {
    $nom = trim($data['nom'] ?? '');
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';
    $role = $data['role'] ?? 'ADMIN';
    
    // Validation
    if (empty($nom) || empty($username) || empty($password)) {
        json_response(['success' => false, 'message' => 'Nom, identifiant et mot de passe sont requis'], 400);
    }
    
    if (strlen($password) < 4) {
        json_response(['success' => false, 'message' => 'Le mot de passe doit contenir au moins 4 caractères'], 400);
    }
    
    // Vérifier si l'identifiant existe déjà
    $checkStmt = $pdo->prepare("SELECT id FROM users WHERE username = ? LIMIT 1");
    $checkStmt->execute([$username]);
    if ($checkStmt->fetch()) {
        json_response(['success' => false, 'message' => 'Cet identifiant est déjà utilisé'], 400);
    }
    
    // Insérer le nouvel utilisateur
    $stmt = $pdo->prepare("
        INSERT INTO users(nom, username, password_hash, role, actif)
        VALUES (?, ?, ?, ?, 1)
    ");
    
    $stmt->execute([
        $nom,
        $username,
        password_hash($password, PASSWORD_DEFAULT),
        $role
    ]);
    
    $newId = $pdo->lastInsertId();
    add_log($pdo, 'CREATE_USER', 'users', $newId, "Création de l'utilisateur {$username} (rôle: {$role})");
    
    json_response(['success' => true, 'message' => 'Utilisateur créé avec succès']);
}

// ============================================================
// SUPPRESSION (DÉSACTIVATION) D'UN UTILISATEUR
// ============================================================
if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    
    if ($id <= 0) {
        json_response(['success' => false, 'message' => 'ID invalide'], 400);
    }
    
    // Ne pas se désactiver soi-même
    $user = current_user();
    if ($user && $user['id'] == $id) {
        json_response(['success' => false, 'message' => 'Vous ne pouvez pas désactiver votre propre compte'], 403);
    }
    
    $stmt = $pdo->prepare("SELECT username FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $userToDisable = $stmt->fetch();
    
    if ($userToDisable) {
        $stmt = $pdo->prepare("UPDATE users SET actif = 0 WHERE id = ?");
        $stmt->execute([$id]);
        add_log($pdo, 'DISABLE_USER', 'users', $id, "Utilisateur {$userToDisable['username']} désactivé");
        json_response(['success' => true, 'message' => 'Utilisateur désactivé avec succès']);
    } else {
        json_response(['success' => false, 'message' => 'Utilisateur non trouvé'], 404);
    }
}

// Si aucune action ne correspond
json_response(['success' => false, 'message' => 'Action non reconnue'], 400);
?>