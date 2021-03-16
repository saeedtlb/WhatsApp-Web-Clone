import React, { useState, useMemo, useEffect, useRef } from "react";
// style
import "../../../styles/Css/message.css";
// redux Store
import { connect, useDispatch } from "react-redux";
import { setMessages } from "../../../actions";
// custom hook
import { useSocket } from "../../../hook/useSocket";
// animate
import { motion } from "framer-motion";

const Message = ({
  currentChat: { isChannel, chatName, reciever_id },
  username,
  messages,
  typing,
  _id,
}) => {
  const [message, setMessage] = useState("");
  const [sendMessage, isTyping] = useSocket();
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const dateOptions = ["en-US", { hour: "2-digit", minute: "2-digit" }];

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = () => {
    const content = message.trim();

    // is empty?
    if (!content) return;

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

  const handleBackSpace = (e) => {
    if (e.key === "Backspace") {
      const { rows, value } = e.target;

      const lines = value.split("\n");

      if (lines[lines.length - 1] === "") {
        e.target.rows = rows > 2 ? rows - 1 : rows;
      }
    }
  };

  const handleKeyPress = (e) => {
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

  const typingStatus = (status) => {
    const payload = {
      username,
      typing: status,
      to: isChannel ? chatName : reciever_id,
    };

    isTyping(payload);
  };

  const typingUsers = useMemo(() => {
    console.log("come");
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

  return (
    <div className="message">
      <div className="message__texts" ref={scrollRef}>
        {messages[chatName] ? renderMessages : null}
        {typingUsers}
      </div>
      <div className="communication">
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeIn" }}
        >
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onKeyDown={handleBackSpace}
            onFocus={() => typingStatus(true)}
            onBlur={() => typingStatus(false)}
          />
          <button onClick={() => console.log("record voice")} />
        </motion.form>
      </div>
    </div>
  );
};

// send store values as props to component
const mapStateToProps = (state) => ({
  currentChat: state.currentChat,
  username: state.username,
  messages: state.messages,
  typing: state.typing,
  _id: state.socket_id,
});

export default connect(mapStateToProps)(Message);
