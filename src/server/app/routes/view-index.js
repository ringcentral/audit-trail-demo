/**
 * view index
 */

import copy from 'json-deep-copy'
import {
  pack,
  authUrlDefault,
  jwtPrefix
} from '../common/constants'

const {
  RINGCENTRAL_APP_SERVER,
  INTERVAL
} = process.env

export default (config) => {
  return (req, res) => {
    const data = {
      version: pack.version,
      title: 'RingCentral audit trail api demo',
      server: RINGCENTRAL_APP_SERVER,
      cdn: RINGCENTRAL_APP_SERVER,
      jwtPrefix,
      interval: INTERVAL,
      authUrlDefault,
      logoutUrl: RINGCENTRAL_APP_SERVER + '/logout',
      desc: config.description.replace('{interval}', INTERVAL)
    }
    data._global = copy(data)
    // const list = 'https://*.hubspot.com;'
    // if (view === 'index') {
    //   res.set(
    //     'Content-Security-Policy',
    //     `frame-ancestors ${list}`
    //   )
    // }
    res.set({
      'Cache-Control': 'no-cache'
    })
    res.render('app', data)
  }
}
