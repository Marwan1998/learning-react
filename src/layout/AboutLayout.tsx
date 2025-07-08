import { Outlet } from "react-router-dom"
import About from '../pages/About';

const AboutLayout = () => {
  return (
    <div>
        <About />
        <Outlet />
    </div>
  )
}

export default AboutLayout