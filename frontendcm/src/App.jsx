import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUtilisateur from "./pages/DashboardUtilisateur";
import Header from "./components/Header"; 

import Planification from "./pages/Planification";
import Patients from "./pages/Patients";
import Ordonnances from "./pages/Ordonnances";

import Contact from './pages/Contact';
import Accueil from "./pages/Accueil";
import ProfilUtilisateur from "./pages/ProfilUtilisateur";
import DemandeRendezvous from "./pages/DemandeRendezvous";
import GestionRendezvous from "./pages/GestionRendezvous";
import DashboardMedecin from "./pages/DashboardMedecin";
import MesRendezvous from "./pages/MesRendezvous";
import MesPatients from "./pages/MesPatients";
import MesOrdonnances from "./pages/MesOrdonnances";
import ProfilMedecin from "./pages/ProfilMedecin";

// Composant principal de l'application : gère le routage et la structure globale
function App() {
  return (
    <Router>
      {/* Header commun à toutes les pages */}
      <Header />
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-utilisateur" element={<DashboardUtilisateur />} />
        <Route path="/planification" element={<Planification />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/ordonnances" element={<Ordonnances />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Accueil />} />
        <Route path="/profil" element={<ProfilUtilisateur />} />
        <Route path="/demande-rendezvous" element={<DemandeRendezvous />} />
        <Route path="/gestion-rendezvous" element={<GestionRendezvous />} />
        {/* Routes protégées par PrivateRoute selon le rôle */}
        <Route path="/dashboard-medecin" element={<PrivateRoute allowedRoles={["medecin"]}><DashboardMedecin /></PrivateRoute>} />
        <Route path="/mes-rendezvous" element={<PrivateRoute allowedRoles={["medecin"]}><MesRendezvous /></PrivateRoute>} />
        <Route path="/mes-patients" element={<PrivateRoute allowedRoles={["medecin"]}><MesPatients /></PrivateRoute>} />
        <Route path="/mes-ordonnances" element={<PrivateRoute allowedRoles={["medecin"]}><MesOrdonnances /></PrivateRoute>} />
        <Route path="/profil-medecin" element={<PrivateRoute allowedRoles={["medecin"]}><ProfilMedecin /></PrivateRoute>} />
        {/* Redondance pour les routes admin protégées (exemple) */}
        <Route path="/dashboard-admin" element={<PrivateRoute allowedRoles={["entreprise"]}><DashboardAdmin /></PrivateRoute>} />
        <Route path="/planification" element={<PrivateRoute allowedRoles={["entreprise"]}><Planification /></PrivateRoute>} />
        <Route path="/patients" element={<PrivateRoute allowedRoles={["entreprise"]}><Patients /></PrivateRoute>} />
        <Route path="/ordonnances" element={<PrivateRoute allowedRoles={["entreprise"]}><Ordonnances /></PrivateRoute>} />
        <Route path="/rendezvous" element={<PrivateRoute allowedRoles={["entreprise"]}><GestionRendezvous/></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
