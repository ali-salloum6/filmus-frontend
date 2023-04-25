import Layout from "@/components/layout";
import { ReactElement, useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

import Navbar from "@/components/Dashboard/Navbar/Navbar";
import CardsList from "@/components/Dashboard/Trending/CardsList";
import { BASE_URL } from "@/config/config";
import useFetch from "@/hooks/useFetch";
import IApiWholeRsponse from "@/interfaces/ApiWholeResponse";
import { GetStaticProps } from "next/types";
import axios from "axios";
import CustomPagination from "@/components/Dashboard/Pagination/Pagination";
import { useRouter } from "next/router";
import Head from "next/head";

const Movies = ({ data }: { data: IApiWholeRsponse }) => {
  if (!data) return <p>Loading...</p>;
  return (
    <>
      <Head>
        <title>Movies - page {data.page}</title>
        <meta name="description" content="List of movies" />
      </Head>
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
        isPlanned={false}
        isWatched={false}
        isFavourite={false}
      />
      <CustomPagination curPage={data.page} numOfPages={100} />
    </>
  );
};

export async function getStaticPaths() {
  const ids: { params: { id: string } }[] = [];
  for (let i = 1; i <= 100; i++) {
    ids.push({ params: { id: String(i) } });
  }
  return {
    paths: ids,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{
  data: IApiWholeRsponse;
}> = async (context) => {
  const id = context.params?.id;
  const URL = `${BASE_URL}/imdb/movies/${id}`;
  const res = await axios.get<IApiWholeRsponse>(URL);
  const data = res.data;

  return {
    props: {
      data,
    },
  };
};

export default Movies;
