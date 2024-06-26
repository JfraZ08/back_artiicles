const express = require('express');
const multer = require('multer');
const path = require('path')
const articleService = require('../services/articleService');
const router = express.Router();

// configuration de multer pour le stockage d'images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Dossier où les fichiers seront stockés
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // renomme le fichier avec la date et l'extension originale
    }
});

const upload = multer({ storage: storage })

// Route pour créer un article
router.post('/articles', upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;
        const imagePath = req.file.path; // Chemin où l'image a été stockée
        
        // Créer l'article avec titre, contenu et chemin de l'image
        const article = await articleService.createArticle({ title, content, imagePath });
        
        res.status(201).json(article);
    } catch (error) {
        console.error('Erreur lors de la création de l\'article:', error);
        res.status(500).json({ error: error.message });
    }
});


// Route pour récupérer tous les articles
router.get('/articles', async (req, res) => {
    try {
        const articles = await articleService.getAllArticles();
        res.json(articles);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un article
router.delete('/articles/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Tentative de suppression de l'article avec ID: ${id}`);
        await articleService.deleteArticles(id);
        res.status(200).send({ message: 'Article supprimé avec succès' });
    } catch (error) {
        console.error(`Erreur lors de la suppression de l'article :`, error);
        res.status(500).send({ message: `Erreur lors de la suppression de l'article`, error });
    }
});

// Route pour mettre à jour un article
router.put('/articles/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;
        console.log(`Tentative de mise à jour de l'article avec ID: ${id}`);
        await articleService.updateArticles(id, title, content);
        res.status(200).send({ message: 'Article mis à jour' });
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'article avec ID ${id}:`, error);
        res.status(500).send({ message: 'Erreur lors de la mise à jour de l\'article', error });
    }
});

module.exports = router;
