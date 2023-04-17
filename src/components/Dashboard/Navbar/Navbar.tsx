import { Box, Text, Divider, Wrap, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import ProfileButton from "./ProfileButton";
import DefaultButton from "../../Common/DefaultButton";
import logo from "../../../assets/Filmus-Word-Logo.png";
import Link from "next/dist/client/link";
import Image from "next/image";

// TODO : set name, surname and proper profile picture to @ProfileButton

const Navbar = () => {
  return (
    <VStack w="100%">
      <HStack w="100%">
        <Box padding={5}>
          <Image
            width={175}
            height={175}
            src={"/Filmus-Word-Logo.png"}
            alt="Filmus logo"
          />
        </Box>
        <Wrap w="100%" spacing={4} justify="right" padding={5}>
          <Link href="/ ">
            <DefaultButton text={"Home"} />
          </Link>
          <Link href="/dashboard/movies">
            <DefaultButton text={"Movies"} />
          </Link>
          <Link href="/dashboard/personal">
            <DefaultButton text={"Personal"} />
          </Link>
          <ProfileButton
            name={"Vladimir"}
            surname={"Kalabukhov"}
            imageUrl="https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg"
          />
        </Wrap>
      </HStack>
      <Divider />
    </VStack>
  );
};

export default Navbar;
