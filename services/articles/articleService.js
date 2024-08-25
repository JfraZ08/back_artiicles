// back_artiicles/services/articleService.js

const { ViewArticlesSQL, ArticleById, ArticleSQL, UpdateArticleSQL, DeleteArticleSQL } = require('../ArticleSql');
const pool = require('../../config/database');

// Fonction pour obtenir tous les articles
const getAllArticles = async () => {
  try {
    const [rows] = await pool.query(ViewArticlesSQL);
    return rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles :', error.message);
    throw error;
  }
};

// Fonction pour obtenir un article par ID
const getArticleById = async (id) => {
  try {
    const [rows] = await pool.query(ArticleById, [id]);
    return rows[0];
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article :', error.message);
    throw error;
  }
};

// Fonction pour ajouter un nouvel article
const addArticle = async (title, content) => {
  try {
    const [result] = await pool.query(ArticleSQL, [title, content]);
    return result.insertId;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'article :', error.message);
    throw error;
  }
};

// Fonction pour mettre à jour un article par ID
const updateArticle = async (id, title, content) => {
  try {
    const [result] = await pool.query(UpdateArticleSQL, [title, content, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article :', error.message);
    throw error;
  }
};

// Fonction pour supprimer un article par ID
const deleteArticle = async (id) => {
  try {
    const [result] = await pool.query(DeleteArticleSQL, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article :', error.message);
    throw error;
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle
};
