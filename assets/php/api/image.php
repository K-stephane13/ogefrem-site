<?php
require_once __DIR__ . '/config.php';

$id = (int)($_GET['id'] ?? 0);
if ($id <= 0) {
    http_response_code(400);
    exit('Image invalide');
}

$stmt = $pdo->prepare('SELECT nom_fichier, type_mime, donnees FROM actualite_images WHERE id = ? LIMIT 1');
$stmt->execute([$id]);
$image = $stmt->fetch();

if (!$image) {
    http_response_code(404);
    exit('Image introuvable');
}

header_remove('Content-Type');
header('Content-Type: ' . $image['type_mime']);
header('Content-Length: ' . strlen($image['donnees']));
header('Content-Disposition: inline; filename="' . rawurlencode($image['nom_fichier']) . '"');
header('Cache-Control: public, max-age=604800, immutable');
echo $image['donnees'];
