import { useEffect, useState } from "react";
// custom hook
import { useCreateSocket } from "../../hook/useSocket";
// helper
import CreateChannel from "../misc/message/CreateChannel";
// components
import Header from "./Header";
import ChatPanel from "./chatPanel";
// store
import { connect, useDispatch } from "react-redux";
import { setNotificationPermission } from "../../actions/index";
// animate
import { motion } from "framer-motion";

const Chat = ({ user, currentChat, history }) => {
  const [channelForm, setChannelForm] = useState(false);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (!user) {
  //       history.push("/");
  //       return;
  //     }
  //   }, [user, history]);

  //   useEffect(() => {
  //     (async () => {
  //       if (Notification.permission === "granted") {
  //         dispatch(setNotificationPermission("granted"));
  //       } else if (Notification.permission !== "denied") {
  //         const permission = await Notification.requestPermission();
  //         dispatch(setNotificationPermission(permission));
  //       }
  //     })();
  //   }, [dispatch]);

  //   useCreateSocket(user);

  return (
    <motion.main
      style={{ height: "100%" }}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.5 }}
    >
      <Header username={user} currentChat={currentChat} />
      <ChatPanel setChannelForm={setChannelForm} />
      <CreateChannel
        channelForm={channelForm}
        setChannelForm={setChannelForm}
      />
    </motion.main>
  );
};

const mapStateToProps = state => ({
  user: state.username,
  currentChat: state.currentChat,
});

export default connect(mapStateToProps)(Chat);
