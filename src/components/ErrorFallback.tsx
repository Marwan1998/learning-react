// components/ErrorFallback.tsx
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorFallback = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="text-red-500">
        <h2 className='text-white'>Error {error.status}</h2>
        <p>{error.statusText}</p>
      </div>
    );
  }

  return (
    <div className="text-red-500">
      <h1>Error</h1>
      <h2 className='text-white'>Unexpected Error</h2>
      <p>{(error as Error).message}</p>
    </div>
  );
};

export default ErrorFallback;
