// /src/controllers/tagController.js
const TagRepository = require('../services/tag/tagRepository');

exports.getAllTags = async (req, res) => {
    try {
        const tags = await TagRepository.getAllTags();
        res.json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTagById = async (req, res) => {
    try {
        const tag = await TagRepository.getTagById(req.params.id);
        if (tag) {
            res.json(tag);
        } else {
            res.status(404).json({ error: 'Tag non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTag = async (req, res) => {
    try {
        const newTag = await TagRepository.createTag(req.body.name);
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTag = async (req, res) => {
    try {
        await TagRepository.updateTag(req.params.id, req.body.name);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        await TagRepository.deleteTag(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
