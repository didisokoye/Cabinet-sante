// src/pages/ProfilUtilisateur.jsx
import React, { useEffect, useState } from "react";
import "./ProfilUtilisateur.css";

// Page d'affichage du profil du patient/utilisateur
const ProfilUtilisateur = () => {
  // Stocke les infos de l'utilisateur connecté
  const [utilisateur, setUtilisateur] = useState(null);

  // Récupère les infos depuis le localStorage au chargement
  useEffect(() => {
    const data = localStorage.getItem("utilisateur");
    if (data) {
      setUtilisateur(JSON.parse(data));
    }
  }, []);

  // Affiche un message de chargement si les infos ne sont pas encore disponibles
  if (!utilisateur) {
    return <p>Chargement du profil...</p>;
  }

  return (
    <div className="profil-container">
      <h2>👤 Mon Profil</h2>
      <div className="profil-card">
        <p><strong>Nom :</strong> {utilisateur.nom}</p>
        <p><strong>Email :</strong> {utilisateur.email}</p>
        <p><strong>Rôle :</strong> {utilisateur.role}</p>
        {/* Ajoute plus de champs si disponibles, comme téléphone, adresse, etc. */}
      </div>
    </div>
  );
};

export default ProfilUtilisateur;
