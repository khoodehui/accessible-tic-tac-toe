const router = require('express').Router()
const data = require('./data')

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
    res.status(404).json({ error: "Cannot join the session. Either the session does not exist or it is already full."})
  }
})

module.exports = router
