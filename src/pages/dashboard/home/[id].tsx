import { BASE_URL } from "../../../config/config";
import useFetch from "../../../hooks/useFetch";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import { ReactElement } from "react";
import CardsList from "../../../components/Dashboard/Trending/CardsList";
import IApiWholeRsponse from "../../../interfaces/ApiWholeResponse";
import { Text } from "@chakra-ui/react";

import Navbar from "@/components/Dashboard/Navbar/Navbar";
import axios from "axios";
import type { GetServerSideProps, GetStaticProps } from "next/types";
const DashboardHome = ({ data }: { data: IApiWholeRsponse }) => {
  const URL = `${BASE_URL}/imdb/trending/${1}`;
  console.log("Here");

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

export default DashboardHome;

// export const getServerSideProps: GetServerSideProps<{
//   temp: IApiWholeRsponse;
// }> = async (context) => {
//   console.log("Here");

//   // const page = context.query.page;
//   // const URL = `${BASE_URL}/imdb/trending/${1}`;
//   // const res = await axios.get<IApiWholeRsponse>(URL);
//   // const data = res.data;
//   const temp: IApiWholeRsponse = {
//     page_name: "",
//     page: 0,
//     results: [],
//     total_pages: 0,
//     total_results: 0,
//   };
//   return {
//     props: { temp },
//   };
// };

export async function getStaticPaths() {
  const ids: { params: { id: number } }[] = [];
  for (let i = 1; i <= 100; i++) {
    ids.push({ params: { id: i } });
  }
  return {
    paths: ids,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const URL = `${BASE_URL}/imdb/trending/${1}`;
  const res = await axios.get<IApiWholeRsponse>(URL);
  const data = res.data;
  return {
    props: {
      data,
    },
  };
};
