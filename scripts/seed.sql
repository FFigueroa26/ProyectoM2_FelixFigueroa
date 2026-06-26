INSERT INTO authors (name, email, bio) VALUES
  ('Félix Figueroa', 
  'felix@example.com', 
  'Desarrollador backend apasionado por PostgreSQL y Node.js'),

  ('Ana Gómez', 
  'ana@devblog.com', 
  'Frontend developer especializada en React y UX'),

  ('Carlos Pérez', 
  'carlos@henry.com', 
  'Arquitecto de software con 10 años de experiencia en sistemas distribuidos')
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (author_id, title, content, published) VALUES
  (1, 'Cómo empecé en el backend', 
  'Después de meses de práctica, mi primer proyecto con Node.js y PostgreSQL finalmente funcionó.', true),

  (1, 'Errores comunes con SQL', 
  'El error más frecuente es olvidar el WHERE en un UPDATE. Siempre revisa tus consultas.', false),

  (2, 'Mi experiencia con React', 
  'Trabajar con componentes funcionales cambió mi forma de desarrollar.', true),
  
  (3, 'Arquitectura de software', 
  'Diseñar sistemas escalables no es solo tecnología, también es entender el negocio.', false);

INSERT INTO comments (content, author_id, post_id) VALUES
  ('Muy buen artículo, Félix. Me motivó a seguir aprendiendo backend.', 2, 1),
  ('Totalmente de acuerdo con lo del WHERE. Me pasó la primera vez.', 3, 2),
  ('Gracias por compartir tu experiencia con React, Ana.', 1, 3),
  ('Excelente reflexión sobre la arquitectura de software.', 2, 4),
  ('¿Podrías recomendar recursos para practicar SQL?', 3, 1);