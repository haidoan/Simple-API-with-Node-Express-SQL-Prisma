require('./environment')
const { PrismaClient } = require('@prisma/client')

let client;
const connectDB = () => {
  try {
    client = new PrismaClient()
    console.log('Successfully connect db');
    return client;
  } catch (err) {
    console.log('[ERR]Could not connect DB', err)
    process.exit(1)
  }
}

const disconnectDB = async () => {
  try {
    const clientDb = getDBClient();
    if (clientDb) {
      await clientDb.$disconnect();
      console.log('DB is disconnected ')
    }
  } catch (error) {
    console.log('[ERR]Could not disconnect DB ', error)
    process.exit(1)
  }
}

const getDBClient = () => {
  return client;
}

module.exports = {
  connectDB,
  disconnectDB,
  getDBClient,
  client
}
