import { usePodcast } from "../context/PodcastContext";
import { useEffect } from "react";
import "../styles/DarkMode.css"

export default function DarkMode() {
    const {dark, setDark} = usePodcast()
    
    useEffect(() => {
        const saved = localStorage.getItem("darkMode")
        if(saved !== null) {
            setDark(saved === "true");
        }
    },[setDark])

    useEffect(() => {
        document.body.classList.toggle("dark", dark)
        localStorage.setItem("darkMode", dark);
    }, [dark])

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