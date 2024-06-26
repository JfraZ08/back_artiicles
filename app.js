const express = require('express');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articleRoutes');
// const db = require('./config/database');
const cors = require('cors')
const app = express();
const port = 4000;

// Middleware pour servir des fichiers statiques
app.use(express.static('public'));
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); 

// Middleware pour analyser les corps de requête JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Définir les routes de l'application
app.use('/api', articleRoutes);

app.listen(port, () => {
    console.log(`Serveur backend démarré sur le port ${port}`);
});
