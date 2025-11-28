import { useParams, useNavigate } from "react-router-dom";
import DarkMode from "../components/DarkMode";
import Filter from "../components/favourites/Filter";
import Navigator from "../components/Navigator"
import FavouriteEpisode from "../components/favourites/FavouriteEpisode";


export default function Favourites(){

    return (
        <section className="favourites">
            <Navigator />
            <h2>Favourite Episodes</h2>
            <p>Your saved episodes from all shows</p>
            <Filter />
            <FavouriteEpisode />
        </section>
    )
}