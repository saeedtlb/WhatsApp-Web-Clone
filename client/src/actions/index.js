import {
  SOCKETID,
  NAME,
  MESSAGES,
  ALLUSERS,
  TOGGLECHATNAME,
  NOTIFICATIONPERMISSION,
  NOTIFICATION,
  TYPING,
  ROOM,
  NEWCHANNEL,
} from "./type";

export const setSocketId = (id) => ({
  type: SOCKETID,
  id,
});

export const setUserName = (name) => ({
  type: NAME,
  name,
});

export const setMessages = (messages, chatName, isAllMessages = false) => ({
  type: MESSAGES,
  payload: {
    messages,
    chatName,
    isAllMessages,
  },
});

export const setAllUsers = (allUsers) => ({
  type: ALLUSERS,
  allUsers,
});

export const toggleChat = (currentChat) => ({
  type: TOGGLECHATNAME,
  currentChat,
});

export const setNotification = (chatName, { sender, content }) => ({
  type: NOTIFICATION,
  payload: {
    chatName,
    sender,
    content,
  },
});

export const setNotificationPermission = (permission) => ({
  type: NOTIFICATIONPERMISSION,
  permission: permission === "granted" ? true : false,
});

export const setTyping = (isTypingUsers, status) => ({
  type: TYPING,
  payload: {
    isTyping: status,
    users: isTypingUsers,
  },
});

export const newChannels = (rooms) => ({
  type: ROOM,
  rooms,
});

export const createNewChannel = (room) => ({
  type: NEWCHANNEL,
  room,
});
