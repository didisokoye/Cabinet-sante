import React from "react";
import Navbar from "../components/Navbar";
import cabinetImage from "../assets/cabinet+.png"; 
import { useState } from 'react';
import { FaUserMd, FaStethoscope, FaCalendarCheck, FaVideo, FaSyringe, FaFilePrescription, FaHeartbeat } from 'react-icons/fa';

// Page d'accueil de l'application Cabinet Santé+
export default function Accueil() {
  // Gère l'affichage de la section services
  const [showServices, setShowServices] = useState(false);
  return (
    <div>
      {/* Barre de navigation principale */}
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">
        {/* Titre de bienvenue */}
        <h2 className="text-3xl font-bold mb-6 text-center">Bienvenue sur Cabinet Santé +</h2>
        {/* Bouton pour afficher/masquer les services */}
        <div className="flex justify-center mb-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-200 text-lg font-semibold"
            onClick={() => setShowServices((v) => !v)}
          >
            Découvrir nos services
          </button>
        </div>
        {/* Section des services (affichée si showServices) */}
        {showServices && (
          <section className="mb-10 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4 text-center">Découvrir nos services</h3>
            <div className="grid">
              {/* Liste des services proposés */}
              <div className="service-card">
                <FaStethoscope className="service-icon" />
                <h4 className="service-title">Consultations générales</h4>
                <p>Suivi médical pour tous les âges, bilans de santé, conseils personnalisés.</p>
              </div>
              <div className="service-card">
                <FaUserMd className="service-icon" />
                <h4 className="service-title">Spécialistes</h4>
                <p>Accès à des spécialistes : cardiologie, dermatologie, pédiatrie, etc.</p>
              </div>
              <div className="service-card">
                <FaCalendarCheck className="service-icon" />
                <h4 className="service-title">Rendez-vous en ligne</h4>
                <p>Réservez facilement votre consultation via notre plateforme sécurisée.</p>
              </div>
              <div className="service-card">
                <FaVideo className="service-icon" />
                <h4 className="service-title">Téléconsultation</h4>
                <p>Consultez un médecin à distance, renouvellement d’ordonnances, conseils.</p>
              </div>
              <div className="service-card">
                <FaSyringe className="service-icon" />
                <h4 className="service-title">Vaccinations</h4>
                <p>Vaccins saisonniers et dépistages pour toute la famille.</p>
              </div>
              <div className="service-card">
                <FaFilePrescription className="service-icon" />
                <h4 className="service-title">Ordonnances</h4>
                <p>Gestion numérique et envoi direct à la pharmacie partenaire.</p>
              </div>
              <div className="service-card">
                <FaHeartbeat className="service-icon" />
                <h4 className="service-title">Prévention</h4>
                <p>Conseils santé, ateliers, accompagnement nutrition et bien-être.</p>
              </div>
            </div>
          </section>
        )}
        {/* Image illustrative du cabinet */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            {/* Conteneur image modifié */}
            <div className="relative w-full h-64 md:h-96 lg:h-[28rem] rounded-xl shadow-lg overflow-hidden">
              <img 
                src={cabinetImage} 
                alt="Cabinet médical moderne" 
                className="absolute w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}