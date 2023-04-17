import { base_url } from "../../config/config";
import useFetch from "../../hooks/useFetch";

import Layout from "@/components/layout";
import { ReactElement } from "react";
import CardsList from "../../components/Dashboard/Trending/CardsList";
import IApiWholeRsponse from "../../interfaces/ApiWholeResponse";

const Movies = () => {
  const URL = `${base_url}/discover/movie?api_key=a500ed6497632b594464be767b4d390d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${1}`;

  const { data, error } = useFetch<IApiWholeRsponse>(URL);

  if (error) return <p>There is an error</p>;
  if (!data) return <p>Loading...</p>;
  console.log(data);
  return (
    <CardsList
      page={data.page}
      results={data.results}
      total_pages={data.total_pages}
      total_results={data.total_results}
    />
  );
};

Movies.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Movies;
