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
//   const [genres, setGenres] = useState([]);
//   const [video, setVideo] = useState(null);
//   const [providers, setProviders] = useState([]);

//   console.log(providerLang);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const movie = await fetchMovieById(movieId, API_KEY, language);
//         setMovieDetails(movie);

//         if (movie) {
//           const credits = await fetchCredits(movieId, API_KEY, language);
//           setMovieCredits(credits);

//           fetchMovieGenres(API_KEY, language).then((data) => {
//             setGenres(data.genres);
//           });

//           testFetch(movieId).then((data) => {
//             setLogo(data.logos);
//           });

//           // fetchMovieProviders(API_KEY, movieId).then((data) =>
//           //   setProviders(data.results[providerLang].buy)
//           // );

//           // fetchMovieProviders(API_KEY, movieId).then((data) =>
//           //   setProviders(data.results.US)
//           // );

//           const providersData = await fetchMovieProviders(API_KEY, movieId);
//           console.log("Providers data:", providersData); // Verificar la estructura de los datos
//           setProviders(
//             providersData.results[providerLang] ||
//               providersData.results.US ||
//               []
//           );

//           fetchMovieVideos(API_KEY, movieId, language).then((data) => {
//             setVideo(data.results);
//           });
//         }

//         // console.log("Peli por Id->", movie);
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       }
//     };

//     fetchData();
//   }, [movieId, language]);

//   if (!movieDetails) {
//     return <div>Cargando detalles de la película...</div>;
//   }

//   const logoPeli = logo?.find((logoItem) => logoItem.iso_639_1 === logoLang);
//   // console.log("logoPeli ->", logoPeli);
//   console.log(providers);
//   return (
//     <>
//       <Header />
//       <div className={`all-body${darkMode}`}>
//         <section className={`movie-details`}>
//           <div className={`image-container${darkMode}`}>
//             <div className="movie-logo-container">
//               <img
//                 className="movie-logo"
//                 src={`${IMAGE_PATH}${logoPeli?.file_path}`}
//                 alt=""
//               />
//             </div>
//             <img
//               className="movie-backdrop"
//               src={`${IMAGE_PATH}${movieDetails.backdrop_path}`}
//               alt=""
//             />
//           </div>
//           Genres:{" "}
//           {movieDetails.genre_ids
//             ?.map((genreId) => {
//               const genre = genres.find((genre) => genre.id === genreId);
//               return genre ? genre.name : "Unknown";
//             })
//             .join(", ")}
//           <p>{movieDetails.overview}</p>
//           <p>Release Date: {movieDetails.release_date}</p>
//           <p>Popularity: {movieDetails.popularity}</p>
//           <p>Vote Average: {movieDetails.vote_average}</p>
//           <Button variant="outlined" size="small">
//             <Link to={`/similarMovies/${movieDetails?.id}`}>Similares</Link>
//           </Button>
//         </section>

//         <div>
//           <ul className="movie-providers">
//             {providers?.map((provider) => (
//               <li>
//                 <img src={`${IMAGE_PATH}${provider.buy[0]}`} alt="" />
//                 <p>{provider.buy.provider_name}</p>
//               </li>
//             ))}
//           </ul>
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
//             <p>No videos available</p>
//           )}
//         </div>

//         <section className="movie-details-credits">
//           {movieCredits && (
//             <section className="credits-section">
//               <h3>Credits:</h3>
//               <div className="movie-credits-container">
//                 <ul className="movie-credits">
//                   {movieCredits?.cast?.map((person) => (
//                     <li key={person.id}>
//                       <Link to={`/person/${person.id}`}>
//                         <img
//                           src={`${CREDIT_IMAGE_PATH}${person.profile_path}`}
//                           alt=""
//                         />
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
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCredits,
  fetchMovieById,
  fetchMovieGenres,
  fetchMovieProviders,
  fetchMovieVideos,
  testFetch,
} from "../services/index";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

import "../styles/MovieById.css";
import { Button } from "@mui/material";

export function MovieById() {
  const {
    API_KEY,
    IMAGE_PATH,
    CREDIT_IMAGE_PATH,
    language,
    darkMode,
    country,
    logoLang,
    providerLang,
  } = useStateContext();

  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [logo, setLogo] = useState(null);
  const [genres, setGenres] = useState([]);
  const [video, setVideo] = useState(null);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movie = await fetchMovieById(movieId, API_KEY, language);
        setMovieDetails(movie);

        if (movie) {
          const credits = await fetchCredits(movieId, API_KEY, language);
          setMovieCredits(credits);

          const genresData = await fetchMovieGenres(API_KEY, language);
          setGenres(genresData.genres);

          const logoData = await testFetch(movieId);
          setLogo(logoData.logos);

          const providersData = await fetchMovieProviders(API_KEY, movieId);
          console.log("Providers data:", providersData); // Verificar la estructura de los datos
          setProviders(
            providersData.results[providerLang] ||
              providersData.results.US ||
              {}
          );

          const videoData = await fetchMovieVideos(API_KEY, movieId, language);
          setVideo(videoData.results);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchData();
  }, [movieId, language, API_KEY, providerLang]);

  if (!movieDetails) {
    return <div>Cargando detalles de la película...</div>;
  }

  const logoPeli = logo?.find((logoItem) => logoItem.iso_639_1 === logoLang);

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

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <>
      <Header />
      <div className={`all-body${darkModeClass}`}>
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
              src={`${IMAGE_PATH}${movieDetails.backdrop_path}`}
              alt="Backdrop de la película"
            />
          </div>
          Géneros:{" "}
          {movieDetails.genre_ids
            ?.map((genreId) => {
              const genre = genres.find((genre) => genre.id === genreId);
              return genre ? genre.name : "Desconocido";
            })
            .join(", ")}
          <p>{movieDetails.overview}</p>
          <p>Fecha de lanzamiento: {movieDetails.release_date}</p>
          <p>Popularidad: {movieDetails.popularity}</p>
          <p>Promedio de votos: {movieDetails.vote_average}</p>
          <Button variant="outlined" size="small">
            <Link to={`/similarMovies/${movieDetails?.id}`}>Similares</Link>
          </Button>
        </section>

        <div>
          <h3>Comprar</h3>
          <ul className="movie-providers">
            {providers && providers.buy ? (
              renderProviders(providers.buy)
            ) : (
              <p>No hay proveedores disponibles</p>
            )}
          </ul>
          <h3>Suscripción</h3>
          <ul className="movie-providers">
            {providers && providers.flatrate ? (
              renderProviders(providers.flatrate)
            ) : (
              <p>No hay proveedores disponibles</p>
            )}
          </ul>
          <h3>Alquilar</h3>
          <ul className="movie-providers">
            {providers && providers.rent ? (
              renderProviders(providers.rent)
            ) : (
              <p>No hay proveedores disponibles</p>
            )}
          </ul>
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
          ) : (
            <p>No hay videos disponibles</p>
          )}
        </div>

        <section className="movie-details-credits">
          {movieCredits && (
            <section className="credits-section">
              <h3>Créditos:</h3>
              <div className="movie-credits-container">
                <ul className="movie-credits">
                  {movieCredits?.cast?.map((person) => (
                    <li key={person.id}>
                      <Link to={`/person/${person.id}`}>
                        <img
                          src={`${CREDIT_IMAGE_PATH}${person.profile_path}`}
                          alt={person.name}
                        />
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
      </div>
    </>
  );
}
