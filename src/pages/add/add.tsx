import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface AddMovieFormData {
  name: string;
  picture: string;
  rating: number;
  releaseDate: string;
  status: "to watch" | "watched" | "favorite";
}

const schema = yup.object().shape({
  name: yup.string().required(),
  picture: yup.string().url().required(),
  rating: yup.number().min(1).max(10).required(),
  releaseDate: yup.string().required(),
  status: yup.string().oneOf(["to watch", "watched", "favorite"]).required(),
});

const AddMoviePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddMovieFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AddMovieFormData) => {
    console.log(data);
    // TODO: Save data to the database
  };

  return (
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
            <option value="to watch">To Watch</option>
            <option value="watched">Watched</option>
            <option value="favorite">Favorite</option>
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
  );
};

export default AddMoviePage;
