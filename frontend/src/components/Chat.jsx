import React from 'react'
// import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

function ChatPAge() {

const [chats,setChats]=useState([])

// const fetchChats= async()=>{
//   const {data}=await axios.get('/api/chat')
//   console.log(data)
//   setChats(data)
// }

useEffect(() => {

// fetchChats()

}, [])
  return (
   <div>
    chat page
   </div>
  )
}

export default ChatPAge