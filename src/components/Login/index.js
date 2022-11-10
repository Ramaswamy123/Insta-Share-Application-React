import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showPassword: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', fetchedData.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: fetchedData.error_msg})
    }
  }

  render() {
    const {errorMsg, showPassword} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }

    const password = showPassword ? 'text' : 'password'

    return (
      <div className="login-page">
        <div className="login-container">
          <img
            className="login-image-lg"
            alt="website login"
            src="https://res.cloudinary.com/aneesmon/image/upload/v1648363086/Insta_Share/login-image_q0hj2s.png"
          />

          <form className="login-card" onSubmit={this.onSubmitLogin}>
            <div className="login-title-container">
              <img
                className="login-website-logo"
                alt="website logo"
                src="https://res.cloudinary.com/aneesmon/image/upload/v1648277533/Insta_Share/website-logo_yvroxv.png"
              />
              <h1 className="login-website-title">Insta Share</h1>
            </div>
            <label className="login-label" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              className="login-input"
              id="username"
              type="text"
              onChange={this.onChangeUsername}
            />

            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              className="login-input"
              id="password"
              type={password}
              onChange={this.onChangePassword}
            />
            <div className="show-password-container">
              <input
                id="checkbox"
                type="checkbox"
                onChange={this.onChangeShowPassword}
              />
              <label htmlFor="checkbox" className="show-password">
                Show Password
              </label>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            <p className="login-error-msg">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
