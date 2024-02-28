import { Router } from 'express'
import {
  verifyAuthToken,
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

const verifyTokenHandler = (req, res, next) => {
  const { refresh } = req.headers
  const { authorization } = req.headers

  if (!authorization || !refresh) {
    res.status(401).send({ message: 'Token not provided' })
  }

  if (verifyAuthToken(authorization) && verifyRefreshToken(refresh)) next()
  else res.status(401).send({ message: 'Invalid token' })
}

routes.get('/refresh', refreshTokenHandler, (req, res) => {
  const { refresh } = req.headers

  const data = decodeRefreshToken(refresh).data
  const authToken = generateAuthToken(data)

  res.send({ status: 'Success', authToken })
})

routes.get('/verify', verifyTokenHandler, (req, res) => {
  res.send({ status: 'Success', message: 'User is valid' })
})
