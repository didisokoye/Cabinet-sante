const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/auth');
const Utilisateur = require('../models/Utilisateur');

// Route pour mettre à jour le profil d'un utilisateur (c'est pour tous les rôles)
router.put('/:id', authenticate, authorizeRole('medecin', 'entreprise', 'user'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, specialite, telephone } = req.body;
    // Recherche l'utilisateur par son id
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    // Met à jour les champs du profil
    utilisateur.nom = nom;
    utilisateur.prenom = prenom;
    utilisateur.specialite = specialite;
    utilisateur.telephone = telephone;
    await utilisateur.save();
    res.json({ message: "Profil mis à jour", utilisateur });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
  }
});

module.exports = router; // Export du routeur 