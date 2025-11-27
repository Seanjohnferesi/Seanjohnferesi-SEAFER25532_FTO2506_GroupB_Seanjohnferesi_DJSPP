import React from "react";
import "../styles/PodcastCard.css";
import  seasonIcon from "../assets/season.png"
import { genres } from "../data.js";
import { formatDate } from "../utils/formatDate.js";
import { getGenreTitle } from "../utils/getGenreTitle.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { usePodcast } from "../context/PodcastContext.jsx";

export default function PodcastCard({podcast}) {
    const{favourites,seasons} = usePodcast()

    const navigate = useNavigate();
    const gotToDetails = () => {
        navigate(`/show/${podcast.id}`);
    }
    const showGenres = getGenreTitle(podcast.id, genres)
    const isFaved = favourites.some(f => f.id === episode.id)


    return (    
        <div className="card" onClick={gotToDetails}>
            <div className="podcast-img-div">
                <img 
                    src={podcast.image} 
                    alt={podcast.title} 
                    className="podcast-img"
                />
                <FontAwesomeIcon 
                    className={isFaved ? "heart-active" : "heart"} 
                    icon={faHeart}
                    onClick={() => { 
                        e.stopPropagation()
                        toggleFavourite(seasons?.episode)
                    }
                    }
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
