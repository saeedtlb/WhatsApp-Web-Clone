import { useState, useMemo, useEffect, useRef } from "react";
// emoji
import Picker from "emoji-picker-react";
// style
import "../../../styles/Css/message.css";
import { ReactComponent as Microphone } from "../../../styles/icons/microphone.svg";
// redux Store
import { connect, useDispatch } from "react-redux";
import { setMessages, createNewChannel } from "../../../actions";
// custom hook
import { useSocket } from "../../../hook/useSocket";
// animate
import { motion } from "framer-motion";
// send audio
import audio from "../../../assets/send.wav";

const emoji_variants = {
  show: { scale: 1, opacity: 1 },
  hide: { scale: 0, opacity: 0 },
};

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
  const [sendMessage, isTyping, joinRoom] = useSocket();
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

    const time = new Date().toLocaleTimeString(...dateOptions);

    // send message information to server
    const payload = {
      content,
      chatName,
      isChannel,
      sender: username,
      to: isChannel ? chatName : reciever_id,
      time,
    };
    sendMessage(payload);

    // create a new messages to store
    const newMessages = {
      content,
      sender: username,
      time,
    };
    dispatch(setMessages(newMessages, chatName));

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

  const handleBackSpace = e => {
    if (e.key === "Backspace") {
      const { rows, value } = e.target;

      const lines = value.split("\n");

      if (lines[lines.length - 1] === "") {
        e.target.rows = rows > 2 ? rows - 1 : rows;
      }
    }
  };

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

  const startRecording = e => {
    e.target.classList.add("active");

    // start recording
  };

  const finishRecording = e => {
    e.target.classList.remove("active");
  };

  return (
    <div className="message" onClick={handleEmojiPicker}>
      {channels.includes(chatName) ? (
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
      ) : (
        <>
          <div className="message__texts" ref={scrollRef}>
            {messages[chatName] ? renderMessages : null}
          </div>
          {typingUsers}
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
              onEmojiClick={(e, emojiObj) => {
                e.stopPropagation();
                setMessage(message => message + emojiObj.emoji);
              }}
            />
          </motion.div>
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
                  onMouseDown={startRecording}
                  onMouseUp={finishRecording}
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
