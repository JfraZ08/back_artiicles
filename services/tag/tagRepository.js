// /src/services/tagRepository.js
const pool = require('../../config/database');

// SQL Queries
const sql = require('../ArticleSql');

/**
 * Récupère tous les tags.
 * @returns {Promise<Array>} Liste des tags.
 */
exports.getAllTags = async () => {
    try {
        const [rows] = await pool.query(sql.GetAllTagsSQL);
        return rows;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des tags: ' + error.message);
    }
};

/**
 * Récupère un tag par son ID.
 * @param {number} id - ID du tag.
 * @returns {Promise<Object|null>} Tag trouvé ou null si non trouvé.
 */
exports.getTagById = async (id) => {
    try {
        const [rows] = await pool.query(sql.GetTagByIdSQL, [id]);
        return rows[0] || null;
    } catch (error) {
        throw new Error('Erreur lors de la récupération du tag: ' + error.message);
    }
};

/**
 * Crée un nouveau tag.
 * @param {string} name - Nom du tag.
 * @returns {Promise<Object>} Tag créé avec son ID généré.
 */
exports.createTag = async (name) => {
    try {
        const [result] = await pool.query(sql.CreateTagSQL, [name]);
        return { tag_id: result.insertId, name };
    } catch (error) {
        throw new Error('Erreur lors de la création du tag: ' + error.message);
    }
};

/**
 * Met à jour un tag existant.
 * @param {number} id - ID du tag à mettre à jour.
 * @param {string} name - Nouveau nom du tag.
 * @returns {Promise<void>}
 */
exports.updateTag = async (id, name) => {
    try {
        await pool.query(sql.UpdateTagSQL, [name, id]);
    } catch (error) {
        throw new Error('Erreur lors de la mise à jour du tag: ' + error.message);
    }
};

/**
 * Supprime un tag par son ID.
 * @param {number} id - ID du tag à supprimer.
 * @returns {Promise<void>}
 */
exports.deleteTag = async (id) => {
    try {
        await pool.query(sql.DeleteTagSQL, [id]);
    } catch (error) {
        throw new Error('Erreur lors de la suppression du tag: ' + error.message);
    }
};
