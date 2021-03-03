import React from 'react'
// components
import Navigation from './Navigation'
import Contacts from './Contacts'
// style
import '../../../styles/Css/chat.css'

const ChatPanel = () => {
  return (
    <div className="chat__panel">
      <Navigation />
      <Contacts />
    </div>
  )
}

export default ChatPanel
