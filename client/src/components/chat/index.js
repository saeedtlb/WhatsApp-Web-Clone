import React from 'react'

// components
import Header from './Header'
import ChatPanel from './chatPanel'

const Chat = () => {
  return (
    <main style={{ height: '100%' }}>
      <Header />
      <ChatPanel />
    </main>
  )
}

export default Chat
