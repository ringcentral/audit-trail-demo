/**
 * User class
 */

import { RingCentralUser as RcUser } from './rc-user'
import { createRc } from '../common/constants'
import { refreshRcUser } from '../common/refresh-user'

export class RingCentralUser extends RcUser {}

RingCentralUser.init = async ({ code, state }) => {
  const rc = createRc()
  const token = await rc.platform().login({
    code
  }).then(d => d.json())
  const id = token.owner_id + ''
  const where = {
    id
  }
  let user = await RingCentralUser.findByPk(id)
  const now = Date.now()
  if (user) {
    const update = {
      token,
      tokenUpdateTime: now,
      lastUseTime: now
    }
    await RingCentralUser.update(update, {
      where
    })
    Object.assign(user, update)
  } else {
    user = await RingCentralUser.create({
      id,
      token,
      tokenUpdateTime: now,
      lastUseTime: now
    })
  }
  return user
}

Object.defineProperty(RingCentralUser.prototype, 'rc', {
  get: function () {
    const rc = createRc()
    return rc
  }
})

RingCentralUser.prototype.getRc = async function () {
  const rc = createRc()
  if (this.token) {
    await rc.platform().auth().setData(this.token)
  }
  return rc
}

RingCentralUser.prototype.authorizeUri = function (state = 'holder') {
  return this.rc.loginUrl(
    {
      state
    }
  )
}

RingCentralUser.prototype.refresh = async function () {
  try {
    const rc = await this.getRc()
    await rc.refresh()
    const token = await rc.platform().auth().data()
    await RingCentralUser.update({
      token,
      tokenUpdateTime: Date.now()
    }, {
      where: {
        id: this.id
      }
    })
    this.token = token
    return true
  } catch (e) {
    console.log('User refresh token error', e)
    console.log(`User ${this.id} refresh token has expired`)
    return false
  }
}

RingCentralUser.prototype.getAuditTrail = async function (body) {
  await refreshRcUser(this)
  const rc = await this.getRc()
  return rc.post(
    '/restapi/v1.0/account/~/audit-trail/search',
    body
  )
    .then((r) => {
      return r.json()
    })
    .then((r) => {
      return r.records
    })
    .catch((e) => {
      if (e.response || e.request) {
        const { request, response } = e
        console.log('API error ' + e.message + ' for URL:' + request.url)
        console.log(response)
        console.log(e.request)
      } else {
        console.log('API error')
        console.log(e)
      }
      return []
    })
}
