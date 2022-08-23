const express = require('express')
const Router = express.Router()
const data = require('../data/data.json')

Router.get('/', (req, res) => {
  res.send(data)
})

module.exports = Router
