const notFound = (req, res, next) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.originalUrl} no encontrada` });
};

export default notFound;