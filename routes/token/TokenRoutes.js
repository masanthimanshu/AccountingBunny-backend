import { Router } from 'express'
import {
  generateAuthToken,
  verifyRefreshToken,
  decodeRefreshToken
} from '../../utils/token.js'

export const routes = Router()

const refreshTokenHandler = (req, res, next) => {
  const { refresh } = req.headers

  if (!refresh) {
    res.status(401).send({ message: 'Token not provided' })
  }

  if (verifyRefreshToken(refresh)) next()
  else res.status(401).send({ message: 'Invalid refresh token' })
}

routes.get('/refresh', refreshTokenHandler, (req, res) => {
  const { refresh } = req.headers

  const data = decodeRefreshToken(refresh).data
  const authToken = generateAuthToken(data)

  res.send({ status: 'Success', authToken })
})
