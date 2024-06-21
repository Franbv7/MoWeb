import { useEffect, useState } from "react";
import {
  fetchPersonByName,
  fetchPersonMovieCredits,
  fetchPersonTvCredits,
} from "../services";
import { Header } from "./Header";
import { Link, useParams } from "react-router-dom";

import { useStateContext } from "../context/stateContext";

import "../styles/PersonDetail.css";

export function PersonDetail() {
  const { API_KEY, IMAGE_PATH, language } = useStateContext();

  const { personId } = useParams();

  const [personDetails, setPersonDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [tvCredits, setTvCredits] = useState(null);

  const MOVIE_IMAGE_PATH = "https://image.tmdb.org/t/p/w200";

  useEffect(() => {
    if (personId) {
      fetchPersonByName(personId, API_KEY, language).then(setPersonDetails);

      fetchPersonMovieCredits(personId, API_KEY, language).then((data) => {
        setMovieCredits(data.cast);
        // console.log("movieCredits->", movieCredits);
      });

      fetchPersonTvCredits(personId, API_KEY, language).then((data) => {
        setTvCredits(data.cast);
        // console.log("TvCredits->", tvCredits);
      });
    }
  }, [personId, language]);

  movieCredits?.sort((a, b) => {
    return b.popularity - a.popularity;
  });

  tvCredits?.sort((a, b) => {
    return b.popularity - a.popularity;
  });

  return (
    <>
      <Header />

      <div className="person-details-body">
        <h1>Results</h1>

        <h3>
          {personDetails?.name} {personDetails?.birthday}
          {personDetails?.deathday && ` - ${personDetails?.deathday}`}
        </h3>
        <img
          className="person-photo"
          src={`${IMAGE_PATH}${personDetails?.profile_path}`}
          alt=""
        />
        <p>{personDetails?.biography}</p>
        <a href={personDetails?.homepage}>HomePage</a>
        <h2> Known for: </h2>
        <div className="credits">
          <div>
            <h3>Movies</h3>
            <ul>
              {movieCredits?.map((movie) => (
                <li key={movie.id}>
                  <h4>{movie.title}</h4>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`${MOVIE_IMAGE_PATH}${movie.poster_path}`}
                      alt=""
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Tv</h3>
            <ul>
              {tvCredits?.map((tv) => (
                <li key={tv.id}>
                  <h4>{tv.name}</h4>
                  <Link to={`/tv/${tv.id}`}>
                    <img src={`${MOVIE_IMAGE_PATH}${tv.poster_path}`} alt="" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
