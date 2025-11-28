import { createContext, useContext, useEffect, useState, useRef } from "react";
import { filterPodcasts } from "../utils/filterPodcasts.js";
import { sortPodcasts } from "../utils/sortPodcast.js";
import { searchPodcast } from "../utils/search.js";
import { genres } from "../data.js";
import { getGenreTitle } from "../utils/getGenreTitle.js";
import useConfirmExitOnPlay from "../utils/confirm.js";



const PodcastContext = createContext();
export const usePodcast = () => useContext(PodcastContext);



export function Podcast({ children }) {
    // --- Podcast state ---
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [sort, setSort] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [searchInput, setSearchInput] = useState("");

    // --- Seasons & episodes ---
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(0);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    // --- Favourite Episode --- 
    const [favourites, setFavourites] = useState(() => {
        const stored = localStorage.getItem("favourites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);



    const toggleFavourite = (episode) => {
    setFavourites(prev => {
        const exists = prev.find(
            item => item.podcastId === episode.podcastId &&
                    item.season === episode.season &&
                    item.episodeIndex === episode.episodeIndex
        );      

        let newFavourites;

        if (exists) {
            newFavourites = prev.filter(
               item =>
                !(
                    item.podcastId === episode.podcastId &&
                    item.season === episode.season &&
                    item.episodeIndex === episode.episodeIndex
                )
            );
        } else {
            newFavourites = [
                ...prev, 
                {
                    ...episode,
                    podcastId: episode.podcastId,
                    addedDate: new Date().toLocaleString()
                }
            ];
        }

        console.log("Updated favourites:", newFavourites); // ← log the new state
        return newFavourites;
    });
};



    // --- Audio player state ---
    const musicPlayer = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useConfirmExitOnPlay(isPlaying);


    // --- Dark mode ---
    const [dark, setDark] = useState(() => localStorage.getItem("darkMode") === "true");
    useEffect(() => {
        document.body.classList.toggle("dark", dark);
        localStorage.setItem("darkMode", dark);
    }, [dark]);

    // --- Filter, sort, search ---
    const filtered = filterPodcasts(podcasts, selectedGenre, genres, getGenreTitle);
    const sortedItems = sortPodcasts(filtered, sort);
    const searchFiltered = searchPodcast(sortedItems, searchInput);
    const totalItems = searchFiltered.length;

    // --- Current episode file ---
    const currentEpisodeFile = seasons[selectedSeason]?.episodes[currentTrackIndex]?.file;

    // --- Audio handlers ---
    const handlePlay = () => {
        if (!musicPlayer.current || !currentEpisodeFile) return;

        musicPlayer.current.src = currentEpisodeFile;
        if (isPlaying) {
            musicPlayer.current.pause();
            setIsPlaying(false);
        } else {
            musicPlayer.current.play().catch(err => console.error(err));
            setIsPlaying(true);
        }
    };

    const handleNext = () => {
        const episodes = seasons[selectedSeason]?.episodes || [];
        setCurrentTrackIndex(prev => (prev + 1) % episodes.length);
    };

    const handlePrev = () => {
        const episodes = seasons[selectedSeason]?.episodes || [];
        setCurrentTrackIndex(prev => (prev - 1 + episodes.length) % episodes.length);
    };

    useEffect(() => {
        if (!musicPlayer.current || !currentEpisodeFile) return;
        musicPlayer.current.src = currentEpisodeFile;
        musicPlayer.current.load();
        if (isPlaying) musicPlayer.current.play().catch(err => console.error(err));
    }, [currentTrackIndex, selectedSeason]);

    const handleTimeUpdate = () => {
        if (musicPlayer.current) setCurrentTime(musicPlayer.current.currentTime);
    };

    const handleDuration = () => {
        if (musicPlayer.current) setDuration(musicPlayer.current.duration);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <PodcastContext.Provider value={{
            podcasts, setPodcasts,
            loading, setLoading,
            error, setError,
            selectedPodcast, setSelectedPodcast,
            currentPage, setCurrentPage,
            itemsPerPage,
            searchFiltered, totalItems,
            sort, setSort,
            selectedGenre, setSelectedGenre,
            searchInput, setSearchInput,
            seasons, setSeasons,
            selectedSeason, setSelectedSeason,
            dark, setDark,
            musicPlayer, isPlaying, setIsPlaying,
            currentTrackIndex, setCurrentTrackIndex,
            currentTime, setCurrentTime,
            duration, setDuration,
            handlePlay, handleNext, handlePrev,
            handleTimeUpdate, handleDuration, formatTime,
            currentEpisodeFile,
            favourites, setFavourites, toggleFavourite,
        }}>
            {children}
        </PodcastContext.Provider>
    );
}
