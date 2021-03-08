import React, { useState, useMemo } from "react";
// style
import "../../../styles/Css/message.css";
// redux Store
import { connect, useDispatch } from "react-redux";
import { setMessages } from "../../../actions";
// custom hook
import { useSocket } from "../../../hook/useSocket";

const Message = ({
  currentChat: { isChannel, chatName, reciever_id },
  username,
  messages,
  //   socket,
}) => {
  const [message, setMessage] = useState("");
  const [sendMessage] = useSocket();
  const dispatch = useDispatch();

  const handleSendMessage = (e) => {
    e.preventDefault();

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

  //   const renderMessages = useMemo(() => console.log(messages, chatName), [
  //     messages[chatName],
  //   ]);

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
    [messages[chatName]]
  );

  return (
    <div className="message">
      <div className="message__texts">{renderMessages}</div>
      <div className="communication">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button type="submit" />
        </form>
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
