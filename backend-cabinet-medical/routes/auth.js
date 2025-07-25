const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Utilisateur = require('../models/Utilisateur');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Inscription d'un nouvel utilisateur (tous rôles)
router.post("/register", async (req, res) => {
  try {
    // Récupère les données du formulaire
    const { nom, email, motDePasse, role } = req.body;
    if (!nom || !email || !motDePasse || !role) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    // Vérifie si l'utilisateur existe déjà
    const utilisateurExistant = await Utilisateur.findOne({ where: { email } });
    if (utilisateurExistant) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }
    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    // Création du nouvel utilisateur
    const nouvelUtilisateur = await Utilisateur.create({
      nom,
      email,
      motDePasse: hashedPassword,
      role
    });
    res.status(201).json({
      message: "Inscription réussie",
      utilisateur: {
        id: nouvelUtilisateur.id,
        nom: nouvelUtilisateur.nom,
        email: nouvelUtilisateur.email,
        role: nouvelUtilisateur.role
      }
    });
  } catch (error) {
    // Gestion des erreurs serveur ou SQL
    res.status(500).json({ 
      message: "Erreur serveur",
      error: {
        message: error.message,
        type: error.constructor.name,
        details: error.original ? {
          code: error.original.code,
          sqlMessage: error.original.sqlMessage
        } : undefined
      }
    });
  }
});

// Connexion utilisateur (tous rôles)
router.post("/login", async (req, res) => {
  try {
    // Récupère les données du formulaire
    const { email, motDePasse } = req.body;
    if (!email || !motDePasse) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }
    // Recherche l'utilisateur par email
    const utilisateur = await Utilisateur.findOne({ where: { email } });
    if (!utilisateur) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
    // Vérifie le mot de passe
    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!motDePasseValide) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
    // Génère un token JWT avec l'id, l'email et le rôle
    const token = jwt.sign(
      {
        id: utilisateur.id,
        email: utilisateur.email,
        role: utilisateur.role
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Connexion réussie",
      token,
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router; // Export du routeur
