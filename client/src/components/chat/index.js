import { useEffect } from "react";
// custom hook
import { useCreateSocket } from "../../hook/useSocket";
// components
import Header from "./Header";
import ChatPanel from "./chatPanel";
// store
import { connect, useDispatch } from "react-redux";
import { setNotificationPermission } from "../../actions/index";
// animate
import { motion } from "framer-motion";

const Chat = ({ user, currentChat, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
  }, [user, history]);

  useEffect(() => {
    (async () => {
      if (Notification.permission === "granted") {
        dispatch(setNotificationPermission("granted"));
      } else if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        dispatch(setNotificationPermission(permission));
      }
    })();
  }, [dispatch]);

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
});

export default connect(mapStateToProps)(Chat);
