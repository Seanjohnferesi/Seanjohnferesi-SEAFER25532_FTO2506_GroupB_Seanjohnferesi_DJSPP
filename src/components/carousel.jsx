import { usePodcast } from "../context/PodcastContext"
import "../styles/carousel.css"

export default function Carousel() {
    const {podcasts} = usePodcast()

    return (
        <section className="Carousel">
            <h2>Recommended Shows</h2>
            <div className="carousel-container">
                <button>&#10146;</button>
                <div className="carousel-content">
                    {podcasts.map(podcast => 
                    <div className="carousel-card">
                                <div className="carousel-img-div">
                                    <img src={podcast.image} className="carousel-pod-img" alt={podcasts.title} />
                                </div>
                    
                                <h2 className="pod-title">Little Nightmares</h2>
                                        
                                <div className="genre-wrapper">
                                        <div className="genre-item">
                                            history
                                        </div>
                                </div>
                    </div>).slice(3, 10)}
                </div>
                <button>&#10146;</button>
            </div>
        </section>
    )
}