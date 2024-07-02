// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   fetchCredits,
//   fetchMovieById,
//   fetchMovieGenres,
//   fetchMovieProviders,
//   fetchMovieVideos,
//   testFetch,
// } from "../services/index";
// import { Header } from "../components/Header";
// import { Link } from "react-router-dom";
// import { useStateContext } from "../context/stateContext";

// import "../styles/MovieById.css";
// import { Button } from "@mui/material";
// import ScrollToTop from "react-scroll-to-top";

// import CustomRating from "../components/CustomRating";
// import { formatDate } from "../utils/formatDate";

// export function MovieById() {
//   const {
//     API_KEY,
//     IMAGE_PATH,
//     CREDIT_IMAGE_PATH,
//     language,
//     darkMode,
//     country,
//     logoLang,
//     providerLang,
//   } = useStateContext();

//   const { movieId } = useParams();
//   const [movieDetails, setMovieDetails] = useState(null);
//   const [movieCredits, setMovieCredits] = useState(null);
//   const [logo, setLogo] = useState(null);
//   // const [genres, setGenres] = useState([]);
//   const [video, setVideo] = useState(null);
//   const [providers, setProviders] = useState(null);

//   // const CustomRating = styled(Rating)(({ theme }) => ({
//   //   "& .MuiRating-iconFilled": {
//   //     color: theme.palette.mode === "dark" ? "#ffb400" : "#ffa726",
//   //   },
//   //   "& .MuiRating-iconHover": {
//   //     color: theme.palette.mode === "dark" ? "#ffb400" : "#ffca28",
//   //   },
//   //   "& .MuiRating-iconEmpty": {
//   //     color: theme.palette.mode === "dark" ? "#ffffff50" : "#cccaca65",
//   //   },
//   // }));

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const movie = await fetchMovieById(movieId, API_KEY, language);
//         setMovieDetails(movie);

//         if (movie) {
//           const credits = await fetchCredits(movieId, API_KEY, language);
//           setMovieCredits(credits);

//           // const genresData = await fetchMovieGenres(API_KEY, language);
//           // setGenres(genresData.genres);

//           const logoData = await testFetch(movieId);
//           setLogo(logoData.logos);

//           const providersData = await fetchMovieProviders(API_KEY, movieId);
//           // console.log("Providers data:", providersData);
//           setProviders(
//             providersData.results[providerLang] ||
//               providersData.results.US ||
//               {}
//           );

//           const videoData = await fetchMovieVideos(API_KEY, movieId, language);
//           setVideo(videoData.results);
//         }
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       }
//     };

//     fetchData();
//   }, [movieId, language, API_KEY, providerLang]);

//   if (!movieDetails) {
//     return <div>Cargando detalles de la película...</div>;
//   }

//   const logoPeli = logo?.find((logoItem) => logoItem.iso_639_1 === logoLang);

//   const renderProviders = (providersList) => {
//     return providersList.map((provider, index) => (
//       <li key={index}>
//         <img
//           src={`${IMAGE_PATH}${provider.logo_path}`}
//           alt={provider.provider_name}
//         />
//         <p>{provider.provider_name}</p>
//       </li>
//     ));
//   };

//   console.log(movieDetails);

//   const darkModeClass = darkMode ? "dark" : "";

//   return (
//     <>
//       <Header />
//       <div className={`movie-details-body ${darkModeClass}`}>
//         <section className={`movie-details`}>
//           <div className={`image-container${darkModeClass}`}>
//             <div className="movie-logo-container">
//               {logoPeli && (
//                 <img
//                   className="movie-logo"
//                   src={`${IMAGE_PATH}${logoPeli.file_path}`}
//                   alt="Logo de la película"
//                 />
//               )}
//             </div>
//             <img
//               className="movie-backdrop"
//               src={
//                 movieDetails?.backdrop_path
//                   ? `${IMAGE_PATH}${movieDetails.backdrop_path}`
//                   : `${IMAGE_PATH}${movieDetails.poster_path}`
//               }
//               alt="Portada de la película"
//             />
//           </div>
//           <div className="details-text">
//             <p>{movieDetails.overview}</p>
//             <p>
//               {language === "es-ES" ? <u>Generos:</u> : <u>Genres:</u>}{" "}
//               {movieDetails?.genres.map((genre) => genre.name).join(", ")}
//             </p>
//             <p>
//               {language === "es-ES" ? (
//                 <u>Fecha de lanzamiento:</u>
//               ) : (
//                 <u>Release date:</u>
//               )}{" "}
//               {formatDate(movieDetails.release_date)}
//             </p>
//             <p className="vote-average-p">
//               {language === "es-ES" ? (
//                 <u>Promedio de votos:</u>
//               ) : (
//                 <u>Vote average:</u>
//               )}{" "}
//               <CustomRating
//                 name="half-rating-read"
//                 defaultValue={2.5}
//                 precision={0.5}
//                 value={movieDetails.vote_average / 2}
//                 readOnly
//               />
//             </p>
//           </div>
//           <Button variant="outlined" size="small">
//             <Link
//               className={darkMode ? "dark" : "btn-similares"}
//               to={`/similarMovies/${movieDetails?.id}`}
//             >
//               {language === "es-ES" ? "Peliculas Similares" : "Similar Movies"}
//             </Link>
//           </Button>
//         </section>

//         <div className="movie-providers-div">
//           <h3>Comprar</h3>
//           <ul className="movie-providers">
//             {providers && providers.buy ? (
//               renderProviders(providers.buy)
//             ) : (
//               <p>No hay proveedores disponibles</p>
//             )}
//           </ul>
//           <h3>Suscripción</h3>
//           <ul className="movie-providers">
//             {providers && providers.flatrate ? (
//               renderProviders(providers.flatrate)
//             ) : (
//               <p>No hay proveedores disponibles</p>
//             )}
//           </ul>
//           <h3>Alquilar</h3>
//           <ul className="movie-providers">
//             {providers && providers.rent ? (
//               renderProviders(providers.rent)
//             ) : (
//               <p>No hay proveedores disponibles</p>
//             )}
//           </ul>
//           <p>Source: </p>{" "}
//           <Link
//             className={darkMode ? "dark" : "btn-similares"}
//             href="https://www.justwatch.com"
//           >
//             JustWatch
//           </Link>
//         </div>

//         <div className="movie-trailer">
//           {video?.length > 0 ? (
//             video.map(
//               (video) =>
//                 video.type === "Trailer" && (
//                   <div key={video.id} style={{ marginBottom: "20px" }}>
//                     <h3>{video.name}</h3>
//                     <iframe
//                       width="560"
//                       height="315"
//                       src={`https://www.youtube.com/embed/${video.key}`}
//                       title={video.name}
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 )
//             )
//           ) : (
//             <p>No hay videos disponibles</p>
//           )}
//         </div>

//         <section className="movie-details-credits">
//           {movieCredits && (
//             <section className="credits-section">
//               <h3>Reparto:</h3>
//               <div className="movie-credits-container">
//                 <ul className="movie-credits">
//                   {movieCredits?.cast?.map((person) => (
//                     <li
//                       className={`movie-credits-li${darkModeClass}`}
//                       key={person.id}
//                     >
//                       <Link to={`/person/${person.id}`}>
//                         {person.profile_path ? (
//                           <img
//                             src={`${CREDIT_IMAGE_PATH}${person.profile_path}`}
//                             alt={person.name}
//                           />
//                         ) : (
//                           <img
//                             src={"/No-Image-Placeholder.svg"}
//                             alt={person.name}
//                           />
//                         )}
//                       </Link>
//                       <h3>{person.name}</h3>
//                       <p>"{person.character}"</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </section>
//           )}
//         </section>
//         <ScrollToTop smooth />
//       </div>
//     </>
//   );
// }

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
    return <div>Cargando detalles de la película...</div>;
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
