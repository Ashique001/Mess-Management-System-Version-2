// Starts a throw-away MongoDB for a test file and empties it before each test.

import { MongoMemoryServer } from 'mongodb-memory-server-core'
import mongoose from 'mongoose'
import { afterAll, beforeAll, beforeEach } from 'vitest'
import { connectDb, disconnectDb } from '../src/db.js'

export function useTestDatabase() {
  let server

  beforeAll(async () => {
    server = await MongoMemoryServer.create()
    process.env.MONGODB_URI = server.getUri('mess_meal_test')
    process.env.JWT_SECRET = 'test-secret-that-is-long-enough-for-the-checks'
    await connectDb(process.env.MONGODB_URI)
  })

  beforeEach(async () => {
    const collections = Object.values(mongoose.connection.collections)
    await Promise.all(collections.map((collection) => collection.deleteMany({})))
  })

  afterAll(async () => {
    await disconnectDb()
    await server?.stop()
  })
}
