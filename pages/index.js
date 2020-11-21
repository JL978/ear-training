import Head from "next/head";
import { Container, Box, Grid, Button } from "@material-ui/core";
import MIDISounds from "midi-sounds-react";

export default function Home() {
	function playNote() {
		midiSounds.playChordNow(3, [60], 2.5);
	}

	return (
		<div className="root">
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
				ref={(ref) => (midiSounds = ref)}
				appElementName="root"
				instruments={[3]}
			/>
		</div>
	);
}
