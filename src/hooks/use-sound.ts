import { useCallback } from "react";

export function useSoundEffect() {
	const playCompletionSound = useCallback(() => {
		const audio = new Audio("/sounds/complete.mp3");
		audio.volume = 0.5;
		audio.play().catch((error) => {
			console.log("Erreur lecture audio:", error);
		});
	}, []);

	return { playCompletionSound };
}
