const express = require('express');
const authorRoutes = require('./routes/authorRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express(); 

app.use(express.json()); 

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/authors', authorRoutes);
app.use('/posts', postRoutes);
app.use(notFound);
app.use(errorHandler);


module.exports = app;