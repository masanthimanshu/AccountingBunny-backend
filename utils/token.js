import jwt from 'jsonwebtoken'

const authSecret = process.env.AUTH_TOKEN_SECRET
const refreshSecret = process.env.REFRESH_TOKEN_SECRET

export const generateAuthToken = (data) => {
  const token = jwt.sign({ data }, authSecret, { expiresIn: '1h' })
  return token
}

export const generateRefreshToken = (data) => {
  const token = jwt.sign({ data }, refreshSecret, { expiresIn: '4d' })
  return token
}

export const decodeAuthToken = (token) => {
  const decoded = jwt.verify(token, authSecret)
  return decoded
}

export const decodeRefreshToken = (token) => {
  const decoded = jwt.verify(token, refreshSecret)
  return decoded
}

export const verifyAuthToken = (token) => {
  try {
    jwt.verify(token, authSecret)
    return true
  } catch (err) {
    return false
  }
}

export const verifyRefreshToken = (token) => {
  try {
    jwt.verify(token, refreshSecret)
    return true
  } catch (err) {
    return false
  }
}
