import { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

// eslint-disable-next-line react/prop-types
const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const lastRef = useRef(null);
  const [typingStatus, setTypingStatus] = useState("")

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data))
  },[socket])

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} lastRef={lastRef} typingStatus={typingStatus} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
