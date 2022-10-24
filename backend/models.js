const mongoose = require('mongoose')

const gameInfoSchema = new mongoose.Schema({
  sessionNum: { type: Number, require: true, unique: true },
  dateTimeCreated: String,
  playerTwoJoinDateTime: String,
  dateTimeCompleted: String,
  playerOneName: String,
  playerOneMoves: [Number],
  playerTwoName: String,
  playerTwoMoves: [Number],
  winnerName: String,
})

const gameInfo = mongoose.model('GameInfo', gameInfoSchema)

module.exports = { gameInfo }
