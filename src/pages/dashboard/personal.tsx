// import useSWR from "swr";
// import Layout from "@/components/layout";
// import { ReactElement, useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

import Navbar from "@/components/Dashboard/Navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Text, VStack } from "@chakra-ui/react";
import CardsList from "@/components/Dashboard/Trending/CardsList";
import IApiResponse from "@/interfaces/ApiResponse";
import { BASE_URL } from "@/config/config";
// import axios from "axios";
// import { decode } from "next-auth/jwt";

// export default function Personal() {
//   // const { data: session } = useSession();
//   // const userData: ILoginResponse = session?.user as ILoginResponse;
//   // const [movieData, setData] = useState(null);
//   // const [isLoading, setLoading] = useState(false);

//   // console.log("userData: ", userData);

//   // useEffect(() => {
//   //   setLoading(true);
//   //   if (userData) {
//   //     fetch(`/api/${userData._id}/loved/3/movie`, {
//   //       method: "GET",
//   //       headers: {
//   //         authorization: "Bearer " + userData.token,
//   //       },
//   //     })
//   //       .then((res) => res.json())
//   //       .then((movieData) => {
//   //         setData(movieData);
//   //         setLoading(false);
//   //       });
//   //   }
//   // }, []);

//   return <div>personal</div>;
// }
// Personal.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

// export async function getServerSideProps(context: {
//   req: { cookies: { [x: string]: any } };
// }) {
//   console.log("Token: ", context.req.cookies["next-auth.session-token"]);

//   return {
//     props: { message: `Next.js is awesome` },
//   };
// }

export default function Personal() {
  const [loved, setLoved] = useState<IApiResponse[]>([]);
  const [watched, setWatched] = useState<IApiResponse[]>([]);
  const [toWatch, setToWatch] = useState<IApiResponse[]>([]);
  const [isLoading, setLoading] = useState(false);

  const userId = "643ded806a29e80a19380b30";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNkZWQ4MDZhMjllODBhMTkzODBiMzAiLCJ1c2VybmFtZSI6IkVsM29zMTAiLCJlbWFpbCI6ImVsM29zMTBAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjgxOTE2OTU5LCJleHAiOjE2ODM2NDQ5NTl9.czBeNzhjNTT_YTSabtQdQET-pjBRjGIClJWq62to7H0";
  useEffect(() => {
    setLoading(true);
    axios
      .get<IApiResponse[]>(`${BASE_URL}/users/${userId}/loved`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setLoved(res.data))
      .catch((err) => console.log("Error: ", err));

    axios
      .get<IApiResponse[]>(`${BASE_URL}/users/${userId}/watched`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setWatched(res.data))
      .catch((err) => console.log("Error: ", err));
    axios
      .get<IApiResponse[]>(`${BASE_URL}/users/${userId}/to-watch`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setToWatch(res.data))
      .catch((err) => console.log("Error: ", err));
  }, []);

  return (
    <>
      <VStack w="100%" justify={"left"}>
        <Navbar />
        <Text
          w={"100%"}
          fontSize="2xl"
          fontFamily="Work sans"
          paddingLeft={5}
          justifyItems={"left"}
        >
          Favourite
        </Text>
        <CardsList
          page={1}
          results={loved}
          total_pages={0}
          total_results={0}
          page_name={""}
        />
        <Text
          w={"100%"}
          fontSize="2xl"
          fontFamily="Work sans"
          paddingLeft={5}
          justifyItems={"left"}
        >
          To Watch
        </Text>
        <CardsList
          page={1}
          results={toWatch}
          total_pages={0}
          total_results={0}
          page_name={""}
        />
        <Text
          w={"100%"}
          fontSize="2xl"
          fontFamily="Work sans"
          paddingLeft={5}
          justifyItems={"left"}
        >
          Watched
        </Text>
        <CardsList
          page={1}
          results={watched}
          total_pages={0}
          total_results={0}
          page_name={""}
        />
      </VStack>
    </>
  );
}
