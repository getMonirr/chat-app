// import
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

// create app
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());

// create server connection
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const users = [];

// socket connection
io.on("connection", (socket) => {
  // console.log(`${socket.id} user just connected`);
  socket.on("message", (data) => {
    console.log(data);
    io.emit("messageResponse", data);
  });

  // new user
  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });

  // typing
  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  // disconnected
  socket.on("disconnected", () => {
    console.log(`user just disconnected`);
    const restUsers = users.filter((user) => user.socketId !== socket.id);
    io.emit("newUserResponse", restUsers);
    socket.disconnect();
  });
});

// routes
app.get("/api", async (req, res) => {
  res.send("server is running");
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
