import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import RentRouts from './src/routes/rentalData.js'

const app = express()

app.use(express.json())
app.use(cors()) /* To avoid cros-site error */

/** Importing Routes */
app.use('/v1/rental', RentRouts)

app.get('/', (_, res) => {
  res.send('running...')
})

app.listen(process.env.PORT || 8000)
