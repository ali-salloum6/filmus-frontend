import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const aboutPage = () => {
  const programmers = [
    {
      name: "John",
      description:
        "Passionate developer with a goal-driven mindset. Always looking for new ways to improve code quality and optimize performance.",
      image: "/john-avatar.png",
    },
    {
      name: "Sarah",
      description:
        "Detail-oriented programmer who values clean, well-documented code. Excited to work on challenging projects that require innovative solutions.",
      image: "/sarah-avatar.png",
    },
    {
      name: "Michael",
      description:
        "Experienced software engineer with a talent for problem-solving. Enjoys collaborating with others and learning new technologies.",
      image: "/michael-avatar.png",
    },
  ];

  return (
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
              boxSize="200px"
              objectFit="cover"
              borderRadius="full"
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
  );
};

export default aboutPage;
