import { BASE_URL } from "../config/config";
import useFetch from "../hooks/useFetch";
import IApiWholeRsponse from "../interfaces/ApiWholeResponse";

const fetchImdb = (
  type: string,
  page: number
): { data: IApiWholeRsponse; error: Error } => {
  const URL = `${BASE_URL}/imdb/${type}/${page}`;
  const { data, error } = useFetch<IApiWholeRsponse>(URL);
  return { data, error };
};

export default fetchImdb;
