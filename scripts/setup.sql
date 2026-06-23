DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS authors CASCADE;

CREATE TABLE authors (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  UNIQUE NOT NULL,
  bio        TEXT,
  created_at TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX idx_authors_email ON authors(email);


CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(200)  NOT NULL,
  content    TEXT          NOT NULL,
  author_id  INTEGER       NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  published  BOOLEAN       DEFAULT FALSE,
  created_at TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_published  ON posts(published);