import { useRef, useEffect } from "react";
import { instrument } from "soundfont-player";

export default function usePiano() {
	const pianoRef = useRef(null);

	useEffect(() => {
		instrument(new AudioContext(), "acoustic_grand_piano", {
			soundfont: "MusyngKite",
		}).then((piano) => {
			pianoRef.current = piano;
		});
	}, []);

	return pianoRef.current;
}
