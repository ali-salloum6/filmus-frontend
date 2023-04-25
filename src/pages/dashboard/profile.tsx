import React, { FormEvent, useState } from "react";
import {
  HStack,
  Image,
  Text,
  VStack,
  Stack,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import Navbar from "@/components/Dashboard/Navbar/Navbar";
import Head from "next/head";
import { useSession } from "next-auth/react";
import IUpdatedUser from "@/interfaces/UpdatedUser";
import { BASE_URL } from "@/config/config";
import axios from "axios";
import { Session } from "next-auth";

const Profile = () => {
  const { data: session } = useSession();

  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [userNameError, setUserNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const validateEmail = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateUserName = () => {
    if (userName.length < 4) {
      setUserNameError("Username must be at least 4 characters long");
      return false;
    }
    setUserNameError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isUserNameValid = validateUserName();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isUserNameValid && isPasswordValid) {
      let sessionUser: ILoginResponse = session?.user as ILoginResponse;
      let newUser: IUpdatedUser = { ...sessionUser, password };

      const config = {
        headers: { authorization: `Bearer ${sessionUser.access_token}` },
      };

      newUser.email = email;
      newUser.username = userName;
      const res = await axios.put<ILoginResponse>(
        `${BASE_URL}/users/${session?.user._id}`,
        newUser,
        config
      );
      window.location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>Update your profile</title>
        <meta
          name="description"
          content="Update your profile details like email, username, and password"
        />
      </Head>
      <Navbar />
      <HStack
        boxShadow="md"
        borderRadius="md"
        w="50%"
        m="auto"
        mt="28"
        mb="10"
        p={5}
        spacing={5}
      >
        <Image
          boxSize="250px"
          objectFit="cover"
          borderRadius="15px"
          src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          alt={userName}
        />
        <VStack>
          <Text
            w={"100%"}
            fontSize="xx-large"
            fontFamily="Work sans"
            fontWeight={"bold"}
          >
            Hello, {userName}!
          </Text>
          <form style={{ width: "100%" }} onSubmit={handleSave}>
            <Stack w={"100%"} spacing={3}>
              <FormControl isInvalid={!!emailError}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder={session?.user.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                />
                <FormErrorMessage>{emailError}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!userNameError}>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder={session?.user.username}
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={validateUserName}
                />
                <FormErrorMessage>{userNameError}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!passwordError}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onBlur={validatePassword}
                />
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Save
              </Button>
            </Stack>
          </form>
        </VStack>
      </HStack>
    </>
  );
};

export default Profile;
