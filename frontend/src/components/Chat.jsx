import React from 'react'
// import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../elements/parts/SideDrawer'
import ChatBox from '../elements/ChatBox'
import UserChats from '../elements/UserChats'

function ChatPAge() {
const user = ChatState()
const [fetchAgain, setFetchAgain] = useState(false)



useEffect(() => {

// fetchChats()

}, [])
  return (
<div style={{width:"100%"}}>
{<SideDrawer />}
<Box className='box-chat' >
{user&&<UserChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
{user&&<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
</Box>

</div>
  )
}

export default ChatPAge