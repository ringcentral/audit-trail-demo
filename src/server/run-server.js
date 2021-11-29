
/**
 * standalone server file, no cli
 */

import { createApp } from './app/app'
import initDb from './app/common/init-db'
import config from '../../config'
import cron from './app/cron'

const {
  RINGCENTRAL_PORT: port,
  RINGCENTRAL_HOST: host,
  APP_HOME = '/'
} = process.env

const app = createApp(config)

app.listen(port, host, () => {
  console.log(`-> server running at: http://${host}:${port}${APP_HOME}`)
  console.log('->', config.description)
  initDb()
  cron()
})
