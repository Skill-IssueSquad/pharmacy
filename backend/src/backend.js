require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const medicinesRouter = require('./routes/medicines');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(() => {
    app.listen(8000, () => console.log('Server Started'))
}).catch(err => console.log(err))

app.use(express.json())

// Use the medicines route with controller
app.use('/api/medicines', medicinesRouter);