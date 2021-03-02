import React from 'react'

import UserIcon from '../misc/UserIcon'

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <div className="top">
          <div className="logo">WhatsApp</div>
          <div className="search">
            <input type="text" name="search" placeholder="Search messages" autoComplete="off" />
          </div>
          <UserIcon name="saeed" />
        </div>
        <div className="bottom">
          <div className="chat_user">marry</div>
          <div className="icons">icon</div>
        </div>
      </div>
    </header>
  )
}

export default Header
