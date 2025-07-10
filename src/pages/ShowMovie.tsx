import { useEffect } from "react";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import { useSingleMovie } from "../hooks/useSingleMovie";
import type { Movie } from "../types/index";
import { Link, useParams } from "react-router-dom";

const ShowMovie = () => {

  const { movieId } = useParams();

  const {
    moviesList,
    isLoading,
    errorMessage,
    fetchMovie,
  } = useSingleMovie();


  useEffect(() => {
    fetchMovie();
    console.log(movieId);
    
  }, []);


  return (
    <div className="wrapper">

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

    </div>
  );
};

export default ShowMovie

