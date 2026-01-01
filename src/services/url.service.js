const repo = require("../repositories/url.repository");
const redis = require("../cache/redis");
const base62 = require("../utils/base62");

exports.createShortUrl = async (longUrl) => {
  const existing = await repo.findByLongUrl(longUrl);
  if (existing) return existing.short_key;

  // Insert with a minimal temporary placeholder short_key
  // We'll update it immediately after getting the ID
  // Using "0" as placeholder - it's short and will be replaced instantly
  const id = await repo.insertUrl(longUrl, "0");
  const shortKey = base62.encode(id);
  
  await repo.updateShortKey(id, shortKey);
  await redis.set(shortKey, longUrl);

  return shortKey;
};

exports.getLongUrl = async (shortKey) => {
  const cached = await redis.get(shortKey);
  if (cached) return cached;

  const row = await repo.findByShortKey(shortKey);
  if (!row) return null;

  await redis.set(shortKey, row.long_url);
  return row.long_url;
};

exports.incrementClicks = async (shortKey) => {
  try {
    await repo.incrementClicks(shortKey);
  } catch (err) {
    // Log and continue; don't block redirect if DB increments fail
    console.warn('Failed to increment clicks:', err.message || err);
  }
};

exports.getStats = async (shortKey) => {
  const stats = await repo.findStats(shortKey);
  return stats;
};
