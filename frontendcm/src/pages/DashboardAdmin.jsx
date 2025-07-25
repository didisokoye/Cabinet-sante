// src/pages/DashboardAdmin.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./DashboardAdmin.css"; 
import Sidebar from "../components/Sidebar";

// Composant principal du dashboard admin (entreprise)
const DashboardAdmin = () => {
  return (
    <div>
      {/* Conteneur principal du dashboard */}
      <div className="dashboard-container">
        {/* Titre de bienvenue */}
        <h1>Bienvenue dans votre espace entreprise</h1>
        {/* Cartes de navigation vers les différentes gestions */}
        <div className="cards">
          {/* Lien vers la page de planification des rendez-vous */}
          <Link to="/planification" className="dashboard-card">
            📅 Gérer la planification
          </Link>
          {/* Lien vers la gestion des patients */}
          <Link to="/patients" className="dashboard-card">
            🗂️ Voir les dossiers des patients
          </Link>
          {/* Lien vers la gestion des ordonnances */}
          <Link to="/ordonnances" className="dashboard-card">
            💊 Gérer les ordonnances
          </Link>
          {/* Lien vers la gestion des rendez-vous */}
          <Link to="/gestion-rendezvous" className="dashboard-card">
            📆 Gérer les rendez-vous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
