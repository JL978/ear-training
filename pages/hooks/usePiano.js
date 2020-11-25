import { useRef, useEffect } from "react";
import { instrument } from "soundfont-player";

export default function usePiano() {
	let ac;
	const pianoRef = useRef(null);

	useEffect(() => {
		ac = new AudioContext();
		console.log("hi", ac);
		instrument(ac, "acoustic_grand_piano", {
			soundfont: "MusyngKite",
		}).then((piano) => {
			pianoRef.current = piano;
		});
	}, []);

	useEffect(() => console.log(ac), [ac]);

	function resume() {
		if (ac) {
			return ac.resume();
		}
	}
	return { piano: pianoRef.current, resume: resume() };
}
