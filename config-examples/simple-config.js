/**
 * custom history handler
 */

exports.description = 'After login, server will fetch recent user action history every {interval} minutes and log to console'

/**
 * get filtered audit trail list
 * @param {array} historyList
 * @returns {array}
 */
exports.filter = async function filter (historyList) {
  return historyList.filter(item => {
    return item.initiator.role === 'Super Admin'
  })
}

/**
 * when get filtered audit trail list
 * we can do someting here, like create log or
 * do something in aws or splunk
 * @param {*} list
 */
exports.onEvent = async function onEvent (list) {
  console.log(`Super admin has ${list.length} actions in recent 15 minutes`)
}
