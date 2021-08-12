const mysql = require("mysql");
require("dotenv").config();

const mysqlConnection = {
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    multipleStatements: true
};

function handleDisconnect(conexion_db){
    connection = mysql.createPool(conexion_db);
    
    connection.getConnection(function(err){
        if(err){
            console.log(" Error connecting to db ",err);
            setTimeout(handleDisconnect,2000);
        }else{
            console.log("Db is Connected");
        }
    });
    
    connection.on('error',function(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleDisconnect();
        }else{
            throw err;
        }
    });


}



handleDisconnect(mysqlConnection)
module.exports = connection;