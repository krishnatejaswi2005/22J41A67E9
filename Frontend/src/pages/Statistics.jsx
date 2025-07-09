import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import api from "../api/axiosInstance";

const Statistics = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const shortcodes = JSON.parse(
					localStorage.getItem("shortcodes") || "[]"
				);

				const allStats = await Promise.all(
					shortcodes.map((code) =>
						api.get(`/shorturls/${code}`).then((res) => res.data)
					)
				);

				setData(allStats);
				await log("frontend", "info", "component", "Fetched all statistics");
			} catch (err) {
				await log(
					"frontend",
					"error",
					"component",
					`Stats fetch failed: ${err.message}`
				);
			}
		};

		fetchStats();
	}, []);

	return (
		<Container>
			<Typography variant="h4" mt={4}>
				URL Statistics
			</Typography>
			{data.map((d, i) => (
				<Card key={i} sx={{ mt: 3 }}>
					<CardContent>
						<Typography>
							<strong>Short URL:</strong> {d.shortcode}
						</Typography>
						<Typography>
							<strong>Original:</strong> {d.originalUrl}
						</Typography>
						<Typography>
							<strong>Clicks:</strong> {d.totalClicks}
						</Typography>
						<Typography>
							<strong>Created:</strong> {new Date(d.createdAt).toLocaleString()}
						</Typography>
						<Typography>
							<strong>Expiry:</strong> {new Date(d.expiry).toLocaleString()}
						</Typography>
						<Typography mt={2}>
							<strong>Click Details:</strong>
						</Typography>
						{d.clickDetails.map((click, idx) => (
							<Typography key={idx}>
								- {new Date(click.timestamp).toLocaleString()}, {click.referrer}
								, {click.location}
							</Typography>
						))}
					</CardContent>
				</Card>
			))}
		</Container>
	);
};

export default Statistics;
