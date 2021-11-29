import { pack, jwtPrefix } from '../common/constants'
import copy from 'json-deep-copy'

// const { APP_HOME = '/' } = process.env

export default async (req, res) => {
  const data = {
    redirect: req.query.redirect,
    title: pack.name,
    jwtPrefix
  }
  data._global = copy(data)
  res.render('logout', data)
}
