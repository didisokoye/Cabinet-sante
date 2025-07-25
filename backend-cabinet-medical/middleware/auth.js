const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware d'authentification : vérifie le token JWT dans l'en-tête Authorization
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentification requise' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }
    // Vérifie et décode le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role; // <-- Le rôle est extrait du token
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(401).json({ 
      message: error.message.includes('invalid token') ? 'Token invalide' : 'Erreur d\'authentification' 
    });
  }
};

// Middleware d'autorisation par rôle : vérifie que l'utilisateur a un des rôles autorisés
function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({ message: "Accès interdit : rôle insuffisant" });
    }
    next();
  };
}

module.exports = { authenticate, authorizeRole };
