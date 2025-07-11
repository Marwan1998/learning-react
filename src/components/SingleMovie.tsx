import type { Movie } from "../types";

interface Props {
  movie: Movie;
}

const SingleMovie = ({ movie } : Props) => {

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-semibold text-white-900 sm:text-3xl mb-8">
                {movie.original_title}
              </h2>
              <div className="flow-root">
                <dl className="-my-3 divide-y divide-gray-200 rounded border border-gray-200 text-sm dark:divide-gray-700 dark:border-gray-800">
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900 dark:text-white">
                      Title
                    </dt>

                    <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                      {movie.original_title && movie.title}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900 dark:text-white">
                      Vote
                    </dt>

                    <dd className="text-gray-700 sm:col-span-2 dark:text-amber-300">
                      {movie.vote_average} | ({movie.vote_count} votes)
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900 dark:text-white">
                      Adult?
                    </dt>

                    <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                      {movie.adult ? "Yes 😀" : "No 😔"}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900 dark:text-white">
                      budget
                    </dt>

                    <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                      {movie.budget}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900 dark:text-white">
                      Original Language
                    </dt>

                    <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                      {movie.original_language}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900 dark:text-white">
                      Homepage
                    </dt>

                    <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                      <a href={movie.homepage}>Homepage</a>
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900 dark:text-white">
                      Revenue
                    </dt>

                    <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                      {movie.revenue}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900 dark:text-white">
                      Runtime
                    </dt>

                    <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                      {movie.runtime}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900 dark:text-white">
                      status
                    </dt>

                    <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                      {movie.status}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900 dark:text-white">
                      Story
                    </dt>

                    <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                      {movie.overview}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div>
            <img
              src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
              className="rounded"
              alt={movie.poster_path}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
