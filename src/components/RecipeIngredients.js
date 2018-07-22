import React from 'react'

const RecipeIngredients = ({ ingredients }) => (
  <ul className="recipe-ingredients">
    {ingredients.map((ingredient, i) => (
      <li className="recipe-ingredients-item" key={`ingredient-${i}`}>
        {ingredient}
      </li>
    ))}
  </ul>
)

export default RecipeIngredients
