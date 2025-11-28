import { useEffect } from "react";

export default function useConfirmExitOnPlay(isPlaying) {
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isPlaying) {
                e.preventDefault();
                e.returnValue = ""; // triggers browser confirmation
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isPlaying]);
}
