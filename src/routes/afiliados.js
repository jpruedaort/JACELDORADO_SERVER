const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");
const bcrypt = require("bcrypt");

const d = new Date();
const year = d.getUTCFullYear();
const month = d.getUTCMonth() + 1;
const date = d.getUTCDate();
const dateCreated = `${year}-${month}-${date}`;


//access all "afiliado" data
router.get("/", (req, res) => {
	mysqlConnection.query("SELECT * FROM AFILIADOS", (err, rows, fields) => {
		if (!err) {
			res.json(rows);
		} else {
			console.log(err);
		}
	});
});

router.post("/", async (req, res) => {
	//require json data
	const code = req.body;
	console.log(code);

	//hashPassword
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(code.passw, salt);

	//register
	const query = `INSERT INTO AFILIADOS (nombres,apellidos,fdn,cedula,dir,email,passw) values ("${code.nombres}","${code.apellidos}","${dateCreated}",${code.cedula},"${code.dir}","${code.email}","${hashPassword}") `;
	mysqlConnection.query(query, [], (err, rows, fields) => {
		if (!err) {
			res.json({ Status: true });
		} else {
			console.log(err);
			res.json({ Status: false });
		}
	});
});

//check if the email is already in the db
router.get("/emailvalidate", (req, res) => {
	const code = req.body;
	const query = `SELECT email FROM afiliados WHERE email="${code.email}"`;
	mysqlConnection.query(query, [], (err, rows, fields) => {
		if (!err) {
			if (rows.length > 0) {
				res.json(true);
			} else {
				res.json(false);
			}
		} else {
			res.json("Error");
			console.log(err);
		}
	});
});

//check if the "cedula" is already in the db
router.get("/cedulavalidate", (req, res) => {
	const code = req.body;
	const query = `SELECT cedula FROM afiliados WHERE cedula="${code.cedula}"`;
	mysqlConnection.query(query, [], (err, rows, fields) => {
		if (!err) {
			if (rows.length > 0) {
				res.json(true);
			} else {
				res.json(false);
			}
		} else {
			res.json("Error");
			console.log(err);
		}
	});
});



module.exports = router;
