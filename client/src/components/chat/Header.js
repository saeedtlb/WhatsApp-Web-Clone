import React from "react";
// helper
import UserIcon from "../misc/UserIcon";
// svgs
import { ReactComponent as Call } from "../../styles/icons/call.svg";
import { ReactComponent as More } from "../../styles/icons/more.svg";
// style
import "../../styles/Css/header.css";

const Header = ({ username, currentChat }) => (
  <header>
    <div className="wrapper">
      <div className="top">
        <div className="logo">
          <span>WhatsApp</span>
        </div>
        <div className="search">
          <input
            type="text"
            name="search"
            placeholder="Search messages"
            autoComplete="off"
          />
        </div>
        <div className="user">
          <UserIcon name={username} />
        </div>
      </div>
      <div className="bottom">
        <div className="chat_user">
          {currentChat ? (
            <UserIcon name={currentChat.chatName} status="online" />
          ) : null}
        </div>
        <div className="icons">
          <div className="call">
            <Call />
          </div>
          <div className="more">
            <More />
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
