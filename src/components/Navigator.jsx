import { Link } from "react-router-dom";
import "../styles/styles.css"

export default function Navbar () {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/favourites">Favourites</Link>
    </nav>
  );
};


