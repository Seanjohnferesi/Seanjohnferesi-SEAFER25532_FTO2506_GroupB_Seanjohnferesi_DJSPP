import { usePodcast } from "../../context/PodcastContext"
import "../../styles/FavouriteEpisode.css"



export default function FavouriteEpisode() {
    const {favourites, setFavourites, toggleFavourite, seasons, selectedSeason} = usePodcast()
    console.log(seasons)

    return (
       <section className="fav-list-container">
          <div className="fav-list">
                    <div className="fav-ep-clm">
                        <div className="fav-episode-details">
                            <div>
                                <img src="" alt="" />
                                <p className="fav-ep-title">Episode 1: The Future of AI</p>
                               
                            </div>
                            <p className="fav-ep-desc">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus dolorem quos alias error laborum, totam aliquam esse voluptas neque sint sunt nesciunt </p>
                            <div className="fav-ep-meta">
                                <span>Added on 15 March, 2025</span>
                            </div>
                        </div>
                    </div>
            </div>
       </section>
    )
}