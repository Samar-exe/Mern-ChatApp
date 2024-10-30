const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {Server} = require("socket.io");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
const port = 5000;
const uri = process.env.REACT_APP_CHATAPP_URL;

const expressServer = app.listen(port, () => {
  console.log(`Server running on Port...${port}`);
});

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB"));

const io = new Server(expressServer, {
  cors: {
    origin: process.env.REACT_APP_CLIENT_URL,
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  //listening a connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    io.emit("getOnlineUsers", onlineUsers);
  });

  //add message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});
