
const express = require('express');

const router = express.Router();

const {
    getMedicines,AddMedicine,searchMedicine,updateMedicine,medicinedetailsbyid
}=require('../controllers/medicineController');

router.get('/:medicine',searchMedicine);
router.get('/:id',medicinedetailsbyid);

router.get('/',getMedicines);

router.post('/',AddMedicine);
router.patch('/:id', updateMedicine);


module.exports = router;