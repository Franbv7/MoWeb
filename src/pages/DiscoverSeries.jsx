import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useStateContext } from "../context/stateContext";
import { Pagination } from "@mui/material";
import CustomRating from "../components/CustomRating";
import { formatDate } from "../utils/formatDate";
import { useSeries, useTvShowGenres } from "../hooks/seriesHooks";

import "../styles/DiscoverSeries.css";
import "../styles/App.css";
import { useState } from "react";
import { Loading } from "../components/Loading";

export function LatestSeries() {
  const { API_KEY, IMAGE_PATH, country, language, darkMode } =
    useStateContext();

  const [page, setPage] = useState(1);

  const {
    data: series,
    isLoading: isLoadingSeries,
    error: errorSeries,
    totalPages,
  } = useSeries(API_KEY, country, language, page);
  const {
    data: genres,
    isLoading: isLoadingGenres,
    error: errorGenres,
  } = useTvShowGenres(API_KEY, language);

  const darkModeClass = darkMode ? "dark" : "";

  if (isLoadingSeries || isLoadingGenres) {
    return <Loading />;
  }

  if (errorSeries || errorGenres) {
    return <div>Error al cargar los datos</div>;
  }

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
                              alt={serie.name}
                            />
                          </Link>
                          <CustomRating
                            name="half-rating-read"
                            defaultValue={2.5}
                            precision={0.5}
                            value={serie.vote_average / 2}
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
                            {formatDate(serie.first_air_date)}
                          </p>
                          <p>
                            {language === "es-ES" ? (
                              <u>Géneros:</u>
                            ) : (
                              <u>Genres:</u>
                            )}{" "}
                            {serie.genre_ids
                              .map((genreId) => {
                                const genre = genres?.find(
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
