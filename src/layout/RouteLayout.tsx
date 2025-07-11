import { Outlet, useRouteError, isRouteErrorResponse } from 'react-router-dom'

const RouteLayout = () => {

  const error = useRouteError();
  const hasError = isRouteErrorResponse(error) || error instanceof Error;

  console.log(hasError);
  

  return (
    <main>
      {!hasError && <div className="pattern" />}
        <Outlet />
    </main>
  )
}

export default RouteLayout