import { Link, useNavigate } from "react-router-dom";

// Composant Header affiché en haut de toutes les pages
function Header() {
  const navigate = useNavigate();

  // Gère la déconnexion de l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");
    navigate("/login");
  };

  // Récupère l'utilisateur connecté (si le user existe)
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

  return (
    <header style={styles.header}>
      {/* Titre/logo de l'application */}
      <div style={styles.title}>Cabinet Santé+</div>
      {/* Navigation principale */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Accueil</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        {/* Affiche les liens selon l'état de connexion */}
        {!utilisateur ? (
          <>
            <Link to="/login" style={styles.link}>Connexion</Link>
            <Link to="/register" style={styles.link}>Inscription</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.logoutButton}>Déconnexion</button>
        )}
      </nav>
    </header>
  );
}

// Styles en JS pour le header et la navigation
const styles = {
  header: {
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#dc3545",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Header;
