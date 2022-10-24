const mongoose = require('mongoose')

const gameInfoSchema = new mongoose.Schema({
  dateTimeCreated: String,
  sessionNum: Number,
  playerTwoJoinDateTime: String,
  dateTimeCompleted: String,
  playerOneName: String,
  playerOneMoves: [Number],
  playerTwoName: String,
  playerTwoMoves: [Number],
  winnerName: String,
})

const GameInfo = mongoose.model('GameInfo', gameInfoSchema)

module.exports = { GameInfo }
