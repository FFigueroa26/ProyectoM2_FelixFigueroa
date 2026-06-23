const postService = require('../services/postService');

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postService.getPostById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el post' });
  }
};

const getPostsByAuthorId = async (req, res) => {
  const { authorId } = req.params;
  try {
    const posts = await postService.getPostsByAuthorId(authorId);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los posts del autor' });
  }
};

const createPost = async (req, res) => {
  const { author_id, title, content, published } = req.body;

  // Validaciones obligatorias
  if (!author_id || !title || !content) {
    return res.status(400).json({ error: 'author_id, title y content son obligatorios' });
  }

  try {
    const newPost = await postService.createPost(author_id, title, content, published);
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el post' });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'title y content son obligatorios' });
  }

  try {
    const updatedPost = await postService.updatePost(id, title, content, published);
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await postService.deletePost(id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  createPost,
  updatePost,
  deletePost,
};