require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

const medicineRouter = require('./src/routes/medicines');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(() => {
    app.listen(8000, () => console.log('Server Started'))
}).catch(err => console.log(err))
app.use(cors());
app.use(express.json())

app.use('/pharmacist/medicines',medicineRouter);

