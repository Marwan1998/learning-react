import About from './pages/About';
import Home from './pages/Home';
import RouterLayout from './layout/RouteLayout';
import AboutLayout from './layout/AboutLayout';

import Button from './components/Button';
import NotFound from './components/NotFound';

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RouterLayout />}>
        <Route index element={<Home />}/>
        <Route path="about" element={<AboutLayout />}> {/* Multi route section (Nested) */}
          <Route path='spinner' element={<Button />}/>
        </Route>
        <Route path='*' element={<NotFound />}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
    // <div>
    //   <div>
    //     <ul>
    //       <Link to='/about'><li className='text-8xl text-white'>Click me</li></Link>
    //     </ul>
    //   </div>
    //   <Routes>
    //     <Route path="/" element={<Home />}/>
    //     <Route path="/about" element={<About />}/>
    //   </Routes>
    // </div>
  );

};

export default App;
