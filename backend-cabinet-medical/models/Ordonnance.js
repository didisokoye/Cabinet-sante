const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Modèle Sequelize pour la table des ordonnances médicales
const Ordonnance = sequelize.define('Ordonnance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Identifiant unique
  patientId: { type: DataTypes.INTEGER, allowNull: false }, // FK vers patient
  medecinId: { type: DataTypes.INTEGER, allowNull: false }, // FK vers médecin
  contenu: { type: DataTypes.TEXT, allowNull: false }, // Contenu de l'ordonnance
  date: { type: DataTypes.DATEONLY, allowNull: false } // Date de l'ordonnance
}, {
  tableName: 'ordonnances', // Nom de la table
  timestamps: false // Pas de champs createdAt/updatedAt
});

module.exports = Ordonnance; // Export du modèle 