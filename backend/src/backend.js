require('dotenv').config()
const cors= require('cors')



const patientRoutes = require('./routes/medicine');

const express = require('express')
const app = express()
const mongoose = require('mongoose')

//for iamages
const multer =require('multer')
const path = require('path')

const upload = multer({
    dest:'./upload/images'
})

app.use('/images', express.static('../images'));

app.use(cors());



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(() => {
    app.listen(8000, () => console.log('Server Started'))
}).catch(err => console.log(err))

app.use( '/medicine' , patientRoutes)

app.use(express.json())