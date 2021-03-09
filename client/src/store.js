const initialStore = {
  username: "",
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
