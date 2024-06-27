const express = require('express');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articleRoutes');
// const db = require('./config/database');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const app = express();
const port = 4000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
// Définir les routes de l'application
app.use('/api', articleRoutes);

app.listen(port, () => {
    console.log(`Serveur backend démarré sur le port ${port}`);
});
