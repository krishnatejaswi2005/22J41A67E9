import React, { useState } from "react";
import ShortenForm from "../components/ShortenForm";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";

const Home = () => {
	const [results, setResults] = useState([]);

	return (
		<Container>
			<Typography variant="h3" mt={5}>
				URL Shortener
			</Typography>
			<ShortenForm onResults={setResults} />

			{results.length > 0 && (
				<Box mt={4}>
					<Typography variant="h6">Results</Typography>
					{results.map((r, idx) => (
						<Card sx={{ mt: 2 }} key={idx}>
							<CardContent>
								<Typography>
									<strong>Original:</strong> {r.url}
								</Typography>
								<Typography>
									<strong>Short:</strong>{" "}
									<a href={r.shortLink} target="_blank" rel="noreferrer">
										{r.shortLink}
									</a>
								</Typography>
								<Typography>
									<strong>Expiry:</strong> {r.expiry}
								</Typography>
							</CardContent>
						</Card>
					))}
				</Box>
			)}
		</Container>
	);
};

export default Home;
