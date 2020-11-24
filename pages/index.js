import React from "react";
import { Container, Box, Grid, Button } from "@material-ui/core";
import usePiano from "./hooks/usePiano";

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
export default function Home() {
	const piano = usePiano();

	function playNote(note) {
		piano.play(note);
	}

	return (
		<Container>
			<Box
				display="flex"
				height="100vh"
				justifyContent="center"
				alignItems="center"
			>
				<Grid
					container
					direction="row"
					spacing={1}
					justify="center"
					alignItems="center"
				>
					{notes.map((note) => {
						return (
							<Grid item>
								<Button
									onClick={() => playNote(note)}
									variant="outlined"
									color="primary"
								>
									{note}
								</Button>
							</Grid>
						);
					})}
				</Grid>
			</Box>
		</Container>
	);
}
