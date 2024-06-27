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
import { Button, Rating } from "@mui/material";
import ScrollToTop from "react-scroll-to-top";
import { NestTabs } from "../components/NestTabs";
import CustomRating from "../components/CustomRating";

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
          } catch (error) {
            console.error(
              `Error fetching episodes for season ${seasonNumber}:`,
              error
            );
          }
        }
      };
      fetchEpisodesForSeason();
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
      } catch (error) {
        console.error(
          `Error fetching episodes for season ${seasonNumber}:`,
          error
        );
      }
    }
  };

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <>
      <Header />
      <div className={`serie-details-body ${darkModeClass}`}>
        <section className="serie-details">
          <div className={`image-container${darkModeClass}`}>
            <div className="movie-logo-container">
              <img
                className="movie-logo"
                src={`${IMAGE_PATH}${
                  logo?.find((logoItem) => logoItem.iso_639_1 === logoLang)
                    ?.file_path
                }`}
                alt=""
              />
            </div>
            <img
              className="movie-backdrop"
              src={`${IMAGE_PATH}${tvShow?.backdrop_path}`}
              alt=""
            />
          </div>
          <div className="details-text">
            <p>{tvShow?.overview}</p>

            <p>
              {language === "es-ES" ? (
                <u>Próximo episodio:</u>
              ) : (
                <u>Next episode:</u>
              )}{" "}
              {tvShow?.next_episode_to_air?.name}
            </p>
            <p>
              {language === "es-ES" ? <u>Generos:</u> : <u>Genres:</u>}{" "}
              {tvShow?.genres.map((genre) => genre.name).join(", ")}
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
                value={tvShow?.vote_average / 2}
                readOnly
              />
            </p>
          </div>
          <Button variant="outlined">
            <Link
              className={darkMode ? "dark" : "btn-similares"}
              to={`/similar/${tvShow?.id}`}
            >
              {language === "es-ES" ? "Series Similares" : "Similar Series"}
            </Link>
          </Button>
        </section>
        {tvShow?.seasons && (
          <NestTabs
            seasons={tvShow.seasons}
            seasonEpisodes={seasonEpisodes}
            fetchEpisodesForSeason={fetchEpisodesForSeason}
            seriesId={tvShow.id}
          />
        )}

        <section className="seire-details-credits"></section>
        {credits && (
          <section className="credits-section">
            <h3>{language === "es-ES" ? "Reparto" : "Credits"}</h3>
            <div className="serie-credits-container">
              <ul className="serie-credits">
                {credits?.cast.map((person) => (
                  <li
                    className={`movie-credits-li${darkModeClass}`}
                    key={person.id}
                  >
                    <Link to={`/person/${person.id}`}>
                      {person.profile_path ? (
                        <img
                          src={`${CREDIT_IMAGE_PATH}${person.profile_path}`}
                          alt=""
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
        <ScrollToTop
          style={{ backgroundColor: darkModeClass ? "aliceblue" : "" }}
          smooth
        />
      </div>
    </>
  );
}
