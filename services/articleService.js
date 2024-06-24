const db = require('../config/database');
const { ArticleSQL, CategoriesSQL, TagsSQL} = require ('./requete/sql')

async function createArticle(articleData) {
    const {user_id, title, content, catagories, tags} = articleData;
    const created_at = new Date();
    const updated_at = new Date();

    return new Promise((resolve, reject) => {
        const insertArticleQuery = ArticleSQL;
        
        db.query(insertArticleQuery, [user_id, title, content, created_at, updated_at], (err, result) => {
            if(err){
                return reject(err);
            }

            const article_id = result.insertId;

            const insertCategoriesQuery = CategoriesSQL;

            const categroyValues = catagories.map(category_id => [article_id, category_id]);

            db.query(insertCategoriesQuery, [categroyValues], (err) => {
                if (err) {
                    return reject(err);
                }

                const insertTagsQuery = TagsSQL;

                const tagValues = tags.map(tag_id => [article_id, tag_id]);

                db.query(insertTagsQuery, [tagValues], (err) => {
                    if (err){
                        return reject(err);
                    }

                    resolve({ article_id, user_id, title, content, catagories, tags, created_at, updated_at})

                })
            })
        })
    })
}

module.exports = {
    createArticle
}