const ArticleSQL = `INSERT INTO Articles (title, content, created_at, updated_at) VALUES (?, ?, ?, ?)`;
const CategoriesSQL = `INSERT INTO ArticleCategories (article_id, category_id) VALUES ?`;
const TagsSQL = `INSERT INTO ArticleTags (article_id, tag_id) VALUES ?`
const ViewArticlesSQL = `SELECT * FROM Articles`
const DeleteArticleSQL = 'DELETE FROM articles WHERE article_id = ?';
const UpdateArticleSQL = 'UPDATE articles SET title = ?, content = ?, updated_at = ? WHERE article_id = ?';



module.exports = {
    ArticleSQL,
    CategoriesSQL, 
    TagsSQL,
    ViewArticlesSQL,
    DeleteArticleSQL,
    UpdateArticleSQL
}