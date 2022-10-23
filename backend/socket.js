const { Server } = require('socket.io')

let io

const init = (server, options) => {
  io = new Server(server, options)

  io.on('connection', socket => {
    console.log('A user connected')
  })
}

module.exports = { init }
