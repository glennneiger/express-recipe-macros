import React, { Component } from 'react'
import axios from 'axios'
import { getToken, removeToken } from './services/token'

import { Route, Switch } from 'react-router-dom'
import RecipeGrid from './containers/RecipeGrid'
import StickyNav, { randomFitnessEmoji } from './containers/StickyNav'
import RecipeFilters from './containers/RecipeFilters'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import CredentialForm from './containers/CredentialForm'
import whyDidYouUpdate from 'why-did-you-update'
import decorateComponentWithProps from 'decorate-component-with-props'

whyDidYouUpdate(React)
export default class App extends Component {
  state = {
    user: null,
    loading: false,
    gridFilters: {
      protein: { min: 0, max: 100 },
      fat: { min: 0, max: 100 },
      carbohydrates: { min: 0, max: 100 },
    },
    stickyNavEmoji: randomFitnessEmoji(),
    Popover: () => '',
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  render() {
    const { Popover, user, stickyNavEmoji, gridFilters } = this.state

    return (
      <div className="layout">
        <Sidebar handleApplyFilters={this.handleApplyFilters} />
        <Content filters={gridFilters} />
        <StickyNav
          onClickSignup={this.showSignup}
          onClickLogin={this.showLogin}
          onClickLogout={this.logout}
          userInfo={!!user && { username: user.username, id: user._id }}
          emoji={stickyNavEmoji}
        />
        <Popover />
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
    const token = getToken()

    if (!token) {
      return
    }

    try {
      const res = await axios.get('/users/current', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const user = res.data
      this.setUser(user)
    } catch (e) {
      console.error(e)
    }
  }

  injectFavourites = favourites => {
    this.setState({
      favourites,
    })
  }

  handleApplyFilters = filters => this.setState({ gridFilters: filters })

  closePopover = () => this.setState({ Popover: () => '' })
  openPopover = Popover => this.setState({ Popover })

  showLogin = () => this.showCredentialForm('login')
  showSignup = () => this.showCredentialForm('signup')

  showCredentialForm = type =>
    this.openPopover(
      decorateComponentWithProps(CredentialForm, {
        type,
        openPopover: this.openPopover,
        closePopover: this.closePopover,
        getCurrentUser: this.getCurrentUser,
        showSignup: this.showSignup,
        showLogin: this.showLogin,
      })
    )
}
