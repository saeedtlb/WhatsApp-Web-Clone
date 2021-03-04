const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const PORT = process.env || 3001
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000/chat'
  }
})

io.on('connection', (socket) => {
  const users = []

  console.log(socket)
})

server.listen(PORT, () => console.log('Server up and running at ' + PORT))
