// src/pages/DashboardUtilisateur.jsx
import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "./DashboardUtilisateur.css"; // à créer pour le style

// Dashboard d'accueil pour l'utilisateur/patient
const DashboardUtilisateur = () => {
  // Récupère les infos de l'utilisateur connecté
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

  return (
    <div className="dashboard-utilisateur">
      {/* Message de bienvenue */}
      <h1>Bonjour {utilisateur?.nom || "Utilisateur"} 👋</h1>
      <p>Bienvenue dans votre espace personnel</p>

      {/* Cartes de navigation vers les principales fonctionnalités */}
      <div className="user-cards">
        <Link to="/demande-rendezvous" className="dashboard-card">
          📆 Mes rendez-vous
        </Link>

        <Link to="/profil" className="user-card">
          👤 Mon profil
        </Link>
        <Link to="/contact" className="user-card">
          📞 Contacter le cabinet
        </Link>
      </div>
    </div>
  );
};

export default DashboardUtilisateur;
