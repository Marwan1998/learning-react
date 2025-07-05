import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import PaginationBox from './components/PaginationBox'
import { updateSearchCount, getTrendingMovies } from './appwrite'


const baseURL = 'https://api.themoviedb.org/3';
const APIKey = import.meta.env.VITE_TMDB_API_KEY;
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

interface TrendingMovie {
  $id: string;
  title: string;
  poster_url: string;
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [trendingMoviesList, settrendingMoviesList] = useState<TrendingMovie[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const page = 1;

  const fetchMovies = async (query = '') => {
    try {
      setisLoading(true);
      setErrorMessage('');

      const moviesEnpoint = query 
      ? `${baseURL}/search/movie?query=${encodeURI(query)}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
      : `${baseURL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

      
      const response = await fetch(moviesEnpoint, APIOptions);
      
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

      console.log(data.page, data.total_pages);
      
      setPaginationButtons(data.page, data.total_pages);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
      
    } catch (error) {
      console.log(error);
      setErrorMessage('Erorr fetching movies, please try again.');
    } finally {
      setisLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();

      settrendingMoviesList(trendingMovies);
    } catch (error) {
      console.log(error);
      // setErrorMessage('Error fetching trending movies');
    }
  };


  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies();
  }, []);


  const setPaginationButtons = (page: number, totalPages: number) => {
    const nextPage = page + 1 < totalPages ? page + 1 : totalPages;
    console.log(nextPage);
    
    return (
      <>
        <PaginationBox isDisabled={false} onClick={() => handlePaginationClick()}>{"<"}</PaginationBox>
        <PaginationBox isDisabled={false} onClick={() => handlePaginationClick()}>{page}</PaginationBox>
        <PaginationBox isDisabled={false} onClick={() => handlePaginationClick()}>{nextPage}</PaginationBox>
        <PaginationBox isDisabled={true} onClick={() => handlePaginationClick()}>...</PaginationBox>
        <PaginationBox isDisabled={true} onClick={() => handlePaginationClick()}>{totalPages}</PaginationBox>
        <PaginationBox isDisabled={false} onClick={() => handlePaginationClick()}>{">"}</PaginationBox>
      </>
    );
  };

  const handlePaginationClick = () => {
    console.log('hiiii');
  }

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="../public/hero.png" alt="hero" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy and
            spend time on!
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMoviesList.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMoviesList.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>

          {isLoading && <Spinner />}

          {!isLoading && errorMessage && (
            <p className='text-red-500'>{errorMessage}</p>
          )}

          {!isLoading && !errorMessage && (
            <ul>
              {moviesList.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>

        <section className='pagination pt-10 flex'>
          {setPaginationButtons()}
        </section>


      </div>
    </main>
  );
}

export default App