const express= require('express');
const app = express();

//settings
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(express.json());

//CORS 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//Routes
const authRoute=require('./routes/auth');
app.use('/auth',authRoute);

const register=require('./routes/afiliados')
app.use('/register',register)

const post=require('./routes/post')
app.use('/post',post)

//Start Server
app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port') );
})