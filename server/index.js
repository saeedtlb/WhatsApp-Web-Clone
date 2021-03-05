const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connect', (socket) => {
  const users = [{ username: 'omid' }, { username: 'baba' }, { username: 'mom' }, { username: 'akbar', online: true }]

  for (const [id, socket] of io.of('/').sockets) {
    users.push({
      userID: socket.id,
      username: socket.handshake.auth.username,
      online: true
    })
  }

  console.log('user connected')
  socket.emit('users', users)

  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.handshake.auth.username
  })

  socket.on('disconnect', () => console.log('offline', socket.id))
})

server.listen(PORT, () => console.log('Server up and running at ' + PORT))
