import { usePodcast } from "../../context/PodcastContext";
import "../../styles/FavouriteEpisode.css";
import heartFilled from "../../assets/heart-fill.png";
import heartOutline from "../../assets/heart.png";
import LoadingState from "../LoadingState";

export default function FavouriteEpisode() {
  const {
    favourites,
    seasons,
    toggleFavourite,
    handlePlay,
    setSelectedSeason,
    setCurrentTrackIndex,
    podcasts
  } = usePodcast();

    if(!favourites) return <LoadingState />
    if (!favourites || favourites.length === 0) return <p>No favourites yet.</p>;
    
  // Group favourites by podcast
  const favouritesByPodcast = favourites.reduce((acc, fav) => {
    const podcastId = fav.podcastId || "unknown";
    if (!acc[podcastId]) acc[podcastId] = [];
    acc[podcastId].push(fav);
    return acc;
  }, {});

  return (
    <section className="fav-list-container">
      {Object.entries(favouritesByPodcast).map(([podcastId, favs]) => {
        const podcast = podcasts.find(p => p.id === podcastId);
        const podcastTitle = podcast?.title || "Unknown Podcast";

        return (
          <div key={podcastId} className="fav-podcast-group">
            <h2>{podcastTitle}</h2>
            <div className="fav-list">
              {favs.map((fav, index) => {
                const season = seasons[fav.season];
                const episode = season?.episodes[fav.episodeIndex];
                if (!episode) return null;

                const isFaved = favourites.some(
                  f =>
                    f.podcastId === fav.podcastId &&
                    f.season === fav.season &&
                    f.episodeIndex === fav.episodeIndex
                );

                // Play this episode when clicked
                const playEpisode = () => {
                  setSelectedSeason(fav.season);
                  setCurrentTrackIndex(fav.episodeIndex);
                  handlePlay();
                };

                return (
                     
                  <div
                    className="fav-ep-clm"
                    key={index}
                    onClick={playEpisode}
                  >
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
                          onClick={e => {
                            e.stopPropagation();
                            toggleFavourite(fav);
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
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
