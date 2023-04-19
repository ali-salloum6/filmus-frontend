import {
  Button,
  Image,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
  Link,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

interface IProps {
  imageUrl: string;
  name: string;
  surname: string;
}

const ProfileButton = (props: IProps) => {
  return (
    <Menu>
      <MenuButton as={Button} colorScheme="none" size="sm">
        <Image
          borderRadius="full"
          boxSize="45px"
          src={props.imageUrl}
          alt="Profile picture"
        />
      </MenuButton>
      <MenuList>
        <Link href="/dashboard/profile">
          <MenuItem>Profile</MenuItem>
        </Link>
        <MenuItem onClick={() => signIn()}>Login</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileButton;
