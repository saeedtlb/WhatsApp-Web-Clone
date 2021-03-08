import { NAME, MESSAGES, SOCKET, ALLUSERS } from "../actions/type";

const reducer = (store, action) => {
  console.log(action);

  switch (action.type) {
    case NAME:
      return {
        ...store,
        username: action.name,
      };
    case MESSAGES:
      return {
        ...store,
        messages: {
          ...store.messages,
          [action.payload.chatName]: action.payload.messages,
        },
      };
    case SOCKET:
      return {
        ...store,
        socket: action.socket,
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
