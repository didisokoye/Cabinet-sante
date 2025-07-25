import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Page d'affichage des patients suivis par le médecin
export default function MesPatients() {
  const [patients, setPatients] = useState([]);
  const medecin = JSON.parse(localStorage.getItem("utilisateur"));

  // Charge la liste des patients du médecin au chargement de la page
  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/medecin/${medecin.id}/patients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(res.data);
    };
    fetchPatients();
  }, [medecin.id]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Mes patients</h2>
      {/* Affiche un message si aucun patient n'est suivi */}
      {patients.length === 0 ? (
        <p>Aucun patient pour le moment.</p>
      ) : (
        // Tableau des patients suivis avec action pour voir l'historique
        <table className="w-full border">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.nom}</td>
                <td>{p.prenom}</td>
                <td>{p.telephone || "-"}</td>
                <td>
                  {/* Lien pour accéder à l'historique du patient */}
                  <Link to={`/historique-patient/${p.id}`} className="bg-blue-500 text-white px-2 py-1 rounded">Historique</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 