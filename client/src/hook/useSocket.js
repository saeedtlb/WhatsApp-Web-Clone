import { useEffect } from "react";
import { io } from "socket.io-client";
// redux
import { useDispatch } from "react-redux";
import {
  setSocketId,
  setMessages,
  setAllUsers,
  setNotification,
  setTyping,
  newChannels,
} from "../actions/index";

let socket;

export const useCreateSocket = (user) => {
  const dispatch = useDispatch();
  const [, , joinRoom] = useSocket();

  const ENDPOINT = "http://localhost:8080";

  useEffect(() => {
    if (!user) return;
    socket = io(ENDPOINT);

    socket.on("connect", () => dispatch(setSocketId(socket.id)));

    socket.emit("join", user);
    joinRoom("general", true);

    socket.on("channels", (channels) => dispatch(newChannels(channels)));
    socket.on("new user", (allUsers) => dispatch(setAllUsers(allUsers)));
    socket.on("new message", ({ chatName, ...res }) => {
      dispatch(setMessages(res, chatName));
      // this will send notification if pass conditions
      dispatch(setNotification(chatName, res));
    });
    socket.on("typing", (isTypingUsers, status) =>
      dispatch(setTyping(isTypingUsers, status))
    );
  }, [ENDPOINT, user, dispatch]);
};

export const useSocket = () => {
  const dispatch = useDispatch();

  const sendMessage = (payload) => socket.emit("send message", payload);

  const isTyping = (payload) => socket.emit("is typing", payload);

  const joinRoom = (channelName, allMessage) =>
    socket.emit("join room", channelName, (messages, roomName) =>
      dispatch(setMessages(messages, roomName, allMessage))
    );

  const createRoom = (room) => {
    socket.emit("create room", room);
    joinRoom(room, true);
  };

  return [sendMessage, isTyping, joinRoom, createRoom];
};
