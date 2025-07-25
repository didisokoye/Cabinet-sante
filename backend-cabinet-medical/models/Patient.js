const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Modèle Sequelize pour la table des patients (si séparée des utilisateurs)
const Patient = sequelize.define('Patient', {
  nom: DataTypes.STRING, // Nom du patient
  prenom: DataTypes.STRING, // Prénom du patient
  age: DataTypes.INTEGER, // Âge
  sexe: DataTypes.STRING, // Sexe (M/F)
  telephone: DataTypes.STRING, // Téléphone
  adresse: DataTypes.STRING, // Adresse
}, {
  tableName: 'patients', // Nom de la table
  timestamps: false // Pas de champs createdAt/updatedAt
});

module.exports = Patient; // Export du modèle 