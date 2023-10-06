require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const medicineRouter = require('./routes/medicines')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(() => {
    app.listen(8000, () => console.log('Server Started'))
}).catch(err => console.log(err))

app.use(express.json())

app.use('/pharmacist/medicines',medicineRouter);