DROP TABLE IF EXISTS venues;

CREATE TABLE venues (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  quadrant VARCHAR NOT NULL,
  capacity INT NOT NULL
);

INSERT INTO venues (name, quadrant, capacity) VALUES
  ('Wonder Ballroom', 'NE', 800), 
  ('Doug Fir', 'SE', 300),
  ('Crystal Ballroom', 'SW', 1500);