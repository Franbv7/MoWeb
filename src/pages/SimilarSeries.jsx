import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import {
  fetchMovieGenres,
  fetchSimilarSeries,
  fetchTvShowById,
} from "../services";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import ScrollToTop from "react-scroll-to-top";

export function SimilarSeries() {
  const { IMAGE_PATH, CREDIT_IMAGE_PATH, API_KEY, language, darkMode } =
    useStateContext();

  const { serieId } = useParams();
  const [similarSerie, setSimilarSeries] = useState(null);
  const [originSerie, setOriginSerie] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (serieId) {
      fetchSimilarSeries(serieId, API_KEY, language).then(setSimilarSeries);
      fetchTvShowById(serieId, API_KEY, language).then(setOriginSerie);
      fetchMovieGenres(API_KEY, language).then((data) => {
        setGenres(data.genres);
      });
    }
  }, [serieId]);

  // useEffect(() => {
  //   console.log(serieId);
  //   console.log(similarSerie);
  // }, [serieId]);

  console.log("similarSerie:", similarSerie);

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <>
      <Header />
      <div className={`all-body ${darkModeClass}`}>
        <div className={`search-results-body ${darkModeClass}`}>
          {/* <h1>Similar to {originSerie?.name}</h1> */}
          <ul className={`search-results-list ${darkModeClass}`}>
            {similarSerie?.map((results) => (
              <li
                key={results.id}
                className={`search-results-list-li${darkModeClass}`}
              >
                <h3>{results.name}</h3>
                <div className={`search-results-info ${darkModeClass}`}>
                  <Link to={`/tv/${results.id}`}>
                    <img src={`${IMAGE_PATH}${results.poster_path}`} />
                  </Link>
                  {/* <p>{results.overview}</p>
                <p>{results.first_air_date}</p>
                <p>Average vote: {results.vote_average}</p>
                <p>Popularity: {results.popularity}</p> */}
                  <div className="movie-text">
                    {/* <p>{movie.overview}</p> */}
                    <p>
                      {language === "es-ES"
                        ? "Fecha de estreno:"
                        : "Release date:"}{" "}
                      {results.release_date}
                    </p>
                    <p>
                      {language === "es-ES"
                        ? "Media de votos:"
                        : "Vote average:"}{" "}
                      {results.vote_average}
                    </p>
                    <p>
                      {language === "es-ES" ? "Popularidad:" : "Popularity:"}{" "}
                      {results.popularity}
                    </p>
                    <p>
                      {language === "es-ES" ? "Géneros:" : "Genres:"}{" "}
                      {results.genre_ids
                        .map((genreId) => {
                          const genre = genres.find(
                            (genre) => genre.id === genreId
                          );
                          return genre ? genre.name : "Unknown";
                        })
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ScrollToTop smooth />
      </div>
    </>
  );
}
