import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovieGenres, searchAll } from "../services";
import { Header } from "./Header";
import "../styles/SearchResultsPage.css";
import "../styles/App.css";

import { useStateContext } from "../context/stateContext";
import { Pagination } from "@mui/material";
import CustomRating from "../components/CustomRating";

export function SearchResultsPage() {
  const { API_KEY, IMAGE_PATH, language, darkMode } = useStateContext();

  const [searchResults, setSearchResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchKey = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (searchKey) {
      searchAll(searchKey, API_KEY, language, page).then((data) => {
        setSearchResults(data.results);
        setTotalPages(data.total_pages);

        // console.log("Results->", data.results);

        fetchMovieGenres(API_KEY, language).then((data) => {
          setGenres(data.genres);
        });
      });
    }
  }, [searchKey, language, page]);

  searchResults?.sort((a, b) => {
    return b.popularity - a.popularity;
  });

  console.log(searchResults);

  const darkModeClass = darkMode ? "dark" : "";

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
                            <img src="/gato_busqueda.jpeg" alt="" />
                          </Link>
                          <p>No hay </p>
                        </>
                      )}
                      <div className={`search-results-text ${darkModeClass}`}>
                        <p>
                          {language === "es-ES" ? (
                            <u>Fecha de estreno:</u>
                          ) : (
                            <u>Release date:</u>
                          )}{" "}
                          {result.first_air_date ?? result.release_date}
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
                        <p> {result.media_type}</p>
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
