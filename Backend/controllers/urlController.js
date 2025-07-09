const Url = require("../models/urlModel");
const generateShortcode = require("../utils/generateShortcode");
const { log } = require("../../Logging Middleware");
const geoip = require("geoip-lite");

const HOST = process.env.HOST;

exports.createShortUrl = async (req, res) => {
	const { url, shortcode, validity } = req.body;
	let code = shortcode || generateShortcode();
	const expireAt = new Date(Date.now() + (validity || 30) * 60000);

	try {
		let exists = await Url.findOne({ shortcode: code });
		if (exists) {
			throw new Error("Shortcode already exists.");
		}

		const short = await Url.create({
			originalUrl: url,
			shortcode: code,
			expiry: expireAt,
		});

		log("backend", "info", "controller", `Short URL created for ${url}`);

		res.status(201).json({
			shortLink: `${HOST}/${code}`,
			expiry: short.expiry.toISOString(),
		});
	} catch (err) {
		log("backend", "error", "controller", `Create failed: ${err.message}`);
		res.status(400).json({ error: err.message });
	}
};

exports.redirectToLongUrl = async (req, res) => {
	const code = req.params.code;

	try {
		const record = await Url.findOne({ shortcode: code });
		if (!record) {
			throw new Error("Shortcode not found.");
		}

		if (record.expiry < Date.now()) {
			throw new Error("Link expired.");
		}

		const referrer = req.get("Referrer") || "direct";
		const ip = req.ip;
		const geo = geoip.lookup(ip);

		record.clickCount += 1;
		record.clicks.push({
			referrer,
			location: geo?.country || "unknown",
		});
		await record.save();

		log(
			"backend",
			"info",
			"handler",
			`Redirected ${code} to ${record.originalUrl}`
		);

		res.redirect(record.originalUrl);
	} catch (err) {
		log("backend", "error", "handler", `Redirect error: ${err.message}`);
		res.status(404).json({ error: err.message });
	}
};

exports.getStats = async (req, res) => {
	const code = req.params.code;

	try {
		const record = await Url.findOne({ shortcode: code });
		if (!record) throw new Error("Shortcode not found.");

		const stats = {
			originalUrl: record.originalUrl,
			shortcode: code,
			createdAt: record.createdAt,
			expiry: record.expiry,
			totalClicks: record.clickCount,
			clickDetails: record.clicks,
		};

		log("backend", "info", "controller", `Stats fetched for ${code}`);
		res.status(200).json(stats);
	} catch (err) {
		log("backend", "error", "controller", `Stats error: ${err.message}`);
		res.status(404).json({ error: err.message });
	}
};
