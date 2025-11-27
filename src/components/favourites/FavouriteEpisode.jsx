import { usePodcast } from "../../context/PodcastContext";
import "../../styles/FavouriteEpisode.css";
import heartFilled from "../../assets/heart-fill.png"; // replace with your path
import heartOutline from "../../assets/heart.png"; // optional if needed

export default function FavouriteEpisode() {
    const { favourites, seasons, toggleFavourite } = usePodcast();

    return (
        <section className="fav-list-container">
            <div className="fav-list">
                {favourites.map((fav, index) => {
                    // get the season object
                    const season = seasons[fav.season];
                    // get the actual episode object
                    const episode = season?.episodes[fav.episodeIndex];

                    if (!episode) return null;

                    return (
                        <div className="fav-ep-clm" key={index}>
                            <img src={season?.image} alt={episode.title} />
                            <div className="fav-episode-details">
                
                                <div>
                                    <p className="fav-ep-title">
                                        Episode {episode.episode}: {episode.title}
                                    </p>
                                </div>
          
                                <img 
                                    className="heart-icon" 
                                    src={heartFilled} 
                                    alt="Favourite" 
                                    onClick={(e) => {
                                    e.stopPropagation(); // prevent episode play
                                    toggleFavourite(fav); // unfav on click
                                    }}
                                />
         
                                <p className="fav-ep-desc">{episode.description}</p>
                   
                                <div className="fav-ep-meta">
                                    <span>Added on {fav.addedDate || "Unknown"}</span>
                                </div>
                    
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
