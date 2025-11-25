import { usePodcast } from "../context/PodcastContext.jsx"
import "../styles/carousel.css"
import { genres } from "../data.js";
import { getGenreTitle } from "../utils/getGenreTitle.js"
import { useRef } from "react";

export default function Carousel({}) {
    const {podcasts} = usePodcast()
    const carouselRef = useRef(null)

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ 
            left: -270,
            behaviour: "smooth"})
    }

    const scrollRight = () => {
        carouselRef.current.scrollBy({ 
            left: 270,
            behaviour: "smooth"})
    }

    return (
        <section className="Carousel">
            <h2>Recommended Shows</h2>
            <div className="carousel-container">
                <button 
                    className="leftBtn"
                    onClick={scrollLeft}
                >&#10146;</button>
                <div className="carousel-content" ref={carouselRef}>
                    {podcasts.slice(3, 14).map(podcast => {
                        const showGenres = getGenreTitle(podcast.id, genres)

                        return (
                            <div className="carousel-card" key={podcast.id}>
                                    <div className="carousel-img-div">
                                        <img src={podcast.image} className="carousel-pod-img" alt={podcasts.title} />
                                    </div>
                        
                                    <h2 className="pod-title">{podcast.title}</h2>
                                {showGenres.map((gen, index) => (   
                                    <div className="genre-wrapper" key={index}>
                                            <div className="genre-item" >
                                                {gen}
                                            </div>
                                    </div>))}
                            </div>
                        )
                    })}
                </div>
                <button 
                    className="rightBtn"
                    onClick={scrollRight}
                >&#10146;</button>
            </div>
        </section>
    )
}