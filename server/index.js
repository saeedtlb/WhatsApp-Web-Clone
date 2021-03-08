const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const messages = {
  general: [],
};

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    users.push({
      _id: socket.id,
      username,
    });
    io.emit("new user", users);
  });

  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    cb(messages[roomName], roomName);
  });

  socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
    const payload = {
      content,
      sender,
      chatName: isChannel ? chatName : sender,
    };
    socket.to(to).emit("new message", payload);

    if (messages[chatName]) {
      messages[chatName].push({ content, sender });
    }
    console.log(users);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user._id !== socket.id);
    io.emit("new user", users);
  });
});

app.get("/", (req, res) =>
  res.status(200).write("Back-End for whats app chat messaging")
);

server.listen(PORT, () => console.log("Server up and running at " + PORT));
