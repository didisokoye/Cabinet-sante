const sequelize = require('./database');
const User = require('./models/Utilisateur');

// Synchronise les modèles Sequelize avec la base de données (ajuste les tables si besoin)
sequelize.sync({ alter: true }).then(() => {
  console.log('🛠️ Base synchronisée.');
});
