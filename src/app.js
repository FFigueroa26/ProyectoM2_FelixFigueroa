import express from 'express';
import authorRoutes from './routes/authorRoutes.js';
import postRoutes from './routes/postRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/authors', authorRoutes);
app.use('/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;