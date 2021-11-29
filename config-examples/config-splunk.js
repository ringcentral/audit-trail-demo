/**
 * custom history handler
 * when target event happens, do some logging in splunk event collector
 */

const SplunkEvents = require('splunk-events')
const axios = require('axios')
const splunkEvents = new SplunkEvents()
splunkEvents.config({
  token: process.env.SPLUNK_TOKEN, // required
  request: axios // this make it work on old browsers and node environments
})

exports.description = 'After login, server will fetch recent user action history every {interval} minutes and log to splunk events'

/**
 * get filtered audit trail list
 * example data:
 * {
    id: 'xxxxx',
    eventTime: '2021-11-29T03:00:08.254Z',
    eventType: 'Create',
    details: { parameters: [Array] },
    accountId: 'xxxxx',
    actionId: 'LOGIN_SUCCESSFULLY',
    clientIp: 'xx.xx.xx.xx',
    initiator: {
      extensionId: 'xxxx',
      extensionNumber: '101',
      name: 'Drake Zhao',
      role: 'Super Admin'
    },
    target: {
      objectId: 'xxxx',
      objectType: 'Extension',
      name: 'Drake Zhao',
      extensionNumber: '101'
    }
  }
 * @param {array} historyList
 * @returns {array}
 */
exports.filter = function filter (historyList) {
  return historyList.filter(item => {
    return item.initiator.role === 'Super Admin'
  })
}

/**
 * when get filtered audit trail list
 * we can do someting here, like create log or
 * log to aws dynamodb
 * @param {*} list
 */
exports.onEvent = async function onEvent (list) {
  const log = `Super admin has ${list.length} actions in recent ${process.env.INTERVAL || 15} minutes`
  console.log('log:', log)
  await splunkEvents.logEvent(
    'Debug',
    'Info',
    'test',
    'history',
    { log }
  )
}
