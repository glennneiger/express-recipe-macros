import axios from 'axios'

const searchFood = 'https://api.nal.usda.gov/ndb/search/'
const api_key = 'Jgb5rGI6HcnXwoGV708Mmb0s5T7x3R0CRW0AUBNN'

const searchParams = q => ({
  params: {
    api_key,
    q,
    sort: 'n',
  },
})

export const searchQuery = async query => {
  const res = await axios.get(searchFood, searchParams(query))
  return res
}

export const nutritionQuery = async ndbno => {
  const res = await axios.get(buildNutritionDataQuery(ndbno))
  return res
}

const nutrientQueries = '&nutrients=203&nutrients=204&nutrients=205'
const nutritionData = 'https://api.nal.usda.gov/ndb/nutrients/'

const buildNutritionDataQuery = nutrientId =>
  nutritionData
    .concat(`?api_key=${api_key}`)
    .concat(nutrientQueries)
    .concat(`&ndbno=${nutrientId}`)
