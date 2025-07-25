import React, { useState } from "react";
//import "./AdminPages.css";

// Page de gestion des ordonnances pour l'admin
function Ordonnances() {
  const [ordonnances, setOrdonnances] = useState([]);
  const [form, setForm] = useState({ medicament: "", dose: "" });
  const [message, setMessage] = useState("");

  // Gère la saisie des champs du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ajoute une nouvelle ordonnance
  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.medicament || !form.dose) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }
    setOrdonnances([
      ...ordonnances,
      { medicament: form.medicament, dose: form.dose }
    ]);
    setForm({ medicament: "", dose: "" });
    setMessage("Ordonnance ajoutée avec succès.");
  };

  // Supprime une ordonnance de la liste
  const handleDelete = (index) => {
    const newList = ordonnances.filter((_, i) => i !== index);
    setOrdonnances(newList);
    setMessage("Ordonnance supprimée.");
  };

  return (
    <div className="admin-page">
      <h2>💊 Nouvelle ordonnance</h2>
      {/* Formulaire d'ajout d'ordonnance */}
      <form onSubmit={handleAdd} className="admin-form" style={{ marginBottom: 24 }}>
        <label>Médicament :</label>
        <input
          type="text"
          name="medicament"
          value={form.medicament}
          onChange={handleChange}
          required
        />
        <label>Dosage :</label>
        <input
          type="text"
          name="dose"
          value={form.dose}
          onChange={handleChange}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
      {message && <div style={{ color: "green", marginBottom: 12 }}>{message}</div>}
      {/* Tableau des ordonnances avec action de suppression */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Médicament</th>
            <th>Dosage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordonnances.map((o, index) => (
            <tr key={index}>
              <td>{o.medicament}</td>
              <td>{o.dose}</td>
              <td>
                {/* Bouton pour supprimer l'ordonnance */}
                <button onClick={() => handleDelete(index)} style={{ color: "red" }}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ordonnances;
