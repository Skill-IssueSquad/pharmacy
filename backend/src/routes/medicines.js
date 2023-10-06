
const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');



const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
  

  const upload = multer({ storage: fileStorageEngine });







const {
    getMedicines,createMedicine,searchMedicine
}=require('../controllers/medicineController');

router.get('/:medicine',searchMedicine);
router.get('/',getMedicines);

router.post('/',upload.single('image'),createMedicine);



module.exports = router;