const db = require('../config/database');
const { ArticleSQL, CategoriesSQL, TagsSQL, ViewArticlesSQL, DeleteArticleSQL, UpdateArticleSQL } = require('./requete/sql');

async function createArticle(articleData) {
    const { user_id, title, content, categories, tags } = articleData;
    const created_at = new Date();
    const updated_at = new Date();

    return new Promise((resolve, reject) => {
        const insertArticleQuery = ArticleSQL;

        db.query(insertArticleQuery, [title, content, created_at, updated_at], (err, result) => {
            if (err) {
                return reject(err);
            }

            const article_id = result.insertId;

            if (categories && categories.length > 0) {
                const insertCategoriesQuery = CategoriesSQL;
                const categoryValues = categories.map(category_id => [article_id, category_id]);

                db.query(insertCategoriesQuery, [categoryValues], (err) => {
                    if (err) {
                        return reject(err);
                    }
                });
            }

            if (tags && tags.length > 0) {
                const insertTagsQuery = TagsSQL;
                const tagValues = tags.map(tag_id => [article_id, tag_id]);

                db.query(insertTagsQuery, [tagValues], (err) => {
                    if (err) {
                        return reject(err);
                    }
                });
            }

            resolve({ article_id, title, content, categories, tags, created_at, updated_at });
        });
    });
}

async function getAllArticles() {
    return new Promise((resolve, reject) => {
        const query = ViewArticlesSQL;
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function deleteArticles() {
    return new Promise((resolve, reject) => {
        const query = DeleteArticleSQL;
        db.query(query, (err, results) => {
            if(err){
                return reject(err)
            }
            resolve(results)
        })
    })
}

async function updateArticles(article_id, title, content) {
    return new Promise((resolve, reject) =>  {
        const updated_at = UpdateArticleSQL
        db.query(UpdateArticleSQL, [title, conent, updated_at, article_id], (err, result) => {
            if(err){
                return reject(err)
            }
            resolve(result)
        })
    })
}

module.exports = {
    createArticle,
    getAllArticles,
    deleteArticles,
    updateArticles
};
