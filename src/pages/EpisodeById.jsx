import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEpisodeDetails } from "../services/index";
import { Header } from "../components/Header";
import { useStateContext } from "../context/stateContext";

import "../styles/MovieById.css";

export function EpisodeById() {
  const { API_KEY, language, IMAGE_PATH, darkMode } = useStateContext();
  const { seriesId, seasonNumber, episodeNumber } = useParams();
  const [episodeDetails, setEpisodeDetails] = useState(null);

  useEffect(() => {
    fetchEpisodeDetails(
      API_KEY,
      seriesId,
      seasonNumber,
      episodeNumber,
      language
    ).then((data) => {
      setEpisodeDetails(data);
    });
    console.log(episodeDetails);
  }, [seriesId, language]);

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <>
      <Header />
      <div className={`all-body${darkModeClass}`}>
        <section className="movie-details">
          <h3>{episodeDetails?.name}</h3>
          <img src={`${IMAGE_PATH}${episodeDetails?.still_path}`} alt="" />
          <p>{episodeDetails?.overview}</p>
        </section>
      </div>
    </>
  );
}
