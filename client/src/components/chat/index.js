import React, { useEffect } from 'react'
// custom hook
import useSocket from '../../hook/useSocket'
// components
import Header from './Header'
import ChatPanel from './chatPanel'
// store
import { connect } from 'react-redux'

const Chat = ({ user, history }) => {
  useEffect(() => {
    if (!user) {
      history.push('/')
      return
    }
  }, [user])

  useSocket(user)

  return (
    <main style={{ height: '100%' }}>
      <Header username={user} />
      <ChatPanel />
    </main>
  )
}

const mapStateToProps = (state) => ({
  user: state.name
})

export default connect(mapStateToProps)(Chat)
