const { GameInfo } = require('./models')

const sessions = {}
let curSessionNumber = 0

const gameWinningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const createSession = creatorName => {
  curSessionNumber++
  sessions[curSessionNumber] = {
    dateTimeCreated: new Date().toISOString(),
    playerTwoJoinDateTime: null,
    dateTimeCompleted: null,
    playerOneName: creatorName,
    playerOneMoves: [],
    playerTwoName: null,
    playerTwoMoves: [],
    winnerName: null,
  }
  return curSessionNumber
}

const joinSession = (sessionNum, playerName) => {
  // session with number not found
  if (!sessions[sessionNum]) {
    return false
  }
  // already has another player
  if (sessions[sessionNum].playerTwoName) {
    return false
  }
  sessions[sessionNum].playerTwoName = playerName
  sessions[sessionNum].playerTwoJoinDateTime = new Date().toISOString()
  return true
}

const getSession = sessionNum => {
  return sessions[sessionNum]
}

const getAllSessions = () => {
  const res = []
  for (const sessionNum in sessions) {
    res.push({ sessionNum, ...sessions[sessionNum] })
  }
  return res
}

const getAllAvailableSessions = () => {
  const res = []
  for (const sessionNum in sessions) {
    if (!sessions[sessionNum].playerTwoName) {
      res.push({ sessionNum, ...sessions[sessionNum] })
    }
  }
  return res
}

const recordMove = (sessionNum, playerNum, squareNum) => {
  if (!sessions[sessionNum]) return
  if (playerNum === 1) {
    sessions[sessionNum].playerOneMoves.push(squareNum)
  } else if (playerNum === 2) {
    sessions[sessionNum].playerTwoMoves.push(squareNum)
  } else {
    return
  }
}

const checkIfWin = (sessionNum, playerNum) => {
  if (!sessions[sessionNum]) return
  if (playerNum !== 1 && playerNum !== 2) return

  const session = sessions[sessionNum]

  const playerMoves = new Set(
    playerNum === 1 ? session.playerOneMoves : session.playerTwoMoves
  )

  if (playerMoves.size < 3) return false

  for (let i = 0; i < gameWinningLines.length; i++) {
    const [a, b, c] = gameWinningLines[i]
    if (playerMoves.has(a) && playerMoves.has(b) && playerMoves.has(c)) {
      session.dateTimeCompleted = new Date().toISOString()
      session.winnerName =
        playerNum === 1 ? session.playerOneName : session.playerTwoName
      const gameInfo = new GameInfo({ sessionNum, ...session })
      gameInfo.save()
      return true
    }
  }
  return false
}

const checkIfBoardFilled = sessionNum => {
  const session = sessions[sessionNum]
  const totalMoves =
    session.playerOneMoves.length + session.playerTwoMoves.length
  if (totalMoves < 9) return false
  session.dateTimeCompleted = new Date().toISOString()
  const gameInfo = new GameInfo({ sessionNum, ...session, winnerName: 'none' })
  gameInfo.save()
  return true
}

const deleteSession = sessionNum => {
  if (!sessions[sessionNum]) return false
  delete sessions[sessionNum]
  return true
}

module.exports = {
  createSession,
  joinSession,
  getSession,
  getAllSessions,
  getAllAvailableSessions,
  recordMove,
  checkIfWin,
  checkIfBoardFilled,
  deleteSession,
}
