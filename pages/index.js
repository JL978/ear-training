import React, { useEffect, useRef, useState } from "react";
import useIntervalTrainer from "./hooks/useIntervalTrainer";

import { Container, Box, Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { instrument } from "soundfont-player";

//custom styles
const useStyles = makeStyles((theme) => ({
	//buttons choices
	gameChoices: {
		"& > *": {
			margin: theme.spacing(2, 1),
		},
	},
	//settings section
	setting: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
}));

//Custom theme for the player selection buttons, primary as correct answer and secondary as incorrect answer
const theme = createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: green[300],
		},
		secondary: {
			main: red[400],
		},
	},
});

export default function Home() {
	//Required interaction to start the training and initialize the sound player
	const [isTraining, setIsTraining] = useState(false);

	const classes = useStyles();

	const pianoRef = useRef(null);
	const timerRef = useRef(null);
	const acRef = useRef(null);

	const {
		semitonesChoices,
		currentNotes,
		currentChoices,
		correctChoice,
		newInterval,
		intervalSelectionToggle,
		checkChoice,
	} = useIntervalTrainer();

	//initialize the sound player object and store it in a ref (pianoRef)
	async function init() {
		acRef.current = new AudioContext();
		instrument(acRef.current, "acoustic_grand_piano", {
			soundfont: "MusyngKite",
		}).then((piano) => {
			pianoRef.current = piano;
			if (!isTraining) {
				setIsTraining(true);
			}
		});
		newInterval();
	}

	//When the current notes gets changed during init or changeing questions, play the notes once
	useEffect(() => {
		if (currentNotes.length !== 0 && pianoRef.current) {
			playTest();
		}
	}, [currentNotes, pianoRef.current]);

	function playTest() {
		if (pianoRef.current) {
			pianoRef.current.stop();
		}
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		pianoRef.current.play(currentNotes[0], 2, {
			duration: 0.8,
		});

		timerRef.current = setTimeout(() => {
			pianoRef.current.play(currentNotes[1], 2, {
				duration: 0.8,
			});
		}, 700);
	}

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
				{!isTraining ? (
					<Button variant="contained" color="secondary" onClick={() => init()}>
						Start Training
					</Button>
				) : (
					<>
						<Box
							display="flex"
							justifyContent="center"
							className={classes.gameChoices}
						>
							<Button
								variant="contained"
								color="secondary"
								startIcon={<PlayArrowIcon />}
								onClick={playTest}
							>
								Hear Again
							</Button>
							<Button
								variant="outlined"
								color="secondary"
								endIcon={<ArrowForwardIcon />}
								onClick={newInterval}
							>
								Skip
							</Button>
						</Box>
						<Typography variant="h5">Pick your answer</Typography>
						{/* user selections */}
						<MuiThemeProvider theme={theme}>
							<Box
								display="flex"
								justifyContent="center"
								className={classes.gameChoices}
							>
								{currentChoices.map(({ name, semitone, chosen }, index) => {
									return (
										<Button
											key={index}
											variant={"contained"}
											color={
												chosen === 0
													? "default"
													: chosen === 1
													? "primary"
													: "secondary"
											}
											disabled={
												semitone !== currentNotes[1] - currentNotes[0] + 1 &&
												correctChoice
											}
											onClick={() => checkChoice(semitone)}
										>
											{name}
										</Button>
									);
								})}
							</Box>
						</MuiThemeProvider>
						<Box
							display="flex"
							justifyContent="center"
							className={classes.gameChoices}
						>
							<Button
								variant="contained"
								disabled={!correctChoice}
								onClick={newInterval}
							>
								Next
							</Button>
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
							{semitonesChoices.map(({ name, semitone, selected }, index) => {
								return (
									<Grid item key={semitone}>
										<Button
											variant={selected ? "contained" : "outlined"}
											color="primary"
											onClick={() => intervalSelectionToggle(index)}
										>
											{name}
										</Button>
									</Grid>
								);
							})}
						</Grid>
					</>
				)}
			</Container>
		</Box>
	);
}
