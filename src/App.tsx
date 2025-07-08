import Home from './pages/Home';
import RouterLayout from './layout/RouteLayout';
import AboutLayout from './layout/AboutLayout';

import Button from './components/Button';
import NotFound from './components/NotFound';

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import JobsLayout from './layout/JobsLayout';
import Jobs, { JobsLoader } from './pages/Jobs';
import ShowMovie from './pages/ShowMovie';



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RouterLayout />}>
        <Route index element={<Home />}/>
        <Route path='movie/:movieId' element={<ShowMovie />}/>
        <Route path="about" element={<AboutLayout />}> {/* Multi route section (Nested) */}
          <Route path='spinner' element={<Button />}/>
        </Route>
        <Route path='jobs' element={<JobsLayout />}>
          <Route index element={<Jobs />} loader={JobsLoader}/>
        </Route>
        <Route path='*' element={<NotFound />}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  );

};

export default App;
