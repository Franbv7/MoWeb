import { useState, useEffect } from "react";
import { fetchTvShowByName, fetchTvShowCredits } from "../services/index";
import { Header } from "./Header";
import "../styles/App.css";
import "../styles/TvShowDetails.css";
import { Link, useParams } from "react-router-dom";

import { useStateContext } from "../context/stateContext";

export function TvShowDetails() {
  const { IMAGE_PATH, CREDIT_IMAGE_PATH, API_KEY, language } =
    useStateContext();

  const { tvShowName } = useParams();
  const [tvShowDetails, setTvShowDetails] = useState(null);
  const [tvShowCredits, setTvShowCredits] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tvShows = await fetchTvShowByName(tvShowName, API_KEY, language);
        const tvShow = tvShows?.length > 0 ? tvShows[0] : null;
        setTvShowDetails(tvShow);

        if (tvShow) {
          console.log(tvShow);
          const credits = await fetchTvShowCredits(
            tvShow.id,
            API_KEY,
            language
          );
          // console.log("Credits->", credits);
          setTvShowCredits(credits);
        }
      } catch (error) {
        console.error("Error fetching tv show details:", error);
      }
    };

    fetchData();
  }, [tvShowName, API_KEY, language]);

  if (!tvShowDetails) {
    return <div>Cargando detalles de la serie...</div>;
  }

  return (
    <>
      <Header />
      <div className="poster">
        <h2>{tvShowDetails.title}</h2>
        <img src={`${IMAGE_PATH}${tvShowDetails.poster_path}`} alt="" />
        <p>{tvShowDetails.overview}</p>
      </div>

      {tvShowCredits && (
        <div>
          <h3>Créditos:</h3>
          <ul className="tv-show-credits">
            {tvShowCredits.cast.map((person) => (
              <li key={person.id}>
                <Link to={`/person/${person.id}`}>
                  <img
                    src={`${CREDIT_IMAGE_PATH}${person.profile_path}`}
                    alt=""
                  />
                </Link>
                <p>{person.name}</p>

                <p>"{person.character}"</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
