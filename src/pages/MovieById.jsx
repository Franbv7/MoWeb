import { useStateContext } from "../context/stateContext";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import {
  useMovieDetails,
  useMovieCredits,
  useMovieProviders,
  useMovieVideos,
  useLogo,
} from "../hooks/movieHooks";

import "../styles/MovieById.css";
import { Button } from "@mui/material";
import ScrollToTop from "react-scroll-to-top";
import CustomRating from "../components/CustomRating";
import { formatDate } from "../utils/formatDate";
import { Loading } from "../components/Loading";

export function MovieById() {
  const {
    API_KEY,
    IMAGE_PATH,
    CREDIT_IMAGE_PATH,
    language,
    darkMode,
    logoLang,
    providerLang,
  } = useStateContext();

  const { movieId } = useParams();

  const {
    data: movieDetails,
    isLoading: isLoadingMovieDetails,
    error: errorMovieDetails,
  } = useMovieDetails(movieId, API_KEY, language);
  const {
    data: movieCredits,
    isLoading: isLoadingMovieCredits,
    error: errorMovieCredits,
  } = useMovieCredits(movieId, API_KEY, language);
  const {
    data: providers,
    isLoading: isLoadingProviders,
    error: errorProviders,
  } = useMovieProviders(movieId, API_KEY, providerLang);
  const {
    data: video,
    isLoading: isLoadingVideo,
    error: errorVideo,
  } = useMovieVideos(movieId, API_KEY, language);
  const {
    data: logo,
    isLoading: isLoadingLogo,
    error: errorLogo,
  } = useLogo(movieId);

  const darkModeClass = darkMode ? "dark" : "";

  if (
    isLoadingMovieDetails ||
    isLoadingMovieCredits ||
    isLoadingProviders ||
    isLoadingVideo ||
    isLoadingLogo
  ) {
    return <Loading />;
  }

  if (
    errorMovieDetails ||
    errorMovieCredits ||
    errorProviders ||
    errorVideo ||
    errorLogo
  ) {
    return <div>Error al cargar los detalles de la película</div>;
  }

  const logoPeli = Array.isArray(logo)
    ? logo.find((logoItem) => logoItem.iso_639_1 === logoLang)
    : null;

  const renderProviders = (providersList) => {
    return providersList.map((provider, index) => (
      <li key={index}>
        <img
          src={`${IMAGE_PATH}${provider.logo_path}`}
          alt={provider.provider_name}
        />
        <p>{provider.provider_name}</p>
      </li>
    ));
  };

  // console.log(movieDetails);
  // console.log("logopeli", logoPeli);

  return (
    <>
      <Header />
      <div className={`movie-details-body ${darkModeClass}`}>
        <section className={`movie-details`}>
          <div className={`image-container${darkModeClass}`}>
            <div className="movie-logo-container">
              {logoPeli && (
                <img
                  className="movie-logo"
                  src={`${IMAGE_PATH}${logoPeli.file_path}`}
                  alt="Logo de la película"
                />
              )}
            </div>
            <img
              className="movie-backdrop"
              src={
                movieDetails?.backdrop_path
                  ? `${IMAGE_PATH}${movieDetails.backdrop_path}`
                  : `${IMAGE_PATH}${movieDetails.poster_path}`
              }
              alt="Portada de la película"
            />
          </div>
          <div className="details-text">
            <p>{movieDetails.overview}</p>
            <p>
              {language === "es-ES" ? <u>Generos:</u> : <u>Genres:</u>}{" "}
              {movieDetails?.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p>
              {language === "es-ES" ? (
                <u>Fecha de lanzamiento:</u>
              ) : (
                <u>Release date:</u>
              )}{" "}
              {formatDate(movieDetails.release_date)}
            </p>
            <p className="vote-average-p">
              {language === "es-ES" ? (
                <u>Promedio de votos:</u>
              ) : (
                <u>Vote average:</u>
              )}{" "}
              <CustomRating
                name="half-rating-read"
                defaultValue={2.5}
                precision={0.5}
                value={movieDetails.vote_average / 2}
                readOnly
              />
            </p>
          </div>
          <Button variant="outlined" size="small">
            <Link
              className={darkMode ? "dark" : "btn-similares"}
              to={`/similarMovies/${movieDetails?.id}`}
            >
              {language === "es-ES" ? "Peliculas Similares" : "Similar Movies"}
            </Link>
          </Button>
        </section>

        <div className="movie-providers-div">
          <h3>Comprar</h3>
          <ul className="movie-providers">
            {providers && providers.buy ? (
              renderProviders(providers.buy)
            ) : language === "es-ES" ? (
              <p>No hay proveedores disponibles</p>
            ) : (
              <p>No providers available</p>
            )}
          </ul>
          <h3>Suscripción</h3>
          <ul className="movie-providers">
            {providers && providers.flatrate ? (
              renderProviders(providers.flatrate)
            ) : language === "es-ES" ? (
              <p>No hay proveedores disponibles</p>
            ) : (
              <p>No providers available</p>
            )}
          </ul>
          <h3>Alquilar</h3>
          <ul className="movie-providers">
            {providers && providers.rent ? (
              renderProviders(providers.rent)
            ) : language === "es-ES" ? (
              <p>No hay proveedores disponibles</p>
            ) : (
              <p>No providers available</p>
            )}
          </ul>
          <p>Source: </p>{" "}
          <Link
            className={darkMode ? "dark" : "btn-similares"}
            href="https://www.justwatch.com"
          >
            JustWatch
          </Link>
        </div>

        <div className="movie-trailer">
          {video?.length > 0 ? (
            video.map(
              (video) =>
                video.type === "Trailer" && (
                  <div key={video.id} style={{ marginBottom: "20px" }}>
                    <h3>{video.name}</h3>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )
            )
          ) : language === "es-ES" ? (
            <p>No hay trailers disponibles</p>
          ) : (
            <p>No trailers available</p>
          )}
        </div>

        <section className="movie-details-credits">
          {movieCredits && (
            <section className="credits-section">
              <h3>Reparto:</h3>
              <div className="movie-credits-container">
                <ul className="movie-credits">
                  {movieCredits?.cast?.map((person) => (
                    <li
                      className={`movie-credits-li${darkModeClass}`}
                      key={person.id}
                    >
                      <Link to={`/person/${person.id}`}>
                        {person.profile_path ? (
                          <img
                            src={`${CREDIT_IMAGE_PATH}${person.profile_path}`}
                            alt={person.name}
                          />
                        ) : (
                          <img
                            src={"/No-Image-Placeholder.svg"}
                            alt={person.name}
                          />
                        )}
                      </Link>
                      <h3>{person.name}</h3>
                      <p>"{person.character}"</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </section>
        <ScrollToTop smooth />
      </div>
    </>
  );
}
