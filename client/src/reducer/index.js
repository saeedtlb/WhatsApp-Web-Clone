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
} from "../actions/type";

const reducer = (store, action) => {
  console.log(action);

  switch (action.type) {
    case SOCKETID:
      return {
        ...store,
        socket_id: action.id,
      };
    case NAME:
      return {
        ...store,
        username: action.name,
      };
    case MESSAGES:
      const { isAllMessages, messages, chatName } = action.payload;
      let newMessages;

      if (isAllMessages) {
        newMessages = messages;
      } else {
        if (store.messages[chatName]) {
          newMessages = [...store.messages[chatName], messages];
        } else {
          newMessages = [messages];
        }
      }
      return {
        ...store,
        messages: {
          ...store.messages,
          [chatName]: newMessages,
        },
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
      //   dont show notiffication if user is on the same chat
      if (
        store.notification.messages &&
        store.notification.messages.chatName === store.currentChat.chatName
      )
        newState.notification = {
          ...store.notification,
          show: false,
        };

      return {
        ...store,
        ...newState,
      };
    case NOTIFICATION:
      // check that should we send notification
      let notification = {
        ...store.notification,
      };
      if (
        store.notification.permission &&
        store.currentChat.chatName !== action.payload.chatName
      ) {
        notification.show = true;
        notification.messages = action.payload;
      }
      return {
        ...store,
        notification,
      };
    case ALLUSERS:
      return {
        ...store,
        allUsers: action.allUsers,
      };
    case NOTIFICATIONPERMISSION:
      return {
        ...store,
        notification: {
          ...store.notification,
          permission: action.permission,
        },
      };
    case TYPING:
      return {
        ...store,
        typing: action.payload,
      };
    case ROOM:
      const notConnectedRooms = action.rooms.filter(
        (room) => !store.connectedRooms.includes(room)
      );
      return {
        ...store,
        channels: notConnectedRooms,
      };
    case NEWCHANNEL:
      const channels = store.channels.filter(
        (channel) => channel !== action.room
      );
      return {
        ...store,
        connectedRooms: [...store.connectedRooms, action.room],
        channels,
      };
    default:
      return store;
  }
};

export default reducer;
