import React, { useEffect, useRef } from "react";
import { Container, Box, Grid, Button } from "@material-ui/core";
// import dynamic from 'next/dynamic'
// const usePiano = dynamic(() => import('./hooks/usePiano'))

import { instrument } from "soundfont-player";

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
export default function Home() {
	const pianoRef = useRef(null);
	let ac;

	useEffect(() => {
		ac = new AudioContext();
		instrument(ac, "acoustic_grand_piano", {
			soundfont: "MusyngKite",
		}).then((piano) => {
			pianoRef.current = piano;
		});
	}, []);

	async function playNote(note) {
		pianoRef.current.play(36);
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
