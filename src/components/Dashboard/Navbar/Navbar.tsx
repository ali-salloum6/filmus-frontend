import { Box, Text, Divider, Wrap, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import ProfileButton from "./ProfileButton";
import DefaultButton from "../../Common/DefaultButton";
import Link from "next/link";
import Image from "next/image";

// TODO : set name, surname and proper profile picture to @ProfileButton

const Navbar = () => {
  return (
    <VStack w="100%">
      <HStack w="100%">
        <Box padding={5}>
          <Image
            priority={true}
            width={175}
            height={175}
            src={"/Filmus-Word-Logo.png"}
            alt="Filmus logo"
          />
        </Box>
        <Wrap w="100%" spacing={4} justify="right" padding={5}>
          <Link href="/dashboard/home/1">
            <DefaultButton text={"Home"} />
          </Link>
          <Link href="/dashboard/movies/1">
            <DefaultButton text={"Movies"} />
          </Link>
          <Link href="/dashboard/personal">
            <DefaultButton text={"Personal"} />
          </Link>
          <Link href="/dashboard/add">
            <DefaultButton text={"Add"} />
          </Link>
          <ProfileButton
            name={"El3os"}
            surname={"Wa7ed"}
            imageUrl="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          />
        </Wrap>
      </HStack>
      <Divider />
    </VStack>
  );
};

export default Navbar;
