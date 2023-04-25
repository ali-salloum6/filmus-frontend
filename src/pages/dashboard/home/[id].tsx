import { Text } from "@chakra-ui/react";

import Navbar from "@/components/Dashboard/Navbar/Navbar";
import axios from "axios";
import type { GetServerSideProps, GetStaticProps } from "next/types";
import IApiWholeRsponse from "@/interfaces/ApiWholeResponse";
import { BASE_URL } from "@/config/config";
import CardsList from "@/components/Dashboard/Trending/CardsList";
import CustomPagination from "@/components/Dashboard/Pagination/Pagination";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import Head from "next/head";

export default function Page({ data }: { data: IApiWholeRsponse }) {
    if (!data) return <p>Loading...</p>;

    return (
        <>
            <Head>
                <title>Home - Filmus</title>
                <meta property="og:title" content="Home - Filmus" key="title" />
            </Head>
            <Navbar />
            <Text
                w={"100%"}
                fontSize="2xl"
                fontFamily="Work sans"
                paddingLeft={5}
                justifyItems={"left"}
            >
                Trending This week
            </Text>
            <CardsList
                page={data.page}
                results={data.results}
                total_pages={data.total_pages}
                total_results={data.total_results}
                page_name={""}
                isPlanned={false}
                isWatched={false}
                isFavourite={false}
            />
            <CustomPagination curPage={data.page} numOfPages={100} />
        </>
    );
}

export async function getStaticPaths() {
    const ids: { params: { id: string } }[] = [];
    for (let i = 1; i <= 100; i++) {
        ids.push({ params: { id: String(i) } });
    }
    return {
        paths: ids,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<{
    data: IApiWholeRsponse;
}> = async (context) => {
    const id = context.params?.id;
    const URL = `${BASE_URL}/imdb/trending/${id}`;
    const res = await axios.get<IApiWholeRsponse>(URL);
    const data = res.data;

    return {
        props: {
            data,
        },
    };
};
