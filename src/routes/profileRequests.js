const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");
const bcrypt = require("bcrypt");
const verify = require('../private');


router.post("/",verify,(req,res)=>{
    mysqlConnection.query(`SELECT * FROM AFILIADOS WHERE email='${req.user.email}'`, (err, rows, fields) => {
		if (!err) {
			res.json(rows[0]);
		} else {
			console.log(err);
		}
	});
});

router.post("/update",verify,(req,res)=>{
	console.log("body: ", req.body.fields)
	const fieldVal= req.body.fields
    mysqlConnection.query(`UPDATE afiliados SET nombres="${fieldVal.nombres}", apellidos="${fieldVal.apellidos}", fdn="${fieldVal.fdn}", dir="${fieldVal.dir}", email="${fieldVal.email}" WHERE cedula=${fieldVal.cedula} `, (err, rows, fields) => {
		if (!err) {
			console.log("gitgut")
			res.json({status:"positive"});
		} else {
			console.log(err)
			res.json({status:"negative"});
		}
	});
});

module.exports = router;