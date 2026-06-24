const authorService = require('../services/authorService');

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const author = await authorService.getAuthorById(id);
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name y email son obligatorios' });
  }

  try {
    const newAuthor = await authorService.createAuthor(name, email, bio);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
    }
};

const updateAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name y email son obligatorios' });
  }

  try {
    const updatedAuthor = await authorService.updateAuthor(id, name, email, bio);
    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.status(200).json(updatedAuthor);
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedAuthor = await authorService.deleteAuthor(id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};