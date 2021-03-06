const initialStore = {
  username: "",
  socket_id: "",
  allUsers: [],
  channels: [],
  connectedRooms: ["general"],
  typing: {
    isTyping: false,
    users: {
      general: [],
    },
  },
  notification: {
    show: false,
    permission: false,
  },
  messages: {
    general: { unread: 0, texts: [] },
  },
  currentChat: {
    isChannel: true,
    chatName: "general",
    reciever_id: "",
  },
};

export default initialStore;
