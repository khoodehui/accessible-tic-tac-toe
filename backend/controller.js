const router = require('express').Router()
const data = require('./data')

router.post('/', (req, res) => {
  const sessionNumber = data.createSession(req.body.creatorName)
  res.status(201).json({ sessionNumber })
})

module.exports = router
