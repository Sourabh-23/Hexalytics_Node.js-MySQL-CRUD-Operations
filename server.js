const express = require ('express');
const colors = require('colors');
const morgan = require ('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');


// configure dotenv
dotenv.config();

// rest object
const app = express();


// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use('/api/v1/user',require("./routes/userRoutes"));

app.get('/test',(req,res)=> {
    res.status(200).send("<h1>Nodejs CRUD OPERATION with  Mysql App</h1>")
});


//port
 const PORT=process.env.PORT || 8000;


 // conditionally listen

 mySqlPool.query('SELECT 1').then(()=>{
    // MYSQL
    console.log('MYSQL DB CONNECT '.bgCyan.white);
    
     // listen
 app.listen(PORT,()=> {
    
    console.log(`Server Running ON PORT ${process.env.PORT}`.bgMagenta.cyan);
 
  });

 }).catch((error)=>{
    console.log(error);
    
 });



