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

export function HomePage() {
  const { IMAGE_PATH, API_KEY, language, country, darkMode, setLanguage } =
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
    fetchTrendingSeries(API_KEY).then(setTrendingSeries);
    fetchTrendingMovies(API_KEY, language).then(setTrendingMovies);
  }, [API_KEY, language, country]);

  return (
    <div className={`all-body${darkMode}`}>
      <Header />
      <div className="home-body">
        <h1 id="title">MoWeb 2</h1>

        <div>
          <CarouselSlider
            items={latestMovies}
            linkBase="/movie"
            imageSource={(item) => `${IMAGE_PATH}${item.backdrop_path}`}
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
            imageSource={(item) => `${IMAGE_PATH}${item.backdrop_path}`}
            imageAlt={(item) => item.name}
            itemName={(item) => item.name}
          />

          <h3>
            {language === "en-US" ? "Discover Movies" : "Descubre Películas"}
          </h3>
          <Slider
            items={discoverMovies}
            linkBase="/movie"
            imageSource={(item) => `${IMAGE_PATH}${item.backdrop_path}`}
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
            imageSource={(item) => `${IMAGE_PATH}${item.backdrop_path}`}
            imageAlt={(item) => item.title}
            itemName={(item) => item.title}
          />
        </div>
      </div>
    </div>
  );
}
