// api/showMovie.ts
import type { Movie } from '../types';

const baseURL = 'https://api.themoviedb.org/3';
const APIKey = import.meta.env.VITE_TMDB_API_KEY as string;

const APIOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${APIKey}`,
  },
};

export async function fetchMovieById(movieId: string): Promise<Movie> {
  const url = `${baseURL}/movie/${movieId}`;
  const response = await fetch(url, APIOptions);

  if (!response.ok) {
    throw new Error('Error fetching movie');
  }

  const data = await response.json();
  return data;
}
