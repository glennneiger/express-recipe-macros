import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RecipeFilters from '../containers/RecipeFilters'
import UserInfo from '../containers/UserInfo'

const Sidebar = ({ handleApplyFilters }) => (
  <Switch>
    <Route
      path="/user/:id"
      render={({ match }) => <UserInfo userId={match.params.id} />}
    />
    <Route
      path="/:protein/:fat/:carbohydrates"
      render={({ match }) => (
        <RecipeFilters
          params={match.params}
          onApplyFilters={handleApplyFilters}
        />
      )}
    />
    <Route
      path="/"
      render={() => <RecipeFilters onApplyFilters={handleApplyFilters} />}
    />
  </Switch>
)

export default Sidebar
