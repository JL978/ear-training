import React, { useEffect, useRef } from "react";
import useIntervalTrainer from "./hooks/useIntervalTrainer";

import { Container, Box, Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { instrument } from "soundfont-player";

const useStyles = makeStyles((theme) => ({
	gameChoices: {
		"& > *": {
			margin: theme.spacing(2, 1),
		},
	},
	setting: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
}));

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
export default function Home() {
	const classes = useStyles();
	const pianoRef = useRef(null);
	let ac;

	const { semitones, semitonesChoices, newInterval } = useIntervalTrainer();

	useEffect(() => {
		ac = new AudioContext();
		instrument(ac, "acoustic_grand_piano", {
			soundfont: "MusyngKite",
		}).then((piano) => {
			pianoRef.current = piano;
		});
	}, []);

	useEffect(() => {
		for (let i = 0; i < 100; i++) {
			newInterval();
		}
	}, []);

	return (
		<Box
			flexGrow={1}
			display="flex"
			justifyContent="center"
			alignItems="center"
			textAlign="center"
		>
			<Container>
				<Typography variant="h3">Interval Training</Typography>
				<Box
					display="flex"
					justifyContent="center"
					className={classes.gameChoices}
				>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<PlayArrowIcon />}
					>
						Hear Again
					</Button>
					<Button
						variant="outlined"
						color="secondary"
						endIcon={<ArrowForwardIcon />}
					>
						Skip
					</Button>
				</Box>
				<Typography variant="h5">Pick your answer</Typography>
				<Box
					display="flex"
					justifyContent="center"
					className={classes.gameChoices}
				>
					{semitonesChoices.map((choice, index) => {
						return (
							<Button key={index} variant="outlined" color="default">
								{semitones[choice - 1]}
							</Button>
						);
					})}
				</Box>
				<Typography variant="h4" className={classes.setting}>
					Settings
				</Typography>
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
