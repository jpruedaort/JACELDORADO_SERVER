const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'JAC_UNIFICADO'
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log("Db is Connected")
    }
});

module.exports = mysqlConnection;