const stunServer = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };

  let localStream;
  let peer;
  let remoteStream
let createPeer = async function (sdpType) {

    peer=new RTCPeerConnection(stunServer);
 remoteStream=new MediaStream();
    document.getElementById("user-2").srcObject = remoteStream;
    localStream.getTracks().forEach((track) => {
      peer.addTrack(track, localStream);
    });

    peer.ontrack = async (e) => {
      e.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      }); //console.log(track);
    };

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        document.getElementById(sdpType).value =  JSON.stringify(
          peer.localDescription
        );
      }
    };

  }

  let createOffer = async function () {
    await createPeer("offer-sdp");
    
    let offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    document.getElementById("offer-sdp").value = JSON.stringify(
      peer.localDescription
    );
  };

  let createAnswer = async function () {

    await createPeer("answer-sdp");

    let offer = await document.getElementById("offer-sdp").value;
  if(!offer){
    return alert("Please create offer first")
  }  
  offer=await JSON.parse(offer);

  await peer.setRemoteDescription(offer);

    let answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);


    
  };

  let addAnswer = async function () {
    let answer= await document.getElementById("answer-sdp").value
    if(!answer){
      return alert("Please create answer first")
    }
    answer=await JSON.parse(answer);

    if(!peer.currentRemoteDescription){
      await peer.setRemoteDescription(answer);
    }
  }

  let init = async function () {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
        localStream = userStream;
      document.getElementById("user-1").srcObject = userStream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }

  };


  export {createOffer,createAnswer,addAnswer,init}