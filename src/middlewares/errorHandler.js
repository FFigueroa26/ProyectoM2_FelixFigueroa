const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  if (err.code === '22P02') {
    return res.status(400).json({ error: 'Formato de ID inválido' });
  }
  if (err.code === '23505') {
    return res.status(400).json({ error: 'Violación de unicidad (email o dato duplicado)' });
  }
  if (err.code === '23503') {
    return res.status(400).json({ error: 'Violación de clave foránea (referencia inexistente)' });
  }

  const status = err.status || 500;
  const message = status === 500 ? 'Error interno del servidor' : err.message;

  res.status(status).json({ error: message });
};

export default errorHandler;