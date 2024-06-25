import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchEpisodeDetails } from "../services/index";
import { Header } from "../components/Header";
import { useStateContext } from "../context/stateContext";

import "../styles/MovieById.css";
import "../styles/EpisodeById.css";
import ScrollToTop from "react-scroll-to-top";
import { Rating } from "@mui/material";

export function EpisodeById() {
  const { API_KEY, language, IMAGE_PATH, darkMode, CREDIT_IMAGE_PATH } =
    useStateContext();
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
        <div className={`episode-body ${darkModeClass}`}>
          <section className="movie-details">
            <h3 className="episode-title">{episodeDetails?.name}</h3>
            <img
              className="episode-image"
              src={`${IMAGE_PATH}${episodeDetails?.still_path}`}
              alt=""
            />

            <div className="details-text">
              <p className="episode-overview">{episodeDetails?.overview}</p>
              <p>
                {language === "es-ES" ? (
                  <u>Promedio de votos:</u>
                ) : (
                  <u>Vote average:</u>
                )}{" "}
                {/* {movieDetails.vote_average} */}
              </p>
              <Rating
                name="half-rating-read"
                defaultValue={2.5}
                precision={0.5}
                value={episodeDetails?.vote_average / 2}
                readOnly
              />
            </div>
          </section>

          {episodeDetails?.guest_stars && (
            <section className="credits-section">
              <h3>
                {language === "es-ES"
                  ? "Invitados especiales"
                  : "Special guests"}
              </h3>
              <div className="serie-credits-container">
                <ul className="serie-credits">
                  {episodeDetails?.guest_stars.map((person) => (
                    <li
                      className={`movie-credits-li${darkModeClass}`}
                      key={person.id}
                    >
                      <Link to={`/person/${person.id}`}>
                        <img
                          src={`${CREDIT_IMAGE_PATH}${person.profile_path}`}
                          alt=""
                        />
                      </Link>
                      <h3>{person.name}</h3>
                      <p>"{person.character}"</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        <ScrollToTop smooth />
      </div>
    </>
  );
}
