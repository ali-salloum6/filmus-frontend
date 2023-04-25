import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { BASE_URL } from "@/config/config";
import axios from "axios";
import { IMovieData } from "@/interfaces/ApiResponse";
import { useRouter } from "next/router";
import Navbar from "@/components/Dashboard/Navbar/Navbar";
import Head from "next/head";

interface AddMovieFormData {
  name: string;
  picture: string;
  rating: number;
  releaseDate: string;
  status: "to-watch" | "watched" | "loved";
}

const schema = yup.object().shape({
  name: yup.string().required(),
  picture: yup.string().url().required(),
  rating: yup.number().min(1).max(10).required(),
  releaseDate: yup.string().required(),
  status: yup.string().oneOf(["to-watch", "watched", "loved"]).required(),
});

const AddMoviePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddMovieFormData>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.access_token;
  const userId = session?.user._id;
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };

  async function addMovie(
    type: "to-watch" | "watched" | "loved",
    body: IMovieData
  ): Promise<IMovieData> {
    const res = await axios.post<IMovieData, any>(
      `${BASE_URL}/users/${userId}/${type}`,
      body,
      config
    );

    return res;
  }

  const onSubmit = async (data: AddMovieFormData) => {
    const body: IMovieData = {
      title: data.name,
      overview: "no overview",
      poster_path: data.picture,
      vote_average: data.rating,
      id: Math.floor(Math.random() * (-1 - -1000 + 1)) + -1000,
      vote_count: 0,
      release_date: data.releaseDate,
    };
    await addMovie(data.status, body);
    toast({
      title: "Movie added.",
      description: `We've added the movie for you in ${data.status}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    router.replace("/dashboard/add");
  };

  return (
    <>
      <Head>
        <title>Add a movie</title>
        <meta
          name="description"
          content="Add a movie to the database of Filmus"
        />
      </Head>
      <Navbar />
      <Box w={400} m={"auto"} mt={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name" fontWeight={"bold"}>
              Movie Name
            </FormLabel>
            <Input
              id="name"
              placeholder="Enter movie name"
              {...register("name")}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.picture}>
            <FormLabel htmlFor="picture" fontWeight={"bold"}>
              Picture URL
            </FormLabel>
            <Input
              id="picture"
              placeholder="Enter picture URL"
              {...register("picture")}
            />
            <FormErrorMessage>{errors.picture?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.rating}>
            <FormLabel htmlFor="rating" fontWeight={"bold"}>
              Rating (1-10)
            </FormLabel>
            <Input
              id="rating"
              type="number"
              placeholder="Enter rating"
              {...register("rating")}
            />
            <FormErrorMessage>{errors.rating?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.releaseDate}>
            <FormLabel htmlFor="releaseDate" fontWeight={"bold"}>
              Release Date
            </FormLabel>
            <Input
              id="releaseDate"
              type="date"
              placeholder="Enter release date"
              {...register("releaseDate")}
            />
            <FormErrorMessage>{errors.releaseDate?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.status}>
            <FormLabel htmlFor="status" fontWeight={"bold"}>
              Status
            </FormLabel>
            <Select
              id="status"
              placeholder="Select status"
              {...register("status")}
            >
              <option value="to-watch">To Watch</option>
              <option value="watched">Watched</option>
              <option value="loved">Favorite</option>
            </Select>
            <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Add Movie
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddMoviePage;
