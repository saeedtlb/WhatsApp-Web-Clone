// emoji
import Picker from "emoji-picker-react";
// animate
import { motion } from "framer-motion";

const emoji_variants = {
  show: { scale: 1, opacity: 1 },
  hide: { scale: 0, opacity: 0 },
};

const Emoji = ({ emoji, setEmoji, setMessage }) => {
  const selectEmoji = (e, emojiObj) => {
    e.stopPropagation();
    setMessage(message => message + emojiObj.emoji);
  };

  return (
    <motion.div
      className="emoji__picker"
      variants={emoji_variants}
      animate={emoji ? "show" : "hide"}
      onMouseLeave={() => setEmoji(false)}
    >
      <Picker
        preload={true}
        native={true}
        disableAutoFocus={true}
        onEmojiClick={selectEmoji}
      />
    </motion.div>
  );
};

export default Emoji;
