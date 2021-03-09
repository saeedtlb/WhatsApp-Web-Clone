// svgs
import { ReactComponent as Message } from "../../../styles/icons/message.svg";
import { ReactComponent as Call } from "../../../styles/icons/call.svg";
import { ReactComponent as Status } from "../../../styles/icons/status.svg";
// style
import "../../../styles/Css/navigation.css";
// animation
import { motion } from "framer-motion";

const container = {
  show: {
    transition: {
      staggerChildren: 0.6,
      delay: 0.8,
    },
  },
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

const Navigation = () => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="navigation"
  >
    <motion.div variants={item} className="message__icon">
      <Message />
      <h5>message</h5>
    </motion.div>
    <motion.div variants={item} className="call__icon">
      <Call />
      <h5>call</h5>
    </motion.div>
    <motion.div variants={item} className="status">
      <Status />
      <h5>status</h5>
    </motion.div>
  </motion.div>
);

export default Navigation;
