import Home from './pages/Home';
import RouterLayout from './layout/RouteLayout';
import NotFound from './components/NotFound';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import ShowMovie from './pages/ShowMovie';



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RouterLayout />}>
        <Route index element={<Home />}/>
        {/* <Route path='movie/:movieId' element={<ShowMovie />} /> */}

        <Route path='movie/:movieId' element={<ShowMovie />} />

        <Route path='*' element={<NotFound />}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  );

};

export default App;
