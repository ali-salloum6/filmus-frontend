import Layout from "@/components/layout";
import { ReactElement } from "react";
import { Box, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Dashboard/Navbar/Navbar";

// TODO : set proper profile data

const Profile = () => {
  return (
    <VStack w="100%" justify={"left"}>
      <Text
        w={"100%"}
        fontSize="2xl"
        fontFamily="Work sans"
        paddingLeft={5}
        justifyItems={"left"}
      >
        Profile
      </Text>
      <Text
        w={"100%"}
        fontSize="l"
        fontFamily="Work sans"
        paddingLeft={5}
        justifyItems={"left"}
      >
        Some data
      </Text>
    </VStack>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
