import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import { fetchMovieProviders, testFetch } from "../services";

export default function Test() {
  const {
    API_KEY,
    IMAGE_PATH,
    CREDIT_IMAGE_PATH,
    darkMode,
    country,
    logoLang,
  } = useStateContext();

  const { movieId } = useParams();
  const [providers, setProviders] = useState(null);

  const language = "US";
  useEffect(() => {
    fetchMovieProviders(API_KEY, movieId).then((data) =>
      setProviders(data.results[language].buy)
    );
  }, [movieId]);

  // useEffect(() => {
  //   fetchMovieProviders(API_KEY, movieId).then((data) => {
  //     if (
  //       data.results &&
  //       data.results[language] &&
  //       data.results[language].buy
  //     ) {
  //       setProviders(data.results[language].buy);
  //     } else {
  //       setProviders([]); // En caso de que no haya proveedores disponibles
  //     }
  //   });
  // }, [API_KEY, movieId, language]);

  console.log(providers);
  return (
    <div>
      <ul>
        {providers?.map((provider) => (
          <li>
            <p>{provider.provider_name}</p>
            <img src={`${IMAGE_PATH}${provider.logo_path}`} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
