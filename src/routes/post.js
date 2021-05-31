const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");

const verify = require('../private');

router.post('/user_info',verify,(req,res)=>{
    console.log(req.user)
    res.json({payload:req.user});

});


module.exports = router;