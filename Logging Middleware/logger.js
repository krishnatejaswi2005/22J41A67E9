// logger.js
const axios = require("axios");
const { LOG_API_URL } = require("./config");

const allowedStacks = ["backend", "frontend"];
const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
const allowedPackages = {
	backend: [
		"cache",
		"controller",
		"cron_job",
		"db",
		"domain",
		"handler",
		"repository",
		"route",
		"service",
	],
	frontend: ["api", "component", "hook", "page", "state", "style"],
	shared: ["auth", "config", "middleware", "utils"],
};

async function log(stack, level, pkg, message) {
	try {
		if (!allowedStacks.includes(stack)) {
			throw new Error(`Invalid stack: ${stack}`);
		}

		if (!allowedLevels.includes(level)) {
			throw new Error(`Invalid level: ${level}`);
		}

		const isValidPackage =
			allowedPackages[stack].includes(pkg) ||
			allowedPackages.shared.includes(pkg);
		if (!isValidPackage) {
			throw new Error(`Invalid package '${pkg}' for stack '${stack}'`);
		}

		const response = await axios.post(LOG_API_URL, {
			stack,
			level,
			package: pkg,
			message,
		});

		console.log("Log success:", response.data);
		return response.data;
	} catch (error) {
		console.error("Logging failed:", error.message);
	}
}

module.exports = { log };
