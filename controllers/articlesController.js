// src/controllers/articlesController.js

const ArticleService = require('../services/articles/articleService')
const { ObjectId } = require('mongodb')

// Fonction pour obtenir les articles
const getAllArticles = async (req,res) => {
    try {
        const articles = await ArticleService.getAllArticles();
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de la récupération des articles', error });
    }
};

// Fonction pour obtenir un article par son ID
const getArticleById = async (req, res) => {
    try {
      const { id } = req.params;
      const article = await ArticleService.getArticleById(id);
      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).json({ message: 'Article non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur'});
    }
  };
  
  // Fonction pour créer un nouvel article
  const createArticle = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Le titre et le contenu sont requis'});
    }

    try {
      const newArticleId = await ArticleService.addArticle(title,content);
      res.status(201).json({id: newArticleId, title, content});
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  };
  
  // Fonction pour mettre à jour un article
  const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
  
    if (!title || !content) {
      return res.status(400).json({ message: 'Le titre et le contenu sont requis' });
    }
  
    try {
      const updated = await ArticleService.updateArticle(id, title, content);
      if (updated) {
        res.status(200).json({ id, title, content });
      } else {
        res.status(404).json({ message: 'Article non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  
  
  // Fonction pour supprimer un article
  const deleteArticle = async (req, res) => {
    const { id } = req.params;
  
    // Vérifiez que l'ID est un ObjectId valide
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }
  
    try {
      const deleted = await ArticleService.deleteArticle(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Article non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };

  module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
  }