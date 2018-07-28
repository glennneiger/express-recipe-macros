import React, { Component } from 'react'
import MacrosChart from './BarChart'
import RecipeIngredients from './RecipeIngredients'
import { Link } from 'react-router-dom'

class RecipeCard extends Component {
  state = {}

  render() {
    const { recipe } = this.props

    return (
      <Link to={`/recipe/${recipe._id}`} className="recipe-card">
        <div className="recipe-card-info">
          <h3 className="recipe-card-title">{recipe.title} </h3>
          <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            {recipe.time} min
          </p>
          <p style={{ marginBottom: '1rem' }}>{recipe.description}</p>
          <RecipeIngredients ingredients={recipe.ingredients} />
        </div>
        <div className="recipe-card-chart">
          <MacrosChart height="100%" macros={recipe.macros} />
        </div>
      </Link>
    )
  }
}

export default RecipeCard

export const colors = {
  red: 'rgb(255, 100, 100)',
  blue: 'rgb(89, 128, 255)',
  green: 'rgb(255, 232, 98)',
  background: 'rgb(252, 252, 252)',
  main: 'rgb(240, 240, 240)',
  accent: 'rgb(216, 216, 216)',
  black: 'rgb(35, 35, 35)',
}
