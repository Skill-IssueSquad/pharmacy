
const express = require('express');

const router = express.Router();

const {
    getMedicines,createMedicine
}=require('../controllers/medicineController');

router.get('/',getMedicines);

router.post('/',createMedicine);


module.exports = router;