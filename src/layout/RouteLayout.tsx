import { Outlet } from 'react-router-dom'

const RouteLayout = () => {
  return (
    <main>
      <div className="pattern" />

      <Outlet />

    </main>
  )
}

export default RouteLayout