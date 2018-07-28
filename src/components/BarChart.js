import React from 'react'
import { colors } from './RecipeCard'

const MacrosChart = ({ macros, height }) => (
  <div style={{ ...container, height }}>
    <span
      style={{
        ...legend(height),
        backgroundColor: colors.accent,
      }}
    >
      {macros.protein}p
    </span>
    <span
      style={{
        ...legend(height),
        backgroundColor: colors.accent,
      }}
    >
      {macros.fat}f
    </span>
    <span
      style={{
        ...legend(height),
        backgroundColor: colors.accent,
      }}
    >
      {macros.carbohydrates}c
    </span>
    <div style={{ ...bar(macros.protein), backgroundColor: colors.blue }} />
    <div style={{ ...bar(macros.fat), backgroundColor: colors.red }} />
    <div
      style={{ ...bar(macros.carbohydrates), backgroundColor: colors.green }}
    />
  </div>
)

const legend = height => ({
  width: 'calc((100% / 3) - 0.5rem)',
  height: `${height / 10}rem`,
  alignSelf: 'flex-start',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  borderRadius: '0.25rem',
  margin: '0.25rem',
  padding: '0.25rem 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const container = {
  flex: 1,
  display: 'flex',
  alignItems: 'flex-end',
  flexWrap: 'wrap',
}

const bar = p => ({
  flex: 1,
  height: `${p * 0.9}%`,
  borderRadius: '0.25rem',
  margin: '0 0.25rem',
})

export default MacrosChart
