import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovieGenres, fetchUpcomingMovies } from "../services";
import { Header } from "../components/Header";
import "../styles/UpcomingMovies.css";

import { useStateContext } from "../context/stateContext";
import { Pagination, Rating } from "@mui/material";
import MovieRating from "../components/FaceRating";

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
                      <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        value={movie.vote_average / 2}
                        readOnly
                      />
                    </div>
                    <div className="movie-text">
                      {/* <p>{movie.overview}</p> */}
                      <p>
                        {language === "es-ES" ? (
                          <u>Fecha de estreno:</u>
                        ) : (
                          <u>Release date:</u>
                        )}{" "}
                        {movie.release_date}
                      </p>

                      <p>
                        {language === "es-ES" ? (
                          <u>Popularidad:</u>
                        ) : (
                          <u>Popularity:</u>
                        )}{" "}
                        {/* {movie.popularity} */}
                      </p>
                      <MovieRating popularity={movie.popularity} />
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
