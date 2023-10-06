// routes/medicines.js

const express = require('express');
const router = express.Router();
const medicinesController = require('../controllers/medicines');

// POST route to add a new medicine
router.post('/medicines', medicinesController.addMedicine);

module.exports = router;
