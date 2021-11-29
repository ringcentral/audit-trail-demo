/**
 * bot control apis
 * /api
 */

import jwt from 'express-jwt'
import _ from 'lodash'
import { RingCentralUser } from '../models/ringcentral'

const jwtAuth = jwt({
  secret: process.env.SERVER_SECRET,
  algorithms: ['HS256']
})
const errHandler = function (err, req, res, next) {
  if (err && err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...')
  } else {
    next()
  }
}
const supportedActions = [
  'get-user',
  'op',
  'logout'
]
async function onAction (req, res) {
  const { user } = req
  if (!user) {
    res.status(401)
    return res.send('please login first')
  }
  const { body = {} } = req
  const {
    action
  } = body
  if (!supportedActions.includes(action)) {
    res.status(400)
    return res.send('not supported')
  }
  const { id } = user
  let result
  const userInst = await RingCentralUser.findByPk(id).catch(console.error)
  if (action === 'get-user') {
    result = userInst
    if (_.isEmpty(result)) {
      return res.status(401).send('user not exist')
    }
  }
  res.send(result)
}

export default (app) => {
  app.post('/api/action', jwtAuth, errHandler, onAction)
}
