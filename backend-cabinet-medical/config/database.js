require('dotenv').config(); // Charger les variables d'environnement depuis .env
const { Sequelize } = require('sequelize');

// Création de l'instance Sequelize pour la connexion à la base de données MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base
  process.env.DB_USER, // Utilisateur
  process.env.DB_PASS, // Mot de passe
  {
    host: process.env.DB_HOST, // Hôte
    dialect: 'mysql', // Type de base
  }
);

// Fonction pour tester la connexion à la base de données
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion réussie à la base de données.');
  } catch (error) {
    console.error('❌ Échec de la connexion à la base de données :', error);
  }
}

connectDB(); // Teste la connexion au démarrage

module.exports = sequelize; // Exporte l'instance Sequelize pour l'utiliser ailleurs
