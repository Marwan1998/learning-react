// types/index.ts
export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  original_language: string;
  poster_path: string;
  //
  original_title: string;
  vote_count: number;
  adult: boolean;
  budget: number;
  homepage: string;
  revenue: number;
  runtime: number;
  status: string;
  overview: string;
}

export interface TrendingMovie {
  $id: string;
  title: string;
  poster_url: string;
}
