import { useState } from 'react';
import type { Movie } from '../types/index';

const baseURL = 'https://api.themoviedb.org/3';
const APIKey = import.meta.env.VITE_TMDB_API_KEY as string;

const APIOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${APIKey}`,
  }
};


export const useSingleMovie = () => {
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovie = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const url = `${baseURL}/discover/movie?include_adult=false&language=en-US&page=${page}`;

      const response = await fetch(url, APIOptions);

      if(!response.ok){
        throw new Error("Erorr fetching movies:");
      }

      const data = await response.json();
      
      
      if(data.Response == 'False'){
        setErrorMessage(data.Erorr || 'Failed to fetch movies');
        setMoviesList([]);
        return;
      }

      setMoviesList(data.results);

    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching movies.');
    } finally {
      setIsLoading(false);
    }
    
  };

  return {
    moviesList,
    isLoading,
    errorMessage,
    fetchMovie,
  };
};
