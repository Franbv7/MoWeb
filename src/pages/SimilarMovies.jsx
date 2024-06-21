import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import {
  fetchMovieById,
  fetchMovieGenres,
  fetchSimilarMovies,
  fetchTvShowById,
} from "../services";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

export function SimilarMovies() {
  const { IMAGE_PATH, CREDIT_IMAGE_PATH, API_KEY, language, darkMode } =
    useStateContext();

  const { movieId } = useParams();
  const [similarMovies, setSimilarMovies] = useState(null);
  const [originMovie, setOriginMovie] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (movieId) {
      fetchSimilarMovies(movieId, API_KEY, language).then(setSimilarMovies);
      fetchMovieById(movieId, API_KEY, language).then(setOriginMovie);
      fetchMovieGenres(API_KEY, language).then((data) => {
        setGenres(data.genres);
      });
    }
  }, [movieId]);

  // useEffect(() => {
  //   console.log(movieId);
  //   console.log(similarMovies);
  //   console.log("Origin Movie->", originMovie);
  // }, [movieId]);

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <>
      <Header />
      <div className={`all-body ${darkModeClass}`}>
        <div className={`search-results-body ${darkModeClass}`}>
          <h1>Similar to: {originMovie?.title}</h1>
          <div>
            <ul className={`search-results-list ${darkModeClass}`}>
              {similarMovies?.map((results) => (
                <li
                  key={results.id}
                  className={`search-results-list-li${darkModeClass}`}
                >
                  <h3>{results.name}</h3>
                  <div className={`search-results-info ${darkModeClass}`}>
                    <Link to={`/tv/${results.id}`}>
                      <img src={`${IMAGE_PATH}${results.poster_path}`} />
                    </Link>
                    {/* <p>{results.overview}</p> */}
                    {/* <p>{results.first_air_date}</p>
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
        </div>
      </div>
    </>
  );
}
