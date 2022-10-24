const { Server } = require('socket.io')

let io

const init = (server, options) => {
  io = new Server(server, options)

  io.on('connection', socket => {
    console.log('A user connected')

    socket.on('join_session', sessionNum => {
      socket.join(sessionNum)
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
  })

  
}

module.exports = { init }
