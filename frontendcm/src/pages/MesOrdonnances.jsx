import React, { useEffect, useState } from "react";
import axios from "axios";

// Page d'affichage et d'ajout des ordonnances pour le patient (ou médecin)
export default function MesOrdonnances() {
  // Liste des ordonnances
  const [ordonnances, setOrdonnances] = useState([]);
  // Formulaire d'ajout d'ordonnance (pour le médecin)
  const [form, setForm] = useState({ patientId: "", contenu: "" });
  const medecin = JSON.parse(localStorage.getItem("utilisateur"));

  // Charge les ordonnances du médecin au chargement de la page
  useEffect(() => {
    const fetchOrdonnances = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/ordonnances/medecin/${medecin.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrdonnances(res.data);
    };
    fetchOrdonnances();
  }, [medecin.id]);

  // Gère la saisie des champs du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ajoute une nouvelle ordonnance (pour le médecin)
  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:3000/api/ordonnances`, {
      patientId: form.patientId,
      medecinId: medecin.id,
      contenu: form.contenu,
      date: new Date().toISOString().split('T')[0]
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForm({ patientId: "", contenu: "" });
    // Rafraîchit la liste après ajout
    const res = await axios.get(`http://localhost:3000/api/ordonnances/medecin/${medecin.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrdonnances(res.data);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Mes ordonnances</h2>
      {/* Formulaire d'ajout d'ordonnance (pour le médecin) */}
      <form onSubmit={handleAdd} className="mb-6 flex gap-4 items-end">
        <input
          type="text"
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          placeholder="ID du patient"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="contenu"
          value={form.contenu}
          onChange={handleChange}
          placeholder="Contenu de l'ordonnance"
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button>
      </form>
      {/* Affiche la liste des ordonnances */}
      {ordonnances.length === 0 ? (
        <p>Aucune ordonnance pour le moment.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Date</th>
              <th>Patient</th>
              <th>Contenu</th>
            </tr>
          </thead>
          <tbody>
            {ordonnances.map((o) => (
              <tr key={o.id}>
                <td>{o.date}</td>
                <td>{o.patientId}</td>
                <td>{o.contenu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 