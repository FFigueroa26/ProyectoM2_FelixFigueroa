import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/db/pool.js';


beforeEach(async () => {
  await pool.query('TRUNCATE TABLE authors RESTART IDENTITY CASCADE');
  await pool.query(
    'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3)',
    ['Test', 'test@example.com', 'Bio']
  );
});
afterAll(async () => await pool.end());

// ==================== GET ====================
test('GET /authors → 200 con lista', async () => {
  const res = await request(app).get('/authors').expect(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].name).toBe('Test');
});

test('GET /authors/1 → 200 con el autor', async () => {
  const res = await request(app).get('/authors/1').expect(200);
  expect(res.body.name).toBe('Test');
});

test('GET /authors/999 → 404', async () => {
  await request(app).get('/authors/999').expect(404);
});

test('GET /authors/abc → 400 (ID inválido)', async () => {
  await request(app).get('/authors/abc').expect(400);
});

// ==================== POST ====================
test('POST /authors → 201 crea autor', async () => {
  const nuevo = { name: 'Nuevo', email: 'nuevo@mail.com', bio: 'Bio' };
  const res = await request(app).post('/authors').send(nuevo).expect(201);
  expect(res.body).toMatchObject(nuevo);
  expect(res.body).toHaveProperty('id');
});

test('POST /authors → 400 si falta name', async () => {
  const res = await request(app)
    .post('/authors')
    .send({ email: 'x@x.com' })
    .expect(400);
  expect(res.body.error).toMatch(/name y email son obligatorios/);
});

test('POST /authors → 400 si email duplicado', async () => {
  await request(app)
    .post('/authors')
    .send({ name: 'Dupe', email: 'test@example.com' })
    .expect(400);
});

// ==================== PUT ====================
test('PUT /authors/1 → 200 actualiza', async () => {
  const data = { name: 'Actualizado', email: 'act@mail.com', bio: 'Nueva' };
  const res = await request(app).put('/authors/1').send(data).expect(200);
  expect(res.body.name).toBe('Actualizado');
});

test('PUT /authors/999 → 404', async () => {
  await request(app)
    .put('/authors/999')
    .send({ name: 'X', email: 'x@x.com' })
    .expect(404);
});

test('PUT /authors/1 → 400 si falta email', async () => {
  await request(app)
    .put('/authors/1')
    .send({ name: 'Solo nombre' })
    .expect(400);
});

// ==================== DELETE ====================
test('DELETE /authors/1 → 204 elimina', async () => {
  await request(app).delete('/authors/1').expect(204);
  // Verificar que ya no existe
  const res = await pool.query('SELECT * FROM authors WHERE id = 1');
  expect(res.rows.length).toBe(0);
});

test('DELETE /authors/999 → 404', async () => {
  await request(app).delete('/authors/999').expect(404);
});