import { NAME, MESSAGES, ALLUSERS, TOGGLECHATNAME } from "./type";

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
