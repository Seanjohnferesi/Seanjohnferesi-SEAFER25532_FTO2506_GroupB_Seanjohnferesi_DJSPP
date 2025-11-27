import { usePodcast } from "../context/PodcastContext.jsx";
import "../styles/AudioPlayer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const AudioPlayer = () => {
  const {
    musicPlayer,
    isPlaying,
    setIsPlaying,
    currentTrackIndex,
    setCurrentTrackIndex,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    handleNext,
    handlePrev,
    seasons,
    selectedSeason
  } = usePodcast();

  // Get current episode data dynamically
  const currentEpisode = seasons[selectedSeason]?.episodes[currentTrackIndex];
  const currentSeasonTitle = seasons[selectedSeason]?.title;
  const currentEpisodeFile = currentEpisode?.file;
 console.log(seasons[selectedSeason])
  // Format time in mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Play/pause toggle
  const handlePlay = () => {
    if (!musicPlayer.current || !currentEpisodeFile) return;

    // Only reset src if needed
    if (musicPlayer.current.src !== currentEpisodeFile) {
      musicPlayer.current.src = currentEpisodeFile;
      musicPlayer.current.load();
    }

    if (isPlaying) {
      musicPlayer.current.pause();
      setIsPlaying(false);
    } else {
      musicPlayer.current.play().catch(err => console.error(err));
      setIsPlaying(true);
    }
  };

  // Update current time as audio plays
  const handleTimeUpdate = () => {
    if (musicPlayer.current) {
      setCurrentTime(musicPlayer.current.currentTime);
      localStorage.setItem("currentTime", musicPlayer.current.currentTime);
    }
  };

  // Set duration once metadata is loaded
  const handleLoadedMetadata = () => {
    if (musicPlayer.current) {
      setDuration(musicPlayer.current.duration);
    }
  };

  // Advance to next episode when current ends
  const handleEnded = () => {
    handleNext();
  };

  // Restore time on reload
  useEffect(() => {
    if (musicPlayer.current) {
      const savedTime = localStorage.getItem("currentTime");
      if (savedTime) musicPlayer.current.currentTime = Number(savedTime);
    }
  }, [currentEpisodeFile]);

  return (
    <section className="audio-player-container">
      <div className="contents">
        {/* Episode Info */}
        <div className="audio-info">
            <div className="audio-name">
                <img src={seasons[selectedSeason]?.image} alt={currentEpisode?.title} />
                <div>
                    <p>{currentEpisode?.title || "No episode selected"}</p>
                    <p>{currentSeasonTitle || ""}</p> 
                </div>
            </div>

          {/* Audio element */}
          <div className="player">
            <audio
              ref={musicPlayer}
              src={currentEpisodeFile}
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
            />
          </div>
        </div>

        {/* Playback Controls */}
        <div className="buttons">
          <button className="prev-btn" onClick={handlePrev}>
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>

          <button className="pause-play" onClick={handlePlay}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>

          <button className="next-btn" onClick={handleNext}>
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="time-tracker">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime || 0}
            onChange={(e) => {
              const newTime = Number(e.target.value);
              if (musicPlayer.current) musicPlayer.current.currentTime = newTime;
              setCurrentTime(newTime);
            }}
          />
          <span>{formatTime(currentTime || 0)}</span>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;
