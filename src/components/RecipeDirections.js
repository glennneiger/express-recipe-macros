import React from 'react'

const RecipeDirections = ({ directions }) => (
  <ul className="recipe-directions">
    {directions.map((step, i) => (
      <li className="recipe-directions-step" key={`step-${i}`}>
        {step}
      </li>
    ))}
  </ul>
)

export default RecipeDirections
