const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Récupérer tous les patients
router.get('/', async (req, res) => {
  const patients = await Patient.findAll();
  res.json(patients);
});

// Ajoute un nouveau patient
router.post('/', async (req, res) => {
  const patient = await Patient.create(req.body);
  res.status(201).json(patient);
});

// Modifie un patient existant
router.put('/:id', async (req, res) => {
  const patient = await Patient.findByPk(req.params.id);
  if (!patient) return res.status(404).json({ message: 'Patient non trouvé' });
  await patient.update(req.body);
  res.json(patient);
});

// Supprimer un patient
router.delete('/:id', async (req, res) => {
  const patient = await Patient.findByPk(req.params.id);
  if (!patient) return res.status(404).json({ message: 'Patient non trouvé' });
  await patient.destroy();
  res.json({ message: 'Patient supprimé' });
});

module.exports = router; // Export du routeur 