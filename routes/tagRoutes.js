const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController')

// Route pour obtenir tous les tags
router.get('/', tagController.getAllTags);

// Route pour obtenir un tag par son ID
router.get('/:id', tagController.getTagById);

// Route pour créer un nouveau tag
router.post('/', tagController.createTag);

// Route pour mettre à jour un tag
router.put('/:id', tagController.updateTag);

// Route pour supprimer un tag
router.delete('/:id', tagController.deleteTag);

module.exports = router;