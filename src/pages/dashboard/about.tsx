import Navbar from "@/components/Dashboard/Navbar/Navbar";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

const aboutPage = () => {
  const programmers = [
    // {
    //   name: "Ali",
    //   description: "مبمرج",
    //   image: "/ali.png",
    // },
    {
      name: "Asem Abdelhady",
      description: "Software engineer",
      image: "/el3os.png",
    },
    // {
    //   name: "Hadi",
    //   description: "زعيم البلوكتشين",
    //   image: "/hadi.png",
    // },
  ];

  return (
    <>
      <Head>
        <title>About - Filmus</title>
        <meta name="description" content="About the team behind Filmus" />
      </Head>
      <Navbar />
      <Flex direction="column" align="center" justify="center" h="100vh">
        <Box mb={8}>
          <Text fontSize="3xl" fontWeight="bold">
            Our Team
          </Text>
        </Box>
        <Flex justify="space-around" w="80%">
          {programmers.map((programmer) => (
            <Box key={programmer.name} textAlign="center">
              <Image
                src={programmer.image}
                boxSize="300px"
                objectFit="cover"
                borderRadius="5%"
                alt={`${programmer.name} avatar`}
              />
              <Box mt={4}>
                <Text fontSize="2xl" fontWeight="bold">
                  {programmer.name}
                </Text>
                <Text mt={2}>{programmer.description}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default aboutPage;
