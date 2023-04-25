import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import IApiResponse from "../../../interfaces/ApiResponse";
import IApiWholeRsponse from "../../../interfaces/ApiWholeResponse";
import Card from "./Card/Card";
import ICardsListProps from "./ CardsListProps";

const CardsList = (responseData: ICardsListProps) => {
  const filteredResults = responseData.results.filter(
    (card) => card.title !== undefined && card.poster_path !== undefined
  );
  let cards = filteredResults.map((card) => (
    <Card
      key={card.id}
      id={card.id}
      poster_path={card.poster_path ? card.poster_path : null}
      overview={card.overview}
      title={card.title}
      release_date={card.release_date ? card.release_date : "Uknown"}
      vote_average={card.vote_average}
      vote_count={card.vote_count}
      isPlanned={responseData.isPlanned}
      isFavourite={responseData.isFavourite}
      isWatched={responseData.isWatched}
    />
  ));

  return (
    <VStack w="100%" justify={"left"}>
      <SimpleGrid w={"100%"} minChildWidth="300px" spacing="30px" padding={5}>
        {cards}
      </SimpleGrid>
    </VStack>
  );
};

export default CardsList;
