const articleService = require('../services/articleService');

exports.createArticle = async (req, res) => {
  try {
    const { title, content, categories, tags } = req.body;
    const image = req.file ? req.file.filename : null;

    const newArticle = await articleService.createArticle({
      title,
      content,
      categories: JSON.parse(categories),
      tags: JSON.parse(tags),
      image
    });

    res.status(201).json({
      message: 'Article créé avec succès',
      article: newArticle
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    res.status(500).json({
      message: 'Erreur lors de la création de l\'article',
      error: error.message
    });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await articleService.getArticles();
    res.status(200).json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des articles',
      error: error.message
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    await articleService.deleteArticle(articleId);
    res.status(200).json({
      message: 'Article supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression de l\'article',
      error: error.message
    });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const updatedArticle = await articleService.updateArticle(articleId, req.body);
    res.status(200).json({
      message: 'Article mis à jour avec succès',
      article: updatedArticle
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de l\'article',
      error: error.message
    });
  }
};
