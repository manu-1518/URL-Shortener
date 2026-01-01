-- Add clicks and created_at columns to urls table
ALTER TABLE urls
  ADD COLUMN clicks INT NOT NULL DEFAULT 0,
  ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Optional: create table if it does not exist (adjust types as needed)
-- CREATE TABLE IF NOT EXISTS urls (
--   id BIGINT AUTO_INCREMENT PRIMARY KEY,
--   long_url TEXT NOT NULL,
--   short_key VARCHAR(255) UNIQUE,
--   clicks INT NOT NULL DEFAULT 0,
--   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );
