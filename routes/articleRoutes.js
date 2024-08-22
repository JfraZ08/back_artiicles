// /src/routes/articlesRoutes.js

const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articlesController')

// Route pour obtenir tous les articles
router.get('/', articleController.getAllArticles);

// Route pour obtenir un article par son ID
router.get('/:id', articleController.getArticleById);

// Route pour créer un nouvel article
router.post('/', articleController.createArticle);

// Route pour mettre à jour un article
router.put('/:id', articleController.updateArticle);

// Route pour supprimer un article
router.delete('/:id', articleController.deleteArticle);

module.exports = router;