import {
  NAME,
  MESSAGES,
  ALLUSERS,
  TOGGLECHATNAME,
  NOTIFICATIONPERMISSION,
  NOTIFICATION,
} from "./type";

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
