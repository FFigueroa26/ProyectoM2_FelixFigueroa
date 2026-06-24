import express from 'express';
import * as postController from '../controllers/postController.js';

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.get('/author/:authorId', postController.getPostsByAuthorId);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;