import { Text, HStack, VStack, IconButton } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import React from "react";

import DefaultButton from "../../../Common/DefaultButton";

import { img_300, unavailable } from "../../../../config/config";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import ICardProps from "./CardProps";
import axios from "axios";

const Card = (props: ICardProps) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNkZTZiMDc2MzE3MmZjNzQ0YjNjNGEiLCJ1c2VybmFtZSI6IkVsM29zOSIsImVtYWlsIjoiZWwzb3M5QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTc3ODM1MiwiZXhwIjoxNjgzNTA2MzUyfQ.ygELavC_JzmxpaBthg_JclRlZSL1G29ZnaArUbb5YTk";
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };

  const body = {
    title: props.title,
    overview: props.overview,
    poster_path: props.poster_path,
    vote_average: props.vote_average,
    id: props.id,
    vote_count: props.vote_count,
    release_date: props.release_date,
  };

  async function addToFavorite(): Promise<any> {
    const res = await axios.post(
      "http://localhost:4000/users/643ded806a29e80a19380b30/loved",
      body,
      config
    );
    return res;
  }

  async function addToWatch(): Promise<any> {
    const res = await axios.post(
      "http://localhost:4000/users/643ded806a29e80a19380b30/to-watch",
      body,
      config
    );
    return res;
  }

  async function addToWatched(): Promise<any> {
    const res = await axios.post(
      "http://localhost:4000/users/643ded806a29e80a19380b30/watched",
      body,
      config
    );
    return res;
  }

  return (
    <VStack p={5} shadow="md" borderWidth="1px" minWidth={300} maxWidth={400}>
      <Image
        style={{ borderRadius: "5px" }}
        height={350}
        width={350}
        src={props.poster_path ? `${img_300}${props.poster_path}` : unavailable}
        alt="Movie picture"
      />
      <Text
        w={"100%"}
        fontSize="xl"
        fontFamily="Work sans"
        fontWeight={"bold"}
        noOfLines={1}
      >
        {props.title}
      </Text>
      <Text w={"100%"} fontSize="l" fontFamily="Work sans">
        Release date: {props.release_date}
      </Text>

      <Text w={"100%"} fontSize="s" fontFamily="Work sans">
        rating: {props.vote_average}
      </Text>
      <Text w={"100%"} fontSize="s" fontFamily="Work sans">
        votes: {props.vote_count}
      </Text>

      <HStack w={"100%"} bg="white" justifyContent={"left"}>
        <DefaultButton text={"Watch now!"} />
        <IconButton
          onClick={addToWatch}
          colorScheme="yellow"
          aria-label="Star"
          icon={<AiOutlineStar />}
        />
        <IconButton
          onClick={addToFavorite}
          colorScheme="pink"
          aria-label="Heart"
          icon={<MdOutlineFavoriteBorder />}
        />
        <IconButton
          onClick={addToWatched}
          colorScheme="green"
          aria-label="File"
          icon={<FaRegSave />}
        />
      </HStack>
    </VStack>
  );
};

export default Card;
