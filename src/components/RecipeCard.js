import React, { Component } from 'react'
import PieChart from './PieChart'
import RecipeIngredients from './RecipeIngredients'

class RecipeCard extends Component {
  state = {}

  render() {
    const { recipe, index } = this.props

    return (
      <div className="recipe-card">
        <div className="recipe-card-info">
          <h3 className="recipe-card-title">{recipe.title}</h3>
          <p className="recipe-card-description">{recipe.description}</p>
        </div>
        <div className="recipe-card-chart">
          <MacroPieChart recipe={recipe} />
        </div>
        <div className="recipe-card-macros">DFOHFIEOUHJFGGB</div>
      </div>
    )
  }
}

export default RecipeCard

const MacroPieChart = ({ recipe }) => (
  <PieChart
    data={[
      {
        title: 'Protein',
        value: recipe.macros.protein,
        color: colors.red,
      },
      { title: 'Fat', value: recipe.macros.fat, color: colors.blue },
      {
        title: 'Carbohydrates',
        value: recipe.macros.carbohydrates,
        color: colors.green,
      },
    ]}
    strokeWidth={0}
  />
)

export const colors = {
  red: 'rgb(255, 100, 100)',
  blue: 'rgb(100, 100, 255)',
  green: 'rgb(100, 255, 100)',
  background: 'rgb(252, 252, 252)',
  main: 'rgb(240, 240, 240)',
  accent: 'rgb(216, 216, 216)',
  black: 'rgb(35, 35, 35)',
}
