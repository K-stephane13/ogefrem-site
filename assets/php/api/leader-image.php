<?php
// assets/php/api/leader-image.php - Affichage des images BLOB pour comite/conseil/ministre

require_once __DIR__ . '/config.php';

$id = (int)($_GET['id'] ?? 0);
$table = $_GET['table'] ?? '';

// Ajout de ministre_transports dans les tables autorisées
$allowedTables = ['comite_gestion', 'conseil_administration', 'ministre_transports'];
if ($id <= 0 || !in_array($table, $allowedTables, true)) {
    http_response_code(404);
    header('Content-Type: image/svg+xml');
    echo '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#003399"/><text x="100" y="110" font-family="Arial" font-size="18" fill="white" text-anchor="middle">Image non trouvée</text></svg>';
    exit;
}

try {
    // Récupérer l'image
    $stmt = $pdo->prepare("SELECT photo_data, photo_type, photo_nom FROM $table WHERE id = ? LIMIT 1");
    $stmt->execute([$id]);
    $image = $stmt->fetch();

    // Pas d'image -> 404 avec image par défaut
    if (!$image || $image['photo_data'] === null || strlen($image['photo_data']) === 0) {
        http_response_code(404);
        header('Content-Type: image/svg+xml');
        echo '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#003399"/><text x="100" y="110" font-family="Arial" font-size="18" fill="white" text-anchor="middle">Aucune photo</text></svg>';
        exit;
    }

    // Envoyer l'image
    header('Content-Type: ' . $image['photo_type']);
    header('Content-Length: ' . strlen($image['photo_data']));
    header('Content-Disposition: inline; filename="' . rawurlencode($image['photo_nom']) . '"');
    header('Cache-Control: public, max-age=604800, immutable');
    echo $image['photo_data'];
    
} catch (PDOException $e) {
    // Erreur SQL
    writeLog('Erreur leader-image SQL: ' . $e->getMessage(), null, 'ERROR');
    http_response_code(500);
    header('Content-Type: image/svg+xml');
    echo '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#dc3545"/><text x="100" y="110" font-family="Arial" font-size="14" fill="white" text-anchor="middle">Erreur serveur</text></svg>';
    exit;
} catch (Exception $e) {
    // Autre erreur
    writeLog('Erreur leader-image: ' . $e->getMessage(), null, 'ERROR');
    http_response_code(500);
    header('Content-Type: image/svg+xml');
    echo '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#dc3545"/><text x="100" y="110" font-family="Arial" font-size="14" fill="white" text-anchor="middle">Erreur</text></svg>';
    exit;
}
?>