import express from 'express'
import data from '../data/data.json' assert { type: 'json' }

const Router = express.Router()

// sending all available product data
Router.get('/', (_, res) => {
  console.log(data)
  res.status(200).json({
    status: 200,
    err: null,
    data: data,
  })
})

export default Router
