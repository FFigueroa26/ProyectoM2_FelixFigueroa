import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/db/pool.js';

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE posts CASCADE');
  await pool.query('TRUNCATE TABLE authors RESTART IDENTITY CASCADE');
  
  await pool.query(
    'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3)',
    ['Autor Test', 'autor@test.com', 'Bio autor']
  );
  
  await pool.query(
    'INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4)',
    [1, 'Post Test', 'Contenido del post', true]
  );
});

afterAll(async () => await pool.end());

// ==================== GET ====================
test('GET /posts → 200 con lista de posts', async () => {
  const res = await request(app).get('/posts').expect(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0]).toHaveProperty('title', 'Post Test');
  expect(res.body[0]).toHaveProperty('author_name', 'Autor Test');
});

test('GET /posts/1 → 200 con el post', async () => {
  const res = await request(app).get('/posts/1').expect(200);
  expect(res.body.title).toBe('Post Test');
  expect(res.body.author_id).toBe(1);
});

test('GET /posts/999 → 404 (no existe)', async () => {
  await request(app).get('/posts/999').expect(404);
});

test('GET /posts/abc → 400 (ID inválido)', async () => {
  await request(app).get('/posts/abc').expect(400);
});

test('GET /posts/author/1 → 200 con posts del autor', async () => {
  const res = await request(app).get('/posts/author/1').expect(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].author_id).toBe(1);
});

test('GET /posts/author/999 → 200 con array vacío (autor sin posts)', async () => {
  const res = await request(app).get('/posts/author/999').expect(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(0);
});

// ==================== POST ====================
test('POST /posts → 201 crea post', async () => {
  const nuevo = {
    author_id: 1,
    title: 'Nuevo Post',
    content: 'Contenido nuevo',
    published: false
  };
  const res = await request(app).post('/posts').send(nuevo).expect(201);
  expect(res.body).toMatchObject(nuevo);
  expect(res.body).toHaveProperty('id');
  expect(res.body).toHaveProperty('created_at');
});

test('POST /posts → 400 si falta title', async () => {
  const res = await request(app)
    .post('/posts')
    .send({ author_id: 1, content: 'Sin título' })
    .expect(400);
  expect(res.body.error).toMatch(/title y content son obligatorios/);
});

test('POST /posts → 400 si falta content', async () => {
  const res = await request(app)
    .post('/posts')
    .send({ author_id: 1, title: 'Sin contenido' })
    .expect(400);
  expect(res.body.error).toMatch(/title y content son obligatorios/);
});

test('POST /posts → 400 si author_id no existe (clave foránea)', async () => {
  await request(app)
    .post('/posts')
    .send({ author_id: 999, title: 'Test', content: 'Contenido' })
    .expect(400); 
});

// ==================== PUT ====================
test('PUT /posts/1 → 200 actualiza', async () => {
  const data = { title: 'Actualizado', content: 'Nuevo contenido', published: false };
  const res = await request(app).put('/posts/1').send(data).expect(200);
  expect(res.body.title).toBe('Actualizado');
  expect(res.body.content).toBe('Nuevo contenido');
});

test('PUT /posts/999 → 404 (no existe)', async () => {
  await request(app)
    .put('/posts/999')
    .send({ title: 'Test', content: 'Contenido' })
    .expect(404);
});

test('PUT /posts/1 → 400 si falta title', async () => {
  await request(app)
    .put('/posts/1')
    .send({ content: 'Sin título' })
    .expect(400);
});

// ==================== DELETE ====================
test('DELETE /posts/1 → 204 elimina', async () => {
  await request(app).delete('/posts/1').expect(204);
  // Verificar que ya no existe
  const res = await pool.query('SELECT * FROM posts WHERE id = 1');
  expect(res.rows.length).toBe(0);
});

test('DELETE /posts/999 → 404 (no existe)', async () => {
  await request(app).delete('/posts/999').expect(404);
});

test('DELETE /posts/abc → 400 (ID inválido)', async () => {
  await request(app).delete('/posts/abc').expect(400);
});