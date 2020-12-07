import React, { useState, useEffect } from "react";

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
	const [currentNotes, setCurrentNotes] = useState([]);
	//state: nochoice || rightchoice || wrongchoice
	const [currentIntervals, setCurrentIntervals] = useState([]);

	const [semitonesChoices, setSemitoneChoices] = useState([
		{ name: "Minor 2nd", semitone: 2, selected: false },
		{ name: "Major 2nd", semitone: 3, selected: false },
		{ name: "Minor 3rd", semitone: 4, selected: false },
		{ name: "Major 3rd", semitone: 5, selected: true },
		{ name: "Perfect 4th", semitone: 6, selected: false },
		{ name: "Tritone", semitone: 7, selected: false },
		{ name: "Perfect 5th", semitone: 8, selected: true },
		{ name: "Minor 6th", semitone: 9, selected: false },
		{ name: "Major 6th", semitone: 10, selected: false },
		{ name: "Minor 7th", semitone: 11, selected: false },
		{ name: "Major 7th", semitone: 12, selected: false },
		{ name: "Octave", semitone: 13, selected: true },
		{ name: "Minor 9th", semitone: 14, selected: false },
		{ name: "Major 9th", semitone: 15, selected: false },
	]);

	function newInterval() {
		const currentChoices = semitonesChoices.filter((choice) => choice.selected);
		setCurrentIntervals(currentChoices);
		const randomIndex = Math.floor(Math.random() * currentChoices.length);
		const randomSemitone = currentChoices[randomIndex].semitone;

		const firstNote = 35 + Math.floor(Math.random() * 36);
		const secondNote = firstNote + randomSemitone;
		setCurrentNotes([firstNote, secondNote]);
	}

	function intervalSelectionToggle(index) {
		const newArr = [...semitonesChoices];
		const choice = semitonesChoices[index];
		const isSelected = !choice.selected;
		const updated = { ...choice, selected: isSelected };
		newArr.splice(index, 1, updated);
		setSemitoneChoices(newArr);
	}

	return {
		score,
		gameChoices,
		settings,
		semitonesChoices,
		intervalOrderChoices,
		currentNotes,
		currentIntervals,
		newInterval,
		intervalSelectionToggle,
	};
}
