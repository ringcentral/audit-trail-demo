const { env } = process
const devPort = env.RINGCENTRAL_DEV_PORT || 6066
const host = env.RINGCENTRAL_HOST || 'localhost'
const port = env.RINGCENTRAL_PORT || 4100

module.exports = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  },
  historyApiFallback: true,
  hot: true,
  host,
  port: devPort,
  proxy: {
    '/': {
      target: `http://${host}:${port}`,
      bypass: function (req, res, proxyOptions) {
        if (req.path.includes('.bundle.')) {
          return req.path
        }
      }
    }
  }
}
