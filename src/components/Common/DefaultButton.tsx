import { Button } from "@chakra-ui/react";
import React from "react";

interface IProps {
  text: string;
}
const DefaultButton = (props: IProps) => {
  return (
    <Button colorScheme="teal" size="sm">
      {props.text}
    </Button>
  );
};

export default DefaultButton;
