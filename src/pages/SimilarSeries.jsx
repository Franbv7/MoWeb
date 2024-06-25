import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import {
  fetchMovieGenres,
  fetchSimilarSeries,
  fetchTvShowById,
} from "../services";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import ScrollToTop from "react-scroll-to-top";
import MovieRating from "../components/FaceRating";
import { Rating } from "@mui/material";

export function SimilarSeries() {
  const { IMAGE_PATH, CREDIT_IMAGE_PATH, API_KEY, language, darkMode } =
    useStateContext();

  const { serieId } = useParams();
  const [similarSerie, setSimilarSeries] = useState(null);
  const [originSerie, setOriginSerie] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (serieId) {
      fetchSimilarSeries(serieId, API_KEY, language).then(setSimilarSeries);
      fetchTvShowById(serieId, API_KEY, language).then(setOriginSerie);
      fetchMovieGenres(API_KEY, language).then((data) => {
        setGenres(data.genres);
      });
    }
  }, [serieId]);

  // useEffect(() => {
  //   console.log(serieId);
  //   console.log(similarSerie);
  // }, [serieId]);

  console.log("similarSerie:", similarSerie);

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <>
      <Header />
      <div className={`all-body ${darkModeClass}`}>
        <div className={`search-results-body ${darkModeClass}`}>
          {/* <h1>Similar to {originSerie?.name}</h1> */}
          <ul className={`search-results-list ${darkModeClass}`}>
            {similarSerie?.map((results) => (
              <li
                key={results.id}
                className={`search-results-list-li${darkModeClass}`}
              >
                <h3>{results.name}</h3>
                <div className="movie-data">
                  <div className={`movie-info ${darkModeClass}`}>
                    <Link to={`/tv/${results.id}`}>
                      <img src={`${IMAGE_PATH}${results.poster_path}`} />
                    </Link>
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      value={results.vote_average / 2}
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
                      {results.release_date}
                    </p>

                    <p>
                      {language === "es-ES" ? (
                        <u>Popularidad:</u>
                      ) : (
                        <u>Popularity:</u>
                      )}{" "}
                      {/* {results.popularity} */}
                    </p>
                    <MovieRating popularity={results.popularity} />
                    <p>
                      {language === "es-ES" ? <u>Géneros:</u> : <u>Genres:</u>}{" "}
                      {results.genre_ids
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
        <ScrollToTop smooth />
      </div>
    </>
  );
}
