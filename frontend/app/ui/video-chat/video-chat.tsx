"use client";
import { useEffect, useRef } from "react";
import { useWebSocket } from "@/app/context/WebSocket";

function VideoChat() {
  const socket = useWebSocket();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  const sendOfferToServer = async (offer: string) => {
    socket.send(JSON.stringify({ type: "offer", offer }));
  };
  const initWebRTC = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = localStream;

    // Create RTCPeerConnection
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    peerConnection.current = new RTCPeerConnection(configuration);

    localStream
      .getTracks()
      .forEach((track) => peerConnection.current.addTrack(track, localStream));

    peerConnection.current.ontrack = (event) => {
      const remoteVideo = remoteVideoRef.current;
      if (!remoteVideo.srcObject) {
        remoteVideo.srcObject = event.streams[0];
      }
    };

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    sendOfferToServer(offer);
  };

  useEffect(() => {
    initWebRTC();
  });

  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-row p-20">
      <div className="">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          style={{ maxWidth: "100%", transform: "scaleX(-1)" }}
        />
      </div>
      <div>
        <video
          ref={remoteVideoRef}
          autoPlay
          muted
          playsInline
          style={{ maxWidth: "100%", transform: "scaleX(-1)" }}
        />
      </div>
    </div>
  );
}

export default VideoChat;
