import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import {
  fetchMovieById,
  fetchSimilarMovies,
  fetchTvShowById,
} from "../services";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

export function SimilarMovies() {
  const { IMAGE_PATH, CREDIT_IMAGE_PATH, API_KEY, language, darkMode } =
    useStateContext();

  const { movieId } = useParams();
  const [similarMovies, setSimilarMovies] = useState(null);
  const [originMovie, setOriginMovie] = useState(null);

  useEffect(() => {
    if (movieId) {
      fetchSimilarMovies(movieId, API_KEY, language).then(setSimilarMovies);
      fetchMovieById(movieId, API_KEY, language).then(setOriginMovie);
    }
  }, [movieId]);

  useEffect(() => {
    console.log(movieId);
    console.log(similarMovies);
    console.log("Origin Movie->", originMovie);
  }, [movieId]);
  return (
    <>
      <Header />
      <div className={`all-body${darkMode}`}>
        <div className="search-results-body">
          <h1>Similar to: {originMovie?.title}</h1>
          <ul className="search-results-list">
            {similarMovies?.map((results) => (
              <li key={results.id} className="search-results-results">
                <h3>{results.name}</h3>
                <Link to={`/tv/${results.id}`}>
                  <img src={`${IMAGE_PATH}${results.poster_path}`} />
                </Link>
                <p>{results.overview}</p>
                <p>{results.first_air_date}</p>
                <p>Average vote: {results.vote_average}</p>
                <p>Popularity: {results.popularity}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
