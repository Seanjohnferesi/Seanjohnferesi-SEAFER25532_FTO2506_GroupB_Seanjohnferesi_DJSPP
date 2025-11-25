import { useParams, useNavigate } from "react-router-dom";
import DarkMode from "../components/DarkMode";

export default function Favourites(){

    return (
        <section className="favourites">
            <h2>Favourite Episodes</h2>
            <p>Your saved episodes from all shows</p>

            <DarkMode />
        </section>
    )
}