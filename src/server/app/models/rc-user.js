import Sequelize from 'sequelize'
import uid from '../common/uid'
import sequelize from './sequelize'

export const RingCentralUser = sequelize.define('RingCentralUser', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: uid
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  interval: { // minutes
    type: Sequelize.INTEGER,
    defaultValue: 15
  },
  token: {
    type: Sequelize.JSON
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  lastUseTime: {
    type: Sequelize.INTEGER
  },
  tokenUpdateTime: {
    type: Sequelize.INTEGER
  },
  data: { // all other data associcated with this user
    type: Sequelize.JSON
  }
})
