import React, { useState, useEffect } from "react";
import axios from "axios";
import DemandeRendezvous from "./DemandeRendezvous";
import PrivateRoute from "../components/PrivateRoute";

// Page de gestion des rendez-vous pour l'admin
export default function GestionRendezvous() {
  const [rendezvous, setRendezvous] = useState([]);
  const [error, setError] = useState(null);

  // Récupère tous les rendez-vous depuis l'API
  const fetchRendezvous = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vous devez être connecté pour accéder à cette page');
        return;
      }
      const res = await axios.get("http://localhost:3000/api/rendezvous", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRendezvous(res.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des rendez-vous');
      console.error(err);
    }
  };

  // Valide un rendez-vous (statut = validé)
  const handleValider = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/rendezvous/${id}`, { statut: "validé" }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchRendezvous();
    } catch (err) {
      setError('Erreur lors de la validation du rendez-vous');
      console.error(err);
    }
  };

  // Supprime un rendez-vous
  const handleSupprimer = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/rendezvous/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchRendezvous();
    } catch (err) {
      setError('Erreur lors de la suppression du rendez-vous');
      console.error(err);
    }
  };

  // Charge les rendez-vous au chargement de la page
  useEffect(() => {
    fetchRendezvous();
  }, []);

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="gestion-rdv-container">
      <h2 className="gestion-rdv-title">Gestion des rendez-vous</h2>
      <div className="rdv-list">
        {/* Tableau des rendez-vous avec actions */}
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Médecin</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Motif</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rendezvous.map((rv) => (
              <tr key={rv.id}>
                <td>{rv.patient ? `${rv.patient.nom || ''} ${rv.patient.prenom || ''}` : 'Inconnu'}</td>
                <td>{rv.medecin ? `${rv.medecin.nom || ''} ${rv.medecin.prenom || ''}` : 'Inconnu'}</td>
                <td>{rv.dateHeure ? new Date(rv.dateHeure).toLocaleDateString('fr-FR') : 'Date inconnue'}</td>
                <td>{rv.dateHeure ? new Date(rv.dateHeure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</td>
                <td>{rv.motif || 'Aucun'}</td>
                <td>{rv.statut}</td>
                <td>
                  {rv.statut === 'en attente' && (
                    <>
                      {/* Boutons d'action pour valider ou supprimer */}
                      <button onClick={() => handleValider(rv.id)} className="btn-valider">Valider</button>
                      <button onClick={() => handleSupprimer(rv.id)} className="btn-supprimer">Supprimer</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
