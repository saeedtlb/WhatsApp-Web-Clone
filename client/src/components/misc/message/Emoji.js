// emoji
import { EmojiPicker } from "react-twemoji-picker";
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import "react-twemoji-picker/dist/EmojiPicker.css";
// animate
import { motion } from "framer-motion";
// helper
import { onEmojiClick } from "../../misc/helpers";

const emoji_variants = {
  show: { scale: 1, opacity: 1 },
  hide: { scale: 0, opacity: 0 },
};

const Emoji = ({ emoji, setEmoji, setMessage }) => {
  const emojiData = Object.freeze(EmojiData);

  const selectEmoji = _emoji => {
    const emj = onEmojiClick(_emoji);
    setMessage(message => message + emj);
  };

  return (
    <motion.div
      className="emoji__picker"
      variants={emoji_variants}
      animate={emoji ? "show" : "hide"}
      onMouseLeave={() => setEmoji(false)}
    >
      <EmojiPicker
        emojiData={emojiData}
        showNavbar={true}
        onEmojiSelect={selectEmoji}
      />
    </motion.div>
  );
};

export default Emoji;
