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

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNkZTZiMDc2MzE3MmZjNzQ0YjNjNGEiLCJ1c2VybmFtZSI6IkVsM29zOSIsImVtYWlsIjoiZWwzb3M5QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTc3ODM1MiwiZXhwIjoxNjgzNTA2MzUyfQ.ygELavC_JzmxpaBthg_JclRlZSL1G29ZnaArUbb5YTk";
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get<IApiResponse[]>(
        "http://localhost:4000/users/643ded806a29e80a19380b30/loved",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setLoved(res.data))
      .catch((err) => console.log("Error: ", err));

    axios
      .get<IApiResponse[]>(
        "http://localhost:4000/users/643ded806a29e80a19380b30/watched",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setWatched(res.data))
      .catch((err) => console.log("Error: ", err));
    axios
      .get<IApiResponse[]>(
        "http://localhost:4000/users/643ded806a29e80a19380b30/to-watch",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
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
