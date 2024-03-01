import cors from 'cors'
import express from 'express'
import { connect } from 'mongoose'
import * as router from './routes/routes.js'
import { verifyAuthToken, verifyRefreshToken } from './utils/token.js'

const port = process.env.PORT
const database = process.env.DATABASE_URL

const app = express()

app.use(cors())
app.use(express.json())
app.set('trust proxy', true)

app.use('/secure', (req, res, next) => {
  const { refresh } = req.headers
  const { authorization } = req.headers

  if (!authorization || !refresh) {
    res.status(401).send({
      message: 'Token not provided'
    })
  }

  if (verifyAuthToken(authorization) && verifyRefreshToken(refresh)) next()
  else res.status(401).send({ message: 'Invalid token' })
})

app.use('/auth', router.authRoutes)
app.use('/token', router.tokenRoutes)

app.use('/secure/profile', router.profileRoutes)
app.use('/secure/salesperson', router.salespersonRoutes)

app.get('/', (req, res) => {
  res.send({ message: "It's Working 🔥", ip: req.ip })
})

app.get('/secure/verify-token', (req, res) => {
  res.send({ status: 'Success', message: 'User is valid' })
})

app.listen(port, () => {
  console.log(`Active on http://localhost:${port}`)
})

connect(database).then(() => console.log('Database Connected'))
