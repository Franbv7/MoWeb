import { Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/Home";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
      </Routes>
    </>
  );
}

export default App;
