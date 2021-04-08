import { motion } from "framer-motion";
// redux dispatch
import { useDispatch } from "react-redux";
// custom hook
import { useSocket } from "../../hook/useSocket";
// action
import { createNewChannel } from "../../actions/index";

const JoinChannel = ({ chatName }) => {
  const dispatch = useDispatch();
  const [, , joinRoom] = useSocket();

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>Join this channel</h2>
      <button
        className="join"
        onClick={() => {
          joinRoom(chatName, true);
          dispatch(createNewChannel(chatName));
        }}
      >
        Join
      </button>
    </motion.section>
  );
};

export default JoinChannel;
