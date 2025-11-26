import { usePodcast } from "../context/PodcastContext";
import { useEffect } from "react";
import "../styles/DarkMode.css"

export default function DarkMode() {
    const {dark, setDark} = usePodcast()

    
    function toggleTheme(){
        setDark(prev => !prev)
    }


    return (
        <label 
            className="switch"
        >
            <input type="checkbox" checked={dark} />
            <span 
                className="slider"
                onClick={() => toggleTheme()}
            ></span>
        </label>
    )
}