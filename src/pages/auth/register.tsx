import Head from "next/head";
import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import ILoginResponse from "../../interfaces/LoginResponse";
import { BASE_URL } from "../../config/config";
import IRegisterData from "../../interfaces/RegisterData";
import { useRouter } from "next/router";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const body: IRegisterData = {
    email: email,
    username: userName,
    password: password,
    isAdmin: true,
  };
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post<ILoginResponse>(`${BASE_URL}/users`, body);
    router.replace("/auth/login");
  };

  return (
    <>
      <Head>
        <title>Register in Filmus</title>
        <meta
          name="description"
          content="Authentication page for Registering in to Filmus account"
        />
      </Head>
      <Box p={6} boxShadow="md" borderRadius="md" w="50%" m="auto" mt="20">
        <Heading mb={6}>Sign up</Heading>
        <form onSubmit={handleSignup}>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Sign up
            </Button>
          </Stack>
        </form>
        <Text mt={4} color={useColorModeValue("gray.600", "gray.300")}>
          Already have an account?{" "}
          <Link href="/auth/login">
            <Box as="span" color="blue.500">
              Login
            </Box>
          </Link>{" "}
          now.
        </Text>
      </Box>
    </>
  );
};

export default Signup;
