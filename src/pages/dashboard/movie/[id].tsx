import ContentModal from "@/components/Dashboard/ContentModal/ContentModal";
import { BASE_URL } from "@/config/config";
import IMovieData from "@/interfaces/ApiSingleResponse";
import IVideoData from "@/interfaces/ApiVideoResponse";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

interface IProps {
  data: IMovieData;
  video_key: string;
  id: string;
}
const Movie = (props: IProps) => {
  return (
    <>
      <Head>
        <title>{props.data.title}</title>
        <meta
          name="description"
          content={props.data.overview || "movie description"}
        />
      </Head>
      <ContentModal data={props.data} id={props.id} video={props.video_key} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  let id = context.params?.id;
  id = String(id);
  const URL = `${BASE_URL}/imdb/movie/${id}`;

  const res = await axios.get<IMovieData>(URL);
  const data = res.data;

  const VIDEO_URL = `${BASE_URL}/imdb/videos/${id}`;
  const videos = await axios.get<IVideoData>(VIDEO_URL);

  let video_key = videos.data.results[0].key;

  return {
    props: {
      data,
      video_key,
      id,
    },
  };
};
export default Movie;
