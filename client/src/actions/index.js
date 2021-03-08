import { NAME, MESSAGES, SOCKET, ALLUSERS } from "./type";

export const setUserName = (name) => ({
  type: NAME,
  name,
});

export const setMessages = (messages, chatName) => ({
  type: MESSAGES,
  payload: {
    messages,
    chatName,
  },
});

export const setSocket = (socket) => ({
  type: SOCKET,
  socket,
});

export const setAllUsers = (allUsers) => ({
  type: ALLUSERS,
  allUsers,
});
