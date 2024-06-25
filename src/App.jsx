import { Route, Routes } from "react-router-dom";

import { MovieById } from "./pages/MovieById";
import { LatestSeries } from "./components/DiscoverSeries";
import { UpcomingMovies } from "./components/UpcomingMovies";
import { SearchResultsPage } from "./components/SearchResultsPage";

import { PersonDetail } from "./components/PersonDetail";
import { NewUser } from "./pages/NewUser";

// import { StateProvider } from "./context/stateContext";
import { TvShowById } from "./pages/TvShowById";
import { DiscoverMovies } from "./pages/DiscoverMovies";
import { HomePage } from "./pages/Home";
import { SimilarSeries } from "./pages/SimilarSeries";
import { SimilarMovies } from "./pages/SimilarMovies";
import { EpisodeById } from "./pages/EpisodeById";
import Test from "./pages/Test";
import UserPage from "./pages/UserPage";
import Approved from "./pages/Approved";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover_movies" element={<DiscoverMovies />} />
        <Route path="/movie/:movieId" element={<MovieById />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/tv" element={<LatestSeries />} />
        <Route path="/tv/:tvShowId" element={<TvShowById />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/person/:personId" element={<PersonDetail />} />
        <Route path="/register" element={<NewUser />} />
        <Route path="/similar/:serieId" element={<SimilarSeries />} />
        <Route path="/similarMovies/:movieId" element={<SimilarMovies />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/approved" element={<Approved />} />
        <Route
          path="/episode/:seriesId/:seasonNumber/:episodeNumber"
          element={<EpisodeById />}
        />
        <Route path="/test/:movieId" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
