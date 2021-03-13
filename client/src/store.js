const initialStore = {
  username: "",
  notification: {
    show: false,
    permission: false,
  },
  allUsers: [],
  connectedRooms: ["general"],
  messages: {
    general: [],
  },
  currentChat: {
    isChannel: true,
    chatName: "general",
    reciever_id: "",
  },
};

export default initialStore;
