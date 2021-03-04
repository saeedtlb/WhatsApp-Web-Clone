import { NAME, SOCKET } from './type'

export const setUserName = (name) => ({
  type: NAME,
  name
})

export const setMySocket = (socket) => ({
  type: SOCKET,
  socket
})
