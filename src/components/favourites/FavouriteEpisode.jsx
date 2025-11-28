import { usePodcast } from "../../context/PodcastContext";
import "../../styles/FavouriteEpisode.css";
import heartFilled from "../../assets/heart-fill.png";
import heartOutline from "../../assets/heart.png";

export default function FavouriteEpisode() {
    const { favourites, seasons, toggleFavourite, handlePlay, podcasts, selectedPodcast} = usePodcast();
    const podcastTitle = podcasts[selectedPodcast]?.title || "Unknown Podcast";
    return (
        <section className="fav-list-container">
            <h2>{podcastTitle}</h2>
            <div className="fav-list">
                {favourites.map((fav, index) => {
                    // Get the season object
                    const season = seasons[fav.season];
                    // Get the actual episode object
                    const episode = season?.episodes[fav.episodeIndex];
                    if (!episode) return null;

                    // Check if episode is currently favourited
                    const isFaved = favourites.some(
                        f => f.season === fav.season && f.episodeIndex === fav.episodeIndex
                    );


                    return (
                        
                    <div 
                        className="wrapper"
                        key={index}
                        onClick={() => handlePlay(episode.file)}
                    >
                        <div className="fav-ep-clm">
                            <img 
                                className="episode-image"
                                src={episode.image || season?.image} 
                                alt={episode.title} 
                            />
                            <div className="fav-episode-details">
                                <div className="fav-title-heart">
                                    <p className="fav-ep-title">
                                        Episode {episode.episode}: {episode.title}
                                    </p>
                                    <img 
                                        className="heart-icon" 
                                        src={isFaved ? heartFilled : heartOutline} 
                                        alt="Favourite" 
                                        onClick={(e) => {
                                            e.stopPropagation(); // prevent play
                                            toggleFavourite(fav); // toggle favourite
                                        }}
                                    />
                                </div>
                                <p className="fav-ep-desc">{episode.description}</p>
                                <div className="fav-ep-meta">
                                    <span>
                                        Added on {fav.addedDate || new Date().toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                     </div>
                    );
                })}
            </div>
        </section>
    );
}
