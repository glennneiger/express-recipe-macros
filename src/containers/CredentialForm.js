import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { setToken } from '../services/token'
import Popover from './Popover'
import { randomFitnessEmoji } from './StickyNav'

import decorateComponentWithProps from 'decorate-component-with-props'

export default class CredentialForm extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    emoji: randomFitnessEmoji(),
  }

  render() {
    const { type } = this.props
    const login = type === 'login'
    const signup = type === 'signup'

    return (
      <Popover closePopover={this.props.closePopover}>
        <form
          style={{ width: '100%', height: '100%' }}
          onSubmit={this.handleSubmit}
        >
          <p className="emoji">{this.state.emoji}</p>
          <div className="credential-form-fields">
            {signup && (
              <Fragment>
                <label
                  className="credential-form-field-label"
                  htmlFor="credential-form-username"
                >
                  username
                </label>
                <input
                  type="text"
                  onChange={this.handleChange}
                  name="username"
                  id="credential-form-username"
                  placeholder="enter your desired username"
                />
              </Fragment>
            )}
            <label
              className="credential-form-field-label"
              htmlFor="credential-form-email"
            >
              email
            </label>
            <input
              type="email"
              onChange={this.handleChange}
              name="email"
              id="credential-form-email"
              placeholder={login ? 'email' : 'enter your email'}
            />
            <label
              className="credential-form-field-label"
              htmlFor="credential-form-password"
            >
              password
            </label>
            <input
              type="password"
              onChange={this.handleChange}
              name="password"
              id="credential-form-password"
              placeholder={
                login ? 'enter your password' : 'enter your desired password'
              }
            />
            <input
              type="submit"
              className="credential-form-submit"
              value={login ? 'Login' : 'Signup'}
            />
          </div>
        </form>
      </Popover>
    )
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { username, email, password } = this.state
    const { getCurrentUser, type } = this.props

    const isSigningUp = type === 'signup'

    const usernameIsEmpty = !/\S/.test(username)
    const emailIsEmpty = !/\S/.test(email)
    const passwordIsEmpty = !/\S/.test(password)

    const loginFormEmpty = emailIsEmpty || passwordIsEmpty
    const signupFormEmpty = isSigningUp && (loginFormEmpty || usernameIsEmpty)

    if (loginFormEmpty || signupFormEmpty) {
      this.renderErrorPopover()
      return
    }

    try {
      if (isSigningUp) {
        await axios.post('/signup', { email, password, username })
      }

      const res = await axios.post('/login', { email, password })

      console.log(res.data)
      const { token } = res.data
      setToken(token)
      getCurrentUser()

      this.renderSuccessPopover()
    } catch (e) {
      console.error(e)
      this.renderErrorPopover()
    }
  }

  renderSuccessPopover = () =>
    this.props.openPopover(
      decorateComponentWithProps(SuccessPopover, {
        closePopover: this.props.closePopover,
        isSigningUp: this.props.type === 'signup',
      })
    )

  renderErrorPopover = () =>
    this.props.openPopover(
      decorateComponentWithProps(ErrorPopover, {
        usernameIsEmpty: !/\S/.test(this.state.username),
        emailIsEmpty: !/\S/.test(this.state.email),
        passwordIsEmpty: !/\S/.test(this.state.password),
        showSignup: this.props.showSignup,
        showLogin: this.props.showLogin,
        closePopover: this.props.closePopover,
        isSigningUp: this.props.type === 'signup',
      })
    )
}

const ErrorPopover = ({
  emailIsEmpty,
  passwordIsEmpty,
  usernameIsEmpty,
  showLogin,
  showSignup,
  closePopover,
  isSigningUp,
}) => {
  const action = isSigningUp ? 'Signup' : 'Login'
  let message = `${action} attempt unsuccessful 🤦‍`

  const loginFormEmpty = emailIsEmpty || passwordIsEmpty
  const signupFormEmpty = isSigningUp && (loginFormEmpty || usernameIsEmpty)

  if (loginFormEmpty || signupFormEmpty) {
    message = `Oh no! It looks like you didn't complete the ${action} form 😢`
  }

  return (
    <Popover closePopover={closePopover}>
      <div className="message-container">
        <p className="emoji">
          <span role="img" aria-label="Warning sign">
            ⚠️
          </span>
        </p>
        <p className="popover-message">{message}</p>
        <button
          onClick={isSigningUp ? showSignup : showLogin}
          className="popover-button"
        >
          try again
        </button>
      </div>
    </Popover>
  )
}

class SuccessPopover extends Component {
  componentDidMount() {
    setTimeout(this.props.closePopover, 1000)
  }

  render() {
    const { closePopover, isSigningUp } = this.props
    const action = isSigningUp ? 'Signup' : 'Login'
    return (
      <Popover closePopover={closePopover}>
        <div className="message-container">
          <p className="emoji">
            <span role="img" aria-label="Thumbs up">
              👍
            </span>
          </p>
          <p className="popover-message">{`${action} successful!`}</p>
          <button onClick={closePopover} className="popover-button">
            okay
          </button>
        </div>
      </Popover>
    )
  }
}
