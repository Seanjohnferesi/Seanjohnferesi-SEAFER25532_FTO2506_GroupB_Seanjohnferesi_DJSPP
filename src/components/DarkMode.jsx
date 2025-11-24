import { usePodcast } from "../context/PodcastContext";
import { useEffect } from "react";
import "../styles/DarkMode.css"

export default function DarkMode() {
    const {dark, setDark} = usePodcast()
    useEffect(() => {
        document.body.classList.toggle("dark", dark)
    }, [dark])

    function toggleTheme(){
        setDark(prev => !prev)
    }


    return (
        <label 
            className="switch"
        >
            <input type="checkbox" />
            <span 
                className="slider"
                onClick={() => toggleTheme()}
            ></span>
        </label>
    )
}