const express = require("express");
const router = express.Router();
const {
	createShortUrl,
	redirectToLongUrl,
	getStats,
} = require("../controllers/urlController");
const validateInput = require("../middleware/validateInput");

router.post("/shorturls", validateInput, createShortUrl);
router.get("/shorturls/:code", getStats);
router.get("/:code", redirectToLongUrl);

module.exports = router;
