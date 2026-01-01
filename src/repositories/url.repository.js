const pool = require("../db");

exports.findByLongUrl = async (url) => {
  const [rows] = await pool.query(
    "SELECT * FROM urls WHERE long_url = ?", [url]
  );
  return rows[0];
};

exports.findByShortKey = async (key) => {
  const [rows] = await pool.query(
    "SELECT * FROM urls WHERE short_key = ?", [key]
  );
  return rows[0];
};

exports.insertUrl = async (longUrl, shortKey = null) => {
  // Insert with short_key if provided, otherwise it will be set via update
  const [result] = await pool.query(
    "INSERT INTO urls (long_url, short_key) VALUES (?, ?)", [longUrl, shortKey]
  );
  return result.insertId;
};

exports.updateShortKey = async (id, key) => {
  await pool.query(
    "UPDATE urls SET short_key = ? WHERE id = ?", [key, id]
  );
};

exports.incrementClicks = async (shortKey) => {
  await pool.query(
    "UPDATE urls SET clicks = clicks + 1 WHERE short_key = ?", [shortKey]
  );
};

exports.findStats = async (shortKey) => {
  const [rows] = await pool.query(
    "SELECT id, long_url, short_key, clicks, created_at FROM urls WHERE short_key = ?", [shortKey]
  );
  return rows[0];
};
