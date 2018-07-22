const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./api')
const config = require('config')

const { PORT, MONGODB_URI } = config

const app = express()

app.use(bodyParser.json())

app.use('/', router)

app.use((err, req, res, next) => {
  res.status(500).json({ err: err.toString() })
})

app.listen(PORT, async () => {
  await mongoose.connect(MONGODB_URI)
  console.log(`Listening on ${PORT}`)
})
