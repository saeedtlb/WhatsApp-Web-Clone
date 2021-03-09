import React, { useState, useMemo } from "react";
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
  //   socket,
}) => {
  const [message, setMessage] = useState("");
  const [sendMessage] = useSocket();
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    const content = message.trim();

    // is empty?
    if (!content) return;

    // send message information to server
    const payload = {
      content,
      chatName,
      isChannel,
      sender: username,
      to: isChannel ? chatName : reciever_id,
    };
    sendMessage(payload);

    // create a new messages to store
    const newMessages = [
      ...messages[chatName],
      {
        sender: username,
        content,
      },
    ];
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
          {_message.content}
        </div>
      )),
    [messages[chatName], username, chatName]
  );

  return (
    <div className="message">
      <div className="message__texts">{renderMessages}</div>
      <div className="communication">
        <motion.form
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeIn" }}
        >
          <textarea
            name="message"
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              } else if (e.shiftKey) {
                let { rows } = e.target;
                e.target.rows = rows < 5 ? rows + 1 : rows;
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                let { rows, value } = e.target;

                const lines = value.split("\n");

                if (lines[lines.length - 1] === "") {
                  e.target.rows = rows > 2 ? rows - 1 : rows;
                }
              }
            }}
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
});

export default connect(mapStateToProps)(Message);
