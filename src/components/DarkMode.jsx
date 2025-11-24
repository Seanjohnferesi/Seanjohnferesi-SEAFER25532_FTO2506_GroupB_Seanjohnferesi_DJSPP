import { usePodcast } from "../context/PodcastContext";
import "../styles/DarkMode.css"

export default function DarkMode() {
    return (
        <label class="switch">
            <input type="checkbox" />
            <span class="slider"></span>
        </label>
    )
}