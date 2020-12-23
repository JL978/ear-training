import React, { useState, useEffect } from "react";

const intervalpropValues = [
	{ value: "ascending", label: "Ascending" },
	{ value: "descending", label: "Descending" },
	{ value: "both", label: "Ascending/Descending" },
	{ value: "harmony", label: "Harmony" },
];

export default function useIntervalTrainer() {
	const [score, setScore] = useState(0);
	const [settings, setSettings] = useState({
		intervalOrder: 0,
		fixedRoot: false,
		numberOfInvtervals: 1,
	});
	const [currentNotes, setCurrentNotes] = useState([]);
	const [currentChoices, setCurrentChoices] = useState([]);
	const [correctChoice, setCorrectChoice] = useState(false);
	const [intervalProp, setIntervalProp] = useState("ascending");

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
		setCorrectChoice(false);
		//Set the current choices
		const currentChoices = semitonesChoices
			.filter((choice) => choice.selected)
			.map((choice) => ({
				...choice,
				chosen: 0,
			}));
		setCurrentChoices(currentChoices);

		//Getting a random semitone value from the array of possible choices
		const randomIndex = Math.floor(Math.random() * currentChoices.length);
		const randomSemitone = currentChoices[randomIndex].semitone;

		//Setting the 2 notes
		const firstNote = 35 + Math.floor(Math.random() * 36);
		let secondNote;
		if (intervalProp === "ascending") {
			secondNote = firstNote + (randomSemitone - 1);
		} else if (intervalProp === "descending") {
			secondNote = firstNote - (randomSemitone - 1);
		} else {
			const multiplier = Math.random() < 0.5 ? 1 : -1;
			secondNote = firstNote + (randomSemitone - 1) * multiplier;
		}
		setCurrentNotes([firstNote, secondNote]);
	}

	//Check if current choice is correct and change the state of the user selections
	function checkChoice(choice) {
		const isCorrect =
			choice === Math.abs(currentNotes[1] - currentNotes[0]) + 1;
		if (isCorrect) {
			setCorrectChoice(true);
		}
		setCurrentChoices((choices) => {
			const newChoices = choices.map((_choice) => {
				return _choice.semitone === choice
					? { ..._choice, chosen: isCorrect ? 1 : -1 }
					: _choice;
			});
			return newChoices;
		});
		return isCorrect;
	}
	//Toggle on off settings selection
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
		settings,
		semitonesChoices,
		currentNotes,
		currentChoices,
		correctChoice,
		intervalProp,
		intervalpropValues,
		newInterval,
		intervalSelectionToggle,
		checkChoice,
		setIntervalProp,
	};
}
