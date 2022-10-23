const sessions = {}
let curSessionNumber = 0

const createSession = creatorName => {
  curSessionNumber++
  sessions[curSessionNumber] = {
    dateCreated: new Date(),
    playerOneName: creatorName,
    playerTwoName: null,
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
  return true
}

const getSession = (sessionNum) => {
  return sessions[sessionNum]
}

module.exports = {
  createSession,
  joinSession,
  getSession,
}
