import express from 'express';
import * as commentController from '../controllers/commentController.js';

const router = express.Router();

router.get('/post/:postId', commentController.getCommentsByPostId);
router.post('/post/:postId', commentController.createComment);

export default router;
