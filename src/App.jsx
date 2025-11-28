import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Podcast } from "./context/PodcastContext.jsx";
import ShowDetail from "./pages/ShowDetail.jsx";
import Favourites from "./pages/Favourites.jsx";
import AudioPlayer from "./components/AudioPlayer";
import Navigator from "./components/Navigator"

export default function App() {
  return (
    <Podcast>
        <Header />
        <Navigator />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetail />} />
        <Route path="/favourites" element={<Favourites />} />
        </Routes>
        <AudioPlayer />
    </Podcast>
  );
}
