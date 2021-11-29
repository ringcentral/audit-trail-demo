/**
 * serve empty favicon
 */

function favi (req, res) {
  res.set('Content-Length', '0')
  res.set('Content-Type', 'image/x-icon')
  res.send('')
}

export default (app) => {
  app.get('/favicon.ico', favi)
}
