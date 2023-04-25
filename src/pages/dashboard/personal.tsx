import Navbar from "@/components/Dashboard/Navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Text, VStack } from "@chakra-ui/react";
import CardsList from "@/components/Dashboard/Trending/CardsList";
import IApiResponse from "@/interfaces/ApiResponse";
import { BASE_URL } from "@/config/config";
import { getSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { Session, getServerSession } from "next-auth";
import Head from "next/head";

interface IProps {
  loved: IApiResponse[];
  watched: IApiResponse[];
  toWatch: IApiResponse[];
  session: Session | null;
}
export default function Personal(props: IProps) {
  return (
    <>
      <Head>
        <title>Your Movies</title>
        <meta
          name="description"
          content="Here the personal movies list can be found, like Watched, To be watched, or favorites."
        />
      </Head>
      <Navbar />
      <VStack w="100%" justify={"left"}>
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
          results={props.loved}
          total_pages={0}
          total_results={0}
          page_name={""}
          isPlanned={false}
          isWatched={false}
          isFavourite={true}
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
          results={props.toWatch}
          total_pages={0}
          total_results={0}
          page_name={""}
          isPlanned={true}
          isWatched={false}
          isFavourite={false}
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
          results={props.watched}
          total_pages={0}
          total_results={0}
          page_name={""}
          isPlanned={false}
          isWatched={true}
          isFavourite={false}
        />
      </VStack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const session = await getSession(context);

  const userId = session?.user._id;
  const token = session?.user.access_token;

  const lovedRes = await axios.get<IApiResponse[]>(
    `${BASE_URL}/users/${userId}/loved`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  const loved = lovedRes.data;

  const watchedRes = await axios.get<IApiResponse[]>(
    `${BASE_URL}/users/${userId}/watched`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  const watched = watchedRes.data;

  const toWatchRes = await axios.get<IApiResponse[]>(
    `${BASE_URL}/users/${userId}/to-watch`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  const toWatch = toWatchRes.data;

  return {
    props: {
      loved,
      watched,
      toWatch,
      session,
    },
  };
};
