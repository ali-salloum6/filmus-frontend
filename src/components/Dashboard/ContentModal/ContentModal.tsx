import React from "react";

import IMovieData from "../../../interfaces/ApiSingleResponse";

import { img_500, unavailable } from "../../../config/config";

import styles from "./ContentModal.module.css";
import { Button, Box } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InfoIcon from "@material-ui/icons/Info";
import Carousel from "../Carousel/Carousel";
import { HStack, VStack, Text, Stack, Image } from "@chakra-ui/react";

interface IProps {
  data: IMovieData;
  id: string;
  video: string;
}
const ContentModal = (props: IProps) => {
  if (!props.data) return <p>Loading...</p>;

  return (
    <>
      {props.data && (
        <Box>
          <Stack w={"100%"} p={5} direction="row" spacing={5}>
            <Image
              src={
                props.data.poster_path
                  ? `${img_500}/${props.data.poster_path}`
                  : unavailable
              }
              alt={props.data.title}
              style={{ borderRadius: "15px" }}
              className={styles.dataModal__portrait}
            />
            <VStack>
              <Text
                w={"100%"}
                fontSize="xx-large"
                fontFamily="Work sans"
                fontWeight={"bold"}
              >
                {props.data.title} (
                {(props.data.release_date || "-----").substring(0, 4)})
              </Text>
              <Text
                w={"100%"}
                fontSize="x-large"
                fontStyle={"italic"}
                fontFamily="Work sans"
              >
                {props.data.tagline}
              </Text>
              <Text w={"100%"} fontFamily="Work sans">
                {props.data.overview}
              </Text>
              <HStack w={"100%"} justifyContent={"space-between"}>
                <HStack justifyContent={"space-between"}>
                  <Text fontFamily="Work sans" fontWeight={"bold"}>
                    Budjet:
                  </Text>
                  <Text fontFamily="Work sans">{props.data.budget}$ USD</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text fontFamily="Work sans" fontWeight={"bold"}>
                    Duration:
                  </Text>
                  <Text fontFamily="Work sans">{props.data.runtime} min</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text fontFamily="Work sans" fontWeight={"bold"}>
                    Country:
                  </Text>
                  <Text fontFamily="Work sans">
                    {" "}
                    {props.data.production_countries.length > 0
                      ? props.data.production_countries[0].name
                      : ""}
                  </Text>
                </HStack>
              </HStack>
              <Stack maxWidth={"750px"}>
                <Carousel id={props.id} />
              </Stack>
              <HStack w={"100%"} display="flex" justifyContent="space-between">
                <div className={styles.trailer_button}>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${props.video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>

                <div className={styles.imbd_button}>
                  <Button
                    variant="contained"
                    startIcon={<InfoIcon />}
                    color="primary"
                    target="__blank"
                    href={`https://www.imdb.com/title/${props.data.imdb_id}/`}
                  >
                    Check IMBD for more
                  </Button>
                </div>
              </HStack>
            </VStack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ContentModal;
