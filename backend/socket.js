const { Server } = require('socket.io')
const data = require('./data')
const { gameInfo } = require('./models')

let io

const init = (server, options) => {
  io = new Server(server, options)

  io.on('connection', socket => {
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
        const playerNum = isCreator ? 1 : 2
        data.recordMove(sessionNum, playerNum, clickedSquareNum)
        socket.to(sessionNum).emit('fill_square', newSquares)
        if (data.checkIfWin(sessionNum, playerNum)) {
          
          socket.emit('win_game')
          socket.to(sessionNum).emit('lose_game')
          return
        }
        if (data.checkIfBoardFilled(sessionNum)) {
          io.to(sessionNum).emit('draw_game')
        }
      }
    )
  })
}

module.exports = { init }
