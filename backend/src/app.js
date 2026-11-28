// The Express application. Vercel runs this file as a serverless function (it
// uses the default export); src/local.js runs it as a normal server.

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { getConfig } from './config.js'
import { requireDatabase } from './middleware/database.js'
import { errorHandler, notFoundHandler } from './middleware/errors.js'

const app = express()

// Vercel and most hosts put one proxy in front, which tells us the real IP.
app.set('trust proxy', 1)

app.use(helmet())
app.use(
  cors({
    origin: (origin, callback) => callback(null, getConfig().corsOrigins.includes(origin)),
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
  }),
)
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
app.use(express.json({ limit: '100kb' }))

app.get('/', (req, res) => res.json({ name: 'Mess Meal Management API' }))
app.get('/api/health', requireDatabase, (req, res) => res.json({ status: 'ok' }))

app.use(notFoundHandler)
app.use(errorHandler)

export default app
