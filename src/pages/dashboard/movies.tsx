import { BASE_URL } from "../../config/config";
import useFetch from "../../hooks/useFetch";

import Layout from "@/components/layout";
import { ReactElement } from "react";
import CardsList from "../../components/Dashboard/Trending/CardsList";
import IApiWholeRsponse from "../../interfaces/ApiWholeResponse";
import { Text } from "@chakra-ui/react";

import Navbar from "@/components/Dashboard/Navbar/Navbar";

const Movies = () => {
  const URL = `${BASE_URL}/discover/movie?api_key=a500ed6497632b594464be767b4d390d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${1}`;

  const { data, error } = useFetch<IApiWholeRsponse>(URL);

  if (error) return <p>There is an error</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <>
      <Navbar />
      <Text
        w={"100%"}
        fontSize="2xl"
        fontFamily="Work sans"
        paddingLeft={5}
        justifyItems={"left"}
      >
        Trending This week
      </Text>
      <CardsList
        page={data.page}
        results={data.results}
        total_pages={data.total_pages}
        total_results={data.total_results}
        page_name={""}
      />
    </>
  );
};

export default Movies;
