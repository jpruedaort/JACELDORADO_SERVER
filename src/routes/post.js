const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");
const verify = require('../private');

router.post('/user_info',verify,(req,res)=>{
    console.log(req.user.email)
    res.json({payload:req.user});

});



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


module.exports = router;