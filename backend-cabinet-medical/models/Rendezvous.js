const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Modèle Sequelize pour la table des rendez-vous
const Rendezvous = sequelize.define('Rendezvous', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs', // cle etrangere vers Utilisateur (patient)
      key: 'id'
    }
  },
  medecinId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs', // FK vers Utilisateur (médecin)
      key: 'id'
    }
  },
  dateHeure: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motif: {
    type: DataTypes.TEXT // Motif du rendez-vous
  },
  statut: {
    type: DataTypes.ENUM('en attente', 'validé', 'annulé'),
    defaultValue: 'en attente' // Statut initial
  }
}, {
  timestamps: false,
  tableName: 'rendezvous' // Nom de la table
});

// Relations avec le modèle Utilisateur (patient et médecin)
const Utilisateur = require('./Utilisateur');

Rendezvous.belongsTo(Utilisateur, { 
  foreignKey: 'patientId', 
  as: 'patient'
});

Rendezvous.belongsTo(Utilisateur, { 
  foreignKey: 'medecinId', 
  as: 'medecin'
});

module.exports = Rendezvous; // Export du modèle
