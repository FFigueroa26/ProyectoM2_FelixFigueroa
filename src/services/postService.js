import pool from '../db/pool.js';

export const getAllPosts = async () => {
  const result = await pool.query(`
    SELECT p.*, a.name as author_name, a.email as author_email
    FROM posts p
    JOIN authors a ON p.author_id = a.id
    ORDER BY p.id ASC
  `);
  return result.rows;
};

export const getPostById = async (id) => {
  const result = await pool.query(`
    SELECT p.*, a.name as author_name, a.email as author_email
    FROM posts p
    JOIN authors a ON p.author_id = a.id
    WHERE p.id = $1
  `, [id]);
  return result.rows[0];
};

export const getPostsByAuthorId = async (authorId) => {
  const result = await pool.query(`
    SELECT p.*, a.name as author_name, a.email as author_email
    FROM posts p
    JOIN authors a ON p.author_id = a.id
    WHERE p.author_id = $1
    ORDER BY p.id ASC
  `, [authorId]);
  return result.rows;
};

export const createPost = async (author_id, title, content, published) => {
  const result = await pool.query(
    'INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *',
    [author_id, title, content, published || false]
  );
  return result.rows[0];
};

export const updatePost = async (id, title, content, published) => {
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *',
    [title, content, published, id]
  );
  return result.rows[0];
};

export const deletePost = async (id) => {
  const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};