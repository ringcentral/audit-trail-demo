
import { RingCentralUser } from '../models/ringcentral'
import basicAuth from 'express-basic-auth'
import dayjs from 'dayjs'

const {
  RINGCENTRAL_ADMIN_USERNAME,
  RINGCENTRAL_ADMIN_PASSWORD,
  INTERVAL = 15
} = process.env

const auth = basicAuth({
  users: {
    [RINGCENTRAL_ADMIN_USERNAME]: RINGCENTRAL_ADMIN_PASSWORD
  }
})

// create database tables if not exists
const initDb = async (req, res) => {
  await RingCentralUser.sync()
  res.send('ok')
}

const viewUser = async (req, res) => {
  const users = await RingCentralUser.findAll()
  res.send(users)
}

async function handlerHistory (user, config) {
  const opts = {
    eventTimeFrom: dayjs().add(-INTERVAL, 'minute').toISOString(),
    eventTimeTo: dayjs().toISOString(),
    perPage: 10000
  }
  const history = await user.getAuditTrail(opts)
  console.log('histroy', history)
  const filtered = await config.filter(history)
  if (filtered.length) {
    await config.onEvent(filtered)
  }
}

function createAction (config) {
  return async function action (req, res) {
    const users = await RingCentralUser.findAll()
    for (const user of users) {
      await handlerHistory(user, config)
    }
    res.send('ok')
  }
}

export default (app, config) => {
  app.put('/admin/setup-database', auth, initDb)
  app.get('/admin/view-user', auth, viewUser)
  app.post('/admin/action', auth, createAction(config))
}
