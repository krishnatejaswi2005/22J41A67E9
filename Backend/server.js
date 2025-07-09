const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("MongoDB connected");
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		const { log } = require("../Logging Middleware");
		log("backend", "fatal", "db", `Database connection failed: ${err.message}`);
		console.error("DB Connection Error:", err.message);
	});
