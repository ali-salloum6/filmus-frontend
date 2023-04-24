import {
  Icon,
  Text,
  HStack,
  VStack,
  IconButton,
  Box,
  Wrap,
  WrapItem,
  Button,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { MdStar, MdHowToVote } from "react-icons/md";
import React, { useState } from "react";

import { BASE_URL, img_300, unavailable } from "../../../../config/config";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";

import ICardProps from "./CardProps";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MovieHandlerModal from "../../Modals/MovieHandlerModal";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const Card = (props: ICardProps) => {
  const { data: session } = useSession();
  const token = session?.user.access_token;
  const userId = session?.user._id;
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const toast = useToast();

  const [type, setType] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const body = {
    title: props.title,
    overview: props.overview,
    poster_path: props.poster_path,
    vote_average: props.vote_average,
    id: props.id,
    vote_count: props.vote_count,
    release_date: props.release_date,
  };

  async function exists(type: string, id: number): Promise<boolean> {
    try {
      let movieData = await axios.get(
        `${BASE_URL}/users/${userId}/${type}/${String(id)}`,
        config
      );
      if (movieData.data) return true;
      return false;
    } catch (err) {
      return false;
    }
  }

  async function addToFavorite(): Promise<any> {
    if (await exists("loved", props.id)) setIsSaved(true);
    else setIsSaved(false);
    setType("Favourite");
    onOpen();
    if (isSaved) return;
    const res = await axios.post(
      `${BASE_URL}/users/${userId}/loved`,
      body,
      config
    );

    return res;
  }

  async function addToWatch(): Promise<any> {
    if (await exists("to-watch", props.id)) setIsSaved(true);
    else setIsSaved(false);
    setType("To Watch");
    onOpen();
    const res = await axios.post(
      `${BASE_URL}/users/${userId}/to-watch`,
      body,
      config
    );
  }

  async function addToWatched(): Promise<any> {
    if (await exists("watched", props.id)) setIsSaved(true);
    else setIsSaved(false);
    setType("Watched");
    onOpen();
    const res = await axios.post(
      `${BASE_URL}/users/${userId}/watched`,
      body,
      config
    );

    return res;
  }

  async function deleteMovie(): Promise<void> {
    let type: string;
    if (props.isFavourite) type = "loved";
    else if (props.isWatched) type = "watched";
    else type = "to-watch";
    await axios.delete(
      `${BASE_URL}/users/${userId}/${type}/${props.id}`,
      config
    );
    router.replace("/dashboard/personal");
    toast({
      title: "Movie deleted.",
      description: "We've deleted the movie for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }
  return (
    <>
      <VStack p={5} shadow="md" borderWidth="1px" minWidth={300} maxWidth={400}>
        <Image
          style={{ borderRadius: "5px" }}
          src={
            props.poster_path ? `${img_300}${props.poster_path}` : unavailable
          }
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
        {props.isFavourite || props.isWatched || props.isPlanned ? (
          <Button colorScheme={"teal"} onClick={deleteMovie}>
            Delete
          </Button>
        ) : (
          <>
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
            <MovieHandlerModal
              isOpen={isOpen}
              type={type}
              isSaved={isSaved}
              onOpen={onOpen}
              onClose={onClose}
            />
          </>
        )}
      </VStack>
    </>
  );
};

export default Card;
