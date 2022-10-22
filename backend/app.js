const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./controller')
const config = require('./config')

console.log('Connecting to MongoDB')
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

module.exports = app
