import { useMemo } from "react";
// style
import "../../styles/Css/userIcon.css";

const UserIcon = ({ name, url, status, text, type, isChannel }) => {
  const randomColorGenerator = useMemo(
    () => Math.floor(Math.random() * 16777215).toString(16),
    []
  );

  return (
    <div className="userBox">
      <div className="userBox__left">
        <div
          className="icon online"
          className={`icon ${
            type === "message" && !isChannel ? "online" : null
          }`}
          style={{ backgroundColor: "#" + randomColorGenerator }}
        >
          {url ? <img src={url} alt="user icon" /> : name.slice(0, 2)}
        </div>
        <div className="text">
          <h3>{name}</h3>
          {status ? <span>{status}</span> : null}
          {text ? <span>{text.content}</span> : null}
        </div>
      </div>

      {type === "message" && (
        <div className="userBox__right">
          <span className="time">{text ? text.time : null}</span>
          <br />
          <span className="unread">2</span>
        </div>
      )}
    </div>
  );
};

export default UserIcon;
