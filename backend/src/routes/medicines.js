
const express = require('express');

const router = express.Router();

const {
    getMedicines,AddMedicine,searchMedicine,updateMedicine
}=require('../controllers/medicineController');

router.get('/:medicine',searchMedicine);
router.get('/',getMedicines);

router.post('/',AddMedicine);
router.patch('/:name', updateMedicine);


module.exports = router;