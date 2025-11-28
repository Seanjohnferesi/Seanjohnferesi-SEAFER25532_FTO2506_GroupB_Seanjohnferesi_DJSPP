import React from "react";
import "../styles/PodcastCard.css";
import  seasonIcon from "../assets/season.png"
import { genres } from "../data.js";
import { formatDate } from "../utils/formatDate.js";
import { getGenreTitle } from "../utils/getGenreTitle.js";
import { useNavigate } from "react-router-dom";
import { usePodcast } from "../context/PodcastContext.jsx";
import heartOutline from "../assets/heart.png"
import heartFilled from "../assets/heart-fill.png"

export default function PodcastCard({podcast}) {
    const{favourites,seasons, toggleFavourite} = usePodcast()

    const navigate = useNavigate();
    const gotToDetails = () => {
        navigate(`/show/${podcast.id}`);
    }
    const showGenres = getGenreTitle(podcast.id, genres)
    const isFaved = favourites.some(f => f.id === podcast.id)


    return (    
        <div className="card" onClick={gotToDetails}>
            <div className="podcast-img-div">
                <img 
                    src={podcast.image} 
                    alt={podcast.title} 
                    className="podcast-img"
                />
                <img 
                    className="heart-icon"
                    src={isFaved ? heartFilled: heartOutline}
                    alt="Favourite"
                    onClick={(e) => {
                    e.stopPropagation(); // prevent auto-play on heart click
                    toggleFavourite({
                        ...podcast,
                        podcastId: podcast.id
                    });
                    }}
                />
            </div>

            <h2 className="pod-title">{podcast.title}</h2>
                    
            <div className="season-wrapper">
                <img src={seasonIcon} alt="calender icon" className="season-icon"/>
                <span>{podcast.seasons} seasons</span>
            </div>

            <div className="genre-wrapper">
                {showGenres.map((gen,index) => (
                    <div key={index} className="genre-item">
                        {gen}
                    </div>
            
                ))}
                
            </div>

            <p className="update-time">Updated {formatDate(podcast.updated)}</p>
        </div>
        
    )
}
