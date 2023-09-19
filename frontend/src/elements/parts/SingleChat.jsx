import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import { getSender } from "../../config/chatLogic";
import UserProfileModal from "./UserProfileModal";
import { getSenderFull } from "../../config/chatLogic";
import UpdateGroupChatModel from "./UpdateGroupChatModel";
function SingleChat({ fetchAgain, setFetchAgain }) {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const user = JSON.parse(localStorage.getItem("userInfo"));

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

            {selectedChat.isGroup ? (
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
              <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} >
<Box  backgroundColor="white"
                    padding="16px"
                    borderRadius="12px"
                    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    fontWeight="bold"
                    fontSize="18px"
                    textAlign="center"
                    textTransform="uppercase">

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
overflowY={"scroll"}
backgroundColor={'#e8e8e8'}
borderRadius={'lg'}
justifyContent={"flex-end"}
p={3}
m={1}

>
  {/* {messages } */}
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
