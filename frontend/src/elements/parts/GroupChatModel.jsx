import React from "react";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { FormControl, Input, useToast, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";

import axios from "axios";
import UserCard from "../userCards/UserCard";
import UserBadge from "../userCards/UserBadge";
import { set } from "mongoose";

function GroupChatModel({ childern }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

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
      console.log(data);
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
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User is already in the group.",
        description: "Please select another user.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please enter a group name.",
        description: "please fill all the required feilds.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        { name: groupChatName, users: JSON.stringify(selectedUsers.map((u)=>u._id)) },
        config
      );
      setChats([data,...chats]);
      onClose();
    toast({
        title: "Group created.",
        description: "Group created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",

    })
    } catch (error) {}
  };
  const handleDelete = (userToDelete) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== userToDelete._id)
    );
  };

  return (
    <>
      <span onClick={onOpen}>{childern}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"work sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            create group chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <FormControl>
              <Input
                type="text"
                placeholder="group name"
                value={groupChatName}
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                placeholder="search for users"
                value={search}
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              m={2}
            >
              {selectedUsers.map((user) => (
                <UserBadge
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {/* Map over searchResults and render UserCard for each user */}
                {searchResults.slice(0, 3).map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))}
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              create group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModel;
