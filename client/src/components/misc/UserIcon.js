import '../../styles/Css/userIcon.css'

const UserIcon = ({ name, url, status, text, type, online }) => {
  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16)

  return (
    <div className="userBox">
      <div className="userBox__left">
        <div className={`icon ${online && 'online'}`} style={{ backgroundColor: '#' + randomColor() }}>
          {url ? <img src={url} alt="user icon" /> : name.slice(0, 2)}
        </div>
        <div className="text">
          <h3>{name}</h3>
          {status ? <span>{status}</span> : <span>{text}</span>}
        </div>
      </div>

      {type === 'message' && (
        <div className="userBox__right">
          <span className="time">13:09</span>
          <br />
          <span className="unread">2</span>
        </div>
      )}
    </div>
  )
}

export default UserIcon
