import React, { useState, useEffect } from "react";
import axios from "axios";

// Page de demande, modification et annulation de rendez-vous pour le patient
export default function DemandeRendezvous() {
  // États pour le formulaire de création
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [motif, setMotif] = useState("");
  // Liste des demandes du patient
  const [mesDemandes, setMesDemandes] = useState([]);
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
  // États pour l'édition d'une demande
  const [editId, setEditId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editHeure, setEditHeure] = useState("");
  const [editMotif, setEditMotif] = useState("");

  // Soumission du formulaire de création de rendez-vous
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérifie que l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
      window.location.href = '/login';
      return;
    }
    const datetime = `${date}T${heure}:00`; // format ISO
    try {
      const response = await axios.post("http://localhost:3000/api/rendezvous/ajouter", {
        patientId: utilisateur?.id,
        dateHeure: datetime,
        motif
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        setDate("");
        setHeure("");
        setMotif("");
        fetchMesRendezvous(); // actualise la liste
      }
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous:', error);
    }
  };

  // Récupère les demandes du patient
  const fetchMesRendezvous = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined') {
        window.location.href = '/login';
        return;
      }
      const res = await axios.get(`http://localhost:3000/api/rendezvous/user/${utilisateur?.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMesDemandes(res.data);
    } catch (err) {
      console.error('Erreur dans fetchMesRendezvous:', err);
    }
  };

  // Annule une demande de rendez-vous
  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined') {
        window.location.href = '/login';
        return;
      }
      await axios.delete(`http://localhost:3000/api/rendezvous/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchMesRendezvous();
    } catch (err) {
      console.error(err);
    }
  };

  // Soumet la modification d'une demande
  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/api/rendezvous/${id}`, {
        dateHeure: `${editDate}T${editHeure}:00`,
        motif: editMotif
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditId(null);
      fetchMesRendezvous();
    } catch (err) {
      alert('Erreur lors de la modification');
    }
  };

  // Charge les demandes du patient au chargement de la page
  useEffect(() => {
    fetchMesRendezvous();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Demander un rendez-vous</h2>
      {/* Formulaire de création de rendez-vous */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-gray-50 p-4 rounded shadow">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <small className="text-gray-500">Format attendu : année-mois-jour (ex : 2025-07-24)</small>
        <input
          type="time"
          value={heure}
          onChange={(e) => setHeure(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Motif (facultatif)"
          value={motif}
          onChange={(e) => setMotif(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Envoyer
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Mes demandes</h3>
      {/* Affiche la liste des demandes du patient */}
      {mesDemandes.length === 0 ? (
        <p className="text-gray-500">Aucune demande pour le moment.</p>
      ) : (
        mesDemandes.map((rv) => (
          <div key={rv.id} className="rdv-card">
            {/* Formulaire d'édition si on modifie la demande */}
            {editId === rv.id ? (
              <form onSubmit={e => handleEditSubmit(e, rv.id)} className="mb-2">
                <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} required className="border p-2 mr-2" />
                <input type="time" value={editHeure} onChange={e => setEditHeure(e.target.value)} required className="border p-2 mr-2" />
                <input type="text" value={editMotif} onChange={e => setEditMotif(e.target.value)} placeholder="Motif" className="border p-2 mr-2" />
                <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded mr-2">Valider</button>
                <button type="button" onClick={() => setEditId(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Annuler</button>
              </form>
            ) : (
              <>
                <p><strong>Date:</strong> {rv.dateHeure ? new Date(rv.dateHeure).toLocaleDateString('fr-FR') : "Date inconnue"}</p>
                <p><strong>Heure:</strong> {rv.dateHeure ? new Date(rv.dateHeure).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}</p>
                <p><strong>Motif:</strong> {rv.motif || "Aucun"}</p>
                <p><strong>Statut:</strong> {rv.statut || "En attente"}</p>
                {/* Boutons pour modifier ou annuler la demande si en attente */}
                {rv.statut === "en attente" && (
                  <>
                    <button onClick={() => {
                      setEditId(rv.id);
                      setEditDate(rv.dateHeure ? rv.dateHeure.split('T')[0] : '');
                      setEditHeure(rv.dateHeure ? new Date(rv.dateHeure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
                      setEditMotif(rv.motif || '');
                    }} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Modifier</button>
                    <button onClick={() => handleCancel(rv.id)} className="bg-red-500 text-white px-3 py-1 rounded">Annuler</button>
                  </>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
