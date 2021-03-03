import '../../styles/Css/userIcon.css'

const UserIcon = ({ name, url, additional, status }) => {
  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16)

  return (
    <div className={`userBox ${additional && additional}`}>
      <div className="text">
        <h3>{name}</h3>
        <span>{status}</span>
      </div>
      <div className="icon" style={{ backgroundColor: '#' + randomColor() }}>
        {url ? <img src={url} alt="user icon" /> : name.slice(0, 2)}
      </div>
    </div>
  )
}

export default UserIcon
