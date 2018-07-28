import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const StickyNav = ({
  onClickLogin,
  onClickLogout,
  onClickSignup,
  userInfo,
  emoji,
}) => (
  <nav className="navigation">
    <p className="navigation-wordmark">
      <Link to="/">{emoji}</Link>
      {userInfo ? (
        <span
          style={{
            fontSize: '2rem',
            paddingLeft: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          welcome,{' '}
          <span>
            <Link to={`/user/${userInfo.id}`}>{userInfo.username}</Link>
          </span>
        </span>
      ) : null}
    </p>
    <div className="navigation-links">
      {userInfo ? (
        <button onClick={onClickLogout}>Logout</button>
      ) : (
        <Fragment>
          <button onClick={onClickLogin}>Login</button>
          <button onClick={onClickSignup}>Signup</button>
        </Fragment>
      )}
    </div>
  </nav>
)

export default StickyNav

export const randomFitnessEmoji = (arr = ['🏋', '🏃‍', '🤽‍', '🤾‍']) =>
  arr[Math.floor(Math.random() * arr.length)]
