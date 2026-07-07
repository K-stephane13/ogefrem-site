<?php
require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? '';

if ($action === 'login') {
    $data = json_decode(file_get_contents('php://input'), true);

    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND actif = 1 LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        json_response(['success' => false, 'message' => 'Identifiant ou mot de passe incorrect'], 401);
    }

    $_SESSION['user'] = [
        'id' => $user['id'],
        'nom' => $user['nom'],
        'username' => $user['username'],
        'role' => $user['role']
    ];

    add_log($pdo, 'LOGIN', 'auth', $user['id'], 'Connexion utilisateur');

    json_response(['success' => true, 'user' => $_SESSION['user']]);
}

if ($action === 'logout') {
    add_log($pdo, 'LOGOUT', 'auth', current_user()['id'] ?? null, 'Déconnexion utilisateur');
    session_destroy();
    json_response(['success' => true]);
}

if ($action === 'me') {
    json_response(['success' => true, 'user' => current_user()]);
}

json_response(['success' => false, 'message' => 'Action inconnue'], 400);