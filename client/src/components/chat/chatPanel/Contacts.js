import React from "react";
// helper
import UserIcon from "../../misc/UserIcon";
// icon
import addMore from "../../../styles/icons/addMore.png";
// style
import "../../../styles/Css/contacts.css";
// redux
import { connect } from "react-redux";
// animate
import { motion } from "framer-motion";

const Contacts = ({ channels, users, name }) => {
  //   useEffect(() => {
  //     if (socket) {
  //       socket.on('users', (users) => sortUsers(users))
  //       socket.on('user connected', (user) => setUsers((prv) => [...prv, user]))
  //       socket.on('disconnect', (user) => console.log(user))
  //     }
  //   }, [socket])

  const renderRooms = (rooms) =>
    rooms
      ? rooms.map((room, i) => {
          const currentChat = {
            chatName: room,
            isChannel: true,
            reciever_id: "",
          };

          return (
            <div
              key={room || i}
              onClick={() =>
                console.log("toggle chat(current chat)" + currentChat)
              }
            >
              <UserIcon name={room} type="message" />
            </div>
          );
        })
      : null;

  const renderUsers = (users) =>
    users
      ? users.map((user) => {
          if (user.username === name) {
            return (
              <div key={user._id} style={{ backgroundColor: "red" }}>
                <UserIcon name={user.username} type="message" />
              </div>
            );
          }

          const currentChat = {
            chatName: user.username,
            isChannel: false,
            reciever_id: user._id,
          };

          return (
            <div
              key={user._id}
              onClick={() =>
                console.log("toggle chat(currentChat)" + currentChat)
              }
            >
              <UserIcon name={user.username} type="message" />
            </div>
          );
        })
      : null;

  return (
    <motion.div
      className="contacts"
      initial={{ y: "100%" }}
      animate={{ y: -70 }}
      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
    >
      <div className="filter">
        <label>
          <input type="checkbox" />
          <span></span>
        </label>
        <h4>unread only</h4>
      </div>

      <div className="contacts__box">
        {renderRooms(channels)}
        <hr />
        {renderUsers(users)}
      </div>

      <div className="bottom">
        <h2>You've reached the end.</h2>
        <h3>Addmore friends!</h3>
        <img src={addMore} alt="add more friends" />
      </div>
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  channels: state.connectedRooms,
  users: state.allUsers,
  name: state.username,
});

export default connect(mapStateToProps)(Contacts);
