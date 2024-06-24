const ArticleSQL = `INSERT INTO Articles (user_id, title, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`;
const CategoriesSQL = `INSERT INTO ArticleCategories (article_id, category_id) VALUES ?`;
const TagsSQL = `INSERT INTO ArticleTags (article_id, tag_id) VALUES ?`

module.exports = {
    ArticleSQL,
    CategoriesSQL, 
    TagsSQL
}