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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<number>(2);
  const [totalPages, setTotalPages] = useState<number>(1);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const page = 1;

  const fetchMovies = async (query = '', page = 1) => {
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

      setCurrentPage(data.page);
      setNextPage(data.page + 1 <= data.total_pages ? data.page+1 : data.page);
      setTotalPages(data.total_pages);

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
    }
  };


  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies();
  }, []);


  const renderPaginationButtons = () => {
    const prevPage = page - 1 > totalPages ? page - 1 : page;

    return (
      <>
        <PaginationBox isDisabled={false} onClick={() => handlePaginationClick(prevPage)}>{"<"}</PaginationBox>
        <PaginationBox isDisabled={false} onClick={()=>0}>{currentPage}</PaginationBox>
        <PaginationBox isDisabled={false} onClick={() => handlePaginationClick(nextPage)}>{nextPage}</PaginationBox>
        <PaginationBox isDisabled={true} onClick={()=>0}>...</PaginationBox>
        <PaginationBox isDisabled={true} onClick={()=>0}>{totalPages}</PaginationBox>
        <PaginationBox isDisabled={false} onClick={() => handlePaginationClick(nextPage)}>{">"}</PaginationBox>
      </>
    );
  };

  const handlePaginationClick = async (targetPage: number) => {
    console.log(targetPage);
    if (targetPage < 1 || targetPage > totalPages || targetPage === currentPage)
      return;
    // setCurrentPage(targetPage);

    await fetchMovies(debouncedSearchTerm, targetPage);
  };
  

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
          {renderPaginationButtons()}
        </section>


      </div>
    </main>
  );
}

export default App