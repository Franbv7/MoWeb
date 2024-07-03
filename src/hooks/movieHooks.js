import { useState, useEffect } from "react";
import {
  fetchCredits,
  fetchMovieById,
  fetchMovieGenres,
  fetchMovieProviders,
  fetchMovieVideos,
  fetchLogos,
  fetchSimilarMovies,
  fetchUpcomingMovies,
  searchAll,
  fetchDiscoverMovies,
  fetchTrendingMovies,
} from "../services/index";

export const useMovieDetails = (movieId, API_KEY, language) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchMovieById(movieId, API_KEY, language);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId, API_KEY, language]);

  return { data, isLoading, error };
};

export const useMovieCredits = (movieId, API_KEY, language) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCredits(movieId, API_KEY, language);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId, API_KEY, language]);

  return { data, isLoading, error };
};

export const useMovieProviders = (movieId, API_KEY, providerLang) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchMovieProviders(API_KEY, movieId);
        setData(result.results[providerLang] || result.results.US || {});
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId, API_KEY, providerLang]);

  return { data, isLoading, error };
};

export const useMovieVideos = (movieId, API_KEY, language) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchMovieVideos(API_KEY, movieId, language);
        setData(result.results);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId, API_KEY, language]);

  return { data, isLoading, error };
};

export const useLogo = (movieId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchLogos(movieId);
        setData(result.logos);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return { data, isLoading, error };
};

export const useMovieGenres = (API_KEY, language) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchMovieGenres(API_KEY, language);
        setData(result.genres);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_KEY, language]);

  return { data, isLoading, error };
};

export const useSimilarMovies = (movieId, API_KEY, language) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSimilarMovies(movieId, API_KEY, language);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId, API_KEY, language]);

  return { data, isLoading, error };
};

export const useUpcomingMovies = (API_KEY, language, country, page = 1) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUpcomingMovies(
          API_KEY,
          language,
          country,
          page
        );
        setData(result.results);
        setTotalPages(result.total_pages);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_KEY, language, country, page]);

  return { data, isLoading, error, totalPages };
};

export const useDiscoverMovies = (API_KEY, language, country, page = 1) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDiscoverMovies(
          API_KEY,
          language,
          country,
          page
        );
        setData(result.results);
        setTotalPages(result.total_pages);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_KEY, language, country, page]);

  return { data, isLoading, error, totalPages };
};

export const useTrendingMovies = (API_KEY, language) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTrendingMovies(API_KEY, language);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_KEY, language]);

  return { data, isLoading, error };
};

export const useSearchResults = (searchKey, API_KEY, language, page) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await searchAll(searchKey, API_KEY, language, page);
        setData(result.results);
        setTotalPages(result.total_pages);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchKey, API_KEY, language, page]);

  return { data, isLoading, error, totalPages };
};
