import React, { useState } from "react";

const semitones = [
	"Minor 2nd",
	"Major 2nd",
	"Minor 3rd",
	"Major 3rd",
	"Perfect 4th",
	"Tritone",
	"Perfect 5th",
	"Minor 6th",
	"Major 6th",
	"Minor 7th",
	"Major 7th",
	"Octave",
	"Minor 9th",
	"Major 9th",
];
const intervalOrderChoices = [
	"ascending",
	"descending",
	"ascending/descending",
];

export default function useIntervalTrainer() {
	const [score, setScore] = useState(0);
	const [gameChoices, setGameChoices] = useState([]);
	const [settings, setSettings] = useState({
		intervalOrder: 0,
		fixedRoot: false,
		numberOfInvtervals: 1,
	});

	const [semitonesChoices, setSemitoneChoices] = useState([4, 7, 12]);

	return {
		score,
		gameChoices,
		settings,
		semitonesChoices,
		semitones,
		intervalOrderChoices,
	};
}
