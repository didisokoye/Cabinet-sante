import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaUserInjured, FaFilePrescription, FaUserMd } from 'react-icons/fa';
import "./DashboardUtilisateur.css";

// Dashboard d'accueil pour le médecin
export default function DashboardMedecin() {
  // Récupère les infos du médecin connecté
  const medecin = JSON.parse(localStorage.getItem("utilisateur"));
  return (
    <div className="dashboard-utilisateur">
      {/* Message de bienvenue */}
      <h1>Bonjour Dr {medecin?.nom || "Médecin"} <span role="img" aria-label="médecin">👨‍⚕️</span></h1>
      <p>Bienvenue dans votre espace professionnel</p>
      {/* Cartes de navigation vers les principales fonctionnalités du médecin */}
      <div className="user-cards">
        <Link to="/mes-rendezvous" className="user-card">
          <FaCalendarCheck style={{ fontSize: 32, color: "#2563eb", marginBottom: 8 }} />
          <div>Mes rendez-vous</div>
        </Link>
        <Link to="/mes-patients" className="user-card">
          <FaUserInjured style={{ fontSize: 32, color: "#22c55e", marginBottom: 8 }} />
          <div>Mes patients</div>
        </Link>
        <Link to="/mes-ordonnances" className="user-card">
          <FaFilePrescription style={{ fontSize: 32, color: "#f59e42", marginBottom: 8 }} />
          <div>Mes ordonnances</div>
        </Link>
        <Link to="/profil-medecin" className="user-card">
          <FaUserMd style={{ fontSize: 32, color: "#e11d48", marginBottom: 8 }} />
          <div>Mon profil</div>
        </Link>
      </div>
    </div>
  );
} 