import { useState, useEffect } from "react";
// helper
import UserIcon from "../../misc/UserIcon";
import Filter from "../../misc/Filter";
// icon
import addMore from "../../../styles/icons/addMore.png";
// style
import "../../../styles/Css/contacts.css";
// redux
import { connect, useDispatch } from "react-redux";
import { toggleChat } from "../../../actions";
// animate
import { motion } from "framer-motion";

const Contacts = ({
  setChannelForm,
  state: {
    connectedRooms,
    channels,
    allUsers,
    username,
    currentChat,
    messages,
    notification,
  },
}) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.show) {
      const { sender, content } = notification.messages;
      const notif = new Notification("New whats App message", {
        body: `${sender}: ${content}`,
        icon: "/whatsApp.ico",
      });

      setTimeout(() => {
        notif.close();
      }, 5 * 1000);
    }
  }, [notification]);

  const renderChatSections = (chats, type) =>
    chats
      ? chats.map(chat => {
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
          const isRoom = /^(room|newRoom)$/g.test(type);

          if (
            (type === "user" && chat._id === currentChat.reciever_id) ||
            (isRoom && chat === currentChat.chatName)
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
                isChannel={isRoom}
                text={text}
                status={type === "newRoom" ? "You are not joined yet" : ""}
              />
            </div>
          );
        })
      : null;

  return (
    <>
      <motion.button
        className="show__cantacts"
        onClick={() => setShow(!show)}
        initial={{ x: 0 }}
        animate={show ? { x: -90 } : { x: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
      <motion.div
        className="contacts"
        initial={{ left: -90 }}
        animate={show ? { left: -90, width: 0 } : { left: 0, width: "initial" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Filter />

        <div className="contacts__box">
          {renderChatSections(channels, "newRoom")}
          <hr />
          {renderChatSections(connectedRooms, "room")}
          <hr />
          {renderChatSections(allUsers, "user")}
        </div>

        <div className="bottom">
          <h2>You've reached the end.</h2>
          <h3>Create new group!</h3>
          <img
            src={addMore}
            alt="create group"
            onClick={() => setChannelForm(true)}
          />
        </div>
      </motion.div>
    </>
  );
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Contacts);
