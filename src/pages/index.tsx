import { Text } from "@chakra-ui/react";

import Navbar from "@/components/Dashboard/Navbar/Navbar";
import axios from "axios";
import type { GetServerSideProps, GetStaticProps } from "next/types";
import IApiWholeRsponse from "@/interfaces/ApiWholeResponse";
import { BASE_URL } from "@/config/config";
import CardsList from "@/components/Dashboard/Trending/CardsList";
export default function DashboardHome({ data }: { data: IApiWholeRsponse }) {
  const URL = `${BASE_URL}/imdb/trending/${1}`;
  console.log("Data: ", data);

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
}

// export async function getStaticPaths() {
//   const ids: { params: { id: string } }[] = [];
//   for (let i = 1; i <= 100; i++) {
//     ids.push({ params: { id: String(i) } });
//   }
//   return {
//     paths: ids,
//     fallback: false,
//   };
// }

export const getStaticProps: GetStaticProps<{
  data: IApiWholeRsponse;
}> = async (context) => {
  const id = context.params?.id;
  const URL = `${BASE_URL}/imdb/trending/${1}`;
  const res = await axios.get<IApiWholeRsponse>(URL);
  const data = res.data;
  console.log("Res: ", data);

  return {
    props: {
      data,
    },
  };
};
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const id = context.params?.id;
//   const URL = `${BASE_URL}/imdb/trending/${1}`;
//   const res = await axios.get<IApiWholeRsponse>(URL);
//   console.log("Res: ", res.data);

//   const data = res.data;

//   return {
//     props: {
//       Hello: "yo",
//     },
//   };
// };
