import '../../styles/Css/userIcon.css'

const UserIcon = ({ name, url }) => {
  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16)

  return (
    <div className="userBox">
      <h2>{name}</h2>
      <div className="icon" style={{ backgroundColor: '#' + randomColor() }}>
        {url ? <img src={url} alt="user icon" /> : name.slice(0, 2)}
      </div>
    </div>
  )
}

export default UserIcon
