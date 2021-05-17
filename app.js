require('dotenv').config()
const express = require('express')
const users = require('./routes/users')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Connect to Mongo
mongoose
  .connect(process.env.MONGODB_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDb Connected ......')
  })
  .catch((err) => {
    console.log('Error:', err)
  })

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({
    document: 'HPAIR',
    message: 'refer docs'
  })
})

app.use('/users', users)


app.listen(PORT, () => {
  console.log('Server Started on port', PORT)
})