const ArticleRepository = require('./articleRepository');

/**
 * Crée un nouvel article et associe des catégories et des tags.
 * @param {Object} articleData - Données de l'article à créer.
 * @param {string} articleData.title - Le titre de l'article.
 * @param {string} articleData.content - Le contenu de l'article.
 * @param {Date} articleData.created_at - La date de création de l'article.
 * @param {Date} articleData.updated_at - La date de la dernière mise à jour de l'article.
 * @param {Array} articleData.categories - Liste des catégories de l'article.
 * @param {Array} articleData.tags - Liste des tags de l'article.
 * @returns {Promise<Object>} - L'article créé avec l'ID généré.
 */
exports.createArticle = async (articleData) => {
  const result = await ArticleRepository.createArticle([
    articleData.title,
    articleData.content,
    articleData.created_at,
    articleData.updated_at
  ]);

  await ArticleRepository.createCategories(articleData.categories);
  await ArticleRepository.createTags(articleData.tags);

  return result;
};

/**
 * Met à jour un article existant et ses associations de catégories et de tags.
 * @param {number} id - ID de l'article à mettre à jour.
 * @param {Object} articleData - Données mises à jour de l'article.
 * @param {string} articleData.title - Le titre de l'article.
 * @param {string} articleData.content - Le contenu de l'article.
 * @param {Array} articleData.categories - Liste des catégories mises à jour.
 * @param {Array} articleData.tags - Liste des tags mis à jour.
 * @returns {Promise<void>}
 */
exports.updateArticle = async (id, articleData) => {
  await ArticleRepository.updateArticle([
    articleData.title,
    articleData.content,
    articleData.categories,
    articleData.tags,
    id
  ]);

  await ArticleRepository.deleteCategories(id);
  await ArticleRepository.deleteTags(id);
  await ArticleRepository.createCategories(articleData.categories);
  await ArticleRepository.createTags(articleData.tags);
};

/**
 * Supprime un article et ses associations de catégories et de tags.
 * @param {number} id - ID de l'article à supprimer.
 * @returns {Promise<void>}
 */
exports.deleteArticle = async (id) => {
  await ArticleRepository.deleteCategories(id);
  await ArticleRepository.deleteTags(id);
  await ArticleRepository.deleteArticle(id);
};

/**
 * Récupère un article par son ID.
 * @param {number} id - ID de l'article à récupérer.
 * @returns {Promise<Object|null>} - L'article trouvé ou null si non trouvé.
 */
exports.getArticleById = async (id) => {
  return await ArticleRepository.getArticleById(id);
};

/**
 * Récupère tous les articles.
 * @returns {Promise<Array>} - Liste des articles.
 */
exports.getAllArticles = async () => {
  return await ArticleRepository.getAllArticles();
};
