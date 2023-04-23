import {
  Icon,
  Text,
  HStack,
  VStack,
  IconButton,
  Box,
  Wrap,
  WrapItem,
  Flex,
  Button,
  Image,
} from "@chakra-ui/react";
import { MdStar, MdHowToVote } from "react-icons/md";
import React from "react";

import { BASE_URL, img_300, unavailable } from "../../../../config/config";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";

import ICardProps from "./CardProps";
import axios from "axios";
import Link from "next/link";

const Card = (props: ICardProps) => {
  const token = "";
  const userId = "";
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
      `${BASE_URL}/users/${userId}/loved`,
      body,
      config
    );
    return res;
  }

  async function addToWatch(): Promise<any> {
    const res = await axios.post(
      `${BASE_URL}/users/${userId}/to-watch`,
      body,
      config
    );
    return res;
  }

  async function addToWatched(): Promise<any> {
    const res = await axios.post(
      `${BASE_URL}/users/${userId}/watched`,
      body,
      config
    );
    return res;
  }
  return (
    <VStack p={5} shadow="md" borderWidth="1px" minWidth={300} maxWidth={400}>
      <Image
        style={{ borderRadius: "5px" }}
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

      <HStack w={"100%"} bg="white" justifyContent={"space-between"}>
        <Text fontSize="l" fontFamily="Work sans">
          Movie
        </Text>
        <Text fontSize="l" fontFamily="Work sans">
          {props.release_date}
        </Text>
      </HStack>

      <HStack w={"100%"} bg="white" justifyContent={"space-between"}>
        <HStack>
          <Text fontSize="l" fontFamily="Work sans">
            {props.vote_count}
          </Text>
          <Icon as={MdHowToVote} />
        </HStack>
        <HStack>
          <Text fontSize="l" fontFamily="Work sans">
            {Math.round(props.vote_average * 10) / 10}
          </Text>
          <Icon as={MdStar} />
        </HStack>
      </HStack>

      <HStack w={"100%"} bg="white" justifyContent={"left"}>
        <Wrap>
          <Box height={"100%"}>
            <Link href={"/dashboard/movie/" + props.id} className="media">
              <Button colorScheme={"teal"}>Details</Button>
            </Link>
          </Box>
          <WrapItem>
            <IconButton
              onClick={addToWatch}
              colorScheme="yellow"
              aria-label="Star"
              icon={<AiOutlineStar />}
            />
          </WrapItem>
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
        </Wrap>
      </HStack>
    </VStack>
  );
};

export default Card;
