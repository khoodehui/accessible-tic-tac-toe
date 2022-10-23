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

const getAllSessions = () => {
  const res = []
  for (const sessionNum in sessions) {
    res.push({sessionNum, ...sessions[sessionNum]})
  }
  console.log(res)
  return res
}

const getAllAvailableSessions = () => {
  const res = []
  for (const sessionNum in sessions) {
    if (!sessions[sessionNum].playerTwoName) {
      res.push({sessionNum, ...sessions[sessionNum]})
    }
  }
  return res
}

module.exports = {
  createSession,
  joinSession,
  getSession,
  getAllSessions,
  getAllAvailableSessions,
}
