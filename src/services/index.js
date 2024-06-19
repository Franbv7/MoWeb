export const fetchLatestMovies = async (apiKey, language, country, page) => {
  const url = "https://api.themoviedb.org/3/movie/latest";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching latest movies:", error);
  }
};

export const fetchDiscoverMovies = async (apiKey, language, country, page) => {
  const url = `https://api.themoviedb.org/3/discover/movie?language=${language}&page=${page}&with_origin_country=${country}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // console.log("Latest Movies ->", data);

    return data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error.message);
  }
};

export const fetchMovieByName = async (name, apiKey, language) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=${language}page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Movie by name->", data.results);

    return data.results;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error.message);
  }
};

export const fetchUpcomingMovies = async (
  apiKey,
  language,
  country,
  page = 1
) => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=${language}&page=${page}&region=${country}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const fetchSeries = async (apiKey, country, language, page) => {
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=true&language=${language}&page=${page}&ssort_by=popularity.desc&with_origin_country=${country}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("TvShows ->", data);

    return data;
  } catch (error) {}
};

export const fetchTrendingSeries = async (apiKey, language) => {
  try {
    const url = `https://api.themoviedb.org/3/trending/tv/day?language=${language}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    // console.log("latestTvShows->", data);

    return data.results;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error.message);
  }
};

export const fetchTrendingMovies = async (apiKey, language) => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // console.log("Trending Movies->", data.results);

    return data.results;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error.message);
  }
};

export const fetchTvShowByName = async (name, apiKey, language) => {
  const url = `https://api.themoviedb.org/3/search/tv?query=${name}&include_adult=false&language=${language}&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const results = data.results;
    console.log("Tv Show By Name->", results);
    return results;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error.message);
    throw error;
  }
};

export const fetchTvShowById = async (id, apiKey, language) => {
  const url = `https://api.themoviedb.org/3/tv/${id}?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // console.log("Tv Show by Id ->", data);

    return data;
  } catch (error) {
    console.error("Error fetching Tv Show:", error.message);
  }
};

export const fetchTvImages = async (id, apiKey) => {
  const url = `https://api.themoviedb.org/3/tv/${id}/images`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log("Tv Show Images ->", data);

    return data;
  } catch (error) {
    console.error("Error fetching Tv Show Images:", error.message);
  }
};

export const fetchCredits = async (movieId, apiKey, language) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching credits:", error);
    throw error;
  }
};

export const fetchTvShowCredits = async (tvShowId, apiKey, language) => {
  const url = `https://api.themoviedb.org/3/tv/${tvShowId}/credits?language=${language}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log("TvShow Credits->", data);
    return data;
  } catch (error) {
    console.error("Error fetching credits:", error);
    throw error;
  }
};

export const fetchMovieGenres = async (apiKey, language) => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?language=${language}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw error;
  }
};
export const fetchTvShowGenres = async (apiKey, language) => {
  const url = `https://api.themoviedb.org/3/genre/tv/list?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // console.log("genresIndex->", data.genres);

    return data.genres;
  } catch (error) {
    console.error("Error fetching tv show genres:", error);
    throw error;
  }
};

export const searchAll = async (name, apiKey, language, page) => {
  const url = `https://api.themoviedb.org/3/search/multi?query=${name}&include_adult=true&language=${language}&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

export const fetchPersonByName = async (personId, apiKey, language) => {
  const url = `https://api.themoviedb.org/3/person/${personId}?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log("person ->", data);
    return data;
  } catch (error) {
    console.error("Error fetching person details:", error);
    throw error;
  }
};

export const fetchPersonMovieCredits = async (personId, apiKey, language) => {
  const url = `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log("person credits ->", data);
    return data;
  } catch (error) {
    console.error("Error fetching person details:", error);
    throw error;
  }
};

export const fetchPersonTvCredits = async (personId, apiKey, language) => {
  const url = ` https://api.themoviedb.org/3/person/${personId}/tv_credits?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("person tv credits->");
    return data;
  } catch (error) {
    console.error("Error fetching person details:", error);
  }
};

export const fetchSimilarSeries = async (serieId, apiKey, language) => {
  const url = ` https://api.themoviedb.org/3/tv/${serieId}/similar?language=${language}&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log("similares->", data);

    return data.results;
  } catch (error) {
    console.error("Error fetching similar series:", error);
  }
};

export const fetchSimilarMovies = async (movieId, apiKey, language) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=${language}&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("similares->", data);

    return data.results;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
  }
};

export const fetchMovieById = async (movieId, apiKey, language) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {}
};

export const fetchSeasonDetails = async (
  apiKey,
  seriesId,
  seasoNumber,
  language
) => {
  const url = `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasoNumber}?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("season details->", data);
    return data;
  } catch (error) {}
};

export const fetchEpisodeDetails = async (
  apiKey,
  seriesId,
  seasonNumber,
  episodeNumber,
  language
) => {
  const url = `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("episode details->", data);
    return data;
  } catch (error) {
    console.error("Error fetching episode details:", error);
  }
};

export const testFetch = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/images`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWZlY2FkOGY4NGY0MDk2MmVjY2ZlOWFmNDE4OTBlNyIsInN1YiI6IjY1YTU2MmY1MGYyYWUxMDEyZDViNTg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dpDhIzipN99R9kDEsZJiAVif3nHhzVu1MFnhFB5DsA8",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching episode details:", error);
  }
};

export const fetchSeriesImages = async (apiKey, serieId) => {
  const url = `https://api.themoviedb.org/3/tv/${serieId}/images`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching series images:", error);
  }
};

export const fetchMovieVideos = async (apiKey, movieId, language) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // console.log("index data ->", data);

    return data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
  }
};

export const fetchMovieProviders = async (apiKey, movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching movie providers:", error);
  }
};
