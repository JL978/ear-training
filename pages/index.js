import React, { useEffect, useRef } from "react";
import { Container, Box, Grid, Button } from "@material-ui/core";
import useIntervalTrainer from "./hooks/useIntervalTrainer";

import { instrument } from "soundfont-player";

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
export default function Home() {
	const pianoRef = useRef(null);
	let ac;

	const { semitones, semitonesChoices } = useIntervalTrainer();

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
		<Box
			flexGrow={1}
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Container>
				<Grid
					container
					direction="row"
					spacing={1}
					justify="center"
					alignItems="center"
				>
					{semitones.map((semitone, index) => {
						return (
							<Grid item key={semitone}>
								{semitonesChoices.includes(index + 1) ? (
									<Button variant="contained" color="primary">
										{semitone}
									</Button>
								) : (
									<Button variant="outlined" color="primary">
										{semitone}
									</Button>
								)}
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</Box>
	);
}
