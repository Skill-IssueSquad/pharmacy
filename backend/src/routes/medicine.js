const express = require('express');

const router = express.Router();

//get all medicine
router.get('/' , (req,res)=>{
    res.json({mssg : 'get all medicine'})
})
//get a specific medicine by name
router.get('/:name' , (req,res)=>{
    res.json({mssg : 'get a specific medicine by name'})
})
//get a specific medicine by use
router.get('/:medical_use' , (req,res)=>{
    res.json({mssg : 'get a specific medicine by use '})
})

module.exports = router;