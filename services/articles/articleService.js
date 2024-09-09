const connectToDatabase = require('../../config/database');
const { ObjectId } = require('mongodb')

// Fonction pour obtenir tous les articles
const getAllArticles = async () => {
  try {
    const db = await connectToDatabase();
    const articles = await db.collection('Articles').find().toArray();
    return articles;
  } catch (error) {
    throw error;
  }
};

// Fonction pour obtenir un article par ID
const getArticleById = async (id) => {
  try {
    const db = await connectToDatabase();
    const article = await db.collection('Articles').findOne({ _id: new ObjectId(id) });
    return article;
  } catch (error) {
    throw error;
  }
};

// Fonction pour ajouter un nouvel article
const addArticle = async (title, content) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('Articles').insertOne({ title, content });
    return result.insertedId;
  } catch (error) {
    throw error;
  }
};

// Fonction pour mettre à jour un article par ID
const updateArticle = async (id, title, content) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('Articles').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, content } }
    );
    return result.matchedCount > 0;
  } catch (error) {
    throw error;
  }
};

// Fonction pour supprimer un article par ID

const deleteArticle = async (id) => {
  try {
    const db = await connectToDatabase();
    
    // Convertir l'ID en ObjectId
    const objectId = new ObjectId(id);
    const result = await db.collection('Articles').deleteOne({ _id: objectId });
    
    return result.deletedCount > 0;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getAllArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle
};
