    // /src/routes/categoryRoutes.js

    const express = require('express')
    const router = express.Router();
    const categoryController = require('../controllers/categoryController')

    // Route pour obtenir toutes les catégories
    router.get('/', categoryController.getAllCategories)

    // Route pour obtenir une catégoriess par son ID
    router.get('/:id', categoryController.getCategoryById)

    // Route pour créer une nouvelle catégorie
    router.post('/', categoryController.createCategory);

    // Route pour mettre à jour une catégorie
    router.put('/:id', categoryController.updateCategory);

    // Route pour supprimer une catégorie
    router.delete('/:id', categoryController.deleteCategory);

    module.exports = router;