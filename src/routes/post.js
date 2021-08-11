const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");
const verify = require('../private');

router.post('/user_info',verify,(req,res)=>{
    console.log(req.user.email)
    res.json({payload:req.user});

});



router.post('/new_event',verify,(req,res)=>{

    console.log("cuerpo: ", req.body)
    
    const query = `INSERT INTO EVENTOS 
                    (event_owner_email,event_date,event_contenido)
                    values
                    ('${req.user.email}','${req.body.form.evfecha}','${req.body.form.evdescrip}','${JSON.stringify(req.body.form.cominvi)}')`;
    mysqlConnection.query(query,[],(err, rows, fields)=>{
        if(!err){
            res.json({status:true})
        }else{
            console.log(err)
            res.json({status:false})
        }
    })
});


module.exports = router;