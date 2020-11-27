import { useRef, useEffect } from "react";
import { instrument } from "soundfont-player";

export default function usePiano() {
	let ac;
	const pianoRef = useRef(null);

	useEffect(() => console.log(ac), [ac]);

	function resume() {
		if (ac) {
			return ac.resume();
		}
	}
	return { piano: pianoRef.current, resume: resume() };
}
