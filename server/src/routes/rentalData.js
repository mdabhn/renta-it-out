import express from 'express'

import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import { firebase } from '../firebase/init.js'

const Router = express.Router()

const COLLECTION = 'rental'

// sending all available product data
Router.get('/data', async (_, res) => {
  let data = []

  const querySnapshot = await getDocs(collection(firebase, COLLECTION))

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
    const docRef = doc(firebase, COLLECTION, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        availability: true,
        booked: true,
        rentedFrom: from,
        rentedTo: to,
        rent: rent,
        duration: duration,
      })
      res.status(201).json({
        status: 201,
        err: null,
        success: {
          msg: 'Booking has been completed',
        },
      })
    } else {
      res.status(404).json({
        status: 404,
        err: {
          msg: 'no data found',
        },
        success: null,
      })
    }
  } else {
    res.status(404).json({
      status: 404,
      err: {
        msg: 'no data found',
      },
      success: null,
    })
  }
})

export default Router
