# Cabinet Santé+

Application web complète pour la gestion d’un cabinet médical : prise de rendez-vous, gestion des patients, ordonnances, profils, rôles multiples (admin, médecin, patient).

---

## 🚀 Fonctionnalités principales

- **Authentification sécurisée (JWT)**
- **Gestion des rendez-vous** (création, modification, validation, annulation)
- **Gestion des patients** (ajout, modification, suppression, recherche)
- **Gestion des ordonnances** (création, consultation)
- **Profils utilisateurs** (patients, médecins, entreprise)
- **Tableaux de bord adaptés à chaque rôle**
- **Sécurité avancée** : rôles, middlewares, validation des accès
- **Interface moderne et responsive**
- **Documentation et code commenté**

---

## 🗂️ Structure du projet

```
Cabinet-sante/
  frontendcm/                # Frontend React (Vite)
  backend-cabinet-medical/   # Backend Node.js/Express/Sequelize
  README.md
  .gitignore
```

---

## 🛠️ Technologies utilisées

- **Frontend** : React, React Router, Axios, React Icons, CSS modules, Vite
- **Backend** : Node.js, Express, Sequelize (MySQL), JWT, Bcrypt, CORS, dotenv
- **Base de données** : MySQL

---

## 👤 Rôles et accès

- **Entreprise/Admin** : gestion des patients, rendez-vous, ordonnances, planification
- **Médecin** : gestion de ses rendez-vous, patients, ordonnances, profil
- **Patient** : prise de rendez-vous, consultation de ses rendez-vous, ordonnances, profil

---

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/didisokoye/Cabinet-sante.git
cd Cabinet-sante
```

### 2. Installer les dépendances

#### Backend

```bash
cd backend-cabinet-medical
npm install
```

#### Frontend

```bash
cd ../frontendcm
npm install
```

### 3. Configurer les variables d’environnement

Crée un fichier `.env` dans `backend-cabinet-medical/` avec :

```
DB_NAME=nom_de_ta_base
DB_USER=utilisateur
DB_PASS=motdepasse
DB_HOST=localhost
JWT_SECRET=unSecretTresLong
```

### 4. Lancer le backend

```bash
cd backend-cabinet-medical
npm start
```

### 5. Lancer le frontend

```bash
cd ../frontendcm
npm run dev
```

---

## 🌐 Accès

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3000

---

## 🔒 Sécurité

- Authentification JWT (token stocké côté client)
- Middleware d’autorisation par rôle (admin, médecin, patient)
- Validation des entrées côté backend et frontend
- Hashage des mots de passe avec bcrypt
- Variables sensibles dans `.env` (jamais versionnées)

---

## 🎨 Icônes et UI

- Utilisation de [react-icons](https://react-icons.github.io/react-icons/) (FontAwesome, etc.)
- Emojis pour la navigation rapide et l’UX
- Interface responsive et moderne

---

## 📄 .gitignore recommandé

```
node_modules/
.env
dist/
.DS_Store
```

---

## 📚 Documentation et commentaires

- **Tous les fichiers principaux sont commentés** (frontend et backend)
- Les routes, modèles, middlewares, scripts utilitaires, pages et composants sont expliqués
- Les fichiers CSS sont structurés et commentés par bloc

---

## 📝 FAQ

**Q : Comment fonctionne la redirection après inscription ?**  
R : Après une inscription réussie, l’utilisateur est automatiquement redirigé vers la page de connexion pour se connecter avec ses nouveaux identifiants. Un bouton permet également d’y accéder immédiatement.

**Q : Comment ajouter un administrateur ou un médecin ?**  
R : Crée un utilisateur avec le rôle `entreprise` (admin) ou `medecin` via l’inscription ou directement en base.

**Q : Comment déployer le projet ?**  
R :  
- Pousse le projet sur GitHub (voir instructions plus haut)
- Déploie le backend sur Render, Railway, Heroku, etc.
- Déploie le frontend sur Vercel, Netlify, ou GitHub Pages (build statique)
- Configure les variables d’environnement sur la plateforme de déploiement

---

## 📝 Licence

Ce projet est open-source. Ajoute une licence si besoin.

---

## 👨‍💻 Auteur

- [didisokoye](https://github.com/didisokoye)

---

**N’hésite pas à adapter ce README à tes besoins spécifiques !  
Pour toute question ou contribution, ouvre une issue ou une pull request.**

```
