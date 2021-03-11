import { useEffect } from "react";
import { io } from "socket.io-client";
// redux
import { useDispatch } from "react-redux";
import { setMessages, setAllUsers } from "../actions/index";

let socket;

export const useCreateSocket = (user) => {
  const dispatch = useDispatch();

  const ENDPOINT = "http://localhost:8080";

  useEffect(() => {
    if (!user) return;
    socket = io(ENDPOINT);
    socket.emit("join", user);
    socket.emit("join room", "general", (messages, roomName) =>
      dispatch(setMessages(messages, roomName, true))
    );

    socket.on("new user", (allUsers) => dispatch(setAllUsers(allUsers)));
    socket.on("new message", ({ chatName, ...res }) =>
      dispatch(setMessages(res, chatName))
    );
  }, [ENDPOINT, user, dispatch]);
};

export const useSocket = () => {
  const sendMessage = (payload) => socket.emit("send message", payload);

  return [sendMessage];
};
