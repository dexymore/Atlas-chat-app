import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react";
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



const EndPoint = "http://localhost:5000";
let selectedChatCompare;
const socket = io(EndPoint);


function SingleChat({ fetchAgain, setFetchAgain }) {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [socketConnected, setSocketConnected] = useState(false);

const toast= useToast()




  const sendMessage = async (e) => {
if(e.key === "Enter" && newMessage)
{
try{
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,


  }



}
  setNewMessage("")
  const {data} = await axios.post("/api/message", {chatId: selectedChat._id, content: newMessage}, config)
  socket.emit("new message", data);

console.log(data)
  setMessages([...messages, data])
}catch(error){
  toast({
    title: error.response.data.message,
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "top",
  })



}

}

  };
const fetchMessages = async () => {
  if(!selectedChat){ return}
  try{

const config = {
  headers: {
    Authorization: `Bearer ${user.token}`,
  }
}

setLoading(true)
const {data} = await axios.get(`/api/message/${selectedChat._id}`, config)
console.log(data)
setMessages(data)
setLoading(false)
socket.emit("join room", selectedChat._id)


    
    }  catch(error){

      toast({

        title: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",



      })


  }
}
useEffect(() => {
// socket=io(EndPoint);
console.log(socket)
console.log(user)
socket.emit("setup", (user))
socket.on("connect", () => {

  setSocketConnected(true)
})

}, [])

useEffect(() => {

  fetchMessages()

selectedChatCompare = selectedChat
}, [selectedChat])

useEffect(() => {
socket.on("message received", (newMessage) => {
if(selectedChatCompare._id === newMessage.chat){
  setMessages([...messages, newMessage])
}

})

})










  const typingHandler = (e) => {
setNewMessage(e.target.value)


  }

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
              icon={<ArrowBackIcon />}
            ></IconButton>

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <UserProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                >
                  <Box
                    backgroundColor="white"
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
                    <ViewIcon></ViewIcon>
                  </Box>
                </UserProfileModal>
              </>
            ) : (
              <>
                {selectedChat.chatName}
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}

                >
                  <Box
                    backgroundColor="white"
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
                    <ViewIcon></ViewIcon>
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
            backgroundColor={"#e8e8e8"}
            borderRadius={"lg"}
            justifyContent={"flex-end"}
            p={3}
            m={1}
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

            <FormControl onKeyDown={sendMessage} isRequired mt={3} >
            <Input
            variant={"filled"}
            placeholder={"type a message"}
  
            onChange={typingHandler}
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
