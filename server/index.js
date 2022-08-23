const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (_, res) => {
  res.send('running...')
})

app.listen(process.env.PORT || 8000)
