import { usePodcast } from "../context/PodcastContext.jsx";
import "../styles/AudioPlayer.css";
import song from "../assets/song.mp3"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackwardStep, faForwardStep, faPlay } from "@fortawesome/free-solid-svg-icons"


const AudioPlayerShell = () => {

    return (
       <section className="audio-player-container">
            <div className="contents">
                <div className="audio-info">
                    <img src="data:image/jpeg;base64,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" alt="" />
                    <div className="audio-name">
                        <p>Episode 1: Fear</p>
                        <p>Fear</p>
                    </div>
                </div>

                <div className="controls-container">
                    <div className="controls">
                        <div className="buttons">
                            <button className="prev-btn">
                                <FontAwesomeIcon icon={faBackwardStep} />
                            </button>

                            <button className="pause-play">
                                <FontAwesomeIcon icon={faPlay} />                               
                            </button>

                            <button className="next-btn">
                                <FontAwesomeIcon icon={faForwardStep} />
                            </button>
                        </div>
                        
                        <div className="player">
                            <audio >
                                <source src={song} />
                            </audio>

                            <input
                                type="range" 
                                name="audio tracker"
                            />
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
       </section>
    );
};

export default AudioPlayerShell;
