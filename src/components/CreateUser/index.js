import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    message: '',
    passWordmsg: false,
  }

  checkPass = event => {
    const pass = event.target.value
    if (pass.length < 8) {
      this.setState({password: event.target.value, passWordmsg: true})
    } else {
      this.setState({password: event.target.value, passWordmsg: false})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onCreation = () => {
    this.setState()
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = message => {
    this.setState({showSubmitError: true, message})
  }

  submitForm = async event => {
    const {history} = this.props
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      email: username,
      password,
      returnSecureToken: true,
    }
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHWa4UpARyqdV_QOJH1yoWZ4wQQIOnnyI'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok !== true) {
      this.onSubmitFailure(data.error.message)
      console.log(data)
    } else {
      console.log(data)
      history.push('/login')
    }
  }

  renderPasswordField = () => {
    const {password, passWordmsg} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          onBlur={this.checkPass}
        />
        {passWordmsg && <p className="error-message">not met requirements</p>}
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, message} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            sign
          </button>
          {showSubmitError && <p className="error-message">*{message}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
