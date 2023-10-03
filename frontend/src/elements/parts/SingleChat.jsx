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
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import { getSender } from "../../config/chatLogic";
import UserProfileModal from "./UserProfileModal";
import { getSenderFull } from "../../config/chatLogic";
import UpdateGroupChatModel from "./UpdateGroupChatModel";
import { useState } from "react";
import axios from "axios";
import ScrollAbleChat from "./ScrollAbleChat";
import io from "socket.io-client";
import { useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../../animations/typing.json";
let selectedChatCompare;
const EndPoint = "ws://localhost:5000";

const socket = io(EndPoint);

function SingleChat({ fetchAgain, setFetchAgain }) {
  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    notifications,
    setNotifications,
  } = ChatState();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);

  const toast = useToast();

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          "/api/message",
          { chatId: selectedChat._id, content: newMessage },
          config
        );
        setNewMessage("");
        e.target.value = "";
        socket.emit("new message", data);

        console.log(data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);
      socket.emit("join room", selectedChat._id);
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  useEffect(() => {
    // socket=io(EndPoint);
    console.log(socket);
    console.log(user);
    socket.emit("setup", user);
    socket.on("connect", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        if (!notifications.includes(newMessage)) {
          setNotifications([...notifications, newMessage]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessage]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) {
      return;
    }
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            width={"100%"}
            borderBottom={"1px solid #e2e8f0"}
            fontFamily={"work sans"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
  
          >
            <IconButton
              display={{ base: "block", md: "none" }}
              onClick={() => setSelectedChat(null)}
              className="white-color"
              bg={"#666"}
              icon={<ArrowBackIcon />}
            ></IconButton>

            {!selectedChat.isGroupChat ? (
              <>
              <Text
              className="white-color"
              display={{ base: "none", md: "flex" }}
              > {getSender(user, selectedChat.users)}</Text>
                
                <UserProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                >
                  <Box
                 
                    padding="16px"
                    borderRadius="12px"
                    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    fontWeight="bold"
                    fontSize="18px"
                    textAlign="center"
                    textTransform="uppercase"
                    className="purple-bg white-color"
                  >
                    <ViewIcon></ViewIcon>
                    <Text ml={2}>Profile</Text>
                  </Box>
                  
                </UserProfileModal>
              </>
            ) : (
              <>
               <Text
               className="white-color"
                display={{ base: "none", md: "flex" }}
               >
                {selectedChat.chatName}
               </Text>
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                >
                  <Box
                 
                    padding="16px"
                    borderRadius="12px"
                    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    fontWeight="bold"
                    fontSize="18px"
                    textAlign="center"
                    textTransform="uppercase"
                
                  >
                    <ViewIcon
                        className="purple-bg white-color"
                    ></ViewIcon>
                  </Box>
                </UpdateGroupChatModel>
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
            height={"100%"}
            overflowY={"hidden"}
            
            borderRadius={"lg"}
            justifyContent={"flex-end"}
            p={3}
            m={1}
            className="black-bg "
          >
            {loading ? (
              <Spinner
                size={"xl"}
                thickness={"5px"}
                speed={"0.6s"}
                emptyColor={"gray.200"}
                color={"teal.500"}
                alignSelf={"center"}
                margin={"auto"}
              ></Spinner>
            ) : (
              <div className="messages">
                <ScrollAbleChat messages={messages}></ScrollAbleChat>
              </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping && (
                <Lottie
                  animationData={animationData}
                  style={{ width: 50, height: 50, marginLeft: 10 }}
                  loop={true}
                  autoPlay={true}
                ></Lottie>
              )}
              <Input
                variant={"filled"}
                placeholder={"type a message"}
                onChange={typingHandler}
   bg={"#666"}
   className="white-color"
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
        >
          <Text fontSize={"2xl"} color={"gray.500"}>
            Select a chat to start messaging
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
