import { Router } from 'express'
import { decodeAuthToken } from '../../utils/token.js'
import { filterJSON } from '../../utils/filterData.js'
import { UserModel } from '../../database/model/user/UserModel.js'

export const routes = Router()

routes.get('/data', async (req, res) => {
  const { authorization } = req.headers

  const uid = decodeAuthToken(authorization).data

  try {
    const data = await UserModel.findById(uid)
    if (!data) {
      res.status(404).send({ message: 'User does not exists' })
    } else {
      res.send(filterJSON(data))
    }
  } catch (err) {
    res.status(502).send({ error: err.message })
  }
})

routes.post('/edit', async (req, res) => {
  const { authorization } = req.headers

  const { name, company } = req.body
  const uid = decodeAuthToken(authorization).data

  if (!name || !company) {
    return res.status(400).send({
      error: 'Missing required fields'
    })
  }

  try {
    await UserModel.findByIdAndUpdate(uid, { name, company })
    res.send({
      status: 'Success',
      message: 'Data updates successfully'
    })
  } catch (err) {
    res.status(502).send({ error: err.message })
  }
})
