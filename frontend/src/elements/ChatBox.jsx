import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box, Button } from '@chakra-ui/react'
import SingleChat from './parts/SingleChat'
import VideoChat from './parts/VideoChat'
import { io } from 'socket.io-client'
import { useEffect,useRef,useState } from 'react'
import { RepeatClockIcon } from '@chakra-ui/icons'
import {peer,localStream,remoteStream,c} from '../config/videoLogic'


const EndPoint = "http://localhost:5000";
const socket = io(EndPoint);

function ChatBox({ fetchAgain, setFetchAgain}) {
  const { selectedChat, setSelectedChat, chats, setChats,call,setCall } = ChatState()

  // const myuser = JSON.parse(localStorage.getItem("userInfo"));
  // const socketRef = useRef();
  const [socketConnected, setSocketConnected] = useState(false);

  const user=JSON.parse(localStorage.getItem("userInfo"))
  useEffect(() => {
    // socket=io(EndPoint);

  
    socket.emit("setup", user);
    socket.on("connected", () => {

      setSocketConnected(true);
    });
    
    
  }, []);
  useEffect(() => {
    // Assuming socket is properly initialized and connected
    socket.on("receiveCall", (myuser) => {
     setCall(true)
      // Handle the incoming call here, e.g., show a call modal
    });
  }, []); // Make sure to include socket as a dependency
  
  
  // const handleCall = async () => {
  //   if (!call) {
  //     // Assuming selectedChat contains the necessary user information

  //     // const offer =await createOffer();

  //     socket.emit("callUser", selectedChat);

  //     // document.getElementById("offer-sdp").value=offer;

      
  //     setCall(true);
  //   }
  // };
  

  return (
<Box display={{base:selectedChat?"flex":"none",md:"flex"}}
alignItems={"center"}
flexDirection={"column"}
w={{base:"100%",md:"70%%"}}
borderRadius={"lg"}
// bg={"gray.50"}
m={1}
borderWidth={1}
borderColor={"transparent"}
p={3}

className={'black-bg '}
 >
 {/* <Button onClick={handleCall}>Call</Button> */}
{call?<VideoChat></VideoChat>:<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}></SingleChat>}
</Box>
  )
}

export default ChatBox