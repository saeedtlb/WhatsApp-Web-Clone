import React, { useEffect, useState } from 'react'
// helper
import UserIcon from '../../misc/UserIcon'
// icon
import addMore from '../../../styles/icons/addMore.png'
// style
import '../../../styles/Css/contacts.css'
import { connect } from 'react-redux'

const Contacts = ({ socket, name }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (socket) {
      socket.on('users', (users) => sortUsers(users))
      socket.on('user connected', (user) => setUsers((prv) => [...prv, user]))
      socket.on('disconnect', (user) => console.log(user))
    }
  }, [socket])

  const sortUsers = (users) => {
    const sortedList = users
      .filter((user) => user.username !== name)
      .sort((a, b) => {
        const x = a.username.toLowerCase()
        const y = b.username.toLowerCase()

        if (x < y) return -1
        if (x > y) return 1
        return 0
      })

    setUsers(sortedList)
  }

  const renderUsers = () =>
    users.map((user, i) => (
      <div key={user.userID || i}>
        <UserIcon name={user.username} type="message" online={user.online} />
      </div>
    ))

  return (
    <div className="contacts">
      <div className="filter">
        <label>
          <input type="checkbox" />
          <span></span>
        </label>
        <h4>unread only</h4>
      </div>

      <div className="contacts__box">{users && renderUsers()}</div>

      <div className="bottom">
        <h2>You've reached the end.</h2>
        <h3>Addmore friends!</h3>
        <img src={addMore} alt="add more friends" />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  socket: state.socket,
  name: state.name
})

export default connect(mapStateToProps)(Contacts)
