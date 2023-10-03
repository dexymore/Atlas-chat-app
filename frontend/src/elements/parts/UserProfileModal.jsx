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
import { ChatState } from "../../context/ChatProvider";
import { useState } from "react";
import { useEffect } from "react";
import io from "socket.io-client";

const EndPoint = "ws://localhost:5000";

const socket = io(EndPoint);


function UserProfileModal({ user, children }) {

  const [socketConnected, setSocketConnected] = useState(false);
  const [userCall, setUserCall] = useState(false);

  const {selectedChat}=ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const myUser=JSON.parse(localStorage.getItem("userInfo"))




  


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
        <ModalContent
        className="black-bg white-color"
        >
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
                 {/* <Button variant="ghost" m={3} p={6} onClick={handleCall}  >call</Button> */}
            <Button 
            bg={"#666"}
             mr={3} onClick={onClose}>
              Close
            </Button>
    
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserProfileModal;
