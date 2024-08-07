import { useState, useEffect } from "react";
import {
  fetchSerieById,
  fetchSerieCredits,
  fetchSeasonDetails,
  fetchSeriesImages,
  fetchSeries,
  fetchSerieGenres,
  fetchEpisodeDetails,
  fetchTrendingSeries,
} from "../services/index";

export const useTvShowDetails = (serieId, API_KEY, language) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSerieById(serieId, API_KEY, language);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serieId, API_KEY, language]);

  return { data, isLoading, error };
};

export const useTvShowCredits = (serieId, API_KEY, language) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSerieCredits(serieId, API_KEY, language);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serieId, API_KEY, language]);

  return { data, isLoading, error };
};

export const useSeriesImages = (serieId, API_KEY) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSeriesImages(API_KEY, serieId);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serieId, API_KEY]);

  return { data, isLoading, error };
};

export const useSeasonEpisodes = (serieId, seasonNumber, API_KEY, language) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSeasonDetails(
          API_KEY,
          serieId,
          seasonNumber,
          language
        );
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serieId, seasonNumber, API_KEY, language]);

  return { data, isLoading, error };
};

export const useSeries = (API_KEY, country, language, page) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSeries(API_KEY, country, language, page);
        setData(result.results);
        setTotalPages(result.total_pages);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_KEY, country, language, page]);

  return { data, isLoading, error, totalPages };
};

export const useSerieGenres = (API_KEY, language) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSerieGenres(API_KEY, language);
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

export const useEpisodeDetails = (
  API_KEY,
  seriesId,
  seasonNumber,
  episodeNumber,
  language
) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchEpisodeDetails(
          API_KEY,
          seriesId,
          seasonNumber,
          episodeNumber,
          language
        );
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_KEY, seriesId, seasonNumber, episodeNumber, language]);

  return { data, isLoading, error };
};

export const useTrendingSeries = (API_KEY, language) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTrendingSeries(API_KEY, language);
        setData(result);
        // console.log("trendingSeries Hook ->", result);
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
