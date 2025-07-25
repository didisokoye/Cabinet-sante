const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/auth');
const Rendezvous = require('../models/Rendezvous');
const Utilisateur = require('../models/Utilisateur');

// Récupérer la liste des patients suivis par un médecin
router.get('/:medecinId/patients', authenticate, authorizeRole('medecin'), async (req, res) => {
  try {
    const { medecinId } = req.params;
    // Trouver tous les rendez-vous de ce médecin avec les patients associés
    const rendezvous = await Rendezvous.findAll({
      where: { medecinId },
      include: [{ model: Utilisateur, as: 'patient' }]
    });
    // Extraire les patients uniques à partir des rendez-vous
    const patientsMap = {};
    rendezvous.forEach(rdv => {
      if (rdv.patient) {
        patientsMap[rdv.patient.id] = rdv.patient;
      }
    });
    const patients = Object.values(patientsMap);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des patients" });
  }
});

module.exports = router; // Export du routeur 