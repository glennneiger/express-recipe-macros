const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const users = require('./users')

const getRandomFrom = arr => arr[Math.floor(Math.random() * arr.length)]

const titles = [
  'A very cool recipe',
  'An even cooler recipe',
  'This recipe... is so... cool',
  'Tbh this is a recipe!!',
  'r e c i p e',
  'LETS GO',
  'So you think you can seed the Recipes collection',
  "America's Next Top Recipe",
]

const getRandomTitle = () => getRandomFrom(titles)

const ingredients = [
  'cilantro',
  'lime',
  'chicken',
  'pork',
  'salt',
  'pepper',
  'olive oil',
  'paprika',
  'hot sauce',
  'rice',
  'tofu',
  'peanuts',
]

const getRandomIngredients = () => [
  getRandomFrom(ingredients),
  getRandomFrom(ingredients),
  getRandomFrom(ingredients),
  getRandomFrom(ingredients),
  getRandomFrom(ingredients),
]

const times = [15, 20, 25, 30, 45, 60]

const directions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
]

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'

const getRandomTime = () => getRandomFrom(times)

const recipe_1 = new Recipe({
  title: getRandomTitle(),
  ingredients: getRandomIngredients(),
  description,
  directions,
  time: getRandomTime(),
  user: { _id: '5b425c3fcf51f075acb37161' },
  macros: {
    protein: 33,
    fat: 33,
    carbohydrates: 33,
  },
})

const recipe_2 = new Recipe({
  title: getRandomTitle(),
  ingredients: getRandomIngredients(),
  description,
  directions,
  time: getRandomTime(),
  user: { _id: '5b425c3fcf51f075acb37161' },
  macros: {
    protein: 10,
    fat: 50,
    carbohydrates: 40,
  },
})

const recipe_3 = new Recipe({
  title: getRandomTitle(),
  ingredients: getRandomIngredients(),
  description,
  directions,
  time: getRandomTime(),
  user: { _id: '5b425c3fcf51f075acb37161' },
  macros: {
    protein: 60,
    fat: 20,
    carbohydrates: 20,
  },
})

const recipes = [recipe_1, recipe_2, recipe_3]

module.exports = recipes
