import {
  Button,
  Box,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { useState, useEffect } from "react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import UserProfileModal from "./UserProfileModal"; // Import as the default export
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/react";
import { getSender } from "../../config/chatLogic";

import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserCard from "../userCards/UserCard";
import { set } from "mongoose";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { setSelectedChat, chats, setChats, notifications, setNotifications } =
    ChatState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  const toast = useToast();
  const accessChat = async (id) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chat`, { userId: id }, config);

      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      setLoadingChat(false);
      toast({
        title: error.response.data.message,

        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter a valid search query",
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
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        bg="white"
        w={"100%"}
        borderWidth={5}
        p="5px 10px 5px 10px"
      >
        <Tooltip label="search for users" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <Search2Icon></Search2Icon>
            <Text display={{ base: "none", md: "flex" }} px="4">
              search
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"work sans"}>
          Atlas Chat
        </Text>
        <div>
          <Menu>
            <MenuButton>
            <div className={notifications.length?"notifactions":""}>
              <BellIcon fontSize="2xl" m={1}  >{notifications?"":""}</BellIcon>
              </div>
            </MenuButton>
            <MenuList pl={2}>
              {!notifications.length && "No New Messages"}
              {notifications.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotifications(notifications.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon></ChevronDownIcon>}
            >
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user !== null ? user.name : ""}
                src={user !== null ? user.pic : ""}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <UserProfileModal user={user}>
                <MenuItem variant={"ghost"}>Profile</MenuItem>
              </UserProfileModal>
              <MenuItem variant={"ghost"} onClick={logoutHandler} colors>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>search</DrawerHeader>{" "}
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder={"search for users"}
                mr={2}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading></ChatLoading>
            ) : (
              searchResults?.map((u) => (
                <UserCard
                  key={u._id}
                  user={u}
                  handleFunction={() => accessChat(u._id)}
                ></UserCard>
              ))
            )}
            {loadingChat && <Spinner></Spinner>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
