import { useState, useMemo, useEffect, useRef } from "react";
// helpers
import { handleBackSpace } from "../../misc/helpers";
import JoinChannel from "../../misc/message/JoinChannel";
import Emoji from "../../misc/message/Emoji";
// style
import "../../../styles/Css/message.css";
import { ReactComponent as Microphone } from "../../../styles/icons/microphone.svg";
// redux Store
import { connect, useDispatch } from "react-redux";
import { setMessages } from "../../../actions";
// custom hook
import { useSocket } from "../../../hook/useSocket";
// animate
import { motion } from "framer-motion";
// send audio
import audio from "../../../assets/send.wav";

const Message = ({
  currentChat: { isChannel, chatName, reciever_id },
  username,
  messages,
  typing,
  channels,
  _id,
}) => {
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [sendMessage, isTyping] = useSocket();
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const dateOptions = ["en-US", { hour: "2-digit", minute: "2-digit" }];
  const sendAudio = new Audio(audio);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = () => {
    const content = message.trim();
    // is empty?
    if (!content) return;

    // play a sending sound
    sendAudio.play();

    // get time
    const time = new Date().toLocaleTimeString(...dateOptions);

    // create a new messages to store
    const newMessages = {
      content,
      sender: username,
      time,
    };
    dispatch(setMessages(newMessages, chatName));

    // send message information to server
    const payload = {
      ...newMessages,
      chatName,
      isChannel,
      to: isChannel ? chatName : reciever_id,
    };
    sendMessage(payload);

    // clear the message box
    setMessage("");
  };

  const renderMessages = useMemo(
    () =>
      messages[chatName].map((_message, i) => (
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

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        const { rows } = e.target;
        e.target.rows = rows < 4 ? rows + 1 : rows;
      } else {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  const typingStatus = status => {
    const payload = {
      username,
      typing: status,
      to: isChannel ? chatName : reciever_id,
    };

    isTyping(payload);
  };

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

  const handleEmojiPicker = (e, open = false) => {
    e.preventDefault();

    open && setEmoji(true);
    if (emoji && !open) setEmoji(false);
  };

  const recording = (e, status = false) => {
    if (status) {
      e.target.classList.add("active");
    } else {
      e.target.classList.remove("active");
    }
  };

  return (
    <div className="message" onClick={handleEmojiPicker}>
      {channels.includes(chatName) ? (
        <JoinChannel chatName={chatName} />
      ) : (
        <>
          <div className="message__texts" ref={scrollRef}>
            {messages[chatName] ? renderMessages : null}
          </div>
          {typingUsers}

          <Emoji emoji={emoji} setEmoji={setEmoji} setMessage={setMessage} />

          <div className="communication">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeIn" }}
            >
              <textarea
                name="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                onKeyDown={handleBackSpace}
                onFocus={() => typingStatus(true)}
                onBlur={() => typingStatus(false)}
              />
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
  _id: state.socket_id,
});

export default connect(mapStateToProps)(Message);
