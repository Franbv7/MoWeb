import { useEffect, useState } from "react";
import {
  fetchPersonByName,
  fetchPersonMovieCredits,
  fetchPersonTvCredits,
} from "../services";
import { Header } from "../components/Header";
import { Link, useParams } from "react-router-dom";

import { useStateContext } from "../context/stateContext";

import "../styles/PersonDetail.css";
import "../styles/App.css";
import ScrollToTop from "react-scroll-to-top";

export function PersonDetail() {
  const { API_KEY, IMAGE_PATH, language, darkMode } = useStateContext();

  const { personId } = useParams();

  const [personDetails, setPersonDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [tvCredits, setTvCredits] = useState(null);

  const MOVIE_IMAGE_PATH = "https://image.tmdb.org/t/p/w200";

  useEffect(() => {
    if (personId) {
      fetchPersonByName(personId, API_KEY, language).then(setPersonDetails);

      fetchPersonMovieCredits(personId, API_KEY, language).then((data) => {
        setMovieCredits(data.cast);
        // console.log("movieCredits->", movieCredits);
      });

      fetchPersonTvCredits(personId, API_KEY, language).then((data) => {
        setTvCredits(data.cast);
        // console.log("TvCredits->", tvCredits);
      });
    }
  }, [personId, language]);

  movieCredits?.sort((a, b) => {
    return b.popularity - a.popularity;
  });

  tvCredits?.sort((a, b) => {
    return b.popularity - a.popularity;
  });

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <>
      <Header />

      <div className={`person-details-body ${darkModeClass}`}>
        <h3 className="person-name">
          {personDetails?.name}
          {/* {personDetails?.birthday}
          {personDetails?.deathday && ` - ${personDetails?.deathday}`} */}
        </h3>
        <img
          className="person-photo"
          src={`${IMAGE_PATH}${personDetails?.profile_path}`}
          alt=""
        />
        <p>{personDetails?.biography}</p>
        {personDetails?.homepage && (
          <a href={personDetails?.homepage}>HomePage</a>
        )}
        {/* <h2> Known for: </h2> */}
        <div className="credits">
          {movieCredits?.length > 0 && (
            <div>
              <h3>{language === "es-ES" ? "Películas" : "Movies"}</h3>
              <ul>
                {movieCredits?.map((movie) => (
                  <li key={movie.id}>
                    {/* <h4>{movie.title}</h4> */}
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={`${MOVIE_IMAGE_PATH}${movie.poster_path}`}
                        alt=""
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tvCredits?.length > 0 && (
            <div>
              <h3>Series</h3>
              <ul>
                {tvCredits?.map((tv) => (
                  <li key={tv.id}>
                    {/* <h4>{tv.name}</h4> */}
                    <Link to={`/tv/${tv.id}`}>
                      <img
                        src={`${MOVIE_IMAGE_PATH}${tv.poster_path}`}
                        alt=""
                      />
                    </Link>
                  </li>
                ))}
              </ul>{" "}
            </div>
          )}
        </div>
        <ScrollToTop smooth />
      </div>
    </>
  );
}
