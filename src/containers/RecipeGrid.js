import React from 'react'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard'
import LoadingState from '../components/Loading'

export default class RecipeGrid extends React.Component {
  state = {
    page: 0,
    recipes: [],
    loading: false,
  }

  componentDidMount() {
    this.getRecipes()
  }

  render() {
    const { recipes, loading } = this.state

    return (
      <section className="recipe-grid">
        {loading ? (
          <LoadingState />
        ) : (
          recipes.map((recipe, i) => (
            <RecipeCard recipe={recipe} index={i} key={`recipe-${i}`} />
          ))
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

const defaultOptions = {
  protein_min: null,
  protein_max: null,
  fat_min: null,
  fat_max: null,
  carbohydrates_min: null,
  carbohydrates_max: null,
  max_cook_time: null,
  sort_by_rating: false,
}
