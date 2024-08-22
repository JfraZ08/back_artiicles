// /service/ArticleSql.js

// Requêtes pour les articles
const ArticleSQL = `INSERT INTO pixelrealityV2.Articles (content, created_at, updated_at) VALUES (?, ?, ?)`;
const ViewArticlesSQL = `SELECT * FROM pixelrealityV2.Articles`;
const DeleteArticleSQL = `DELETE FROM pixelrealityV2.Articles WHERE article_id = ?`;
const UpdateArticleSQL = `UPDATE pixelrealityV2.Articles SET content = ?, updated_at = ? WHERE article_id = ?`;
const ArticleById = `SELECT * FROM pixelrealityV2.Articles WHERE article_id = ?`;

// Requêtes pour les associations article-catégorie
const CategoriesSQL = `INSERT INTO pixelrealityV2.ArticleCategories (article_id, category_id) VALUES ?`;
const DeleteCategoriesSQL = `DELETE FROM pixelrealityV2.ArticleCategories WHERE article_id = ?`;

// Requêtes pour les associations article-tag
const TagsSQL = `INSERT INTO pixelrealityV2.ArticleTags (article_id, tag_id) VALUES ?`;
const DeleteTagsSQL = `DELETE FROM pixelrealityV2.ArticleTags WHERE article_id = ?`;

// Requêtes pour les catégories
const GetAllCategoriesSQL = `SELECT * FROM pixelrealityV2.Categories`;
const GetCategoryByIdSQL = `SELECT * FROM pixelrealityV2.Categories WHERE category_id = ?`;
const CreateCategorySQL = `INSERT INTO pixelrealityV2.Categories (name) VALUES (?)`;
const UpdateCategorySQL = `UPDATE pixelrealityV2.Categories SET name = ? WHERE category_id = ?`;
const DeleteCategorySQL = `DELETE FROM pixelrealityV2.Categories WHERE category_id = ?`;

// Requêtes pour les tags
const GetAllTagsSQL = `SELECT * FROM pixelrealityV2.Tags`;
const GetTagByIdSQL = `SELECT * FROM pixelrealityV2.Tags WHERE tag_id = ?`;
const CreateTagSQL = `INSERT INTO pixelrealityV2.Tags (name) VALUES (?)`;
const UpdateTagSQL = `UPDATE pixelrealityV2.Tags SET name = ? WHERE tag_id = ?`;
const DeleteTagSQL = `DELETE FROM pixelrealityV2.Tags WHERE tag_id = ?`;

module.exports = {
    // Articles
    ArticleSQL,
    ViewArticlesSQL,
    DeleteArticleSQL,
    UpdateArticleSQL,
    ArticleById,
    // Article-Categories
    CategoriesSQL,
    DeleteCategoriesSQL,
    // Article-Tags
    TagsSQL,
    DeleteTagsSQL,
    // Categories
    GetAllCategoriesSQL,
    GetCategoryByIdSQL,
    CreateCategorySQL,
    UpdateCategorySQL,
    DeleteCategorySQL,
    // Tags
    GetAllTagsSQL,
    GetTagByIdSQL,
    CreateTagSQL,
    UpdateTagSQL,
    DeleteTagSQL
};
