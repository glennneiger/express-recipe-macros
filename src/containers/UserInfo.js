import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../services/token'
import Loading from '../components/Loading'

export default class UserInfo extends Component {
  state = {
    loading: false,
    user: {
      username: '',
      email: '',
      recipes: [],
      favourites: [],
      _id: '',
    },
  }

  componentDidMount() {
    this.getUser(this.props.userId)
  }

  render() {
    const { user, loading } = this.state

    return (
      <div className="user-info">
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <p className="emoji">
              <span role="img" aria-label="Silhouette of a person">
                👤
              </span>
            </p>
            <h2
              style={{
                padding: '1rem',
                marginBottom: '3rem',
                fontSize: '2.5rem',
                textAlign: 'center',
              }}
            >
              {user.username}
            </h2>
            <p className="user-info-stat">
              <Link to={`/user/${user._id}/recipes`}>
                <span role="img" aria-label="A shallow pan of food">
                  🥘
                </span>{' '}
                recipes posted
              </Link>
            </p>
            <p className="user-info-stat">
              <Link to={`/user/${user._id}/favourites`}>
                <span role="img" aria-label="Image of a yellow star">
                  ⭐️
                </span>{' '}
                favourite recipes
              </Link>
            </p>
          </Fragment>
        )}
      </div>
    )
  }

  getUser = async id => {
    this.setState({ loading: true })

    const token = getToken()

    if (!token) {
      this.setState({ loading: false })
      return
    }

    try {
      const res = await axios.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const user = res.data.payload
      if (user) this.setState({ user })
    } catch (e) {
      console.error(e)
    }

    this.setState({ loading: false })
  }
}
