const mongoose = require('mongoose')
const User = mongoose.model('User')

const simon = new User({
  username: 'simon',
  password: 'password',
  email: 'simon@earnwithdrop.com',
  recipes: [],
})

const devin = new User({
  username: 'devin',
  password: 'password',
  email: 'devin@gmail.com',
  recipes: [],
})

const susan = new User({
  username: 'susan',
  password: 'password',
  email: 'susan@earnwithdrop.com',
  recipes: [],
})

const users = [simon, devin, susan]

module.exports = users
