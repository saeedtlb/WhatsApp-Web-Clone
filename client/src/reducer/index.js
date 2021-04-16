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
  NEWCHANNEL
} from "../actions/type";

const reducer = (store, action) => {
  console.log(action);

  switch (action.type) {
    case SOCKETID:
      return {
        ...store,
        socket_id: action.id
      };
    case NAME:
      return {
        ...store,
        username: action.name
      };
    case MESSAGES:
      const { isAllMessages, messages, chatName } = action.payload;
      let newMessages;

      if (isAllMessages) {
        newMessages = {
          unread: 0,
          texts: messages ? messages : []
        };
      } else {
        if (store.messages[chatName]) {
          newMessages = {
            ...store.messages[chatName],
            texts: [...store.messages[chatName].texts, messages]
          };
        } else {
          newMessages = {
            unread: 0,
            texts: [messages]
          };
        }
      }
      return {
        ...store,
        messages: {
          ...store.messages,
          [chatName]: newMessages
        }
      };
    case TOGGLECHATNAME:
      const newState = {
        currentChat: action.currentChat,
        messages: {
          ...store.messages,
          [action.currentChat.chatName]: {
            unread: 0,
            texts: store.messages[action.currentChat.chatName]
              ? store.messages[action.currentChat.chatName].texts
              : []
          }
        }
      };

      //   dont show notiffication if user is on the same chat
      if (
        store.notification.messages &&
        store.notification.messages.chatName === store.currentChat.chatName
      )
        newState.notification = {
          ...store.notification,
          show: false
        };

      return {
        ...store,
        ...newState
      };
    case NOTIFICATION:
      // check that should we send notification
      let notification = {
        ...store.notification
      };
      const unReadMessages = { ...store.messages };
      const { chatName: chat } = action.payload;
      if (
        store.notification.permission &&
        store.currentChat.chatName !== chat
      ) {
        notification.show = true;
        notification.messages = action.payload;
        unReadMessages[chat] = {
          ...store.messages[chat],
          unread: store.messages[chat].unread + 1
        };
      }
      return {
        ...store,
        notification,
        messages: unReadMessages
      };
    case ALLUSERS:
      return {
        ...store,
        allUsers: action.allUsers
      };
    case NOTIFICATIONPERMISSION:
      return {
        ...store,
        notification: {
          ...store.notification,
          permission: action.permission
        }
      };
    case TYPING:
      return {
        ...store,
        typing: action.payload
      };
    case ROOM:
      const notConnectedRooms = action.rooms.filter(
        room => !store.connectedRooms.includes(room)
      );
      return {
        ...store,
        channels: notConnectedRooms
      };
    case NEWCHANNEL:
      const channels = store.channels.filter(
        channel => channel !== action.room
      );
      return {
        ...store,
        connectedRooms: [...store.connectedRooms, action.room],
        channels
      };
    default:
      return store;
  }
};

export default reducer;
