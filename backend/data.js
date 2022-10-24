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
    dateTimeCreated: new Date(),
    playerOneName: creatorName,
    playerOneMoves: new Set(),
    playerTwoName: null,
    playerTwoMoves: new Set(),
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
  sessions[sessionNum].playerTwoJoinDateTime = new Date()
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
  console.log(res)
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
    sessions[sessionNum].playerOneMoves.add(squareNum)
    console.log(sessions[sessionNum].playerOneMoves)
  } else if (playerNum === 2) {
    sessions[sessionNum].playerTwoMoves.add(squareNum)
    console.log(sessions[sessionNum].playerTwoMoves)
  } else {
    return
  }
}

const checkIfWin = (sessionNum, playerNum) => {
  if (!sessions[sessionNum]) return
  if (playerNum !== 1 && playerNum !== 2) return

  const playerMoves =
    playerNum === 1
      ? sessions[sessionNum].playerOneMoves
      : sessions[sessionNum].playerTwoMoves

  if (playerMoves.size < 3) return false

  for (let i = 0; i < gameWinningLines.length; i++) {
    const [a, b, c] = gameWinningLines[i]
    if (playerMoves.has(a) && playerMoves.has(b) && playerMoves.has(c)) {
      return true
    }
  }
  return false
}

module.exports = {
  createSession,
  joinSession,
  getSession,
  getAllSessions,
  getAllAvailableSessions,
  recordMove,
  checkIfWin,
}
