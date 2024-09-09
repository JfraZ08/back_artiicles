const connectToDatabase = require('../../config/database');
const { ObjectId } = require('mongodb');

/**
 * Récupère toutes les catégories.
 * @returns {Promise<Array>} Liste des catégories.
 */
exports.getAllCategories = async () => {
    try {
        const db = await connectToDatabase();
        const categories = await db.collection('Categories').find().toArray();
        return categories;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des catégories: ' + error.message);
    }
};

/**
 * Récupère une catégorie par son ID.
 * @param {ObjectId} id - ID de la catégorie.
 * @returns {Promise<Object|null>} Catégorie trouvée ou null si non trouvée.
 */
exports.getCategoryById = async (id) => {
    try {
        const db = await connectToDatabase();
        const category = await db.collection('Categories').findOne({ _id: new ObjectId(id) });
        return category || null;
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
        const db = await connectToDatabase();
        const result = await db.collection('Categories').insertOne({ name });
        return { category_id: result.insertedId, name };
    } catch (error) {
        throw new Error('Erreur lors de la création de la catégorie: ' + error.message);
    }
};

/**
 * Met à jour une catégorie existante.
 * @param {ObjectId} id - ID de la catégorie à mettre à jour.
 * @param {string} name - Nouveau nom de la catégorie.
 * @returns {Promise<void>}
 */
exports.updateCategory = async (id, name) => {
    try {
        const db = await connectToDatabase();
        await db.collection('Categories').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name } }
        );
    } catch (error) {
        throw new Error('Erreur lors de la mise à jour de la catégorie: ' + error.message);
    }
};

/**
 * Supprime une catégorie par son ID.
 * @param {ObjectId} id - ID de la catégorie à supprimer.
 * @returns {Promise<void>}
 */
exports.deleteCategory = async (id) => {
    try {
        const db = await connectToDatabase();
        await db.collection('Categories').deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
        throw new Error('Erreur lors de la suppression de la catégorie: ' + error.message);
    }
};
