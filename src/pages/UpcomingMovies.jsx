import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useStateContext } from "../context/stateContext";
import { Pagination } from "@mui/material";
import CustomRating from "../components/CustomRating";
import { formatDate } from "../utils/formatDate";
import { useUpcomingMovies, useMovieGenres } from "../hooks/movieHooks";

import "../styles/UpcomingMovies.css";
import { useState } from "react";
import { Loading } from "../components/Loading";

export function UpcomingMovies() {
  const { API_KEY, IMAGE_PATH, language, country, darkMode } =
    useStateContext();

  const [page, setPage] = useState(1);

  const {
    data: movies,
    isLoading: isLoadingMovies,
    error: errorMovies,
    totalPages,
  } = useUpcomingMovies(API_KEY, language, country, page);
  const {
    data: genres,
    isLoading: isLoadingGenres,
    error: errorGenres,
  } = useMovieGenres(API_KEY, language);

  const darkModeClass = darkMode ? "dark" : "";

  if (isLoadingMovies || isLoadingGenres) {
    return <Loading />;
  }

  if (errorMovies || errorGenres) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <>
      <Header />
      <div className={`all-body${darkModeClass}`}>
        <div className={`upcoming-movies-body ${darkModeClass}`}>
          <h1>{language === "es-ES" ? "Estrenos" : "Upcoming Movies"}</h1>
          <div>
            <ul className={`upcoming-movies-list ${darkModeClass}`}>
              {movies?.map((movie) => (
                <li
                  key={movie.id}
                  className={`upcoming-movies-list-li ${darkModeClass}`}
                >
                  <h3>{movie.title}</h3>
                  <div className="movie-data">
                    <div className="movie-info">
                      <Link to={`/movie/${movie.id}`}>
                        <img src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
                      </Link>
                      <CustomRating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        value={movie.vote_average / 2}
                        readOnly
                      />
                    </div>
                    <div className="movie-text">
                      <p>
                        {language === "es-ES" ? (
                          <u>Fecha de estreno:</u>
                        ) : (
                          <u>Release date:</u>
                        )}{" "}
                        {formatDate(movie.release_date)}
                      </p>

                      <p>
                        {language === "es-ES" ? (
                          <u>Géneros:</u>
                        ) : (
                          <u>Genres:</u>
                        )}{" "}
                        {movie.genre_ids
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
      <Pagination
        className={`pagination${darkModeClass}`}
        count={totalPages}
        onChange={(e, value) => setPage(value)}
      />
    </>
  );
}
