
const express = require('express');

const router = express.Router();

const {
    getMedicines,createMedicine,searchMedicine
}=require('../controllers/medicineController');

router.get('/:medicine',searchMedicine);
router.get('/',getMedicines);

router.post('/',createMedicine);



module.exports = router;