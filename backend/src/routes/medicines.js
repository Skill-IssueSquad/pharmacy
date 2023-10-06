
const express = require('express');

const router = express.Router();

const {
    getMedicines,createMedicine,searchMedicine,updateMedicine
}=require('../controllers/medicineController');

router.get('/:medicine',searchMedicine);
router.get('/',getMedicines);

router.post('/',createMedicine);
router.patch('/:id', updateMedicine);


module.exports = router;