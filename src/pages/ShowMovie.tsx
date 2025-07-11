import { useLoaderData, type LoaderFunctionArgs} from "react-router-dom";
import { fetchMovieById } from '../apis/showMovie';
import SingleMovie from "../components/SingleMovie";

const ShowMovie = () => {
  const movie = useLoaderData();
  
  console.log(movie);
  

  return (
    <div className="wrapper">

      <SingleMovie movie={movie}/>

    </div>
  );
};

export default ShowMovie;

export const ShowMovieLoader = async ({ params }: LoaderFunctionArgs) => {

  const { movieId } = params;
  if (!movieId) throw new Error('Movie ID is missing');

  const movie = await fetchMovieById(movieId);
  return movie;
};
