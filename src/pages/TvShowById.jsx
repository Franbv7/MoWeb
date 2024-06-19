// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   fetchTvImages,
//   fetchTvShowById,
//   fetchTvShowCredits,
//   fetchTvShowGenres,
// } from "../services/index";
// import { useStateContext } from "../context/stateContext";
// import { Header } from "../components/Header";

// import "../styles/TvShowById.css";
// import { NestDrawer } from "../components/NestDrawer";

// export function TvShowById() {
//   const { IMAGE_PATH, CREDIT_IMAGE_PATH, API_KEY, language } =
//     useStateContext();

//   const { tvShowId } = useParams();
//   const [tvShow, setTvShow] = useState(null);
//   const [credits, setCredits] = useState(null);
//   const [genres, setGenres] = useState([]);
//   const [images, setImages] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const tvShowData = await fetchTvShowById(tvShowId, API_KEY, language);
//         setTvShow(tvShowData);

//         if (tvShowData) {
//           const creditsData = await fetchTvShowCredits(
//             tvShowData.id,
//             API_KEY,
//             language
//           );
//           setCredits(creditsData);
//           console.log(tvShowData);

//           const images = await fetchTvImages(tvShowData.id, API_KEY);
//           images.backdrops[2] && setImages(images);

//           fetchTvShowGenres(API_KEY, language).then((data) => {
//             setGenres(data);
//             // console.log("genres->", data);
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching TV show details:", error);
//       }
//     };

//     fetchData();
//   }, [tvShowId, API_KEY, language]);

//   return (
//     <>
//       <Header />
//       <div>
//         <section className="serie-details">
//           <h2>{tvShow?.name}</h2>
//           <img src={`${IMAGE_PATH}${tvShow?.backdrop_path}`} alt="" />
//           <p>{tvShow?.overview}</p>
//           {/* <p>Genres: {tvShow.genres[0]?.name}</p> */}
//           <p>
//             {language === "es-ES" ? "Géneros:" : "Genres:"}{" "}
//             {tvShow?.genres.map((genre) => genre.name).join(", ")}
//           </p>
//           <p>Vote average: {tvShow?.vote_average}</p>
//           <p>Popularity: {tvShow?.popularity}</p>
//           {/* <p>Seasons: {tvShow.seasons}</p> */}
//           {/* <p>Episodes: {tvShow.episodes}</p> */}
//           <Link to={`/similar/${tvShow?.id}`}>Similares</Link>
//         </section>
//         {tvShow?.seasons && (
//           <NestDrawer seasons={tvShow.seasons} tvShowId={tvShow.id} />
//         )}
//       </div>
//       <div className="details-body"></div>
//       {credits && (
//         <section className="credits-section">
//           <h3>{language === "es-ES" ? "Créditos" : "Credits"}</h3>
//           <div className="tv-show-credits-container">
//             <ul className="tv-show-credits">
//               {credits?.cast.map((person) => (
//                 <li key={person.id}>
//                   <Link to={`/person/${person.id}`}>
//                     <img
//                       src={`${CREDIT_IMAGE_PATH}${person.profile_path}`}
//                       alt=""
//                     />
//                   </Link>
//                   <h3>{person.name}</h3>
//                   <p>"{person.character}"</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchTvImages,
  fetchTvShowById,
  fetchTvShowCredits,
  fetchTvShowGenres,
  fetchSeasonDetails,
  fetchSeriesImages,
} from "../services/index";
import { useStateContext } from "../context/stateContext";
import { Header } from "../components/Header";
import "../styles/TvShowById.css";
import "../styles/MovieById.css";
import { NestDrawer } from "../components/NestDrawer";
import { Button } from "@mui/material";

export function TvShowById() {
  const {
    IMAGE_PATH,
    CREDIT_IMAGE_PATH,
    API_KEY,
    language,
    darkMode,
    logoLang,
  } = useStateContext();
  const { tvShowId } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [credits, setCredits] = useState(null);
  const [genres, setGenres] = useState([]);
  const [images, setImages] = useState(null);
  const [logo, setLogo] = useState(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tvShowData = await fetchTvShowById(tvShowId, API_KEY, language);
        setTvShow(tvShowData);

        if (tvShowData) {
          const creditsData = await fetchTvShowCredits(
            tvShowData.id,
            API_KEY,
            language
          );
          setCredits(creditsData);
          console.log("Serie details", tvShowData);

          fetchSeriesImages(API_KEY, tvShowId).then((data) => {
            setLogo(data.logos);
          });

          const images = await fetchTvImages(tvShowData.id, API_KEY);
          images.backdrops[2] && setImages(images);

          fetchTvShowGenres(API_KEY, language).then((data) => {
            setGenres(data);
          });
        }
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      }
    };

    fetchData();
  }, [tvShowId, API_KEY, language]);

  const fetchEpisodesForSeason = async (seasonNumber) => {
    if (!seasonEpisodes[seasonNumber]) {
      try {
        const seasonDetails = await fetchSeasonDetails(
          API_KEY,
          tvShowId,
          seasonNumber,
          language
        );
        setSeasonEpisodes((prevEpisodes) => ({
          ...prevEpisodes,
          [seasonNumber]: seasonDetails.episodes,
        }));
        console.log("episode", seasonEpisodes);

        console.log(seasonNumber);
      } catch (error) {
        console.error(
          `Error fetching episodes for season ${seasonNumber}:`,
          error
        );
      }
    }
  };

  const drawerSx = darkMode
    ? {
        "& .MuiDrawer-paper": {
          color: "aliceblue",
          backgroundColor: "black",
        },
        "& .MuiListItem-root": {
          color: "aliceblue",
          backgroundColor: "black",
        },
      }
    : { "& .MuiListItem-root": { color: "black" } };

  const logoSerie = logo?.find((logoItem) => logoItem.iso_639_1 === logoLang);
  console.log("logoPeli ->", logoSerie);

  return (
    <>
      <Header />
      <div className={`all-body${darkMode}`}>
        <section className="serie-details">
          {/* <h2>{tvShow?.name}</h2> */}
          <div className={`image-container${darkMode}`}>
            <div className="movie-logo-container">
              <img
                className="movie-logo"
                src={`${IMAGE_PATH}${logoSerie?.file_path}`}
                alt=""
              />
            </div>
            <img
              className="movie-backdrop"
              src={`${IMAGE_PATH}${tvShow?.backdrop_path}`}
              alt=""
            />
          </div>
          {/* <img
              className="movie-logo"
              src={`${IMAGE_PATH}${logoSerie?.file_path}`}
              alt=""
            /> */}
          {/* <img src={`${IMAGE_PATH}${tvShow?.backdrop_path}`} alt="" /> */}
          <p>{tvShow?.overview}</p>
          <p>
            {language === "es-ES" ? "Géneros:" : "Genres:"}{" "}
            {tvShow?.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>Vote average: {tvShow?.vote_average}</p>
          <p>Popularity: {tvShow?.popularity}</p>
          <Button variant="outlined">
            <Link to={`/similar/${tvShow?.id}`}>Similares</Link>
          </Button>
        </section>
        {tvShow?.seasons && (
          <NestDrawer
            seasons={tvShow.seasons}
            seasonEpisodes={seasonEpisodes}
            fetchEpisodesForSeason={fetchEpisodesForSeason}
            seriesId={tvShow.id}
            sx={drawerSx}
            // linkInfo={`/episode/${tvShow?.id}/${tvShow.seasons[0]}`}
          />
        )}

        <div className="details-body"></div>
        {credits && (
          <section className="credits-section">
            <h3>{language === "es-ES" ? "Créditos" : "Credits"}</h3>
            <div className="tv-show-credits-container">
              <ul className="tv-show-credits">
                {credits?.cast.map((person) => (
                  <li key={person.id}>
                    <Link to={`/person/${person.id}`}>
                      <img
                        src={`${CREDIT_IMAGE_PATH}${person.profile_path}`}
                        alt=""
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
      </div>
    </>
  );
}
