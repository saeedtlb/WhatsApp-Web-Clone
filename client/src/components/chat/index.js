import React, { useEffect } from "react";
// custom hook
import { useCreateSocket } from "../../hook/useSocket";
// components
import Header from "./Header";
import ChatPanel from "./chatPanel";
// store
import { connect } from "react-redux";

import { motion } from "framer-motion";

const Chat = ({ user, currentChat, history }) => {
  // const Chat = ({ user, currentChat, notification, history }) => {
  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
  }, [user, history]);

  //   useEffect(() => {
  //     if (notification.show) {
  //       alert(notification.messages.sender + " " + notification.messages.content);
  //     }
  //   }, [notification.show]);

  useCreateSocket(user);

  return (
    <motion.main
      style={{ height: "100%" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header username={user} currentChat={currentChat} />
      <ChatPanel />
    </motion.main>
  );
};

const mapStateToProps = (state) => ({
  user: state.username,
  currentChat: state.currentChat,
  //   notification: state.notification,
});

export default connect(mapStateToProps)(Chat);
