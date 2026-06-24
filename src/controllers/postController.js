import * as postService from '../services/postService.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await postService.getPostById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPostsByAuthorId = async (req, res, next) => {
  const { authorId } = req.params;
  try {
    const posts = await postService.getPostsByAuthorId(authorId);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  const { author_id, title, content, published } = req.body;
  if (!author_id || !title || !content) {
    return res.status(400).json({ error: 'author_id, title y content son obligatorios' });
  }
  try {
    const newPost = await postService.createPost(author_id, title, content, published);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
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
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPost = await postService.deletePost(id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};