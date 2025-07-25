import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    // Pas connecté, redirige vers login
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // Connecté, mais pas autorisé : page "non autorisé" ou accueil
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
