// routes/medicines.js

const express = require('express');
const router = express.Router();
const medicinesController = require('../controllers/medicines');

router.get('/' , (req,res) => {
    res.json({mssg:'Get all medicine'})
})

module.exports = router;
