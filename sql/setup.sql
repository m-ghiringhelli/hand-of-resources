DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS symphonies;

CREATE TABLE venues (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  quadrant VARCHAR NOT NULL,
  capacity INT NOT NULL
);

CREATE TABLE symphonies (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  key VARCHAR NOT NULL
);

INSERT INTO venues (name, quadrant, capacity) VALUES
  ('Wonder Ballroom', 'NE', 800), 
  ('Doug Fir', 'SE', 300),
  ('Crystal Ballroom', 'SW', 1500);

INSERT INTO symphonies (name, key) VALUES
  ('Symphony No. 1', 'C major'),
  ('Symphony No. 2', 'D major'),
  ('Symphony No. 3', 'Eb major'),
  ('Symphony No. 4', 'Bb major'),
  ('Symphony No. 5', 'C minor'),
  ('Symphony No. 6', 'F major'),
  ('Symphony No. 7', 'A major'),
  ('Symphony No. 8', 'F major'),
  ('Symphony No. 9', 'D minor');