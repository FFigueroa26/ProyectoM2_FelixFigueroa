import * as commentService from '../services/commentService.js';

export const getCommentsByPostId = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  const { content, author_id } = req.body;
  const { postId } = req.params;
  if (!content || !author_id) {
    return res.status(400).json({ error: 'content y author_id son obligatorios' });
  }
  try {
    const newComment = await commentService.createComment(content, author_id, postId);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};
