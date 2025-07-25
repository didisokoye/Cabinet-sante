import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Patients.css";

// Page de gestion des patients pour l'admin
function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ nom: "", prenom: "", age: "", sexe: "", telephone: "", adresse: "" });
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  // Charge la liste des patients depuis l'API
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/patients");
      setPatients(res.data);
    } catch (err) {
      setMessage("Erreur lors du chargement des patients.");
    }
  };

  // Gère la saisie des champs du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ajoute ou modifie un patient
  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (!form.nom || !form.prenom || !form.age || !form.sexe || !form.telephone || !form.adresse) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }
    try {
      if (editId !== null) {
        // Modification
        await axios.put(`http://localhost:3000/api/patients/${editId}`, { ...form, age: Number(form.age) });
        setMessage("Patient modifié avec succès.");
        setEditId(null);
      } else {
        // Ajout
        await axios.post("http://localhost:3000/api/patients", { ...form, age: Number(form.age) });
        setMessage("Patient ajouté avec succès.");
      }
      setForm({ nom: "", prenom: "", age: "", sexe: "", telephone: "", adresse: "" });
      fetchPatients();
    } catch (err) {
      setMessage("Erreur lors de l'enregistrement du patient.");
    }
  };

  // Supprime un patient
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/patients/${id}`);
      setMessage("Patient supprimé.");
      setEditId(null);
      setForm({ nom: "", prenom: "", age: "", sexe: "", telephone: "", adresse: "" });
      fetchPatients();
    } catch (err) {
      setMessage("Erreur lors de la suppression du patient.");
    }
  };

  // Prépare le formulaire pour la modification d'un patient
  const handleEdit = (id) => {
    const patient = patients.find(p => p.id === id);
    setEditId(id);
    setForm({ ...patient, age: String(patient.age) });
    setMessage("");
  };

  // Annule la modification en cours
  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ nom: "", prenom: "", age: "", sexe: "", telephone: "", adresse: "" });
    setMessage("");
  };

  return (
    <div className="admin-page">
      <h2>🗂️ Liste des patients</h2>
      {/* Formulaire d'ajout ou de modification de patient */}
      <form onSubmit={handleAddOrEdit} className="admin-form" style={{ marginBottom: 24 }}>
        <label>Nom :</label>
        <input
          type="text"
          name="nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <label>Prénom :</label>
        <input
          type="text"
          name="prenom"
          value={form.prenom}
          onChange={handleChange}
          required
        />
        <label>Âge :</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          min="0"
          required
        />
        <label>Sexe :</label>
        <select name="sexe" value={form.sexe} onChange={handleChange} required>
          <option value="">Choisir</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
        <label>Téléphone :</label>
        <input
          type="text"
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          required
        />
        <label>Adresse :</label>
        <input
          type="text"
          name="adresse"
          value={form.adresse}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId !== null ? "Valider" : "Ajouter"}</button>
        {editId !== null && (
          <button type="button" onClick={handleCancelEdit} style={{ marginLeft: 8 }}>Annuler</button>
        )}
      </form>
      {message && <div style={{ color: "green", marginBottom: 12 }}>{message}</div>}
      {/* Tableau des patients avec actions */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Âge</th>
            <th>Sexe</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.nom}</td>
              <td>{p.prenom}</td>
              <td>{p.age}</td>
              <td>{p.sexe}</td>
              <td>{p.telephone}</td>
              <td>{p.adresse}</td>
              <td>
                {/* Boutons d'action pour modifier ou supprimer */}
                <button onClick={() => handleEdit(p.id)} style={{ color: "orange", marginRight: 8 }}>
                  Modifier
                </button>
                <button onClick={() => handleDelete(p.id)} style={{ color: "red" }}>
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

export default Patients;
