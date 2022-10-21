const app = require('./app')
const config = require('./config')
const http = require('http')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`)
})
