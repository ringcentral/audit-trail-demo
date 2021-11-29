
import express from 'express'
import logout from './routes/logout'
import morgan from 'morgan'
import { resolve } from 'path'
import oauth from './routes/oauth'
import staticRoute from './routes/static'
import favi from './routes/favicon'
import apis from './routes/api'
import admin from './routes/admin'
import index from './routes/view-index'

export function createApp (config) {
  console.log(config)
  const app = express()
  staticRoute(app)
  app.use(morgan('tiny'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.set('views', resolve(__dirname, '../views'))
  app.set('view engine', 'pug')

  app.get('/logout', logout)
  app.get('/test', (req, res) => res.send('server running'))
  app.get('/rc-oauth', oauth)
  app.get('/', index(config))

  apis(app)
  favi(app)
  admin(app, config)
  return app
}
