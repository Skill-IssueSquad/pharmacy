require('dotenv').config()
const cors= require('cors')



const patientRoutes = require('./routes/medicine');

const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(() => {
    app.listen(8000, () => console.log('Server Started'))
}).catch(err => console.log(err))

app.use( '/medicine' , patientRoutes)

app.use(express.json())