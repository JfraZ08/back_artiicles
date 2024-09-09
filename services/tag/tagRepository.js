const connectToDatabase = require('../../config/database');
const { ObjectId } = require('mongodb');

/**
 * Récupère tous les tags.
 * @returns {Promise<Array>} Liste des tags.
 */
exports.getAllTags = async () => {
    try {
        const db = await connectToDatabase();
        const tags = await db.collection('Tags').find().toArray();
        return tags;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des tags: ' + error.message);
    }
};

/**
 * Récupère un tag par son ID.
 * @param {ObjectId} id - ID du tag.
 * @returns {Promise<Object|null>} Tag trouvé ou null si non trouvé.
 */
exports.getTagById = async (id) => {
    try {
        const db = await connectToDatabase();
        const tag = await db.collection('Tags').findOne({ _id: new ObjectId(id) });
        return tag || null;
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
        const db = await connectToDatabase();
        const result = await db.collection('Tags').insertOne({ name });
        return { tag_id: result.insertedId, name };
    } catch (error) {
        throw new Error('Erreur lors de la création du tag: ' + error.message);
    }
};

/**
 * Met à jour un tag existant.
 * @param {ObjectId} id - ID du tag à mettre à jour.
 * @param {string} name - Nouveau nom du tag.
 * @returns {Promise<void>}
 */
exports.updateTag = async (id, name) => {
    try {
        const db = await connectToDatabase();
        await db.collection('Tags').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name } }
        );
    } catch (error) {
        throw new Error('Erreur lors de la mise à jour du tag: ' + error.message);
    }
};

/**
 * Supprime un tag par son ID.
 * @param {ObjectId} id - ID du tag à supprimer.
 * @returns {Promise<void>}
 */
exports.deleteTag = async (id) => {
    try {
        const db = await connectToDatabase();
        await db.collection('Tags').deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
        throw new Error('Erreur lors de la suppression du tag: ' + error.message);
    }
};
