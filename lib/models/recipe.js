const mongoose = require('mongoose')
let { Schema } = mongoose

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  macros: {
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
  },
  directions: {
    type: Array,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
})

module.exports = mongoose.model('Recipe', recipeSchema)
