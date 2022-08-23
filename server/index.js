const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors()) /* To avoid cros-site error */

/** Importing Routes */
app.use('/v1/rental/data', require('./src/routes/rentalData.js'))

app.get('/', (_, res) => {
  res.send('running...')
})

app.listen(process.env.PORT || 8000)
