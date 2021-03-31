import { useRef, useState } from "react";
// icon
import { ReactComponent as Close } from "../../styles/icons/close.svg";
// style
import "../../styles/Css/channel.css";
// animate
import { motion, AnimatePresence } from "framer-motion";
// redux
import { connect, useDispatch } from "react-redux";
import { createNewChannel } from "../../actions";
// custom hook
import { useSocket } from "../../hook/useSocket";

const CreateChannel = ({ channelForm, setChannelForm, rooms }) => {
  const [channelName, setChannelName] = useState("");
  const [err, setErr] = useState([false, ""]);
  const [, , , createRoom] = useSocket();
  const ref = useRef();
  const dispatch = useDispatch();

  const newChannel = (e) => {
    e.preventDefault();

    const name = channelName.trim().toLowerCase();

    if (!name) {
      setErr([true, "Dont leave box empty"]);
      return;
    } else if (name.length > 20) {
      setErr([true, "Channel name must be less than 20 chars"]);
      return;
    } else if (rooms.includes(name)) {
      setErr([true, "This Channel has already created"]);
      return;
    }

    createRoom(name);
    dispatch(createNewChannel(name));
    setChannelForm(false);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {channelForm && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={({ target }) =>
            target === ref.current && setChannelForm(false)
          }
          className="channel__form"
        >
          <form onSubmit={newChannel}>
            <section>
              <h3>create your channel</h3>
              <span>
                <Close onClick={() => setChannelForm(false)} />
              </span>
            </section>
            <div>
              <label>channel name:</label>
              <input
                autoFocus={true}
                type="text"
                placeholder="javaScript"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                onFocus={() => err[0] && setErr([false, ""])}
              />
              <div className="error">
                <motion.p
                  animate={
                    err[0]
                      ? {
                          y: 0,
                          height: "auto",
                        }
                      : {
                          y: "100%",
                          height: 0,
                        }
                  }
                >
                  {err[1]}
                </motion.p>
              </div>
              <input type="submit" value="create" />
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const mapStateToProps = (store) => ({
  rooms: store.connectedRooms,
});

export default connect(mapStateToProps)(CreateChannel);
