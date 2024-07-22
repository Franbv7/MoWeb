import { Header } from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import ScrollToTop from "react-scroll-to-top";
import CustomRating from "../components/CustomRating";
import { formatDate } from "../utils/formatDate";
import {
  useSimilarMovies,
  useMovieDetails,
  useMovieGenres,
} from "../hooks/movieHooks";
import { Loading } from "../components/Loading";

export function SimilarMovies() {
  const { IMAGE_PATH, API_KEY, language, darkMode } = useStateContext();
  const { movieId } = useParams();

  const {
    data: similarMovies,
    isLoading: isLoadingSimilarMovies,
    error: errorSimilarMovies,
  } = useSimilarMovies(movieId, API_KEY, language);
  const {
    data: originMovie,
    isLoading: isLoadingOriginMovie,
    error: errorOriginMovie,
  } = useMovieDetails(movieId, API_KEY, language);
  const {
    data: genres,
    isLoading: isLoadingGenres,
    error: errorGenres,
  } = useMovieGenres(API_KEY, language);

  const darkModeClass = darkMode ? "dark" : "";

  if (isLoadingSimilarMovies || isLoadingOriginMovie || isLoadingGenres) {
    return <Loading />;
  }

  if (errorSimilarMovies || errorOriginMovie || errorGenres) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <>
      <Header />
      <div className={`all-body ${darkModeClass}`}>
        <div className={`search-results-body ${darkModeClass}`}>
          <div>
            <ul className={`search-results-list ${darkModeClass}`}>
              {similarMovies?.map((results) => (
                <li
                  key={results.id}
                  className={`search-results-list-li${darkModeClass}`}
                >
                  <h3>{results.title}</h3>
                  <div className="movie-data">
                    <div className={`movie-info ${darkModeClass}`}>
                      <Link to={`/movie/${results.id}`}>
                        <img
                          src={`${IMAGE_PATH}${results.poster_path}`}
                          alt={results.title}
                        />
                      </Link>
                      <CustomRating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        value={results.vote_average / 2}
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
                        {formatDate(results.release_date)}
                      </p>

                      <p>
                        {language === "es-ES" ? (
                          <u>Géneros:</u>
                        ) : (
                          <u>Genres:</u>
                        )}{" "}
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
        </div>
        <ScrollToTop smooth />
      </div>
    </>
  );
}
