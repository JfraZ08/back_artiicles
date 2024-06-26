const pool = require('../config/database'); // Assurez-vous que le chemin vers votre fichier de connexion est correct

// Fonction pour créer un article
async function createArticle(article) {
    const { title, content } = article;
    const [result] = await pool.query('INSERT INTO articles (title, content) VALUES (?, ?)', [title, content]);
    return { article_id: result.insertId, title, content };
}

// Fonction pour récupérer tous les articles
async function getAllArticles() {
    const [rows] = await pool.query('SELECT * FROM articles');
    return rows;
}

// Fonction pour supprimer un article
async function deleteArticles(id) {
    await pool.query('DELETE FROM articles WHERE article_id = ?', [id]);
}

// Fonction pour mettre à jour un article
async function updateArticles(id, title, content) {
    await pool.query('UPDATE articles SET title = ?, content = ? WHERE article_id = ?', [title, content, id]);
}

module.exports = {
    createArticle,
    getAllArticles,
    deleteArticles,
    updateArticles
};
