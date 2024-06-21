import { useEffect, useState } from "react";
import { fetchSeries, fetchTvShowGenres } from "../services";
import { Header } from "./Header";
import "../styles/DiscoverSeries.css";
import "../styles/App.css";

import { Link } from "react-router-dom";

// import { IMAGE_PATH, CREDIT_IMAGE_PATH } from "../context/stateContext";
import { useStateContext } from "../context/stateContext";
import { Pagination } from "@mui/material";

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
                      <div className="series-info">
                        <Link to={`/tv/${serie.id}`}>
                          <img
                            src={`${IMAGE_PATH}${serie.poster_path}`}
                            alt=""
                          />
                        </Link>
                        <div className="series-text">
                          <p>
                            {language === "es-ES"
                              ? "Fecha de estreno:"
                              : "Release date:"}{" "}
                            {serie.first_air_date}
                          </p>
                          <p>
                            {language === "es-ES"
                              ? "Media de votos:"
                              : "Vote average:"}{" "}
                            {serie.vote_average}
                          </p>
                          <p>
                            {language === "es-ES"
                              ? "Popularidad:"
                              : "Popularity:"}{" "}
                            {serie.popularity}
                          </p>

                          <p>
                            {language === "es-ES" ? "Géneros:" : "Genres:"}{" "}
                            {serie.genre_ids
                              .map((genreId) => {
                                const genre = genres?.find(
                                  (genre) => genre.id === genreId
                                );
                                return genre ? genre.name : "Unknown";
                              })
                              .join(", ")}
                          </p>

                          {/* <p>{serie.overview}</p> */}
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
