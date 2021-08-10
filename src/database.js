const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'JAC_UNIFICADO'
});

function handleDisconnect(conexion_db){
    connection = mysql.createPool(conexion_db);
    
    mysqlConnection.connect(function(err){
        if(err){
            console.log(" Error connecting to db ",err);
            setTimeout(handleDisconnect,2000);
        }else{
            console.log("Db is Connected");
        }
    });
    
    mysqlConnection.on('error',function(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleDisconnect();
        }else{
            throw err;
        }
    });


}



handleDisconnect(mysqlConnection)
module.exports = mysqlConnection;