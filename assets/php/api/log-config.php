<?php
// assets/php/api/log-config.php - Configuration des logs

// Dossier de logs
define('LOG_DIR', __DIR__ . '/../../logs/');

// Créer le dossier logs s'il n'existe pas
if (!is_dir(LOG_DIR)) {
    mkdir(LOG_DIR, 0755, true);
    // Créer un fichier .htaccess pour protéger le dossier
    file_put_contents(LOG_DIR . '.htaccess', "Order Deny,Allow\nDeny from all");
}

/**
 * Fonction de log simplifiée
 * @param string $message Message à logger
 * @param mixed $data Données supplémentaires (optionnel)
 * @param string $type Type de log (INFO, ERROR, WARNING, SQL, LOG)
 */
function writeLog($message, $data = null, $type = 'INFO') {
    $logFile = LOG_DIR . 'ogefrem_' . date('Y-m-d') . '.log';
    $timestamp = date('Y-m-d H:i:s');
    $dataStr = '';
    
    if ($data !== null) {
        if (is_array($data) || is_object($data)) {
            $dataStr = "\n" . print_r($data, true);
        } else {
            $dataStr = "\n" . $data;
        }
    }
    
    $logEntry = "[$timestamp] [$type] $message$dataStr\n";
    
    // Écrire dans le fichier
    @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

/**
 * Log d'une requête SQL
 */
function logSQL($sql, $params = null) {
    $message = "SQL: " . $sql;
    if ($params) {
        $message .= " | Params: " . json_encode($params);
    }
    writeLog($message, null, 'SQL');
}
?>