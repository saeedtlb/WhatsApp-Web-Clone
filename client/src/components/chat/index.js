import React, { useEffect } from "react";
// custom hook
import { useCreateSocket } from "../../hook/useSocket";
// components
import Header from "./Header";
import ChatPanel from "./chatPanel";
// store
import { connect } from "react-redux";

const Chat = ({ user, currentChat, history }) => {
  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
  }, [user, history]);

  useCreateSocket(user);

  return (
    <main style={{ height: "100%" }}>
      <Header username={user} currentChat={currentChat} />
      <ChatPanel />
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.username,
  currentChat: state.currentChat,
});

export default connect(mapStateToProps)(Chat);
