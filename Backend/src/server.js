const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const donorRouter = require('./routes/donor')
const recipientRouter = require('./routes/recipient')
const adminRouter = require('./routes/admin')

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: true, credentials: true } })
app.set('io', io)
app.use(cors({ origin: true, credentials: true }))
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/auth', authRouter)
app.use('/donor', donorRouter)
app.use('/recipient', recipientRouter)
app.use('/admin', adminRouter)

async function start() {
  const mongoUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/lifelink'
  await mongoose.connect(mongoUrl)
  const port = process.env.PORT || 4000
  server.listen(port, () => console.log(`API listening on ${port}`))
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
