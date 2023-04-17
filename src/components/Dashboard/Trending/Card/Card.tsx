import { Text, HStack, VStack, IconButton } from "@chakra-ui/react";

import React from "react";

import DefaultButton from "../../../Common/DefaultButton";

import { img_300, unavailable } from "../../../../config/config";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";

import ICardProps from "./CardProps";
import axios from "axios";

const Card = (props: ICardProps) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNjMDgxMzEwZWVkMzJkNjFkYmI4NmIiLCJ1c2VybmFtZSI6IkVsM29zOSIsImVtYWlsIjoiZWwzb3M5QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTY1NTgyNywiZXhwIjoxNjgzMzgzODI3fQ.9US1pRymeuHp4OVfqt25I7xRRrlYrWCObiU1rprAfJg";
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };

  const body = {
    name: props.name,
    desc: "Some description",
    pic: props.imgPath,
    rate: props.rating,
    movieId: String(props.id),
  };

  async function createRequest(token: string): Promise<any> {
    const res = await axios.post(
      "http://localhost:4000/users/643b32c2b1c4132890c6d8da/loved",
      body,
      config
    );
    console.log(res);
    return res;
  }

  function makeRequest() {
    createRequest(token);
  }
  return (
    <VStack p={5} shadow="md" borderWidth="1px" minWidth={300} maxWidth={400}>
      <img
        style={{ borderRadius: "5px" }}
        height={200}
        width={350}
        src={props.imgPath ? `${img_300}${props.imgPath}` : unavailable}
        alt="Movie picture"
      />
      <Text
        w={"100%"}
        fontSize="xl"
        fontFamily="Work sans"
        fontWeight={"bold"}
        noOfLines={1}
      >
        {props.name}
      </Text>
      <Text w={"100%"} fontSize="l" fontFamily="Work sans">
        Release date: {props.date}
      </Text>

      <Text w={"100%"} fontSize="s" fontFamily="Work sans">
        rating: {props.rating}
      </Text>
      <Text w={"100%"} fontSize="s" fontFamily="Work sans">
        votes: {props.votes}
      </Text>

      <HStack w={"100%"} bg="white" justifyContent={"left"}>
        <DefaultButton text={"Watch now!"} />
        <IconButton
          colorScheme="yellow"
          aria-label="Star"
          icon={<AiOutlineStar />}
        />
        <IconButton
          onClick={makeRequest}
          colorScheme="pink"
          aria-label="Heart"
          icon={<MdOutlineFavoriteBorder />}
        />
      </HStack>
    </VStack>
  );
};

export default Card;
