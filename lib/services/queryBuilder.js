const createRecipeQuery = query => {
  const {
    protein_min,
    protein_max,
    fat_min,
    fat_max,
    carbohydrates_min,
    carbohydrates_max,
    sort_by_rating,
    max_cook_time,
  } = query

  const protein_min_query = protein_min ? { $gte: protein_min } : {}
  const protein_max_query = protein_max ? { $lte: protein_max } : {}
  const protein_query =
    protein_min || protein_max
      ? {
          'macros.protein': {
            ...protein_min_query,
            ...protein_max_query,
          },
        }
      : {}

  const fat_min_query = fat_min ? { $gte: fat_min } : {}
  const fat_max_query = fat_max ? { $lte: fat_max } : {}
  const fat_query =
    fat_min || fat_max
      ? {
          'macros.fat': {
            ...fat_min_query,
            ...fat_max_query,
          },
        }
      : {}

  const carbohydrates_min_query = carbohydrates_min
    ? { $gte: carbohydrates_min }
    : {}
  const carbohydrates_max_query = carbohydrates_max
    ? { $lte: carbohydrates_max }
    : {}
  const carbohydrates_query =
    carbohydrates_min || carbohydrates_max
      ? {
          'macros.carbohydrates': {
            ...carbohydrates_min_query,
            ...carbohydrates_max_query,
          },
        }
      : {}

  const macros_query = {
    ...protein_query,
    ...fat_query,
    ...carbohydrates_query,
  }

  const time_query = max_cook_time ? { time: { $lte: max_cook_time } } : {}

  const recipesQuery = { ...macros_query, ...time_query }

  return macros_query
}

module.exports = { createRecipeQuery }

const queryBuilder = query => {
  const query_strings = Object.keys(query)
  const query_max = query_strings.filter(s => s.includes('_max'))
  const query_min = query_strings.filter(s => s.includes('_min'))
}
