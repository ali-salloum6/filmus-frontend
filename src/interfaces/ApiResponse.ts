export default interface IApiResponse extends IMovieResponse {
  genre_ids: number[];
  original_title: string;
  original_language: string;
  backdrop_path: string | null;
  popularity: number;
  video: boolean;
}
