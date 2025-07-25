const { DataTypes } = require('sequelize'); 
const sequelize = require('../database');

// Modèle Sequelize pour la table des utilisateurs (patients ou user simple, médecins, admins ou entreprise)
const Utilisateur = sequelize.define('Utilisateur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Unicité de l'email
  },
  motDePasse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING, // 'utilisateur', 'medecin', 'entreprise'
    allowNull: false
  }
}, {
  tableName: 'utilisateurs', // Nom de la table dans la base de données
  timestamps: false // Pas de champs createdAt/updatedAt
});

module.exports = Utilisateur; // Export du modèle
