// components
import Navigation from "./Navigation";
import Contacts from "./Contacts";
import Message from "./Message";
// style
import "../../../styles/Css/chat.css";

const ChatPanel = ({ setChannelForm }) => (
  <div className="chat__panel">
    <Navigation />
    <Contacts setChannelForm={setChannelForm} />
    <Message />
  </div>
);

export default ChatPanel;
