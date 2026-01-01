const { createClient } = require("redis");

const redis = createClient({ url: "redis://localhost:6379" });

let isConnected = false;

redis.on("error", err => {
  console.error("Redis error", err);
  isConnected = false;
});

redis.on("connect", () => {
  console.log("Redis connecting...");
});

redis.on("ready", () => {
  isConnected = true;
  console.log("Redis connected");
});

// Attempt to connect, but don't fail if Redis is not available
(async () => {
  try {
    await redis.connect();
  } catch (err) {
    console.warn("Redis not available. Application will continue without caching.");
    isConnected = false;
  }
})();

// Create a wrapper object with safe Redis methods
const redisWrapper = {
  async get(key) {
    if (!isConnected) return null;
    try {
      return await redis.get(key);
    } catch (err) {
      console.warn("Redis get error:", err.message);
      return null;
    }
  },

  async set(key, value) {
    if (!isConnected) return;
    try {
      await redis.set(key, value);
    } catch (err) {
      console.warn("Redis set error:", err.message);
    }
  },

  async del(key) {
    if (!isConnected) return;
    try {
      await redis.del(key);
    } catch (err) {
      console.warn("Redis del error:", err.message);
    }
  }
};

module.exports = redisWrapper;
