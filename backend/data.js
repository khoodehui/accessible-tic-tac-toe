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

module.exports = {
  createSession,
}
