import {Box, useToast,Text, Button, Stack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {ChatState} from "../context/ChatProvider";
import GroupChatModel from "./parts/GroupChatModel";
import React from 'react'
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { getSender } from "../config/chatLogic";


function UserChats({fetchAgain,setFetchAgain}) {
const [loggedUser, setLoggedUser] = useState()
const {selectedChat, setSelectedChat,chats,setChats} = ChatState()
const toast = useToast();
const user = JSON.parse(localStorage.getItem('userInfo'));
const fetchChats=async()=>{
try{
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }

    const {data} = await axios.get("/api/chat", config)
  console.log(data)
    setChats(data)
}
catch (error){
    console.log(error)
    toast({
        title: "An error occurred.",
        description: "Unable to get chats.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",

    })
}

}

useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    
    fetchChats()}, [fetchAgain])





  return (
<Box
display={{base:selectedChat?"none":"flex",md:"flex"}}
flexDirection={"column"}
width={{base:"100%",md:"30%"}}
m={1}
bg={"#ffffff"}
color={"black"}
p={3}
alignItems={"center"}
justifyContent={"space-between"}
borderRadius={'lg'}
borderWidth={1}
>

<Box
pb={3}
px={3}
display={"flex"}
fontSize={{base:"xl",md:"2xl"}}
alignItems={"center"}
justifyContent={"space-between"}
width={"100%"}
>

MyChats
<GroupChatModel childern={  <Button display={'flex'} fontSize={{ base: '17px', md: '10px', lg: '17px' }} rightIcon={<AddIcon />}>
    new group chat
  </Button>}>

</GroupChatModel>

</Box>
<Box
display={"flex"}
flexDirection={"column"}
width={"100%"}
height={"100%"}
botderRadius={'lg'}
overflowY={'hidden'}

>
{
    chats?
    (<Stack overflowY={'scroll'}>
{chats.map((chat)=>(
    <Box onClick={()=>setSelectedChat(chat)} cursor={"pointer"} 
        bg={ selectedChat===chat?"#38B2AC":"#E8E8E8"}
        color={ selectedChat===chat?"white":"black"}
        p={3}
        borderRadius={'lg'}
        borderWidth={1}
        borderColor={'#black'}
        key={chat.id}

    >
<Text fontSize={{base:"xl",md:"2xl"}}>{!chat.isGroupChat?getSender(user,chat.users):chat.chatName}</Text>

    </Box>
))}
    </Stack>):""
}

</Box>

</Box>
  )
}

export default UserChats