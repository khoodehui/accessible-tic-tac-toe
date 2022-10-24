const { Server } = require('socket.io')
const data = require('./data')

let io

const init = (server, options) => {
  io = new Server(server, options)

  io.on('connection', socket => {
    console.log('A user connected')

    socket.on('join_session', ({ sessionNum, joinPlayerName, isCreator }) => {
      socket.join(sessionNum)
      //emit joiner name to the creator of the session
      socket.to(sessionNum).emit('opponent_joined', joinPlayerName)
      //emit creator name to the joiner of the session
      if (!isCreator) {
        socket.emit(
          'opponent_joined',
          data.getSession(sessionNum).playerOneName
        )
      }
    })

    socket.on(
      'square_click',
      ({ sessionNum, isCreator, clickedSquareNum, newSquares }) => {
        data.recordMove(sessionNum, isCreator ? 1 : 2, clickedSquareNum)
        socket.to(sessionNum).emit('fill_square', newSquares)
      }
    )

    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
  })
}

module.exports = { init }
