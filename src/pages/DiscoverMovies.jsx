import { useStateContext } from "../context/stateContext";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useDiscoverMovies, useMovieGenres } from "../hooks/movieHooks";
import { formatDate } from "../utils/formatDate";

import "../styles/DiscoverMovies.css";
import "../styles/App.css";

import { Pagination } from "@mui/material";
import ScrollToTop from "react-scroll-to-top";
import CustomRating from "../components/CustomRating";
import { useState } from "react";
import { Loading } from "../components/Loading";

export function DiscoverMovies() {
  const { API_KEY, IMAGE_PATH, language, darkMode, country } =
    useStateContext();
  const [page, setPage] = useState(1);

  const {
    data: movies,
    isLoading: isLoadingMovies,
    error: errorMovies,
    totalPages,
  } = useDiscoverMovies(API_KEY, language, country, page);
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
    return <div>Error al cargar las películas</div>;
  }

  return (
    <>
      <Header />
      <div className={`all-body${darkModeClass}`}>
        <div className={`discover-movies-body ${darkModeClass}`}>
          <h1>
            {language === "es-ES" ? "Descubre Películas" : "Discover Movies"}
          </h1>
          <div>
            <ul className={`movies-list ${darkModeClass}`}>
              {movies?.map((movie) => (
                <li key={movie.id} className={`movies-list-li${darkModeClass}`}>
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
        <ScrollToTop smooth />
      </div>
      <Pagination
        className={`pagination${darkModeClass}`}
        count={totalPages}
        onChange={(e, value) => setPage(value)}
      />
    </>
  );
}
