import Home from './pages/Home';
import RouterLayout from './layout/RouteLayout';
import NotFound from './components/NotFound';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import ShowMovie, { ShowMovieLoader } from './pages/ShowMovie';
import ErrorFallback from './components/ErrorFallback';



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RouterLayout />}>
        <Route index element={<Home />}/>
        <Route path='movie/:movieId' element={<ShowMovie />} loader={ShowMovieLoader} errorElement={<ErrorFallback />} />
        <Route path='*' element={<NotFound />}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  );

};

export default App;
