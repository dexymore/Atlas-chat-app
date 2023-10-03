import {Box, useToast,Text, Button, Stack, Avatar} from "@chakra-ui/react";
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

color={"black"}
p={3}
borderColor={"transparent"}
alignItems={"center"}
justifyContent={"space-between"}
borderRadius={'lg'}
borderWidth={1}
className="black-bg"
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

<Text className="white-color">Chats</Text>
<GroupChatModel  childern={  <Button className="purple-bg white-color"  display={'flex'} fontSize={{ base: '17px', md: '10px', lg: '17px' }} rightIcon={<AddIcon />}>
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
    (<Stack overflowY={'scroll'} 
    

    >
{chats.map((chat)=>(
    <Box onClick={()=>setSelectedChat(chat)} cursor={"pointer"} 
        bg={ selectedChat===chat?"#724C9D":"#666666"}
        color={ selectedChat===chat?"white":"black"}
        p={3}
        borderRadius={'lg'}
        borderWidth={1}
        borderColor={'transparent'}
        key={chat.id}
        w={"100%"}
        display={"flex"}
        flexDir={"row"}
        alignItems={"center"}
        
    >
    <Avatar src={chat.users.filter(u=>u._id!==user._id)[0]?chat.users.filter(u=>u._id!==user._id)[0].pic:""}
margin={"6px 12px 6px 0px"}
>
</Avatar>

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