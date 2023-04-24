import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

interface IProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  type: string;
  isSaved: boolean;
}
const MovieHandlerModal = (props: IProps) => {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          {!props.isSaved ? (
            <>
              {" "}
              <ModalHeader>Movie saved</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{`The movie has been saved to ${props.type}!`}</ModalBody>
            </>
          ) : (
            <>
              <ModalHeader>Movie exists</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{`The movie is already in your collection of ${props.type}!`}</ModalBody>
            </>
          )}
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MovieHandlerModal;
