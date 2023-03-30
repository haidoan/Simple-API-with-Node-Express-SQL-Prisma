const { connectDB } = require('./config/db')
const app = require('./app')
const server = require('http').createServer(app)
const port = process.env.PORT
server.listen(port, async () => {
  try {
    connectDB()
    console.log(`Server started at port ${port} at mode ${process.env.NODE_ENV}`)
  } catch (error) {
    console.log('App failed to start error ', error)
    process.exit(1)
  }
})
