-- Création de la table utilisateurs
CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    motDePasse VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Création de la table rendezvous
CREATE TABLE IF NOT EXISTS rendezvous (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    medecinId INT NOT NULL,
    dateHeure DATETIME NOT NULL,
    motif TEXT,
    statut ENUM('en attente', 'validé', 'annulé') DEFAULT 'en attente',
    FOREIGN KEY (patientId) REFERENCES utilisateurs(id),
    FOREIGN KEY (medecinId) REFERENCES utilisateurs(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Création de la table ordonnances
CREATE TABLE IF NOT EXISTS ordonnances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    medecinId INT NOT NULL,
    contenu TEXT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (patientId) REFERENCES utilisateurs(id),
    FOREIGN KEY (medecinId) REFERENCES utilisateurs(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
