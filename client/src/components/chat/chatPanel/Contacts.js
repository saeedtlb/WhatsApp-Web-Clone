import React, { useEffect } from 'react'
// helper
import UserIcon from '../../misc/UserIcon'
// icon
import addMore from '../../../styles/icons/addMore.png'
// style
import '../../../styles/Css/contacts.css'
import { connect } from 'react-redux'

const Contacts = ({ socket }) => {
  useEffect(() => {
    if (!socket) return

    socket.on('users', (users) => console.log(users))
    socket.on('user connected', ({ username }) => alert(username))
  }, [socket])

  return (
    <div className="contacts">
      <div className="filter">
        <label>
          <input type="checkbox" />
          <span></span>
        </label>
        <h4>unread only</h4>
      </div>

      <div className="contacts__box">
        <div>
          <UserIcon
            name="kaiya rhiel madsen"
            text="I need a link to the predifined that and be aware of what you gonna do in future"
            type="message"
          />
        </div>
      </div>

      <div className="bottom">
        <h2>You've reached the end.</h2>
        <h3>Addmore friends!</h3>
        <img src={addMore} alt="add more friends" />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  socket: state.socket
})

export default connect(mapStateToProps)(Contacts)
