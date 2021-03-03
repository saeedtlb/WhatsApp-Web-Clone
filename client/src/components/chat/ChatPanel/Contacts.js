import React from 'react'
// style
import '../../../styles/Css/contacts.css'

import addMore from '../../../styles/icons/addMore.png'

const Contacts = () => {
  return (
    <div className="contacts">
      <div className="filter">unread</div>
      <div className="contacts__box"></div>
      <div className="bottom">
        <h2>You've reached the end.</h2>
        <h3>Addmore friends!</h3>
        <img src={addMore} alt="add more friends" />
      </div>
    </div>
  )
}

export default Contacts
