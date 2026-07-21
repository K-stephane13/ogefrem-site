<?php
require_once __DIR__ . '/config.php';

$id = (int)($_GET['id'] ?? 0);
$table = $_GET['table'] ?? '';

$allowedTables = ['comite_gestion', 'conseil_administration'];
if ($id <= 0 || !in_array($table, $allowedTables, true)) {
    http_response_code(400);
    exit('Paramètres invalides');
}

$stmt = $pdo->prepare("SELECT photo, photo_type, photo_nom FROM $table WHERE id = ? LIMIT 1");
$stmt->execute([$id]);
$image = $stmt->fetch();

if (!$image || !$image['photo']) {
    http_response_code(404);
    exit('Image introuvable');
}

header('Content-Type: ' . $image['photo_type']);
header('Content-Length: ' . strlen($image['photo']));
header('Content-Disposition: inline; filename="' . rawurlencode($image['photo_nom']) . '"');
header('Cache-Control: public, max-age=604800, immutable');
echo $image['photo'];