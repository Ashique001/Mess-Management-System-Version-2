// Starts the API as a normal server, for local development or a Node host.

import app from './app.js'
import { configProblems, getConfig } from './config.js'
import { connectDb, disconnectDb } from './db.js'

const config = getConfig()
const problems = configProblems(config)

if (problems.length) {
  console.error('Cannot start. Please fix backend/.env (see .env.example):')
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

try {
  await connectDb(config.mongodbUri)
} catch (error) {
  console.error(`Cannot connect to MongoDB: ${error.message}`)
  process.exit(1)
}

const server = app.listen(config.port, (error) => {
  if (error) {
    console.error(`Cannot listen on port ${config.port}: ${error.message}`)
    process.exit(1)
  }
  console.log(`API running at http://localhost:${config.port}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => {
    server.close(async () => {
      await disconnectDb()
      process.exit(0)
    })
  })
}
