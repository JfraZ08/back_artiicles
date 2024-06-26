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

router.delete('/:id', async (req,res) => {
    try  {
        const id = req.params.id;
        await articleService.deleteArticles(id)
        res.status(200).send({ message: 'Article supprimé avec succés' })
    } catch (error) {
        res.status(500).send({ message: `Erreur lors de la suppression de l'article`, error})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {title, content} = req.body;
        await articleService.updateArticles(id, title, content);
        res.status(200).send({ message: 'Article mis à jour'});
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la mise à jour de l\'article', error });
    }
});


module.exports = router;