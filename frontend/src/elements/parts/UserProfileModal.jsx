import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { IconButton } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";


function UserProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "felx" }}
          icon={<ViewIcon></ViewIcon>}
          onClick={onOpen}
        ></IconButton>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size={'lg'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize={"2xl"}
          fontFamily={"work sans"}
          display={"flex"}
          justifyContent={"center"}
          >{user !== null ? user.name : ""}</ModalHeader>
          <ModalCloseButton />
 
          <ModalBody
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          ><Image
          src={user !== null ? user.pic : ""}
          borderRadius={"full"}
          boxSize={"150px"}

          
          >

          </Image>
          <Text
          fontSize={{base:"28px",md:"30px"}}
          fontFamily={"work sans"}
          >
          {user !== null ? user.email : ""}
          </Text>
          </ModalBody>


          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserProfileModal;
