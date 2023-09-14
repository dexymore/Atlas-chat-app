import React from 'react'
// import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../elements/parts/SideDrawer'
import ChatBox from '../elements/ChatBox'
import MyChat from '../elements/MyChat'

function ChatPAge() {
const user = ChatState()



useEffect(() => {

// fetchChats()

}, [])
  return (
<div style={{width:"100%"}}>
{<SideDrawer />}
<Box className='box-chat'>
  <MyChat></MyChat>
  <ChatBox></ChatBox>
</Box>

</div>
  )
}

export default ChatPAge