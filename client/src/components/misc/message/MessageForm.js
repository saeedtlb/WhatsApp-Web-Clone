import { useState } from "react";
// components
import Emoji from "../message/Emoji";
import TextArea from "./TextArea";
// animate
import { motion } from "framer-motion";
// style
import { ReactComponent as Microphone } from "../../../styles/icons/microphone.svg";

const MessageForm = ({ emoji, setEmoji, handleEmojiPicker }) => {
  const [message, setMessage] = useState("");

  const recording = (e, status = false) => {
    if (status) {
      e.target.classList.add("active");
    } else {
      e.target.classList.remove("active");
    }
  };

  return (
    <>
      <Emoji emoji={emoji} setEmoji={setEmoji} setMessage={setMessage} />

      <div className="communication">
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeIn" }}
        >
          <TextArea message={message} setMessage={setMessage} />

          <div className="btns">
            <button
              className="emoji"
              onMouseEnter={e => handleEmojiPicker(e, true)}
              onClick={handleEmojiPicker}
            />
            <button
              className="voice"
              onMouseDown={e => recording(e, true)}
              onMouseUp={recording}
            >
              <Microphone />
            </button>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default MessageForm;
