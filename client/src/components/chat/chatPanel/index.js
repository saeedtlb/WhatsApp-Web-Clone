import React from "react";
// components
import Navigation from "./Navigation";
import Contacts from "./Contacts";
import Message from "./Message";
// style
import "../../../styles/Css/chat.css";

const ChatPanel = () => (
  <div className="chat__panel">
    <Navigation />
    <Contacts />
    <Message />
  </div>
);

export default ChatPanel;
