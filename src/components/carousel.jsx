import { usePodcast } from "../context/PodcastContext.jsx"
import { useRef } from "react";
import "../styles/carousel.css"
import { genres } from "../data.js";
import { getGenreTitle } from "../utils/getGenreTitle.js"
import { useNavigate } from "react-router-dom";

export default function Carousel() {
    const { podcasts } = usePodcast();
    const items = podcasts.slice(3, 14);
    const carouselRef = useRef(null);
    const navigate = useNavigate()

    const cardWidth = 280 + 20; // card width + gap

    const next = () => {
        const container = carouselRef.current;
        if (!container) return;

        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - cardWidth) {
            
            container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            container.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
    }

    const prev = () => {
        const container = carouselRef.current;
        if (!container) return;

        if (container.scrollLeft <= 0) {
    
            container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
        } else {
            container.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }
    }

    return (
        <section className="carousel">
            <h2>Recommended Shows</h2>

            <div className="carousel-container">
                <button className="leftBtn" onClick={prev}>&#10146;</button>

                <div 
                    className="carousel-content"
                    ref={carouselRef} 
                >
                    {items.map((podcast) => {
                        const showGenres = getGenreTitle(podcast.id, genres);

                        return (
                            <div 
                                className="carousel-card" 
                                key={podcast.id}
                                onClick={() => navigate(`/show/${podcast.id}`)}
                            >
                                <div className="carousel-img-div">
                                    <img src={podcast.image} className="carousel-pod-img" alt={podcast.title} />
                                </div>

                                <h2 className="pod-title">{podcast.title}</h2>

                                <div className="show-genre">
                                    {showGenres.map((gen, index) => (
                                        <div className="genre-item" key={index}>{gen}</div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button className="rightBtn" onClick={next}>&#10146;</button>
            </div>
        </section>
    );
}
