import { useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() && localStorage.getItem("userName")) {
      // eslint-disable-next-line react/prop-types
      socket.emit("message", {
        name: localStorage.getItem("userName"),
        text: message,
        id: `${socket.id}${Math.random()}`,
        socketId: socket.id,
      });
    }

    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
