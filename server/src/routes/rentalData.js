import express from 'express'

import { collection, getDocs } from 'firebase/firestore'
import { firebase } from '../firebase/init.js'

const Router = express.Router()

// sending all available product data
Router.get('/', async (_, res) => {
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

export default Router
