const express = require("express");
const { body } = require("express-validator");
const ctrl = require("../controllers/url.controller");

const router = express.Router();

router.post(
  "/shorten",
  body("longUrl")
    .notEmpty()
    .matches(/^https?:\/\//),
  ctrl.shorten
);

// Stats endpoint (must come before the redirect route)
router.get('/:shortKey/stats', ctrl.stats);

router.get("/:shortKey", ctrl.redirect);

module.exports = router;
