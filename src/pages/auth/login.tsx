import Head from "next/head";
import React, { useState } from "react";
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
import { signIn } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/dashboard/home/1",
    });
  };

  return (
    <>
      <Head>
        <title>Login to Filmus</title>
        <meta
          name="description"
          content="Authentication page for logging in to Filmus account"
        />
      </Head>
      <Box p={6} boxShadow="md" borderRadius="md" w="50%" m="auto" mt="28">
        <Heading mb={6}>Login</Heading>
        <form onSubmit={handleLogin}>
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
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Login
            </Button>
          </Stack>
        </form>
        <Text mt={4} color={useColorModeValue("gray.600", "gray.300")}>
          {"Don't have an account? "}
          <Link href="/auth/register">
            <Box as="span" color="blue.500">
              Sign up
            </Box>
          </Link>{" "}
          now.
        </Text>
      </Box>
    </>
  );
};

export default Login;
