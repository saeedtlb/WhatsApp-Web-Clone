import { NAME, MESSAGES, ALLUSERS, TOGGLECHATNAME } from "../actions/type";

const reducer = (store, action) => {
  console.log(action);

  switch (action.type) {
    case NAME:
      return {
        ...store,
        username: action.name,
      };
    case MESSAGES:
      const { isAllMessages, messages, chatName } = action.payload;
      let newMessages;
      //   let notification = {
      //     show: false,
      //   };

      if (isAllMessages) {
        newMessages = messages;
      } else {
        if (store.messages[chatName]) {
          newMessages = [...store.messages[chatName], messages];
        } else {
          newMessages = [messages];
        }
      }

      //   if (chatName !== store.currentChat.chatName) {
      //     notification = {
      //       show: true,
      //       messages,
      //     };
      //   }

      return {
        ...store,
        messages: {
          ...store.messages,
          [chatName]: newMessages,
        },
        // notification,
      };
    case TOGGLECHATNAME:
      const newState = {
        currentChat: action.currentChat,
      };

      if (!store.messages[action.currentChat.chatName]) {
        newState.messages = {
          ...store.messages,
          [action.currentChat.chatName]: [],
        };
      }
      return {
        ...store,
        ...newState,
      };
    case ALLUSERS:
      return {
        ...store,
        allUsers: action.allUsers,
      };
    default:
      return store;
  }
};

export default reducer;
