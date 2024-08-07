import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useStateContext } from "../context/stateContext";
import { Pagination } from "@mui/material";
import CustomRating from "../components/CustomRating";
import { useSearchResults, useMovieGenres } from "../hooks/movieHooks";

import "../styles/SearchResultsPage.css";
import "../styles/App.css";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import { Loading } from "../components/Loading";

export function SearchResultsPage() {
  const { API_KEY, IMAGE_PATH, language, darkMode } = useStateContext();
  const [page, setPage] = useState(1);

  const searchKey = new URLSearchParams(location.search).get("q");

  const {
    data: searchResults,
    isLoading: isLoadingSearchResults,
    error: errorSearchResults,
    totalPages,
  } = useSearchResults(searchKey, API_KEY, language, page);

  const {
    data: genres,
    isLoading: isLoadingGenres,
    error: errorGenres,
  } = useMovieGenres(API_KEY, language);

  const darkModeClass = darkMode ? "dark" : "";

  if (isLoadingSearchResults || isLoadingGenres) {
    return <Loading />;
  }

  if (errorSearchResults || errorGenres) {
    return <div>Error al cargar los resultados de búsqueda</div>;
  }

  searchResults?.sort((a, b) => {
    return b.popularity - a.popularity;
  });

  console.log(searchResults);

  return (
    <>
      <Header />
      <div className={`all-body ${darkModeClass}`}>
        <div className={`search-results-body ${darkModeClass}`}>
          {/* <h1>{language === "es-ES" ? "Resultados" : "Results:"}</h1> */}

          <div>
            <ul className={`search-results-list ${darkModeClass}`}>
              {searchResults.map((result) =>
                result.known_for ? (
                  <li
                    className={`search-results-list-li${darkModeClass}`}
                    key={result.id}
                  >
                    <h3>{result.name}</h3>
                    <div className={`search-results-info ${darkModeClass}`}>
                      <Link to={`/person/${result.id}`}>
                        <img
                          src={`${IMAGE_PATH}${result.profile_path}`}
                          alt=""
                        />
                      </Link>
                    </div>
                  </li>
                ) : (
                  <li
                    className={`search-results-list-li${darkModeClass}`}
                    key={result.id}
                  >
                    <h3>{result.name ?? result.title}</h3>
                    <div className={`search-results-info ${darkModeClass}`}>
                      {result.poster_path ? (
                        <div className="movie-info">
                          <Link to={`/${result.media_type}/${result.id}`}>
                            <img
                              src={`${IMAGE_PATH}${result.poster_path}`}
                              alt=""
                            />
                          </Link>
                          <CustomRating
                            name="half-rating-read"
                            defaultValue={2.5}
                            precision={0.5}
                            value={result.vote_average / 2}
                            readOnly
                          />
                        </div>
                      ) : (
                        <>
                          <Link to={`/${result.media_type}/${result.id}`}>
                            <img src="/Image_not_available.png" alt="poster" />
                          </Link>
                        </>
                      )}
                      <div className={`search-results-text ${darkModeClass}`}>
                        <p>
                          {language === "es-ES" ? (
                            <u>Fecha de estreno:</u>
                          ) : (
                            <u>Release date:</u>
                          )}{" "}
                          {formatDate(
                            result.first_air_date ?? result.release_date
                          )}
                        </p>

                        <p>
                          {language === "es-ES" ? (
                            <u>Géneros:</u>
                          ) : (
                            <u>Genres:</u>
                          )}{" "}
                          {result.genre_ids
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
        className={`pagination ${darkModeClass}`}
        count={totalPages}
        onChange={(e, value) => setPage(value)}
      />
    </>
  );
}
