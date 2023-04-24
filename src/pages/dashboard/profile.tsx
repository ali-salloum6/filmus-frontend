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
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL, unavailable, img_500 } from "../../config/config";
import useFetch from "../../hooks/useFetch";
import ILoginResponse from "../../interfaces/LoginResponse";
import IRegisterData from "../../interfaces/RegisterData";

import IUpdatedUser from "../../interfaces/UpdatedUser";

const Profile = () => {
  // const URL = `${BASE_URL}/users/${userId}`;

  // const [email, setEmail] = useState<string>(email_);
  // const [userName, setUserName] = useState<string>(username);
  // const [password, setPassword] = useState<string>(username);

  // const config = {
  //   headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  // };

  // const handleSave = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   let newUser: ILoginResponse = JSON.parse(localStorage.getItem("user"));
  //   console.log(userName);

  //   newUser.email = email;
  //   newUser.username = userName;
  //   console.log(newUser);
  //   let updatedUser: IUpdatedUser = { ...newUser, password };
  //   const res = await axios.put<ILoginResponse>(URL, updatedUser, config);
  //   localStorage.setItem("email", email);
  //   localStorage.setItem("userName", userName);
  //   console.log("Here");

  //   window.location.reload();
  // };

  // return (
  //   <HStack
  //     boxShadow="md"
  //     borderRadius="md"
  //     w="50%"
  //     m="auto"
  //     mt="28"
  //     p={5}
  //     spacing={5}
  //   >
  //     <Image
  //       boxSize="250px"
  //       objectFit="cover"
  //       borderRadius="15px"
  //       src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  //       alt={userName}
  //     />
  //     <VStack>
  //       <Text
  //         w={"100%"}
  //         fontSize="xx-large"
  //         fontFamily="Work sans"
  //         fontWeight={"bold"}
  //       >
  //         Hello, {userName}!
  //       </Text>
  //       <form style={{ width: "100%" }} onSubmit={handleSave}>
  //         <Stack w={"100%"} spacing={3}>
  //           <FormControl>
  //             <FormLabel>Email address</FormLabel>
  //             <Input
  //               type="email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //             />
  //           </FormControl>
  //           <FormControl>
  //             <FormLabel>Username</FormLabel>
  //             <Input
  //               type="username"
  //               value={userName}
  //               onChange={(e) => setUserName(e.target.value)}
  //             />
  //           </FormControl>
  //           <FormControl>
  //             <FormLabel>Password</FormLabel>
  //             <Input
  //               type="password"
  //               placeholder="Enter new password"
  //               onChange={(e) => {
  //                 setPassword(e.target.value);
  //               }}
  //             />
  //           </FormControl>
  //           <Button type="submit" colorScheme="teal">
  //             Save
  //           </Button>
  //         </Stack>
  //       </form>
  //     </VStack>
  //   </HStack>
  // );
  return <div>profile</div>;
};

export default Profile;
