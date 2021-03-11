import React from "react";
// helper
import UserIcon from "../../misc/UserIcon";
// icon
import addMore from "../../../styles/icons/addMore.png";
// style
import "../../../styles/Css/contacts.css";
// redux
import { connect, useDispatch } from "react-redux";
import { toggleChat } from "../../../actions";
// animate
import { motion } from "framer-motion";

const Contacts = ({ channels, users, username, currentChat, messages }) => {
  const dispatch = useDispatch();

  const renderChatSections = (chats, type) =>
    chats
      ? chats.map((chat) => {
          if (type === "user" && chat.username === username) return;

          const changedChat =
            type === "user"
              ? {
                  chatName: chat.username,
                  isChannel: false,
                  reciever_id: chat._id,
                }
              : {
                  chatName: chat,
                  isChannel: true,
                  reciever_id: "",
                };

          let style;

          if (
            (type === "user" && chat._id === currentChat.reciever_id) ||
            (type === "room" && chat === currentChat.chatName)
          )
            style = "rgba(30, 190, 113, 0.2)";

          const name = type === "room" ? chat : chat.username;

          const chats = messages[name];
          const text = chats ? chats[chats.length - 1] : "";

          return (
            <div
              key={type === "user" ? chat._id : chat}
              onClick={() => dispatch(toggleChat(changedChat))}
              style={style ? { backgroundColor: style } : null}
            >
              <UserIcon
                name={type === "user" ? chat.username : chat}
                type="message"
                isChannel={type === "room"}
                text={text}
              />
            </div>
          );
        })
      : null;

  return (
    <motion.div
      className="contacts"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
    >
      <div className="filter">
        <label>
          <input type="checkbox" />
          <span></span>
        </label>
        <h4>unread only</h4>
      </div>

      <div className="contacts__box">
        {renderChatSections(channels, "room")}
        <hr />
        {renderChatSections(users, "user")}
      </div>

      <div className="bottom">
        <h2>You've reached the end.</h2>
        <h3>Addmore friends!</h3>
        <img src={addMore} alt="add more friends" />
      </div>
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  channels: state.connectedRooms,
  users: state.allUsers,
  username: state.username,
  currentChat: state.currentChat,
  messages: state.messages,
});

export default connect(mapStateToProps)(Contacts);
