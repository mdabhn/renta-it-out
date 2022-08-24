const express = require('express')
const Router = express.Router()
const data = require('../data/data.json')

// sending all available product data
Router.get('/', (_, res) => {
  console.log(data)
  res.status(200).json({
    status: 200,
    err: null,
    data: data,
  })
})

module.exports = Router
