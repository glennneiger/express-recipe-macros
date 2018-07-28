import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RecipeGrid from '../containers/RecipeGrid'
import UserInfo from '../containers/UserInfo'

const Content = ({ filters }) => (
  <Switch>
    <Route
      path="/user/:id"
      render={({ match }) => (
        <RecipeGrid userId={match.params.id} filters={filters} />
      )}
    />
    <Route path="/" render={() => <RecipeGrid filters={filters} />} />
  </Switch>
)

export default Content
