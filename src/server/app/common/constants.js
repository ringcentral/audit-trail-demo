import { resolve } from 'path'
import { RingCentralUser } from '../models/ringcentral'
import { SDK } from '@ringcentral/sdk'
import crypto from 'crypto'

const userRc = new RingCentralUser()
const {
  RINGCENTRAL_APP_SERVER,
  RINGCENTRAL_SERVER,
  RINGCENTRAL_CLIENT_ID,
  RINGCENTRAL_CLIENT_SECRET
} = process.env

const arr = RINGCENTRAL_APP_SERVER.split('/')
const root = arr[0] + arr[1] + arr[2]
const cwd = process.cwd()

export const jwtPrefix = crypto.createHash('md5').update(RINGCENTRAL_APP_SERVER).digest('hex')
export const defaultState = '__default_state_'
export const extraPath = RINGCENTRAL_APP_SERVER.replace(root, '')
export const pack = require(resolve(cwd, 'package.json'))
export const authUrlDefault = userRc.authorizeUri(defaultState)

export const expire = 1000 * 60 * 60 * 24 * 365 * 10

export function createRc () {
  return new SDK({
    server: RINGCENTRAL_SERVER,
    clientId: RINGCENTRAL_CLIENT_ID,
    clientSecret: RINGCENTRAL_CLIENT_SECRET,
    redirectUri: RINGCENTRAL_APP_SERVER + '/rc-oauth'
  })
}
