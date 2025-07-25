import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

// Sidebar de navigation pour l'admin (dashboard)
const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Titre du menu */}
      <h2>Dashboard Admin</h2>
      {/* Navigation principale admin */}
      <nav>
        <ul>
          <li><Link to="/dashboard-admin">🏠 Accueil</Link></li>
          <li><Link to="/planification">📅 Planification</Link></li>
          <li><Link to="/patients">🗂️ Patients</Link></li>
          <li><Link to="/ordonnances">💊 Ordonnances</Link></li>
          <li><Link to="/rendezvous">📆 Rendez-vous</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
