import Head from "next/head";
import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Container, Box, Grid, Button } from "@material-ui/core";

const MIDISounds = dynamic(() => import("midi-sounds-react"), { ssr: false });

export default function Home() {
	let midiSounds;
	function playNote() {
		midiSounds.retry();
		//midiSounds.playChordNow(3, [60], 2.5);
	}

	useEffect(() => {
		console.log("hi", midiSounds);
	}, [midiSounds]);

	return (
		<div className="root" id="root">
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
			<MIDISounds
				ref={(ref) => {
					console.log("hello", ref);
					midiSounds = ref;
				}}
				appElementName="root"
				instruments={[3]}
			/>
		</div>
	);
}
