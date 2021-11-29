/**
 * custom history handler
 * when target event happens, do some logging in aws
 */

const { Log } = require('../src/helper/log')

exports.description = 'After login, server will fetch recent user action history every {interval} minutes and log to AWS DynamoDB'

/**
 * get filtered audit trail list
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
  await Log.create({
    log
  })
}
