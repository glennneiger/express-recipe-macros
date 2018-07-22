const { Router } = require('express')
const router = Router()
const Recipe = require('../models/recipe')
const { createRecipeQuery } = require('../services/queryBuilder')

router.post('/', async (req, res, next) => {
  const { title, ingredients, directions, time } = req.body
  const recipe = new Recipe({
    title,
    ingredients,
    directions,
    time,
  })

  try {
    const doc = await recipe.save()
    res.status(201).json({
      message: 'success',
      payload: docs,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  const query = createRecipeQuery(req.query)

  try {
    const doc = await Recipe.find(query)
    res.status(200).send(doc)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const doc = await Recipe.findById(id).populate('user')
    res.status(200).json({
      message: 'success',
      payload: doc,
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const doc = await Recipe.findByIdAndRemove({ _id: req.params.id })
    res.status(200).json({
      message: 'success',
      payload: doc,
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router

const obj = {
  macros: { protein: { $gt: 0 }, fat: { $gt: 0 }, carbohydrates: { $gt: 0 } },
}
