const { Router } = require('express')
const router = Router()
const User = require('../models/user')

router.post('/', async (req, res, next) => {
  const { email, username, password } = req.body

  const user = new User({
    email,
    username,
    password,
  })
  try {
    const doc = await user.save()
    res.status(201).send(doc)
  } catch (e) {
    next(e)
  }
})

module.exports = router
