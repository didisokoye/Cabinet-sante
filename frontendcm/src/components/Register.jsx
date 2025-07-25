import { useState } from "react";
import axios from "axios";
import styles from "../pages/Login.module.css";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Page d'inscription utilisateur (tous rôles)
function Register() {
  // États pour le formulaire d'inscription
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    motDePasse: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Gère la saisie des champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gère la soumission du formulaire d'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoie la requête d'inscription à l'API
      await axios.post("http://localhost:3000/api/auth/register", formData);
      setMessage("✅ Inscription réussie ! Redirection en cours...");
      setSuccess(true);
      // Redirige vers la page de connexion après un court délai
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage("❌ " + (error.response?.data?.message || "Erreur lors de l'inscription"));
    }
  };

  return (
    <div className={styles["login-container"]}>
      {/* Formulaire d'inscription */}
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className="login-icon">
          <FaUserCircle size={48} style={{ display: "block", margin: "0 auto", color: "#8fd3f4" }} />
        </div>
        <h2>Créer un compte</h2>
        <label>Nom</label>
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Mot de passe</label>
        <input type="password" name="motDePasse" value={formData.motDePasse} onChange={handleChange} required />
        <label>Rôle</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">Utilisateur</option>
          <option value="entreprise">Entreprise</option>
          <option value="medecin">Médecin</option>
        </select>
        <button type="submit">S'inscrire</button>
        {/* Affiche le message d'erreur ou de succès */}
        {message && <p className={styles["message"]}>{message}</p>}
        {/* Bouton pour aller à la connexion après succès */}
        {success && (
          <button type="button" onClick={() => navigate("/login")}>Aller à la connexion</button>
        )}
      </form>
    </div>
  );
}

export default Register;
