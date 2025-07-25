import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Page de planification des rendez-vous pour l'admin
const Planification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    heure: '',
    motif: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  // Valide les champs du formulaire
  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = "ID Patient requis";
    if (!formData.date) newErrors.date = "Date requise";
    if (!formData.heure) newErrors.heure = "Heure requise";
    if (!formData.motif) newErrors.motif = "Motif requis";
    
    // Validation de la date
    if (formData.date) {
      // Vérifie si la date est au format YYYY-MM-DD
      const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
      if (!dateRegex.test(formData.date)) {
        newErrors.date = "Format incorrect. Utilisez année-mois-jour (ex : 2025-07-24)";
      }
    }
    
    // Validation supplémentaire pour la date
    if (formData.date) {
      const parts = formData.date.split('-');
      if (parts.length !== 3) {
        newErrors.date = "Format incorrect. Utilisez année-mois-jour (ex : 2025-07-24)";
      } else {
        // Vérifie que chaque partie est un nombre
        const [year, month, day] = parts;
        if (!day.match(/^[0-9]+$/) || !month.match(/^[0-9]+$/) || !year.match(/^[0-9]+$/)) {
          newErrors.date = "La date doit contenir uniquement des chiffres";
        }
      }
    }
    
    // Validation supplémentaire pour la date/heure
    if (formData.date && formData.heure) {
      const rdvDateTime = new Date(`${formData.date}T${formData.heure}`);
      if (rdvDateTime < new Date()) {
        newErrors.date = "La date doit être dans le futur";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gère la saisie des champs du formulaire
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Efface l'erreur quand l'utilisateur corrige
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Soumet le formulaire pour planifier un rendez-vous
  const handleSubmit = async e => {
    e.preventDefault();
    setApiMessage("");
    if (!validateForm()) return;
    
    // Vérifie que la date est correctement formatée
    const formattedDate = formData.date;
    if (!formattedDate) {
      setApiMessage("❌ Format de date incorrect. Utilisez année-mois-jour (ex : 2025-07-24)");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Envoie la demande de création de rendez-vous à l'API
      const response = await axios.post('http://localhost:3000/api/rendezvous/ajouter', {
        patientId: Number(formData.patientId),
        dateHeure: `${formattedDate}T${formData.heure}:00`,
        motif: formData.motif
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setApiMessage("✅ Rendez-vous planifié avec succès !");
    } catch (err) {
      let errorMessage = "❌ Erreur lors de la planification";
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Authentification requise";
          navigate('/login');
        } else if (err.response.data?.message) {
          errorMessage = "❌ " + err.response.data.message;
        }
      }
      setApiMessage(errorMessage);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Planifier un rendez-vous</h2>
      {/* Affiche le message de succès ou d'erreur */}
      {apiMessage && (
        <div style={{ color: apiMessage.startsWith('✅') ? 'green' : 'red', marginBottom: 12 }}>
          {apiMessage}
        </div>
      )}
      {/* Formulaire de planification */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID Patient</label>
          <input
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.patientId ? 'border-red-500' : 'border-gray-300'} p-2`}
          />
          {errors.patientId && <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`mt-1 block w-full rounded-md border ${errors.date ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Heure</label>
            <input
              name="heure"
              type="time"
              value={formData.heure}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${errors.heure ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.heure && <p className="mt-1 text-sm text-red-600">{errors.heure}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Motif</label>
          <input
            name="motif"
            value={formData.motif}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.motif ? 'border-red-500' : 'border-gray-300'} p-2`}
          />
          {errors.motif && <p className="mt-1 text-sm text-red-600">{errors.motif}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'En cours...' : 'Planifier'}
        </button>
      </form>
    </div>
  );
};

export default Planification;