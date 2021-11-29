import { Component } from 'react'
import { Spin, Button } from 'antd'
import copy from 'json-deep-copy'
import getUser from '../../common/get-user'

export default class App extends Component {
  state = {
    loggedIn: false,
    fetchingUser: false,
    loginning: false,
    user: {}
  }

  componentDidMount () {
    this.fetchUserInfo()
  }

  fetchUserInfo = async () => {
    this.setState({
      fetchingUser: true
    })
    const up = {
      fetchingUser: false
    }
    const res = await getUser()
    if (res && res.id) {
      up.user = copy(res)
    }
    this.setState(up)
  }

  renderHeader () {
    return (
      <div className='pd2'>
        <h1>{window.rc.title}</h1>
        <p>{window.rc.desc}</p>
      </div>
    )
  }

  renderLogined () {
    return (
      <div className='pd3 wrap'>
        {this.renderHeader()}
        <div className='pd2'>
          <a href={window.rc.logoutUrl}>
            <Button>Logout</Button>
          </a>
        </div>
      </div>
    )
  }

  renderNotLogined () {
    return (
      <div className='pd3 wrap'>
        {this.renderHeader()}
        <div className='pd2'>
          <a href={window.rc.authUrlDefault}>
            <Button type='primary' size='large'>Login</Button>
          </a>
        </div>
      </div>
    )
  }

  renderContent () {
    return this.state.user.id
      ? this.renderLogined()
      : this.renderNotLogined()
  }

  render () {
    const {
      fetchingUser
    } = this.state
    return (
      <Spin spinning={fetchingUser}>
        {this.renderContent()}
      </Spin>
    )
  }
}
