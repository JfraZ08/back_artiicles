const express = require('express');
const articleService = require('../services/articleService');

const router = express.Router();

router.post('/articles', async (req, res) => {
    try {
        const article = await articleService.createArticle(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/articles', async (req, res) => {
    try {
        const articles = await articleService.getAllArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/articles/:id', async (req, res) => {
    try {
        const article = await articleService.getArticleById(req.params.id);
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/articles/:id', async (req, res) => {
    try {
        const article = await articleService.updateArticle(req.params.id, req.body);
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/articles/:id', async (req, res) => {
    try {
        await articleService.deleteArticle(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
