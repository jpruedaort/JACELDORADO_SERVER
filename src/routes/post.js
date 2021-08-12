const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");
const verify = require('../private');
const nodemailer = require('nodemailer');
require("dotenv").config();


//Informacion del usuario
router.post('/user_info',verify,(req,res)=>{
    console.log(req.user.email)
    res.json({payload:req.user});

});


//Agregar Nuevos eventos
router.post('/new_event',verify,(req,res)=>{

    console.log(req.body)

    let comitesLog=req.body.form.cominvi;
    console.log("comites: ", comitesLog);

    let query = `INSERT INTO EVENTOS (eventos_name, event_owner_email,event_date,event_contenido) values ('${req.body.form.evname}','${req.body.form.evUserEmail}','${req.body.form.evfecha}','${req.body.form.evdescrip}');
                    set @person_id = LAST_INSERT_ID(); `;

    

    
        
    if(comitesLog.evsalud === true){
        let concati = 'INSERT INTO eventos_comites (comite_id , event_id) values ( 1 , @person_id); ';
        query = query + concati;
    };

    if(comitesLog.evambiente === true){
        let concati = 'INSERT INTO eventos_comites (comite_id , event_id) values ( 2 , @person_id); ';
        query = query + concati;
    };

    if(comitesLog.evdeporte === true){
        let concati = 'INSERT INTO eventos_comites (comite_id , event_id) values ( 3 , @person_id); ';
        query = query + concati;
    };

    if(comitesLog.evjuventud === true){
        let concati = 'INSERT INTO eventos_comites (comite_id , event_id) values ( 4 , @person_id); ';
        query = query + concati;
    };

    if(comitesLog.evgenero === true){
        let concati = 'INSERT INTO eventos_comites (comite_id , event_id) values ( 5 , @person_id); ';
        query = query + concati;
    };
    
    console.log("query: " ,query)
    
    

    
    

    mysqlConnection.query(query,[],(err, rows, fields)=>{
        if(!err){
            res.json({status:true})
        }else{
            console.log(err)
            res.json({status:false})
        }
    })
});

router.post('/getevents',verify,(req,res)=>{
    let query = 'select  eventos.event_id, eventos.event_owner_email , eventos.event_date, eventos.eventos_name , eventos.event_contenido , eventos_comites.comite_id , comites.comite_name from eventos JOIN eventos_comites on eventos.event_id=eventos_comites.event_id JOIN  comites on comites.comite_id=eventos_comites.comite_id ;'

    mysqlConnection.query(query,[],(err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err)
            res.json({status:false})
        }
    })
});

router.post('/send_mail',verify,(req,res)=>{
    console.log("datos email: ", req.body );

    const transporter = nodemailer.createTransport(  {
        service:"hotmail",
        auth: {
            user:process.env.EM_USER,
            pass:process.env.EM_PASS
        },
    });

    const options = {
        from:process.env.EM_USER,
        to:"jpruedaort@hotmail.com",
        subject:"Send email with node",
        text:"hola"
    }

    transporter.sendMail(options,  function(err,info){
        if(!err){
            res.json({status:true})
        }else{
            res.json({status:false})
            console.log(err)
        }
    })

 
})

module.exports = router;