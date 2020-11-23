import Head from "next/head";
import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Container, Box, Grid, Button } from "@material-ui/core";

//const MIDISounds = dynamic(() => import("midi-sounds-react"), { ssr: false });
import { instrument } from "soundfont-player";

export default function Home() {
	let pianoRef = useRef(null);

	useEffect(() => {
		instrument(new AudioContext(), "acoustic_grand_piano", {
			soundfont: "MusyngKite",
		}).then((piano) => {
			pianoRef.current = piano;
		});
	}, []);

	function playNote() {
		pianoRef.current.play("C4");
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
					<Grid item>
						<Button onClick={playNote} variant="outlined" color="primary">
							A
						</Button>
					</Grid>
					<Grid item>
						<Button variant="outlined" color="primary">
							B
						</Button>
					</Grid>
					<Grid item>
						<Button variant="outlined" color="primary">
							C
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
