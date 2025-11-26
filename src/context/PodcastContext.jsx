import { createContext, useContext, useEffect, useState, useRef } from "react";
import { filterPodcasts } from "../utils/filterPodcasts.js";
import { sortPodcasts } from "../utils/sortPodcast.js";
import { searchPodcast } from "../utils/search.js";
import { genres } from "../data.js";
import { getGenreTitle } from "../utils/getGenreTitle.js";
import song from "../assets/song.mp3"
import song2 from "../assets/song2.mp3"



const PodcastContext = createContext();

export const usePodcast = () => useContext(PodcastContext)

export function Podcast({ children }) {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerpage = 6;
    const [sort, setSort] = useState("");
    const [selectedGenre , setSelectedGenre] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(0);
    const musicPlayer = useRef(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [duration, setDuration] = useState(0)
    const tracks = [song, song2]
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem("darkMode")
        return saved === "true";
    });
    useEffect(() => {
        document.body.classList.toggle("dark", dark)
        localStorage.setItem("darkMode", dark);
    }, [dark])

    const filtered = filterPodcasts(podcasts, selectedGenre, genres, getGenreTitle);
    const sortedItems = sortPodcasts(filtered, sort);
    const searchFiltered = searchPodcast(sortedItems, searchInput);
    const totalItems = searchFiltered.length;

    const handlePlay = () => {
        if(!musicPlayer.current) return 

        if (isPlaying) {
            musicPlayer.current.pause()
            setIsPlaying(false)
        } else {
            musicPlayer.current.play()
            setIsPlaying(true)
        }
    }

    

    const handleNext = () => {
        setCurrentTrackIndex( (prev) => (prev + 1) % tracks.length)
    }

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => 
            (prev - 1 + tracks.length) % tracks.length
        );
    };

    useEffect(() => {
        if (!musicPlayer.current) return;

        musicPlayer.current.load(); // ensure metadata updates

        if (isPlaying) {
            musicPlayer.current.play();
        }
    }, [currentTrackIndex]);

    return (
        <PodcastContext.Provider value={{
            podcasts,
            setPodcasts,
            loading,
            setLoading,
            error,
            setError,
            selectedPodcast,
            setSelectedPodcast,
            currentPage,
            setCurrentPage,
            itemsPerpage,
            searchFiltered,
            totalItems,
            sort,
            setSort,
            selectedGenre,
            setSelectedGenre,
            searchInput,
            setSearchInput,
            seasons,
            setSeasons,
            selectedSeason,
            setSelectedSeason,
            dark,
            setDark,
            musicPlayer,
            isPlaying,
            setIsPlaying,
            currentTrackIndex,
            setCurrentTrackIndex,
            currentTime,
            setCurrentTime,
            duration,
            setDuration,
            tracks,
            handlePlay,
            handleNext,
            handlePrev
        }}>
            {children}
        </PodcastContext.Provider>
    );
}
