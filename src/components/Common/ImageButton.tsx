import { Button, Image } from "@chakra-ui/react";
import React from "react";
interface IProps {
  src: string;
  wdith: string;
}
const ImageButton = (props: IProps) => {
  return (
    <Button colorScheme={"teal"} variant="outline" size="sm">
      <Image width={props.wdith} src={props.src} alt="btn_image" />
    </Button>
  );
};

export default ImageButton;
