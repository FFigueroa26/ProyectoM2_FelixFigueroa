# 📚 API MiniBlog

> API REST de un miniblog con autores, posts y comentarios, construida con **Express.js** y **PostgreSQL**.

---

## 📋 Descripción

El proyecto expone endpoints CRUD para gestionar autores, sus publicaciones y comentarios. Incluye validaciones, manejo de errores con códigos PostgreSQL, documentación interactiva via Swagger UI, y suite de pruebas con Jest + Supertest.

**Stack técnico:** Node.js (ES Modules) · Express 4 · PostgreSQL · pg · Swagger UI Express · Jest · Supertest

**Deploy en Railway:**
- [`https://proyectom2felixfigueroa-production.up.railway.app/health`](https://proyectom2felixfigueroa-production.up.railway.app/health) — Health check
- [`https://proyectom2felixfigueroa-production.up.railway.app/authors`](https://proyectom2felixfigueroa-production.up.railway.app/authors) — Listar autores
- [`https://proyectom2felixfigueroa-production.up.railway.app/comments/post/1`](https://proyectom2felixfigueroa-production.up.railway.app/comments/post/1) — Comentarios del post 1
- [`https://proyectom2felixfigueroa-production.up.railway.app/api-docs`](https://proyectom2felixfigueroa-production.up.railway.app/api-docs) — Swagger UI

## 📍 Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| **GET** | `/health` | Estado del servidor |
| **GET** | `/authors` | Listar autores |
| **POST** | `/authors` | Crear autor |
| **GET** | `/authors/:id` | Obtener autor por ID |
| **PUT** | `/authors/:id` | Actualizar autor |
| **DELETE** | `/authors/:id` | Eliminar autor |
| **GET** | `/posts` | Listar posts |
| **POST** | `/posts` | Crear post |
| **GET** | `/posts/:id` | Obtener post por ID |
| **PUT** | `/posts/:id` | Actualizar post |
| **DELETE** | `/posts/:id` | Eliminar post |
| **GET** | `/posts/author/:authorId` | Posts de un autor |
| **GET** | `/comments/post/:postId` | Comentarios de un post |
| **POST** | `/comments/post/:postId` | Crear comentario |
| **GET** | `/api-docs` | Documentación Swagger UI |

---

## 📁 Estructura del proyecto

```
📦 src/
 ┣ 📂 controllers/    → Manejadores de peticiones
 ┣ 📂 routes/         → Definición de rutas REST
 ┣ 📂 services/       → Lógica de negocio y consultas SQL
 ┣ 📂 db/
 ┃ ┗ 📜 pool.js       → Conexión a PostgreSQL
 ┣ 📂 middlewares/     → Error handler y 404
 ┣ 📜 app.js          → Configuración de Express
 ┗ 📜 server.js       → Punto de entrada
📦 tests/             → Tests con Jest + Supertest
📦 scripts/
 ┣ 📜 setup.sql       → Creación de tablas
 ┗ 📜 seed.sql        → Datos de ejemplo
📦 docs/
 ┗ 📜 openapi.json    → Documentación OpenAPI
📄 .env.example
📄 README.md
```

---

## 🗄️ Esquema de la base de datos

```
authors (1) ────< (N) posts (1) ────< (N) comments
  └─ id (PK)               └─ id (PK)              └─ id (PK)
  └─ name                  └─ title                 └─ content
  └─ email (UNIQUE)        └─ content               └─ author_id (FK → authors)
  └─ bio                   └─ author_id (FK → auth) └─ post_id (FK → posts)
  └─ created_at            └─ published             └─ created_at
                           └─ created_at
```

- `authors` → `posts`: relación 1:N (un autor tiene muchos posts)
- `posts` → `comments`: relación 1:N (un post tiene muchos comentarios)
- `authors` → `comments`: relación 1:N (un autor escribe muchos comentarios)
- Todos los borrados en cascada (ON DELETE CASCADE)

---

## 🚀 Requisitos

- Node.js >= 18
- PostgreSQL >= 13
- npm

## ⚙️ Pasos para ejecutar local

```bash
# 1. Clonar el repositorio
git clone https://github.com/FFigueroa26/ProyectoM2_FelixFigueroa.git
cd ProyectoM2_FelixFigueroa

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
```

Editar `.env` con los datos de tu base de datos local:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_bd
NODE_ENV=development
PORT=3000
```

```bash
# 4. Crear la base de datos
createdb nombre_bd

# 5. Ejecutar setup de tablas
psql -d nombre_bd -f scripts/setup.sql

# 6. (Opcional) Insertar datos de prueba
psql -d nombre_bd -f scripts/seed.sql

# 7. Iniciar el servidor
npm start
```

> Servidor disponible en `http://localhost:3000`

## 🧪 Cómo ejecutar tests

```bash
npm test
```

Ejecuta 28 tests con Jest y Supertest, cubriendo operaciones CRUD y casos de error. Los tests truncan las tablas antes de cada caso y siembran datos frescos.

---

## 📖 Documentación OpenAPI (Swagger UI)

Con el servidor corriendo, abre en el navegador:

```
http://localhost:3000/api-docs
```

La especificación OpenAPI 3.0 se encuentra en `docs/openapi.json` y describe todos los endpoints del API.

---

## ☁️ Guía de deployment en Railway

### 1. Preparar el proyecto
Asegúrate de tener un `start` script en `package.json` (ya incluido) y que el puerto se lea de `process.env.PORT`.

### 2. Conectar el repositorio
Conecta tu cuenta de Railway al repositorio de GitHub (`FFigueroa26/ProyectoM2_FelixFigueroa`) y crea un nuevo proyecto.

### 3. Variables de entorno en Railway

| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | `postgresql://...` (provista por Railway PostgreSQL) |
| `NODE_ENV` | `production` |
| `PORT` | `3000` (Railway asigna el puerto automáticamente) |

Agrega un servicio **PostgreSQL** desde el dashboard; `DATABASE_URL` se inyecta automáticamente.

### 4. Internal URL vs Public URL

- **Internal URL:** `postgresql://postgres:...@postgres.railway.internal:5432/railway` — para comunicación entre servicios dentro de Railway.
- **Public URL:** Se genera automáticamente cuando Railway asigna un dominio.

### 5. Setup de base de datos en Railway

```bash
psql "$DATABASE_URL" -f scripts/setup.sql
psql "$DATABASE_URL" -f scripts/seed.sql   # opcional
```

Railway requiere SSL; el pool ya está configurado con `ssl: { rejectUnauthorized: false }`.

### 6. URL pública del deploy

```
https://proyectom2felixfigueroa-production.up.railway.app
```

Verificada con `GET /health`:

```json
{"status":"ok","timestamp":"2026-06-26T04:54:54.975Z"}
```

---

## 🤖 Registro del uso de AI en el proyecto

Durante el desarrollo se utilizaron herramientas de IA como apoyo en las siguientes tareas:

### 1. Refactorización del pool de conexión a PostgreSQL
**Prompt:** *"Tengo un pool de conexión a PostgreSQL con variables DB_HOST, DB_PORT, DB_USER, etc. Necesito migrarlo a DATABASE_URL para que funcione en Railway con SSL. ¿Cómo debería quedar el pool?"*

**Influencia:** El asistente sugirió usar `connectionString` con `DATABASE_URL` y agregar `ssl: { rejectUnauthorized: false }`, además de incluir una validación temprana si la variable no está definida.

### 2. Generación de la documentación OpenAPI
**Prompt:** *"Genera un archivo OpenAPI 3.0 JSON para una API de miniblog con endpoints CRUD de autores y posts. Los autores tienen name, email, bio. Los posts tienen title, content, author_id, published. Incluye respuestas 200, 201, 400, 404."*

**Influencia:** El asistente generó el archivo `docs/openapi.json` con todos los endpoints, schemas y códigos de respuesta, servido vía Swagger UI Express en `/api-docs`.

### 3. Creación de pruebas unitarias y de integración
**Prompt:** *"¿Cómo puedo resetear las tablas de PostgreSQL entre cada test con Jest sin que los IDs se acumulen? Estoy usando supertest y necesito que cada test empiece limpio."*

**Influencia:** El asistente recomendó usar `TRUNCATE TABLE ... RESTART IDENTITY CASCADE` dentro de un `beforeEach` y cerrar el pool con `afterAll`.

**Prompt:** *"¿Cuál es la forma correcta de testear con supertest que un DELETE devuelve 204 y que el recurso ya no existe en la base de datos?"*

**Influencia:** El asistente sugirió hacer una consulta `SELECT` después del DELETE para verificar la eliminación.

### 4. Elaboración del README
**Prompt:** *"Crea un README en español para un proyecto de API REST con Express y PostgreSQL. Debe incluir: descripción, requisitos, pasos para ejecutar local, cómo correr tests, cómo ver la documentación OpenAPI en Swagger UI, y una guía de deploy en Railway con variables de entorno."*

**Influencia:** El asistente estructuró el README con todas las secciones solicitadas, incluyendo ejemplos de comandos y tabla de variables de entorno.

---

*Las herramientas utilizadas incluyen asistentes de código basados en modelos de lenguaje (Claude, GitHub Copilot) para acelerar tareas repetitivas, generar documentación y escribir tests, siempre bajo supervisión y revisión del desarrollador.*