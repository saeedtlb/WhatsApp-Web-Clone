import { useState, useMemo, useEffect, useRef } from "react";
import MessageForm from "../../misc/message/MessageForm";
// helpers
import JoinChannel from "../../misc/message/JoinChannel";
import { connect } from "react-redux";
// animate
import { motion } from "framer-motion";
// style
import "../../../styles/Css/message.css";

const Message = ({
  currentChat: { isChannel, chatName },
  username,
  messages,
  typing,
  channels,
  _id
}) => {
  //   const [emoji, setEmoji] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const renderMessages = useMemo(
    () =>
      messages[chatName].texts.map((_message, i) => (
        <div
          key={i}
          className={`${_message.sender === username ? "myself" : "other"}`}
        >
          {isChannel && _message.sender !== username && (
            <h5>{_message.sender}</h5>
          )}
          <div className="chat__content">
            {_message.content}
            <span>{_message.time}</span>
          </div>
        </div>
      )),
    [username, chatName, isChannel, messages]
  );

  const typingUsers = useMemo(() => {
    const to = isChannel ? chatName : _id;
    const show = typing.isTyping && typing.users[to] && typing.users[to].length;

    return show ? (
      <motion.div
        className="typing"
        initial={{ x: "-100%" }}
        animate={show ? { x: 0 } : { x: "-100%" }}
      >
        {typing.users[to].slice(0, 2).join(", ")} is typing
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </motion.div>
    ) : null;
  }, [typing, _id, chatName, isChannel]);

  //   const handleEmojiPicker = (e, open = false) => {
  //     e.preventDefault();

  //     open && setEmoji(true);
  //     if (emoji && !open) setEmoji(false);
  //   };

  return (
    <div className="message">
      {channels.includes(chatName) ? (
        <JoinChannel chatName={chatName} />
      ) : (
        <>
          <div className="message__texts" ref={scrollRef}>
            {messages[chatName] ? renderMessages : null}
          </div>
          {typingUsers}

          <MessageForm
          // emoji={emoji}
          // setEmoji={setEmoji}
          // handleEmojiPicker={handleEmojiPicker}
          />
        </>
      )}
    </div>
  );
};

// send store values as props to component
const mapStateToProps = state => ({
  currentChat: state.currentChat,
  username: state.username,
  messages: state.messages,
  typing: state.typing,
  channels: state.channels,
  _id: state.socket_id
});

export default connect(mapStateToProps)(Message);
