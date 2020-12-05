import React, { useState, useEffect } from "react";

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
	const [currentInterval, setCurrentInterval] = useState([]);
	const [semitonesChoices, setSemitoneChoices] = useState([4, 7, 12]);

	function newInterval() {
		const randomIndex = Math.floor(Math.random() * semitonesChoices.length);
		const randomSemitone = semitonesChoices[randomIndex];

		const firstNote = 35 + Math.floor(Math.random() * 36);
		const secondNote = firstNote + randomSemitone;
		setCurrentInterval([firstNote, secondNote]);
	}

	return {
		score,
		gameChoices,
		settings,
		semitonesChoices,
		semitones,
		intervalOrderChoices,
		currentInterval,
		newInterval,
	};
}
