const router = require('express').Router()
const data = require('./data')
const { GameInfo } = require('./models')

router.get('/', (req, res) => {
  res.json(data.getAllSessions())
})

router.get('/available', (req, res) => {
  res.json(data.getAllAvailableSessions())
})

router.get('/past', async (req, res) => {
  const pastGameInfo = await GameInfo.find({})
  res.json(pastGameInfo)
})

router.post('/', (req, res) => {
  const sessionNumber = data.createSession(req.body.creatorName)
  res.status(201).json({ sessionNumber })
})

router.put('/:sessionNum', (req, res) => {
  const sessionNum = req.params.sessionNum
  const isJoinSuccessful = data.joinSession(sessionNum, req.body.playerName)
  if (isJoinSuccessful) {
    res.json(data.getSession(sessionNum))
  } else {
    res
      .status(404)
      .json({
        error:
          'Cannot join the session. Either the session does not exist or it is already full.',
      })
  }
})

router.delete('/:sessionNum', (req, res) => {
  const sessionNum = req.params.sessionNum
  const isSuccessful = data.deleteSession(sessionNum)
  if (isSuccessful) {
    res.status(204).end()
  } else {
    res.status(404).json({error: 'Session with given number does not exist.'})
  }
})

module.exports = router
