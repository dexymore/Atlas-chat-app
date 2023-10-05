import React from "react";
import { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import Peer from "simple-peer";
// import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { set } from "mongoose";

import{init,createOffer,createAnswer,addAnswer} from '../../config/videoLogic'
import { ChatState } from "../../context/ChatProvider";
import { io } from "socket.io-client";
const EndPoint = "http://localhost:5000";

const socket = io(EndPoint);




function VideoChat() {
  const { selectedChat, setSelectedChat, chats, setChats, call, setCall } =
    ChatState();
//   const [localStream, setLocalStream] = useState();
//   const [remoteStream, setRemoteStream] = useState();

 const buttonRef=useRef();
//   const [peer, setPeer] = useState(new RTCPeerConnection(stunServer));





  useEffect(() => {



    init();

    
  }, []);

  // useEffect(() => {
  //   if(buttonRef.current){
  //     buttonRef.current.click()
  //     buttonRef.current.disabled=false;
  //   }
  // })

  return (
    <div>
      <div id="videos">
        <video
          className="video-player"
          id="user-1"
          autoPlay
          playsInline
        ></video>
        <video
          className="video-player"
          id="user-2"
          autoPlay
          playsInline
        ></video>
      </div>

      <button id="create-offer" ref={buttonRef} onClick={createOffer} >
        Create Offer
      </button>
      <label>SDP Offer</label>
      <textarea id="offer-sdp"></textarea>

      <button id="create-answer" onClick={createAnswer}>
        Create Answer
      </button>
      <label>SDP Answer</label>
      <textarea id="answer-sdp"></textarea>

      <button id="add-answer" onClick={addAnswer}>Add Answer</button>
    </div>
  );
}

export default VideoChat;
