import express from 'express'

import { collection, getDocs } from 'firebase/firestore'
import { firebase } from '../firebase/init.js'

const Router = express.Router()

// sending all available product data
Router.get('/data', async (_, res) => {
  let data = []

  const querySnapshot = await getDocs(collection(firebase, 'rental'))

  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  res.status(200).json({
    status: 200,
    err: null,
    data: data,
  })
})

Router.post('/book', async (req, res) => {
  const { id, from, to, rent, duration } = req.body

  if (id && from && to && rent && duration) {
  } else {
    res.status(404).json({
      status: 404,
      err: {
        msg: 'no data found',
      },
      data: null,
    })
  }
})

export default Router
