import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import { FaUserCircle } from "react-icons/fa";

// Page de connexion utilisateur (tous rôles)
function Login() {
  // États pour le formulaire
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Gère la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Envoie la requête de connexion à l'API
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        motDePasse,
      });
      // Stocke le token et l'utilisateur dans le localStorage
      const { token, utilisateur } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
      setMessage("Connexion réussie !");
      // Redirige selon le rôle de l'utilisateur
      if (utilisateur.role === "entreprise") {
        navigate("/dashboard-admin");
      } else if (utilisateur.role === "medecin") {
        navigate("/dashboard-medecin");
      } else {
        navigate("/dashboard-utilisateur");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className={styles["login-container"]}>
      {/* Formulaire de connexion */}
      <form className={styles["login-form"]} onSubmit={handleLogin}>
        <div className="login-icon">
          <FaUserCircle size={48} style={{ display: "block", margin: "0 auto", color: "#8fd3f4" }} />
        </div>
        <h2>Connexion</h2>
        <label>Email :</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Mot de passe :</label>
        <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
        <button type="submit">Se connecter</button>
        {/* Affiche le message d'erreur ou de succès */}
        {message && <p className={styles["message"]}>{message}</p>}
      </form>
    </div>
  );
}

export default Login;


