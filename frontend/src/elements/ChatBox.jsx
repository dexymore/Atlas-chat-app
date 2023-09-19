import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './parts/SingleChat'

function ChatBox({ fetchAgain, setFetchAgain}) {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState()


  return (
<Box display={{base:selectedChat?"flex":"none",md:"flex"}}
alignItems={"center"}
flexDirection={"column"}
w={{base:"100%",md:"70%%"}}
borderRadius={"lg"}
bg={"gray.50"}
m={1}
borderWidth={1}
p={3}

 >
 <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />

</Box>
  )
}

export default ChatBox