// /services/articleService.js
const db = require('../config/database');
const {ArticleSQL, ViewArticlesSQL, DeleteArticleSQL, UpdateArticleSQL, CategoriesSQL, TagsSQL, ArticleById, DeleteCategoriesSQL, DeleteTagsSQL} = require('./requete/sql')

async function createArticle(articleData) {
  const { title, content, categories, tags } = articleData;
  const created_at = new Date();
  const updated_at = new Date();

  return new Promise((resolve, reject) => {
    db.query(ArticleSQL, [title, content, created_at, updated_at], (err, result) => {
      if (err) {
        return reject(err);
      }
      const articleId = result.insertId;

      // Gestion des catégories
      if (categories && categories.length > 0) {
        const categoryValues = categories.map(categoryId => [articleId, categoryId]);
        db.query(CategoriesSQL, [categoryValues], (err) => {
          if (err) {
            return reject(err);
          }
        });
      }

      // Gestion des tags
      if (tags && tags.length > 0) {
        const tagValues = tags.map(tagId => [articleId, tagId]);
        db.query(TagsSQL, [tagValues], (err) => {
          if (err) {
            return reject(err);
          }
        });
      }

      resolve({ article_id: articleId, title, content, categories, tags, created_at, updated_at });
    });
  });
}

async function updateArticle(articleId, articleData) {
  const { title, content, categories, tags } = articleData;
  const updated_at = new Date();

  return new Promise((resolve, reject) => {
    db.query(UpdateArticleSQL, [title, content, updated_at, articleId], (err, results) => {
      if (err) {
        return reject(err);
      }

      // Suppression et réinsertion des catégories
      db.query(DeleteCategoriesSQL, [articleId], (err) => {
        if (err) {
          return reject(err);
        }
        if (categories && categories.length > 0) {
          const categoryValues = categories.map(categoryId => [articleId, categoryId]);
          db.query(CategoriesSQL, [categoryValues], (err) => {
            if (err) {
              return reject(err);
            }
          });
        }
      });

      // Suppression et réinsertion des tags
      db.query(DeleteTagsSQL, [articleId], (err) => {
        if (err) {
          return reject(err);
        }
        if (tags && tags.length > 0) {
          const tagValues = tags.map(tagId => [articleId, tagId]);
          db.query(TagsSQL, [tagValues], (err) => {
            if (err) {
              return reject(err);
            }
          });
        }
      });

      resolve({ article_id: articleId, title, content, categories, tags, updated_at });
    });
  });
}


async function getAllArticles() {
  return new Promise((resolve,reject) => {
    db.query(ViewArticlesSQL, (err,results) => {
      if(err) {
        return reject(err);
      }
      resolve(results)
    })
  })
}

async function getArticleById(articleId) {
  return new Promise((resolve, reject) => {
      const query = ArticleById;
      db.query(query, [articleId], (err, result) => {
          if (err) {
              return reject(err);
          }
          resolve(result[0]);
      });
  });
}

async function deleteArticle(articleId) {
  return new Promise((resolve, reject) => {
      db.query(DeleteArticleSQL, [articleId], (err, result) => {
          if (err) {
              return reject(err);
          }
          resolve(result);
      });
  });
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};