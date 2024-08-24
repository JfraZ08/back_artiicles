const ArticleService = require('../services/articles/articleService')

// Fonction pour obtenir les articles
exports.getAllArticles = async (req,res) => {
    try {
        const articles = await ArticleService.getAllArticles();
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de la récupération des articles', error });
    }
};

// Fonction pour obtenir un article par son ID
exports.getArticleById = async (req, res) => {
    try {
      const article = await ArticleService.getById(req.params.id);
      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).json({ message: 'Article non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'article', error });
    }
  };
  
  // Fonction pour créer un nouvel article
  exports.createArticle = async (req, res) => {
    try {
      const newArticle = await ArticleService.create(req.body);
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'article', error });
    }
  };
  
  // Fonction pour mettre à jour un article
  exports.updateArticle = async (req, res) => {
    try {
      const updatedArticle = await ArticleService.update(req.params.id, req.body);
      if (updatedArticle) {
        res.status(200).json(updatedArticle);
      } else {
        res.status(404).json({ message: 'Article non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'article', error });
    }
  };
  
  // Fonction pour supprimer un article
  exports.deleteArticle = async (req, res) => {
    try {
      const result = await ArticleService.delete(req.params.id);
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Article non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'article', error });
    }
  };