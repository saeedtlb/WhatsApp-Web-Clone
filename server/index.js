const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

let users = [];
let isTypingUsers = {
  general: []
};
const messages = {
  general: []
};

const channels = [];

io.on("connection", socket => {
  socket.on("join", username => {
    users.push({
      _id: socket.id,
      username
    });
    io.emit("new user", users);
    socket.emit("channels", channels);
  });

  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    cb(messages[roomName], roomName);
  });

  socket.on("create room", room => {
    if (!channels.includes(room)) {
      channels.push(room);
      io.emit("channels", channels);
    }
  });

  socket.on(
    "send message",
    ({ content, to, sender, chatName, isChannel, time }) => {
      const payload = {
        content,
        sender,
        time,
        chatName: isChannel ? chatName : sender
      };
      socket.to(to).emit("new message", payload);
      if (messages[chatName]) {
        messages[chatName].push({ content, sender });
      } else {
        messages[chatName] = [{ content, sender }];
      }
    }
  );

  socket.on("is typing", ({ username, to, typing }) => {
    if (typing) {
      if (isTypingUsers[to]) isTypingUsers[to].push(username);
      else isTypingUsers[to] = [username];
    } else
      isTypingUsers[to] = isTypingUsers[to].filter(user => user !== username);

    socket.to(to).emit("typing", isTypingUsers, typing);
  });

  socket.on("disconnect", () => {
    users = users.filter(user => user._id !== socket.id);
    io.emit("new user", users);
  });
});

app.get("/", (req, res) =>
  res.status(200).send("Back-End for whats app chat messaging")
);

server.listen(PORT, () => console.log("Server up and running at " + PORT));
