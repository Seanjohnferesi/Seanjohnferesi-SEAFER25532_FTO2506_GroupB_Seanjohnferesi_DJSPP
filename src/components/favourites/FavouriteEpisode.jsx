import { usePodcast } from "../../context/PodcastContext";
import "../../styles/FavouriteEpisode.css";
import heartFilled from "../../assets/heart-fill.png";
import heartOutline from "../../assets/heart.png";
import LoadingState from "../LoadingState";

export default function FavouriteEpisode() {
  const {
    favourites,
    toggleFavourite,
    handlePlay,
    setEpisode,
    podcast
  } = usePodcast();
console.log(favourites)
  if (!favourites) return <LoadingState />;
  if (favourites.length === 0) return <p>No favourites yet.</p>;

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
        const podcastTitle = podcast?.title || "Unknown Podcast";

        return (
          <div key={podcastId} className="fav-podcast-group">
            <h2>{podcastTitle}</h2>
            <div className="fav-list">
              {favs.map((fav, index) => {
                const isFaved = favourites.some(
                  f =>
                    f.podcastId === fav.podcastId &&
                    f.season === fav.season &&
                    f.episodeIndex === fav.episodeIndex
                );

                const playEpisode = () => {
                  setEpisode(fav.podcastId, fav.season, fav.episodeIndex);
                  handlePlay(); // now plays the correct episode
                };

                return (
                  <div
                    className="fav-ep-clm"
                    key={index}
                    onClick={playEpisode}
                  >
                    <img
                      className="episode-image"
                      src={fav.image}
                      alt={fav.title}
                    />
                    <div className="fav-episode-details">
                      <div className="fav-title-heart">
                        <p className="fav-ep-title">
                          Episode {fav.episodeIndex + 1}: {fav.title}
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
                      <p className="fav-ep-desc">{fav.description}</p>
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
