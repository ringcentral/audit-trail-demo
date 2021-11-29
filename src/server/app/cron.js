/**
 * get audit trail every 15 minutes
 */

import { CronJob } from 'cron'
import axios from 'axios'

const {
  INTERVAL = 15
} = process.env

function run () {
  if (process.env.NO_CRON_JOB) {
    console.log('NO_CRON_JOB')
    return
  }
  const rule = `*/${INTERVAL} * * * *`
  console.log('Running cron job', rule, `runs every ${INTERVAL} minutes`)
  return new CronJob(rule, function () {
    axios.post(
      `${process.env.RINGCENTRAL_APP_SERVER}/admin/action`,
      undefined,
      {
        auth: {
          username: process.env.RINGCENTRAL_ADMIN_USERNAME,
          password: process.env.RINGCENTRAL_ADMIN_PASSWORD
        }
      }
    )
      .then(() => {
        console.log('renew request send:', new Date() + '')
      })
  }, null, true)
}

export default run
