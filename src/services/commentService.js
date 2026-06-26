import pool from '../db/pool.js';

export const getCommentsByPostId = async (postId) => {
  const result = await pool.query(`
    SELECT c.*, a.name as author_name, a.email as author_email
    FROM comments c
    JOIN authors a ON c.author_id = a.id
    WHERE c.post_id = $1
    ORDER BY c.created_at ASC
  `, [postId]);
  return result.rows;
};

export const createComment = async (content, authorId, postId) => {
  const result = await pool.query(
    'INSERT INTO comments (content, author_id, post_id) VALUES ($1, $2, $3) RETURNING *',
    [content, authorId, postId]
  );
  return result.rows[0];
};
