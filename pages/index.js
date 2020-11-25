import React, { useEffect } from "react";
import { Container, Box, Grid, Button } from "@material-ui/core";
// import dynamic from 'next/dynamic'
// const usePiano = dynamic(() => import('./hooks/usePiano'))
import usePiano from "./hooks/usePiano";

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
export default function Home() {
	let { piano, resume } = usePiano();

	// useEffect(() => {
	// 	console.log(usePiano);
	// 	piano = usePiano();
	// }, []);

	async function playNote(note) {
		console.log(piano);
		if (!piano) {
			resume.then(() => piano.play(note)).catch((err) => console.log(err));
		} else {
			piano.play(note);
		}
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
							<Grid item key={note}>
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
