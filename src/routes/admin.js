const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");
const bcrypt = require("bcrypt");
const verify = require("../private");
const e = require("express");

//Informacion del Usuario
router.post("/complete", verify, (req, res) => {
	mysqlConnection.query(
		`Select cedula, nombres , apellidos, email, rol from afiliados `,
		(err, rows, fields) => {
			if (!err) {
				res.json(rows);
				console.log(rows);
			} else {
				console.log(err);
			}
		}
	);
});

//Eliminar Usuario
router.post("/delUser", verify, (req, res) => {
	const code = req.body;
	console.log("coodd: ", code.ced);
	mysqlConnection.query(
		`DELETE FROM afiliados where cedula= ${code.ced} `,
		(err, rows, fields) => {
			if (!err) {
				res.send(`El registro con cedula ${code.ced} ha sido eliminado`);
			} else {
				console.log(err);
				res.send(`Error en el servidor al eliminar ${code.ced}`);
			}
		}
	);
});

router.post("/upDate", verify, (req, res) => {
	const code = req.body;
	mysqlConnection.query(
		`UPDATE afiliados set rol="${req.body.rol}" where cedula = ${req.body.ced} `,
		(err, rows, fields) => {
			if (!err) {
				res.send(
					`El rol de usuario CC: ${req.body.ced} ha sido actualizado correctamente.`
				);
			} else {
				console.log(err);
				res.send("Error actualizando el rol de Usuario.");
			}
		}
	);
});

router.post("/cominfo", verify, (req, res) => {
	const code = req.body;
	const query = `select comite_id from afiliados_comites where cedula= ${req.body.ced} `;
	mysqlConnection.query(query, (err, rows, fields) => {
		if (!err) {
			res.json(rows);
		} else {
			console.log(err);
		}
	});
});

router.post("/changecomi", verify, (req, res) => {
	const code = req.body;
	const ced = code.ced;
	const addValue = code.boxValue;
	const addName = code.boxName;
	console.log("name: ", code.boxName, "value:  ", code.boxValue);
	if (addValue === true) {
		const query = `
            insert ignore into afiliados_comites (cedula,comite_id) 
            select ${ced},${addName}
            where (select count(*) from afiliados_comites where cedula=${ced} and comite_id=${addName})=0;
        
        `;
		mysqlConnection.query(query,(err,rows,fields)=>{
            if(!err){
                res.send(`Se agrego exitosamente`)
            }else{
                console.log(err);
                res.send(`Error en el sistema`)
            }
        });
	} else if (addValue === false) {
        const query = `
        delete from afiliados_comites where cedula=${ced} and comite_id=${addName};
        `;

        mysqlConnection.query(query,(err,rows,fields)=>{
            if(!err){
                res.send(`Se eliminó exitosamente`)
            }else{
                console.log(err);
                res.send(`Error en el sistema`)
            }
        });




	}
});

module.exports = router;
