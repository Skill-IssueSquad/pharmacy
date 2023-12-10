
const express = require('express');

const router = express.Router();
const path = require("path")
const multer = require("multer")

let nameFile;
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'images')
  },
  filename : (req,file,cb)=> {
   nameFile= Date.now() + "--" + file.originalname
   req.nameFile=nameFile
    cb(null,nameFile)
  }
})
const upload=multer({storage:storage})







const {
    getMedicines,AddMedicine,searchMedicine,updateMedicine,medicinedetailsbyid,archiveMedicine,getAlternativeMedicines,getWalletBalancepharmacist
}=require('../controllers/medicineController');


router.post('/',upload.single('image'),AddMedicine);
router.get('/',getMedicines);
router.get('/:id',medicinedetailsbyid);
router.patch('/:id', updateMedicine);

router.post('/archive',archiveMedicine);
router.post('/viewAlternative',getAlternativeMedicines)

router.post('/getWalletBalance',getWalletBalancepharmacist);





module.exports = router;