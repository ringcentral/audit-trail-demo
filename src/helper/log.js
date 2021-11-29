const Sequelize = require('dynamo-sequelize').default
const uid = require('nanoid')

const config = {
  define: {
    timestamps: true
  },
  logging: false,
  throughput: {
    read: process.env.DYNAMO_READ || 20,
    write: process.env.DYNAMO_WRITE || 10
  }
}

if (process.env.DIALECT === 'dynamodb') {
  config.dialect = 'dynamo'
}

const sequelize = new Sequelize(
  process.env.RINGCENTRAL_DATABASE_CONNECTION_URI,
  config
)

exports.Log = sequelize.define('Log', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: () => uid(10)
  },
  log: {
    type: Sequelize.STRING
  }
})
