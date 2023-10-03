import React from "react";
import { ChatState } from "../../context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import UserBadge from "../userCards/UserBadge";
import { useState } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import { set } from "mongoose";
import UserCard from "../userCards/UserCard";

function UpdateGroupChatModel({ fetchAgain, setFetchAgain ,fetchMessages}) {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState(selectedChat.chatName);
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();
  const handleRemove = async (userToRemove) => {
if(user._id!==selectedChat.groupAdmin._id&&userToRemove._id!==user._id){
   
    toast({
        title: "You are not the admin of this group.",
        description: "Only the admin can remove users.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
    });
return
}
try {
    setLoading(true);
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        }

    }
    const {data} = await axios.put("/api/chat/groupremove", {chatId:selectedChat._id,userId:userToRemove._id}, config)
    userToRemove._id===user._id?setSelectedChat():setSelectedChat(data)
    setFetchAgain(!fetchAgain)
    fetchMessages()
    setLoading(false)
    onClose()
    window.location.reload()






} catch(erorr){

    toast({
        title: "An error occurred.",
        description: "Unable to remove user.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
    });

}

  };
  const handleRename = async () => {
    if (!groupChatName || groupChatName === selectedChat.chatName) {
      return;
    }
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        { chatName: groupChatName, chatId: selectedChat._id },
        config
      );
      setSelectedChat(data);

      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      onClose();
      window.location.reload();

    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to rename chat.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      setRenameLoading(false);
    }
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResults(data);

    } catch (error) {
      setLoading(false);
      toast({
        title: "An error occurred.",
        description: "Unable to get users.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleAddUser = (userToAdd) => async () => {
    if (selectedChat.users.find((user) => user._id === userToAdd._id)) {
      toast({
        title: "User is already in the group.",
        description: "Please select another user.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {

      toast({
        title: "You are not the admin of this group.",
        description: "Only the admin can add users.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        { chatId: selectedChat._id, userId: userToAdd._id },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);

      window.location.reload();

      onClose();
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to add user.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };




  return (
    <>
      <IconButton
className="purple-bg white-color"
        onClick={onOpen}
        display={{ base: "flex" }}
        icon={<ViewIcon></ViewIcon>}
      ></IconButton>

      <Modal 
      isOpen={isOpen} onClose={onClose} isCentered

      >
        <ModalOverlay />
        <ModalContent
              className="black-bg white-color"
        >
          <ModalHeader fontSize={"2xl"} fontFamily={"work sans"}>
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width={"100%"} display={"flex"} flexWrap={"wrap"} pb={4}>
              {selectedChat.users.map((user) => (
                <UserBadge
                  key={user._id}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
            </Box>
            <FormControl display={"flex"} flexDirection={"row"}>
              <Input
                placeholder="chat name"
                mb={3}
                value={groupChatName}
                bg={"#666"}
                onChange={(e) => setGroupChatName(e.target.value)}
                border={"none"}
              ></Input>
              <Button
                ml={2}
                className="white-color"
                bg={"#724C9D "}
                onClick={handleRename}
                isLoading={renameLoading}
                _hover={{ bg: "#8B5EA9" }}
              >
                rename
              </Button>
            </FormControl>

            <FormControl>
              <Input
                type="text"
                placeholder="search for users to add"
                value={search}
                mb={2}
                bg={"#666"}
              color={"white"}
                border={"none"}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner></Spinner>
            ) : (
              searchResults.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  handleFunction={handleAddUser(user)}
                ></UserCard>
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button
            bg={"#666"}
             mr={0} onClick={onClose} m={0}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateGroupChatModel;
