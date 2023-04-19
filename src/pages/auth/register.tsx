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

interface IProps {
  setToken: (userToken: { token: string }) => void;
  setUserId: (userId: { userId: string }) => void;
}

const Signup = (props: IProps) => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setConfirmPassword] = useState<string>("");

  const body: IRegisterData = {
    email: email,
    username: userName,
    password: password,
    isAdmin: true,
  };
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post<ILoginResponse>(`${BASE_URL}/users`, body);

    props.setToken({ token: res.data.access_token });
    props.setUserId({ userId: res.data._id });
  };

  return (
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
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Sign up
          </Button>
        </Stack>
      </form>
      <Text mt={4} color={useColorModeValue("gray.600", "gray.300")}>
        Already have an account?{" "}
        <Link href="/filmus/login">
          <Box as="span" color="blue.500">
            Login
          </Box>
        </Link>{" "}
        now.
      </Text>
    </Box>
  );
};

export default Signup;
