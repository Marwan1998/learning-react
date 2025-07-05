// types/index.ts
export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  original_language: string;
  poster_path: string;
}

export interface TrendingMovie {
  $id: string;
  title: string;
  poster_url: string;
}
