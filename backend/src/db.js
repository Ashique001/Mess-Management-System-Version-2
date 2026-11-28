// One shared MongoDB connection. Serverless platforms reuse a running instance
// for many requests, so the connection is opened once and then kept.

import mongoose from 'mongoose'

let ready = null
const startupTasks = []

/** Registers work to do once after connecting, such as creating accounts. */
export const onConnect = (task) => startupTasks.push(task)

async function open(uri) {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000, maxPoolSize: 10 })
  // Unique indexes must exist before the first write.
  await Promise.all(Object.values(mongoose.models).map((model) => model.init()))
  for (const task of startupTasks) await task()
}

export function connectDb(uri) {
  ready ??= open(uri).catch(async (error) => {
    ready = null // Try again on the next request.
    await mongoose.disconnect().catch(() => {})
    throw error
  })
  return ready
}

export async function disconnectDb() {
  ready = null
  await mongoose.disconnect()
}
