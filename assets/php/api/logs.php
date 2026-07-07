<?php
require_once __DIR__ . '/config.php';
require_super_admin();

$stmt = $pdo->query("
    SELECT logs.*, users.nom, users.username
    FROM logs
    LEFT JOIN users ON users.id = logs.user_id
    ORDER BY logs.id DESC
    LIMIT 300
");

json_response([
    'success' => true,
    'logs' => $stmt->fetchAll()
]);