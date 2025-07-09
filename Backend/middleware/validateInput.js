module.exports = function validateInput(req, res, next) {
	const { url, shortcode, validity } = req.body;
	try {
		if (!url || typeof url !== "string") {
			throw new Error("Invalid or missing URL.");
		}
		new URL(url); // Validates URL format

		if (shortcode && !/^[a-zA-Z0-9]{4,15}$/.test(shortcode)) {
			throw new Error(
				"Invalid shortcode format. Use 4-15 alphanumeric characters."
			);
		}

		if (validity && (!Number.isInteger(validity) || validity <= 0)) {
			throw new Error("Validity must be a positive integer (in minutes).");
		}

		next();
	} catch (error) {
		const { log } = require("../../Logging Middleware");
		log(
			"backend",
			"error",
			"middleware",
			`Input validation failed: ${error.message}`
		);
		res.status(400).json({ error: error.message });
	}
};
