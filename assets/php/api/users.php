<?php
require_once __DIR__ . '/config.php';
require_super_admin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $users = $pdo->query("SELECT id, nom, username, role, actif, created_at FROM users ORDER BY id DESC")->fetchAll();
    json_response(['success' => true, 'users' => $users]);
}

$data = json_decode(file_get_contents('php://input'), true);

if ($method === 'POST') {
    $stmt = $pdo->prepare("
        INSERT INTO users(nom, username, password_hash, role, actif)
        VALUES (?, ?, ?, ?, 1)
    ");

    $stmt->execute([
        $data['nom'],
        $data['username'],
        password_hash($data['password'], PASSWORD_DEFAULT),
        $data['role'] ?? 'ADMIN'
    ]);

    add_log($pdo, 'CREATE_USER', 'users', $pdo->lastInsertId(), $data['username']);
    json_response(['success' => true]);
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    $stmt = $pdo->prepare("UPDATE users SET actif=0 WHERE id=?");
    $stmt->execute([$id]);

    add_log($pdo, 'DISABLE_USER', 'users', $id, 'Utilisateur désactivé');
    json_response(['success' => true]);
}

json_response(['success' => false], 405);