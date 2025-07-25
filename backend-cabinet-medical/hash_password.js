// hash_password.js
const bcrypt = require('bcrypt');

// Récupère le mot de passe à hasher depuis la ligne de commande
const password = process.argv[2];
if (!password) {
  console.error('Usage: node hash_password.js <motDePasse>');
  process.exit(1);
}

// Hash le mot de passe avec bcrypt (10 tours de salage)
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  // Affiche le hash généré dans la console
  console.log('Hash généré :', hash);
}); 