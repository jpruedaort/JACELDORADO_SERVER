const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
require("dotenv").config();

//UserValidation
router.post("/useravalidate", (req, res) => {
	const code = req.body;
	const query = `SELECT email,passw, nombres FROM afiliados WHERE email="${code.email}"`;
	mysqlConnection.query(query, [], (err, rows, fields) => {
		if (!err) {
			if (rows.length > 0) {
				async function validate() {
					const validPass = await bcrypt.compare(code.passw, rows[0].passw);
					console.log("validPass: ", validPass);
					//create and asign token
					const accessToken = jwt.sign(
						{ email: rows[0].email , name:rows[0].nombres},
						process.env.TOKEN_SECRET
					)
					console.log("token: ", accessToken)
					if(validPass) res.json({accessToken:accessToken, authorized:true});
					if(!validPass) res.json({accessToken:false ,authorized:false});
				}
				validate();
			} else if (rows.length ==0 ) {
				res.json({accessToken:false ,authorized:false});
			}
		} else {
			res.json("Error");
			console.log(err);
		}
	});
});

module.exports = router;
