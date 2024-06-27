const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');
const upload = require('../config/multerConfig');

router.post('/articles', upload.single('image'), articleController.createArticle);
router.get('/articles', articleController.getArticles);
router.delete('/articles/:id', articleController.deleteArticle);
router.put('/articles/:id', articleController.updateArticle);

module.exports = router;
