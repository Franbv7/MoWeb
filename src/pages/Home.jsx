import { Header } from "../components/Header";
import {
  fetchDiscoverMovies,
  fetchTrendingMovies,
  fetchTrendingSeries,
  fetchUpcomingMovies,
} from "../services";
import { useEffect, useState } from "react";

import { useStateContext } from "../context/stateContext";
import { Slider } from "../components/Slider";

import CarouselSlider from "../components/Carousel";
import ScrollToTop from "react-scroll-to-top";

export function HomePage() {
  const { IMAGE_PATH, API_KEY, language, country, darkMode } =
    useStateContext();
  const [latestMovies, setLatestMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);

  const page = 1;

  useEffect(() => {
    fetchDiscoverMovies(API_KEY, language, country, page).then((data) => {
      setDiscoverMovies(data.results);
    });
    fetchUpcomingMovies(API_KEY, language, country).then((data) => {
      setLatestMovies(data.results);
    });
    fetchTrendingSeries(API_KEY, language).then(setTrendingSeries);
    fetchTrendingMovies(API_KEY, language).then(setTrendingMovies);
  }, [API_KEY, language, country]);

  const color = darkMode ? "aliceblue" : "black";

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <div className={`all-body ${darkModeClass}`}>
      <Header />
      <div className="home-body">
        <div className="title">
          <h1 id="title">MoWeb </h1>

          {/* <img width={"50px"} src="/Movie_Maker_22593.png" alt="" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5em"
            height="5em"
            viewBox="0 0 15 15"
            color={color}
          >
            <path
              fill="currentColor"
              d="M13.218 4.246L7.087 6.238a.5.5 0 0 1-.24.079L4.741 7H13.5a.5.5 0 0 1 .5.5v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-5c0-.106.033-.205.09-.287l-.195-.602A2.5 2.5 0 0 1 3.5 3.461l6.657-2.163a2.5 2.5 0 0 1 3.15 1.605l.232.713a.5.5 0 0 1-.321.63m-3.744.165l1.285-2.226a1.5 1.5 0 0 0-.293.064l-1.245.404l-1.308 2.265zm2.295-1.979l-.02.037l-.854 1.48l1.538-.5l-.077-.237a1.5 1.5 0 0 0-.587-.78m-3.97.683l-1.56.507L4.93 5.887l1.56-.507zM2.923 6.54l.587-.19l1.307-2.266l-1.008.328a1.5 1.5 0 0 0-.963 1.89zM3 8v4.5A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V8z"
            />
          </svg>
        </div>
        <div>
          <CarouselSlider
            items={latestMovies}
            linkBase="/movie"
            imageSource={(item) =>
              item.backdrop_path
                ? `${IMAGE_PATH}${item.backdrop_path}`
                : "No-Image-Placeholder.svg"
            }
            imageAlt={(item) => item.title}
            itemName={(item) => item.title}
          />
        </div>
        <div className="all-trending">
          <h3>
            {language === "en-US" ? "Trending Series" : "Series en tendencia"}
          </h3>
          <Slider
            items={trendingSeries}
            linkBase="/tv"
            imageSource={(item) => `${IMAGE_PATH}${item.poster_path}`}
            imageAlt={(item) => item.name}
            itemName={(item) => item.name}
          />

          <h3>
            {language === "en-US" ? "Discover Movies" : "Descubre Películas"}
          </h3>
          <Slider
            items={discoverMovies}
            linkBase="/movie"
            imageSource={(item) => `${IMAGE_PATH}${item.poster_path}`}
            imageAlt={(item) => item.title}
            itemName={(item) => item.title}
          />

          <h3>
            {language === "en-US"
              ? "Trending Movies"
              : "Películas en tendencia"}
          </h3>
          <Slider
            items={trendingMovies}
            linkBase="/movie"
            imageSource={(item) => `${IMAGE_PATH}${item.poster_path}`}
            imageAlt={(item) => item.title}
            itemName={(item) => item.title}
          />
        </div>
      </div>
      <ScrollToTop smooth />
    </div>
  );
}
