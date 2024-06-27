const db = require('../config/database');
const { ArticleSQL, ViewArticlesSQL, DeleteArticleSQL, UpdateArticleSQL } = require('./requete/sql');

exports.createArticle = async (articleData) => {
  const { title, content, categories, tags, image } = articleData;
  const [result] = await db.query(ArticleSQL,[title, content, JSON.stringify(categories), JSON.stringify(tags), image, new Date()]);
  return { id: result.insertId, ...articleData };
};

exports.getArticles = async () => {
  const [articles] = await db.query(ViewArticlesSQL);
  return articles;
};

exports.deleteArticle = async (id) => {
  await db.query(DeleteArticleSQL, [id]);
};

exports.updateArticle = async (id, updatedData) => {
  const { title, content, categories, tags, image } = updatedData;
  await db.query(
    UpdateArticleSQL, [title, content, JSON.stringify(categories), JSON.stringify(tags), image, id]);
  return { id, ...updatedData };
};
