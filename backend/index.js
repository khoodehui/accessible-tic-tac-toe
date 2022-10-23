const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')
const router = require('./controller')
const config = require('./config')
const socket = require('./socket')

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

const server = http.createServer(app)
socket.init(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT']
  }
})

server.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`)
})
