import React, { useState } from "react";
import {
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import api from "../api/axiosInstance";
import { log } from "../../../Logging Middleware";
import {
	isValidShortcode,
	isValidUrl,
	isValidValidity,
} from "../utils/validators";

const ShortenForm = ({ onResults }) => {
	const [inputs, setInputs] = useState([
		{ url: "", validity: "", shortcode: "" },
	]);

	const handleChange = (index, field, value) => {
		const newInputs = [...inputs];
		newInputs[index][field] = value;
		setInputs(newInputs);
	};

	const handleAddField = () => {
		if (inputs.length < 5) {
			setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
		}
	};

	const handleSubmit = async () => {
		const results = [];

		for (const input of inputs) {
			const { url, validity, shortcode } = input;

			if (!isValidUrl(url)) {
				alert("Invalid URL");
				await log("frontend", "error", "component", "Invalid URL format.");
				continue;
			}

			if (shortcode && !isValidShortcode(shortcode)) {
				alert("Invalid shortcode");
				await log(
					"frontend",
					"error",
					"component",
					"Invalid shortcode format."
				);
				continue;
			}

			if (!isValidValidity(validity)) {
				alert("Invalid validity");
				await log("frontend", "error", "component", "Invalid validity.");
				continue;
			}

			try {
				const response = await api.post("/shorturls", {
					url,
					validity: validity ? parseInt(validity) : undefined,
					shortcode: shortcode || undefined,
				});

				await log(
					"frontend",
					"info",
					"component",
					`Shortened URL created for ${url}`
				);

				results.push({
					...input,
					shortLink: response.data.shortLink,
					expiry: response.data.expiry,
				});
			} catch (err) {
				await log(
					"frontend",
					"error",
					"component",
					`Shorten failed: ${err.message}`
				);
				alert("Shorten failed for URL: " + url);
			}
		}

		onResults(results);
	};

	return (
		<Card sx={{ marginTop: 4 }}>
			<CardContent>
				<Typography variant="h5">Shorten Your URLs</Typography>
				{inputs.map((input, index) => (
					<Grid container spacing={2} key={index} mt={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Long URL"
								fullWidth
								value={input.url}
								onChange={(e) => handleChange(index, "url", e.target.value)}
							/>
						</Grid>
						<Grid item xs={6} sm={3}>
							<TextField
								label="Validity (mins)"
								fullWidth
								type="number"
								value={input.validity}
								onChange={(e) =>
									handleChange(index, "validity", e.target.value)
								}
							/>
						</Grid>
						<Grid item xs={6} sm={3}>
							<TextField
								label="Custom Shortcode"
								fullWidth
								value={input.shortcode}
								onChange={(e) =>
									handleChange(index, "shortcode", e.target.value)
								}
							/>
						</Grid>
					</Grid>
				))}

				<Button
					variant="outlined"
					sx={{ mt: 2 }}
					onClick={handleAddField}
					disabled={inputs.length >= 5}
				>
					+ Add another URL
				</Button>

				<Button
					variant="contained"
					sx={{ mt: 2, ml: 2 }}
					onClick={handleSubmit}
				>
					Shorten URLs
				</Button>
			</CardContent>
		</Card>
	);
};

export default ShortenForm;
