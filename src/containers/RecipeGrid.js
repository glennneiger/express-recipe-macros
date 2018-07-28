import React, { Component, Fragment } from 'react'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard'
import LoadingState from '../components/Loading'
export default class RecipeGrid extends Component {
  state = {
    page: 0,
    recipes: [],
    favourites: [],
    loading: false,
  }

  componentDidMount() {
    this.getRecipes()
  }

  componentWillReceiveProps({ filters, userId }) {
    if (this.props.filters === filters) {
      return
    }

    const params = normalizeParams(filters)
    this.getRecipes(params)
  }

  render() {
    const { recipes, favourites, loading } = this.state

    return (
      <section className="recipe-grid">
        {loading ? (
          <LoadingState />
        ) : (
          <Fragment>
            {recipes.map((recipe, i) => (
              <RecipeCard recipe={recipe} key={`recipe-${i}`} />
            ))}
            {favourites.map((recipe, i) => (
              <RecipeCard recipe={recipe} key={`recipe-${i}`} />
            ))}
          </Fragment>
        )}
      </section>
    )
  }

  getRecipes = async (params = defaultOptions) => {
    this.setState({ loading: true })

    try {
      const res = await axios.get('/recipes', { params })
      this.setState({
        recipes: res && res.data ? res.data : [],
      })
    } catch (e) {
      console.error(e)
    }

    this.setState({ loading: false })
  }
}

const normalizeParams = params => {
  const keyPairings = Object.keys(defaultOptions).map(option =>
    option.split('_')
  )

  const normalizedParams = keyPairings.reduce((newParams, keyPairing) => {
    const param = keyPairing[0]
    const end = keyPairing[1]

    let value = params[param][end]

    const defaultMinRange = end === 'min' && value === 0
    const defaultMaxRange = end === 'max' && value === 100

    if (defaultMinRange || defaultMaxRange) {
      value = null
    }

    const key = `${param}_${end}`

    newParams[key] = value
    return newParams
  }, defaultOptions)

  return normalizedParams
}

const defaultOptions = {
  protein_min: null,
  protein_max: null,
  fat_min: null,
  fat_max: null,
  carbohydrates_min: null,
  carbohydrates_max: null,
}
