import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { MovieById } from "./pages/MovieById";
import { UpcomingMovies } from "./pages/UpcomingMovies";
import { DiscoverMovies } from "./pages/DiscoverMovies";
import { SimilarMovies } from "./pages/SimilarMovies";
import { LatestSeries } from "./pages/DiscoverSeries";
import { SimilarSeries } from "./pages/SimilarSeries";
import { SerieById } from "./pages/SerieById";
import { EpisodeById } from "./pages/EpisodeById";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { PersonDetail } from "./pages/PersonDetail";
import { Loading } from "./components/Loading";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover_movies" element={<DiscoverMovies />} />
        <Route path="/movie/:movieId" element={<MovieById />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/tv" element={<LatestSeries />} />
        <Route path="/tv/:serieId" element={<SerieById />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/person/:personId" element={<PersonDetail />} />
        <Route path="/similar/:serieId" element={<SimilarSeries />} />
        <Route path="/similarMovies/:movieId" element={<SimilarMovies />} />
        <Route
          path="/episode/:seriesId/:seasonNumber/:episodeNumber"
          element={<EpisodeById />}
        />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </>
  );
}

export default App;
