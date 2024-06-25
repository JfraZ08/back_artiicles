const db = require('../config/database');
const { ArticleSQL, CategoriesSQL, TagsSQL } = require('./requete/sql');

async function createArticle(articleData) {
    const { user_id, title, content, catagories, tags } = articleData; // Vérifiez si c'est bien 'catagories' ou 'categories'
    const created_at = new Date();
    const updated_at = new Date();

    return new Promise((resolve, reject) => {
        const insertArticleQuery = ArticleSQL;

        db.query(insertArticleQuery, [user_id,title, content, created_at, updated_at], (err, result) => {
            if (err) {
                return reject(err);
            }

            const article_id = result.insertId;

            // Insertion des catégories
            if (Array.isArray(catagories) && catagories.length > 0) {
                const insertCategoriesQuery = CategoriesSQL;
                const categroyValues = catagories.map(category_id => [article_id, category_id]);

                db.query(insertCategoriesQuery, [categroyValues], (err) => {
                    if (err) {
                        return reject(err);
                    }
                });
            }

            // Insertion des tags
            if (Array.isArray(tags) && tags.length > 0) {
                const insertTagsQuery = TagsSQL;
                const tagValues = tags.map(tag_id => [article_id, tag_id]);

                db.query(insertTagsQuery, [tagValues], (err) => {
                    if (err) {
                        return reject(err);
                    }
                });
            }

            resolve({ article_id, title, content, catagories, tags, created_at, updated_at });
        });
    });
}

async function getAllArticles() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Articles';
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    createArticle,
    getAllArticles
};
