import { RingCentralUser } from '../models/ringcentral'
import copy from 'json-deep-copy'
import jwt from 'jsonwebtoken'
import { pack, jwtPrefix, extraPath } from '../common/constants'

const {
  SERVER_SECRET,
  APP_HOME,
  RINGCENTRAL_APP_SERVER
} = process.env

export default async (req, res) => {
  const { code } = req.query
  const user = await RingCentralUser.init({ code })
  const token = jwt.sign({
    id: user.id
  }, SERVER_SECRET, { expiresIn: '120y' })
  const red = extraPath + APP_HOME

  const data = {
    redirect: red,
    title: pack.name,
    jwtPrefix,
    token,
    cdn: RINGCENTRAL_APP_SERVER
  }
  const view = 'oauth'
  data._global = copy(data)
  res.render(view, data)
}
