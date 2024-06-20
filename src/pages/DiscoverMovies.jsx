import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { fetchDiscoverMovies, fetchMovieGenres } from "../services";

import "../styles/DiscoverMovies.css";
import "../styles/App.css";

import { useStateContext } from "../context/stateContext";
import { Pagination } from "@mui/material";

export function DiscoverMovies() {
  const { API_KEY, IMAGE_PATH, language, darkMode, country } =
    useStateContext();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDiscoverMovies(API_KEY, language, country, page).then((data) => {
      setMovies(data.results);
      setTotalPages(data.total_pages);

      console.log(data.results);
    });

    fetchMovieGenres(API_KEY, language).then((data) => {
      setGenres(data.genres);
    });
  }, [language, country]);

  useEffect(() => {
    fetchDiscoverMovies(API_KEY, language, country, page).then((data) => {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    });
  }, [page]);

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <>
      <Header />
      <div className={`all-body${darkModeClass}`}>
        <div className="discover-movies-body">
          <h1>
            {language === "es-ES" ? "Descubre Películas" : "Discover Movies"}
          </h1>
          <div>
            <ul className={`movies-list${darkModeClass}`}>
              {movies?.map((movie) => (
                <li key={movie.id}>
                  <h3>{movie.title}</h3>
                  <div className="movie-info">
                    <Link to={`/movie/${movie.id}`}>
                      <img src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
                    </Link>
                    <div className="movie-text">
                      {/* <p>{movie.overview}</p> */}
                      <p>
                        {language === "es-ES"
                          ? "Fecha de estreno:"
                          : "Release date:"}{" "}
                        {movie.release_date}
                      </p>
                      <p>
                        {language === "es-ES"
                          ? "Media de votos:"
                          : "Vote average:"}{" "}
                        {movie.vote_average}
                      </p>
                      <p>
                        {language === "es-ES" ? "Popularidad:" : "Popularity:"}{" "}
                        {movie.popularity}
                      </p>
                      <p>
                        {language === "es-ES" ? "Géneros:" : "Genres:"}{" "}
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
