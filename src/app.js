const express = require('express');
const authorRoutes = require('./routes/authorRoutes');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/authors', authorRoutes);

module.exports = app;