import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";
import Home from "./components/Home/Home";
import ChatPage from "./components/ChatPage/ChatPage";
import TextEditor from "./components/TextEditor/TextEditor";

const socket = socketIO.connect("http://localhost:4000");
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          <Route path="/text" element={<TextEditor socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
