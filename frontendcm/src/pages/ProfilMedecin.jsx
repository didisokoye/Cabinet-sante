import React, { useState } from "react";
import axios from "axios";

// Page de gestion du profil du médecin
export default function ProfilMedecin() {
  // Récupère les infos du médecin depuis le localStorage
  const [medecin, setMedecin] = useState(JSON.parse(localStorage.getItem("utilisateur")));
  // Formulaire d'édition du profil
  const [form, setForm] = useState({
    nom: medecin.nom || "",
    prenom: medecin.prenom || "",
    specialite: medecin.specialite || "",
    telephone: medecin.telephone || "",
  });
  const [message, setMessage] = useState("");

  // Gère la saisie des champs du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enregistre les modifications du profil
  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:3000/api/utilisateurs/${medecin.id}`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMessage("Profil mis à jour !");
    setMedecin({ ...medecin, ...form });
    localStorage.setItem("utilisateur", JSON.stringify({ ...medecin, ...form }));
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Mon profil</h2>
      {/* Formulaire d'édition du profil du médecin */}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label>Nom</label>
          <input type="text" name="nom" value={form.nom} onChange={handleChange} className="border p-2 rounded w-full" required />
        </div>
        <div>
          <label>Prénom</label>
          <input type="text" name="prenom" value={form.prenom} onChange={handleChange} className="border p-2 rounded w-full" required />
        </div>
        <div>
          <label>Spécialité</label>
          <input type="text" name="specialite" value={form.specialite} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label>Téléphone</label>
          <input type="text" name="telephone" value={form.telephone} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label>Email</label>
          {/* Email affiché mais non modifiable */}
          <input type="email" value={medecin.email} disabled className="border p-2 rounded w-full bg-gray-100" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
        {/* Message de confirmation */}
        {message && <div className="text-green-600 mt-2">{message}</div>}
      </form>
    </div>
  );
} 