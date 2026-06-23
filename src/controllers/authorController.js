const authorService = require('../services/authorService');

const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los autores' });
  }
};

const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await authorService.getAuthorById(id);
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el autor' });
  }
};

const createAuthor = async (req, res) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name y email son obligatorios' });
  }

  try {
    const newAuthor = await authorService.createAuthor(name, email, bio);
    res.status(201).json(newAuthor);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error al crear el autor' });
  }
};

const updateAuthor = async (req, res) => {
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
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el autor' });
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAuthor = await authorService.deleteAuthor(id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el autor' });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};