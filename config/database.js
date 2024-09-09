const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

// Créer une URI de connexion MongoDB
const uri = process.env.MONGODB_URI;

// Créer un nouveau client MongoDB
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Se connecter au client
    await client.connect();
    console.log('Connected to MongoDB');

    // Sélectionner la base de données
    const db = client.db(process.env.DB_NAME_PROD);
    
    // Retourner l'objet de la base de données
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToDatabase;
