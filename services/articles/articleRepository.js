// /src/services/articleRepository.js

const db = require('../../config/database');
const sql = require('../ArticleSql');

/**
 * Insère un nouvel article dans la base de données.
 * @param {Array} params - Données de l'article à insérer.
 * @returns {Promise<Object>} Article créé.
 */
exports.createArticle = async (params) => {
  try {
    const [result] = await db.query(sql.ArticleSQL, params);
    return { id: result.insertId, ...params };
  } catch (error) {
    throw new Error('Erreur lors de la création de l\'article: ' + error.message);
  }
};

/**
 * Associe les catégories à un article.
 * @param {Array} categories - Liste des associations article_id, category_id.
 * @returns {Promise<void>}
 */
exports.createCategories = async (categories) => {
  try {
    await db.query(sql.CategoriesSQL, [categories]);
  } catch (error) {
    throw new Error('Erreur lors de la création des catégories: ' + error.message);
  }
};

/**
 * Associe les tags à un article.
 * @param {Array} tags - Liste des associations article_id, tag_id.
 * @returns {Promise<void>}
 */
exports.createTags = async (tags) => {
  try {
    await db.query(sql.TagsSQL, [tags]);
  } catch (error) {
    throw new Error('Erreur lors de la création des tags: ' + error.message);
  }
};

/**
 * Récupère tous les articles de la base de données.
 * @returns {Promise<Array>} Liste des articles.
 */
exports.getAllArticles = async () => {
  try {
    const [rows] = await db.query(sql.ViewArticlesSQL);
    return rows;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des articles: ' + error.message);
  }
};

/**
 * Supprime un article de la base de données.
 * @param {number} id - ID de l'article à supprimer.
 * @returns {Promise<void>}
 */
exports.deleteArticle = async (id) => {
  try {
    await db.query(sql.DeleteArticleSQL, [id]);
  } catch (error) {
    throw new Error('Erreur lors de la suppression de l\'article: ' + error.message);
  }
};

/**
 * Met à jour un article existant dans la base de données.
 * @param {Array} params - Données de l'article à mettre à jour.
 * @returns {Promise<void>}
 */
exports.updateArticle = async (params) => {
  try {
    await db.query(sql.UpdateArticleSQL, params);
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour de l\'article: ' + error.message);
  }
};

/**
 * Récupère un article par son ID.
 * @param {number} id - ID de l'article.
 * @returns {Promise<Object|null>} Article trouvé ou null si non trouvé.
 */
exports.getArticleById = async (id) => {
  try {
    const [rows] = await db.query(sql.ArticleById, [id]);
    return rows[0] || null;
  } catch (error) {
    throw new Error('Erreur lors de la récupération de l\'article: ' + error.message);
  }
};

/**
 * Supprime les catégories associées à un article.
 * @param {number} id - ID de l'article.
 * @returns {Promise<void>}
 */
exports.deleteCategories = async (id) => {
  try {
    await db.query(sql.DeleteCategoriesSQL, [id]);
  } catch (error) {
    throw new Error('Erreur lors de la suppression des catégories: ' + error.message);
  }
};

/**
 * Supprime les tags associés à un article.
 * @param {number} id - ID de l'article.
 * @returns {Promise<void>}
 */
exports.deleteTags = async (id) => {
  try {
    await db.query(sql.DeleteTagsSQL, [id]);
  } catch (error) {
    throw new Error('Erreur lors de la suppression des tags: ' + error.message);
  }
};
