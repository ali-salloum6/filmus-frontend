interface ILoginResponse {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  access_token: string;
}

interface IMovieResponse {
  _id: string;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  id: number;
  vote_count: number;
  release_date: string;
}
