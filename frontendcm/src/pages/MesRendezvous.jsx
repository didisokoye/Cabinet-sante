import React, { useEffect, useState } from "react";
import axios from "axios";

// Page d'affichage des rendez-vous pour le médecin (et patient si partagé)
export default function MesRendezvous() {
  const [rendezvous, setRendezvous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const medecin = JSON.parse(localStorage.getItem("utilisateur"));

  // Charge les rendez-vous du médecin au chargement de la page
  useEffect(() => {
    if (!medecin?.id) return;

    const fetchRendezvous = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:3000/api/rendezvous/medecin/${medecin.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRendezvous(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous :", error);
        setMessage("Erreur lors du chargement des rendez-vous");
      } finally {
        setLoading(false);
      }
    };

    fetchRendezvous();
  }, [medecin?.id]);

  // Valide un rendez-vous (statut = validé)
  const handleValider = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/api/rendezvous/${id}`, { statut: "validé" }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRendezvous(rendezvous.map(r => r.id === id ? { ...r, statut: "validé" } : r));
      setMessage("Rendez-vous validé");
    } catch (error) {
      console.error("Erreur lors de la validation :", error);
      setMessage("Erreur lors de la validation");
    }
  };

  // Annule un rendez-vous (statut = annulé)
  const handleAnnuler = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/api/rendezvous/${id}`, { statut: "annulé" }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRendezvous(rendezvous.map(r => r.id === id ? { ...r, statut: "annulé" } : r));
      setMessage("Rendez-vous annulé");
    } catch (error) {
      console.error("Erreur lors de l'annulation :", error);
      setMessage("Erreur lors de l'annulation");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Mes rendez-vous</h2>

      {/* Affiche les messages d'action (validation, annulation, erreur) */}
      {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded mb-4 text-center">
          {message}
        </div>
      )}

      {/* Affiche le tableau des rendez-vous ou un message si vide */}
      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Patient</th>
              <th>Motif</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rendezvous.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>Aucun rendez-vous pour le moment.</td>
              </tr>
            ) : (
              rendezvous.map((rv) => (
                <tr key={rv.id}>
                  <td>{rv.dateHeure ? new Date(rv.dateHeure).toLocaleDateString('fr-FR') : "-"}</td>
                  <td>{rv.dateHeure ? new Date(rv.dateHeure).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}</td>
                  <td>{rv.patient ? `${rv.patient.nom} ${rv.patient.prenom}` : "Inconnu"}</td>
                  <td>{rv.motif || "-"}</td>
                  <td>{rv.statut}</td>
                  <td>
                    {/* Boutons d'action pour valider ou annuler si en attente */}
                    {rv.statut === "en attente" && (
                      <>
                        <button onClick={() => handleValider(rv.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                          Valider
                        </button>
                        <button onClick={() => handleAnnuler(rv.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                          Annuler
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
