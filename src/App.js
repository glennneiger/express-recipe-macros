import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { getToken, setToken, removeToken } from './services/token'

import { Link, Route } from 'react-router-dom'
import RecipeGrid from './containers/RecipeGrid'
import StickyNav from './containers/StickyNav'
import Login from './containers/Login'

export default class App extends Component {
  state = {
    user: null,
    loading: false,
  }

  componentDidMount() {
    console.log('Application mounted')
  }

  render() {
    return (
      <div className="layout">
        <StickyNav />
        {/* <Login setUser={this.setUser} getCurrentUser={this.getCurrentUser} />
        {this.state.user ? <h1>User logged in</h1> : null} */}
        <RecipeGrid />
      </div>
    )
  }

  logout = () => {
    removeToken()
    this.setUser(null)
  }

  setUser = user => {
    this.setState({ user })
  }

  getCurrentUser = async () => {
    // 1. Try and retrieve the user's token
    const token = getToken()

    if (!token) {
      console.log('token not found')
      return
    }

    // 2. If they have a token, make a request to /user/current for their user details
    try {
      const res = await axios.get('users/current', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const user = res.data
      this.setUser(user)
      console.log(this.state)
    } catch (e) {
      console.error(e)
    }

    // 3. Pass the token as an Authorization Header
    // 4. If a successful response returns, store the user in state.
  }
}
