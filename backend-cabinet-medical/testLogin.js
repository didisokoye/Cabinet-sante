const axios = require('axios');

// Script de test pour vérifier la connexion à l'API de login
async function testLogin() {
  try {
    // Envoie une requête POST à l'API de login avec des identifiants de test
    const res = await axios.post('http://localhost:3000/api/login', {
      email: 'test@example.com',
      motDePasse: 'tonMotDePasse'
    });
    // Affiche la réponse de l'API si succès
    console.log('Réponse API:', res.data);
  } catch (error) {
    // Affiche l'erreur retournée par l'API ou une erreur réseau
    if (error.response) {
      console.log('Erreur API:', error.response.data);
    } else {
      console.log('Erreur:', error.message);
    }
  }
}

testLogin(); // Lance le test
