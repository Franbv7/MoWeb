import { useEffect, useState } from "react";
import { fetchSeries, fetchTvShowGenres } from "../services";
import { Header } from "../components/Header";
import "../styles/DiscoverSeries.css";
import "../styles/App.css";

import { Link } from "react-router-dom";

// import { IMAGE_PATH, CREDIT_IMAGE_PATH } from "../context/stateContext";
import { useStateContext } from "../context/stateContext";
import { Pagination, Rating } from "@mui/material";
import MovieRating from "../components/FaceRating";

export function LatestSeries() {
  const {
    API_KEY,
    IMAGE_PATH,
    CREDIT_IMAGE_PATH,
    country,
    language,
    darkMode,
  } = useStateContext();

  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);

  // const searchCountry = new URLSearchParams(location.search).get(
  //   "with_origin_country"
  // );

  useEffect(() => {
    fetchSeries(API_KEY, country, language, page).then((data) => {
      setSeries(data.results);
      setTotalPages(data.total_pages);
      // console.log(series);
    });

    fetchTvShowGenres(API_KEY, country, language, page).then((data) => {
      setGenres(data);
      // console.log("data.genres->", data);
    });
  }, [country, language]);

  useEffect(() => {
    fetchSeries(API_KEY, country, language, page).then((data) => {
      setSeries(data.results);
      setTotalPages(data.total_pages);
    });
  }, [page]);

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <>
      <Header />
      <div className={`all-body${darkModeClass}`}>
        <div className={`discover-series-body ${darkModeClass}`}>
          <h1>
            {language === "es-ES" ? "Descubre Series" : "Discover Series"}
          </h1>
          <div>
            <ul className={`series-list ${darkModeClass}`}>
              {series?.map(
                (serie) =>
                  serie.poster_path && (
                    <li
                      className={`series-list-li${darkModeClass}`}
                      key={serie.id}
                    >
                      <h3>{serie.name}</h3>
                      <div className="movie-data">
                        <div className="movie-info">
                          <Link to={`/tv/${serie.id}`}>
                            <img
                              src={`${IMAGE_PATH}${serie.poster_path}`}
                              alt=""
                            />
                          </Link>
                          <Rating
                            name="half-rating-read"
                            defaultValue={2.5}
                            precision={0.5}
                            value={serie.vote_average / 2}
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
                            {serie.first_air_date}
                          </p>

                          <p>
                            {language === "es-ES" ? (
                              <u>Popularidad:</u>
                            ) : (
                              <u>Popularity:</u>
                            )}{" "}
                            {/* {movie.popularity} */}
                          </p>
                          <MovieRating popularity={serie.popularity} />
                          <p>
                            {language === "es-ES" ? (
                              <u>Géneros:</u>
                            ) : (
                              <u>Genres:</u>
                            )}{" "}
                            {serie.genre_ids
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
                  )
              )}
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
