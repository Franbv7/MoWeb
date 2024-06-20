import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovieGenres, fetchUpcomingMovies } from "../services";
import { Header } from "./Header";
import "../styles/UpcomingMovies.css";

import { useStateContext } from "../context/stateContext";
import { Pagination } from "@mui/material";

export function UpcomingMovies() {
  const { API_KEY, IMAGE_PATH, language, country, darkMode } =
    useStateContext();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUpcomingMovies(API_KEY, language, country, page).then((data) => {
      setMovies(data.results);
      setTotalPages(data.total_pages);
      console.log("movies", movies);
      // console.log("data", data);
    });

    fetchMovieGenres(API_KEY, language).then((data) => {
      setGenres(data.genres);
      // console.log(data.genres);
    });
  }, [language, country]);

  useEffect(() => {
    fetchUpcomingMovies(API_KEY, language, country, page).then((data) => {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    });
  }, [page]);

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <>
      <Header />
      <div className={`all-body ${darkModeClass}`}>
        <div className={`upcoming-movies-body ${darkModeClass}`}>
          <h1>{language === "es-ES" ? "Estrenos" : "Upcoming Movies"}</h1>
          <div>
            <ul className={`upcoming-movies-list${darkModeClass}`}>
              {movies?.map((movie) => (
                <li
                  key={movie.id}
                  className={`upcoming-movies-list-li${darkModeClass}`}
                >
                  <h3>{movie.title}</h3>
                  <div className="movie-info">
                    <Link to={`/movie/${movie.id}`}>
                      <img src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
                    </Link>
                    <div className="movie-text">
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

                      {/* <p>{movie.overview}</p> */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Pagination
        className={`pagination ${darkModeClass}`}
        count={totalPages}
        onChange={(e, value) => setPage(value)}
      />
    </>
  );
}
