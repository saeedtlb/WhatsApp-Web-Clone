// custom hook
import { useSocket } from "../../../hook/useSocket";
// redux Store
import { connect, useDispatch } from "react-redux";
import { setMessages } from "../../../actions";
// send audio
import audio from "../../../assets/send.wav";

const TextArea = ({
  message,
  setMessage,
  currentChat: { isChannel, chatName, reciever_id },
  username
}) => {
  const [sendMessage, isTyping] = useSocket();
  const dispatch = useDispatch();
  const dateOptions = ["en-US", { hour: "2-digit", minute: "2-digit" }];
  const sendAudio = new Audio(audio);

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
      time
    };
    dispatch(setMessages(newMessages, chatName));

    // send message information to server
    const payload = {
      ...newMessages,
      chatName,
      isChannel,
      to: isChannel ? chatName : reciever_id
    };
    sendMessage(payload);

    // clear the message box
    setMessage("");
  };

  const typingStatus = status => {
    const payload = {
      username,
      typing: status,
      to: isChannel ? chatName : reciever_id
    };

    isTyping(payload);
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

  const handleBackSpace = e => {
    if (e.key === "Backspace") {
      const { rows, value } = e.target;

      const lines = value.split("\n");

      if (lines[lines.length - 1] === "") {
        e.target.rows = rows > 2 ? rows - 1 : rows;
      }
    }
  };

  return (
    <textarea
      name="message"
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyPress={handleKeyPress}
      onKeyDown={handleBackSpace}
      onFocus={() => typingStatus(true)}
      onBlur={() => typingStatus(false)}
    />
  );
};

const mapStateToProps = state => ({
  currentChat: state.currentChat,
  username: state.username,
  channels: state.channels
});

export default connect(mapStateToProps)(TextArea);
