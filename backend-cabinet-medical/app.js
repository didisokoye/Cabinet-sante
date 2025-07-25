const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const authRoutes = require('./routes/auth');
const rendezvousRoutes = require('./routes/rendezvous');
const ordonnancesRoutes = require('./routes/ordonnances');
const medecinRoutes = require('./routes/medecin');
const utilisateursRoutes = require('./routes/utilisateurs');

// Vérifier la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connexion réussie à la base de données.');
    console.log('✅ Utilisation des tables existantes.');
    
    const app = express();

    // Middlewares globaux
    app.use(cors({
      origin: ['http://localhost:5173', 'http://localhost:5174'], // URL du frontend
      credentials: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Déclaration des routes principales de l'API
    app.use('/api/auth', authRoutes);
    app.use('/api/rendezvous', rendezvousRoutes);
    app.use('/api/ordonnances', ordonnancesRoutes);
    app.use('/api/medecin', medecinRoutes);
    app.use('/api/utilisateurs', utilisateursRoutes);
    // Route pour la gestion des patients
    const patientsRouter = require('./routes/patients');
    app.use('/api/patients', patientsRouter);

    // Middleware de gestion des erreurs globales
    app.use((err, req, res, next) => {
      console.error('=== Erreur ===');
      console.error('URL:', req.url);
      console.error('Méthode:', req.method);
      console.error('Body:', req.body);
      console.error('Stack:', err.stack);
      console.error('Type:', err.constructor.name);
      console.error('Message:', err.message);
  
      if (err.original) {
        console.error('=== Détails MySQL ===');
        console.error('Code:', err.original.code);
        console.error('Message:', err.original.sqlMessage);
        console.error('SQL:', err.original.sql);
      }
  
      res.status(500).json({ 
        message: 'Une erreur est survenue.',
        error: {
          type: err.constructor.name,
          message: err.message,
          details: err.original ? {
            code: err.original.code,
            sqlMessage: err.original.sqlMessage
          } : undefined
        }
      });
    });

    // Démarrage du serveur sur le port défini
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur lors de la synchronisation:', err);
  });
