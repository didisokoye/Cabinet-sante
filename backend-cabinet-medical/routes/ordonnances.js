const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/auth');
const Ordonnance = require('../models/Ordonnance');

// Ajouter une ordonnance (seul un médecin peut le faire oh)
router.post('/', authenticate, authorizeRole('medecin'), async (req, res) => {
  try {
    const { patientId, medecinId, contenu, date } = req.body;
    const ordonnance = await Ordonnance.create({ patientId, medecinId, contenu, date });
    res.status(201).json(ordonnance);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'ordonnance" });
  }
});

// Récupérer les ordonnances d'un médecin
router.get('/medecin/:medecinId', authenticate, authorizeRole('medecin'), async (req, res) => {
  try {
    const ordonnances = await Ordonnance.findAll({ where: { medecinId: req.params.medecinId } });
    res.json(ordonnances);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des ordonnances" });
  }
});

module.exports = router; // Export du routeur 