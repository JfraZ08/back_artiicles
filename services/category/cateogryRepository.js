// /src/services/categoryRepository.js
const db = require('../../config/database')
const sql = require('../ArticleSql')

/**
 * Récupère toutes les catégories.
 * @returns {Promise<Array>} Liste des catégories.
 */
exports.getAllCategories = async () => {
    try {
        const [rows] = await db.query(sql.GetAllCategoriesSQL);
        return rows;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des catégories: ' + error.message);
    }
};

/**
 * Récupère une catégorie par son ID.
 * @param {number} id - ID de la catégorie.
 * @returns {Promise<Object|null>} Catégorie trouvée ou null si non trouvée.
 */
exports.getCategoryById = async (id) => {
    try {
        const [rows] = await db.query(sql.GetCategoryByIdSQL, [id]);
        return rows[0] || null;
    } catch (error) {
        throw new Error('Erreur lors de la récupération de la catégorie: ' + error.message);
    }
};

/**
 * Crée une nouvelle catégorie.
 * @param {string} name - Nom de la catégorie.
 * @returns {Promise<Object>} Catégorie créée avec son ID généré.
 */
exports.createCategory = async (name) => {
    try {
        const [result] = await db.query(sql.CreateCategorySQL, [name]);
        return { category_id: result.insertId, name };
    } catch (error) {
        throw new Error('Erreur lors de la création de la catégorie: ' + error.message);
    }
};

/**
 * Met à jour une catégorie existante.
 * @param {number} id - ID de la catégorie à mettre à jour.
 * @param {string} name - Nouveau nom de la catégorie.
 * @returns {Promise<void>}
 */
exports.updateCategory = async (id, name) => {
    try {
        await db.query(sql.UpdateCategorySQL, [name, id]);
    } catch (error) {
        throw new Error('Erreur lors de la mise à jour de la catégorie: ' + error.message);
    }
};

/**
 * Supprime une catégorie par son ID.
 * @param {number} id - ID de la catégorie à supprimer.
 * @returns {Promise<void>}
 */
exports.deleteCategory = async (id) => {
    try {
        await db.query(sql.DeleteCategorySQL, [id]);
    } catch (error) {
        throw new Error('Erreur lors de la suppression de la catégorie: ' + error.message);
    }
};
