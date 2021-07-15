const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");
const bcrypt = require("bcrypt");
const verify = require('../private');
const e = require("express");

//Informacion del Usuario
router.post("/complete",verify,(req,res)=>{
    mysqlConnection.query(`Select cedula, nombres , apellidos, email, rol from afiliados ` ,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
            console.log(rows)
        }
        else{
            console.log(err);
        }
    })
});



//Eliminar Usuario
router.post("/delUser",verify,(req,res)=>{
    const code = req.body
    console.log("coodd: ",  code.ced)
    mysqlConnection.query(`DELETE FROM afiliados where cedula= ${code.ced} ` ,(err,rows,fields)=>{
        if(!err){
            res.send(`El registro con cedula ${code.ced} ha sido eliminado`);
        }
        else{
            console.log(err);
            res.send(`Error en el servidor al eliminar ${code.ced}`)
        }
    })
});

router.post("/upDate",verify,(req,res)=>{
    const code = req.body
    mysqlConnection.query(`UPDATE afiliados set rol="${req.body.rol}" where cedula = ${req.body.ced} `,(err,rows,fields)=>{
        if(!err){
            res.send(`El rol de usuario CC: ${req.body.ced} ha sido actualizado correctamente.`);
        }
        else{
            console.log(err);
            res.send("Error actualizando el rol de Usuario.")

        }
    })

})

module.exports = router;