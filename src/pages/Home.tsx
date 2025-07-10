import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { useMovies } from "../hooks/useMovies";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import type { Movie } from "../types/index";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  const nagivate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  const {
    moviesList,
    isLoading,
    errorMessage,
    currentPage,
    totalPages,
    fetchMovies,
  } = useMovies();
  const { trendingMoviesList, isLoading: trendingLoading } = useTrendingMovies();

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) fetchMovies(debouncedSearchTerm, page);
  };

  return (
    <div className="wrapper">
      <header>
        <img src="/hero.png" alt="hero" />
        <h1>
          Find <span className="text-gradient">Movies</span> You'll Enjoy and
          spend time on!
        </h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      {!trendingLoading && trendingMoviesList.length > 0 && (
        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
            {trendingMoviesList.map((movie, index) => (
              <li key={movie.$id} onClick={() => nagivate('/about')}>
                <p className="mr-3">{index + 1}</p>
                <img
                  src={movie.poster_url || "/no-movie.png"}
                  alt={movie.title}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="all-movies">
        <h2>All Movies</h2>

        {isLoading && <Spinner />}

        {!isLoading && errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && (
          <ul>
            {moviesList.map((movie: Movie) => (
              <Link to={'movie/' + movie.id.toString()} key={movie.id}>
                <MovieCard key={movie.id} movie={movie} />
              </Link>
            ))}
          </ul>
        )}
      </section>

      <section className="pagination pt-10 flex">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default Home

