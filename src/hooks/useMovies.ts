import { useState } from 'react';
import { updateSearchCount } from '../appwrite';

const baseURL = 'https://api.themoviedb.org/3';
const APIKey = import.meta.env.VITE_TMDB_API_KEY as string;

const APIOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${APIKey}`,
  }
};

interface Movie {
  id: number;
  title: string;
  vote_average: number,
  release_date: string,
  original_language: string,
  poster_path: string;
}

export const useMovies = () => {
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState<number>(2);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (query: string, page: number = 1) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const url = query
        ? `${baseURL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
        : `${baseURL}/discover/movie?include_adult=false&language=en-US&page=${page}`;

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

      setMoviesList(data.results || []);
      setCurrentPage(data.page);
      setNextPage(data.page + 1 <= data.total_pages ? data.page+1 : data.page);
      setTotalPages(data.total_pages);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
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
    currentPage,
    nextPage,
    totalPages,
    fetchMovies,
  };
};
