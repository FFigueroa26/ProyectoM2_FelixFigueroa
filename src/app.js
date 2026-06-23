const express = require('express');
const authorRoutes = require('./routes/authorRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.json());


app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/authors', authorRoutes);
app.use('/posts', postRoutes);

module.exports = app;