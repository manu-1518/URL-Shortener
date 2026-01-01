const { validationResult } = require("express-validator");
const service = require("../services/url.service");

exports.shorten = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const shortKey = await service.createShortUrl(req.body.longUrl);
    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/api/${shortKey}`
    });
  } catch (e) {
    next(e);
  }
};

exports.redirect = async (req, res, next) => {
  try {
    const longUrl = await service.getLongUrl(req.params.shortKey);
    if (!longUrl) return res.status(404).json({ message: "Not found" });
    // Increment click count but don't block redirect on failure
    service.incrementClicks(req.params.shortKey).catch(() => {});
    res.redirect(302, longUrl);
  } catch (e) {
    next(e);
  }
};

exports.stats = async (req, res, next) => {
  try {
    const stats = await service.getStats(req.params.shortKey);
    if (!stats) return res.status(404).json({ message: "Not found" });
    res.json({
      id: stats.id,
      longUrl: stats.long_url,
      shortKey: stats.short_key,
      clicks: stats.clicks || 0,
      createdAt: stats.created_at
    });
  } catch (e) {
    next(e);
  }
};
