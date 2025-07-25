// database.js
const { Sequelize } = require('sequelize');

// Chargement des variables d’environnement si tu utilises .env
require('dotenv').config();

// Création de l'instance Sequelize pour la connexion à la base MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base
  process.env.DB_USER, // Utilisateur
  process.env.DB_PASS, // Mot de passe
  {
    host: process.env.DB_HOST, // Hôte
    dialect: 'mysql', // Type de base
    logging: false // Désactive les logs SQL
  }
);

// Fonction pour tester la connexion à la base de données
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion réussie à la base de données.');
    console.log('✅ Utilisation des tables existantes.');
  } catch (error) {
    console.error('❌ Échec de la connexion à la base de données :', error);
  }
}

connectDB(); // Teste la connexion au démarrage

module.exports = sequelize; // Exporte l'instance Sequelize
