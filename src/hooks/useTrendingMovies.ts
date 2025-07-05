import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../appwrite';
import type { TrendingMovie } from '../types/index';

export const useTrendingMovies = () => {
  const [trendingMoviesList, setTrendingMoviesList] = useState<TrendingMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchTrendingMovies = async () => {
    try {
      setIsLoading(true);
      setError('');
      const movies = await getTrendingMovies();
      if (movies) {
        setTrendingMoviesList(movies);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load trending movies.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return {
    trendingMoviesList,
    isLoading,
    error,
  };
};
