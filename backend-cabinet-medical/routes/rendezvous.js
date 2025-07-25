const express = require('express');
const router = express.Router();
const Rendezvous = require('../models/Rendezvous');
const Utilisateur = require('../models/Utilisateur');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');

// Fonction utilitaire pour valider une date ISO
const validateDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) ? date : null;
};

// Middleware d'authentification (exemple local, à remplacer par middleware global si besoin)
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentification requise' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

// Middleware pour autoriser un rôle spécifique
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.userRole === role) {
      next();
    } else {
      res.status(403).json({ message: `Accès non autorisé. Vous devez être ${role}` });
    }
  };
};

// Créer un rendez-vous (patient ou admin)
router.post('/ajouter', authenticate, async (req, res) => {
  try {
    let { patientId, patientNom, patientPrenom, dateHeure, motif } = req.body;
    // Si patientId non fourni, on cherche ou crée le patient par nom/prénom
    if (!patientId && patientNom && patientPrenom) {
      let patient = await Utilisateur.findOne({ where: { nom: patientNom, prenom: patientPrenom } });
      if (!patient) {
        patient = await Utilisateur.create({ nom: patientNom, prenom: patientPrenom, role: 'user' });
      }
      patientId = patient.id;
    }
    // Vérifie que patientId est bien défini à ce stade
    if (!patientId) {
      return res.status(400).json({ message: "Patient non trouvé ou informations incomplètes." });
    }
    // Vérifie l'existence du patient et du médecin
    const patient = await Utilisateur.findOne({ where: { id: patientId } });
    if (!patient) return res.status(404).json({ message: 'Patient non trouvé' });
    const medecin = await Utilisateur.findOne({ where: { id: req.userId } });
    if (!medecin) return res.status(404).json({ message: 'Médecin non trouvé' });
    // Valide la date
    const date = validateDate(dateHeure);
    if (!date) return res.status(400).json({ message: 'Format de date invalide' });
    // Crée le rendez-vous
    const rendezvous = await Rendezvous.create({ patientId, medecinId: req.userId, dateHeure, motif });
    res.status(201).json({
      message: 'Rendez-vous créé avec succès',
      rendezvous: {
        id: rendezvous.id,
        patientId: rendezvous.patientId,
        medecinId: rendezvous.medecinId,
        dateHeure: rendezvous.dateHeure,
        motif: rendezvous.motif,
        statut: rendezvous.statut
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: { type: error.constructor.name, message: error.message } });
  }
});

// Récupérer tous les rendez-vous (admin)
router.get('/', authenticate, async (req, res) => {
  try {
    const rendezvous = await Rendezvous.findAll({
      order: [['dateHeure', 'ASC']],
      include: [
        { model: Utilisateur, as: 'patient' },
        { model: Utilisateur, as: 'medecin' }
      ]
    });
    res.json(rendezvous);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Mettre à jour un rendez-vous (le statut, la date, motif)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { statut, dateHeure, motif } = req.body;
    const rendezvous = await Rendezvous.findByPk(id);
    if (!rendezvous) return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    // Empêche la modification si le statut n'est plus 'en attente'
    if (rendezvous.statut !== 'en attente') {
      return res.status(403).json({ message: "Impossible de modifier ce rendez-vous car il n'est plus en attente." });
    }
    if (statut) rendezvous.statut = statut;
    if (dateHeure) rendezvous.dateHeure = dateHeure;
    if (motif !== undefined) rendezvous.motif = motif;
    await rendezvous.save();
    res.json({ message: 'Rendez-vous mis à jour avec succès', rendezvous });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Récupérer les rendez-vous d'un patient
router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const rendezvous = await Rendezvous.findAll({
      where: { patientId: userId },
      order: [['dateHeure', 'ASC']]
    });
    res.json(rendezvous);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Récupérer les rendez-vous d'un médecin
router.get('/medecin/:medecinId', authenticate, authorizeRole('medecin'), async (req, res) => {
  try {
    const { medecinId } = req.params;
    if (parseInt(medecinId) !== req.userId) {
      return res.status(403).json({ message: "Vous ne pouvez voir que vos propres rendez-vous" });
    }
    const rendezvous = await Rendezvous.findAll({
      where: { medecinId },
      include: [{ model: Utilisateur, as: 'patient' }]
    });
    res.json(rendezvous);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous" });
  }
});

// Supprimer un rendez-vous
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const rendezvous = await Rendezvous.findByPk(id);
    if (!rendezvous) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    await rendezvous.destroy();
    res.json({ message: 'Rendez-vous supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
