<?php
// assets/php/api/config.php - Configuration de l'API

require_once __DIR__ . '/log-config.php';

session_start();

define('DB_HOST', 'localhost');
define('DB_NAME', 'ogefrem_site');
define('DB_USER', 'root');
define('DB_PASS', '');

header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (Exception $e) {
    writeLog('Erreur de connexion à la base de données: ' . $e->getMessage(), null, 'ERROR');
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur connexion BD']);
    exit;
}

function json_response($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function current_user() {
    return $_SESSION['user'] ?? null;
}

function require_auth() {
    if (!current_user()) {
        json_response(['success' => false, 'message' => 'Non connecté'], 401);
    }
}

function require_super_admin() {
    require_auth();
    if ($_SESSION['user']['role'] !== 'SUPER_ADMIN') {
        json_response(['success' => false, 'message' => 'Accès refusé'], 403);
    }
}

function add_log($pdo, $action, $module, $item_id = null, $details = null) {
    $user = current_user();
    try {
        $stmt = $pdo->prepare("
            INSERT INTO logs(user_id, action, module, item_id, details, ip_address)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $user['id'] ?? null,
            $action,
            $module,
            $item_id,
            $details,
            $_SERVER['REMOTE_ADDR'] ?? null
        ]);
    } catch (Exception $e) {
        // Ne pas bloquer l'application si le log échoue
        writeLog('Erreur add_log: ' . $e->getMessage(), null, 'WARNING');
    }
}
?>