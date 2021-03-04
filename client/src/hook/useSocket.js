import { useEffect } from 'react'
import { io } from 'socket.io-client'
// redux
import { useDispatch } from 'react-redux'
import { setMySocket } from '../actions/index'

let socket

const useSocket = (user) => {
  const dispatch = useDispatch()

  const ENDPOINT = 'http://localhost:5000'

  useEffect(() => {
    if (!user) return
    socket = io(ENDPOINT, { autoConnect: false })
    socket.auth = { username: user }
    socket.connect()
    dispatch(setMySocket(socket))
  }, [ENDPOINT])

  return socket
}

export default useSocket
