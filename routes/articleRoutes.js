const express = require('express');
const articleService = require('../services/articleService');

const router = express.Router();

// Route pour créer un article
router.post('/articles', async (req, res) => {
    try {
        const article = await articleService.createArticle(req.body);
        res.status(201).json(article)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// Route pour récupérer tous les articles
router.get('/articles', async (req,res) => {
    try {
        const articles = await articleService.getAllArticles();
        res.json(articles)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;