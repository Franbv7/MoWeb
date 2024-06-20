import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { fetchSimilarSeries, fetchTvShowById } from "../services";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

export function SimilarSeries() {
  const { IMAGE_PATH, CREDIT_IMAGE_PATH, API_KEY, language, darkMode } =
    useStateContext();

  const { serieId } = useParams();
  const [similarSerie, setSimilarSeries] = useState(null);
  const [originSerie, setOriginSerie] = useState(null);

  useEffect(() => {
    if (serieId) {
      fetchSimilarSeries(serieId, API_KEY, language).then(setSimilarSeries);
      fetchTvShowById(serieId, API_KEY, language).then(setOriginSerie);
    }
  }, [serieId]);

  useEffect(() => {
    console.log(serieId);
    console.log(similarSerie);
  }, [serieId]);

  const darkModeClass = darkMode ? "-dark" : "";

  return (
    <>
      <Header />
      <div className={`all-body${darkModeClass}`}>
        <div className="search-results-body">
          <h1>Similar to {originSerie?.name}</h1>
          <ul className="search-results-list">
            {similarSerie?.map((results) => (
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
