// hooks/useSingleMovie.ts
import { useState } from 'react';
import { fetchMovieById } from '../apis/showMovie';
import type { Movie } from '../types';

export const useSingleMovie = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovie = async (movieId: string) => {
    try {
      const data = await fetchMovieById(movieId);
      setIsLoading(true);
      setErrorMessage('');
      setMovie(data);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching movie');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    movie,
    isLoading,
    errorMessage,
    fetchMovie,
  };
};