// Runs the API without any setup: a temporary database on this computer,
// filled with sample data. Everything is lost when it stops.  npm run demo

import { MongoMemoryServer } from 'mongodb-memory-server-core'
import app from '../src/app.js'
import { getConfig } from '../src/config.js'
import { connectDb, disconnectDb } from '../src/db.js'
import { createDemoData, DEMO_ACCOUNTS, DEMO_PASSWORD } from './demo-data.js'

if (process.env.NODE_ENV === 'production') {
  console.error('The demo is for your own computer only.')
  process.exit(1)
}

console.log('Starting a temporary database. The first time downloads MongoDB...')
const database = await MongoMemoryServer.create()
const uri = database.getUri('mess_meal_demo')

// The demo never reads or writes your real database.
process.env.MONGODB_URI = uri
delete process.env.SUPERADMIN_EMAIL

await connectDb(uri)
await createDemoData()

const { port } = getConfig()

async function stop(code) {
  await disconnectDb()
  await database.stop()
  process.exit(code)
}

const server = app.listen(port, async (error) => {
  if (error) {
    console.error(`Cannot listen on port ${port}: ${error.message}`)
    await stop(1)
  }
  console.log(`\nDemo API running at http://localhost:${port}`)
  console.log(`\nLogins (password for all: ${DEMO_PASSWORD})`)
  for (const { role, email } of DEMO_ACCOUNTS) console.log(`  ${role.padEnd(22)}${email}`)
  console.log('\nNow start the website:  cd ../frontend && npm run dev')
  console.log('Press Ctrl+C to stop.')
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => server.close(() => stop(0)))
}
